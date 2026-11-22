import { graphService } from './graphService';
import type { VerseNode, ConceptNode, TattvaNode } from '../types/graph';

export interface RetrievalResult {
  query: string;
  timestamp: string;
  retrievedVerses: VerseNode[];
  retrievedConcepts: ConceptNode[];
  retrievedTattvas: TattvaNode[];
  retrievedNodeIds: string[];
  executionTimeMs: number;
}

export interface ByokSettings {
  provider: 'groq' | 'openrouter';
  apiKey: string;
  model: string;
}

const STORAGE_KEY = 'trikakosh_byok_settings';

export function getByokSettings(): ByokSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // fallback to env
  }

  const envProvider = (import.meta.env.VITE_DEFAULT_PROVIDER as 'groq' | 'openrouter') || 'groq';
  const envGroqKey = import.meta.env.VITE_GROQ_API_KEY || '';
  const envOpenrouterKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';
  const envModel = import.meta.env.VITE_DEFAULT_MODEL || (envProvider === 'groq' ? 'llama-3.3-70b-versatile' : 'meta-llama/llama-3.3-70b-instruct');

  return {
    provider: envProvider,
    apiKey: envProvider === 'groq' ? envGroqKey : envOpenrouterKey,
    model: envModel,
  };
}

export function saveByokSettings(settings: ByokSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// Deterministic 1-2 hop hybrid graph retriever
export function retrieveGroundedContext(query: string): RetrievalResult {
  const startTime = performance.now();
  const searchHits = graphService.search(query, 12);

  const directVerses: VerseNode[] = [];
  const directConcepts: ConceptNode[] = [];
  const directTattvas: TattvaNode[] = [];
  const seedIds = new Set<string>();

  for (const hit of searchHits) {
    seedIds.add(hit.node.id);
    if (hit.node.kind === 'Verse') directVerses.push(hit.node as VerseNode);
    if (hit.node.kind === 'Concept') directConcepts.push(hit.node as ConceptNode);
    if (hit.node.kind === 'Tattva') directTattvas.push(hit.node as TattvaNode);
  }

  // 1-hop graph expansion over edges
  const expandedVerses = new Map<string, VerseNode>();
  directVerses.forEach((v) => expandedVerses.set(v.id, v));

  const expandedConcepts = new Map<string, ConceptNode>();
  directConcepts.forEach((c) => expandedConcepts.set(c.id, c));

  const expandedTattvas = new Map<string, TattvaNode>();
  directTattvas.forEach((t) => expandedTattvas.set(t.id, t));

  for (const seedId of seedIds) {
    const neighbors = graphService.getNeighbors(seedId);
    
    // Outgoing
    for (const out of neighbors.outgoing) {
      if (out.targetNode) {
        if (out.targetNode.kind === 'Verse') expandedVerses.set(out.targetNode.id, out.targetNode as VerseNode);
        if (out.targetNode.kind === 'Concept') expandedConcepts.set(out.targetNode.id, out.targetNode as ConceptNode);
        if (out.targetNode.kind === 'Tattva') expandedTattvas.set(out.targetNode.id, out.targetNode as TattvaNode);
      }
    }

    // Incoming
    for (const inc of neighbors.incoming) {
      if (inc.sourceNode) {
        if (inc.sourceNode.kind === 'Verse') expandedVerses.set(inc.sourceNode.id, inc.sourceNode as VerseNode);
        if (inc.sourceNode.kind === 'Concept') expandedConcepts.set(inc.sourceNode.id, inc.sourceNode as ConceptNode);
        if (inc.sourceNode.kind === 'Tattva') expandedTattvas.set(inc.sourceNode.id, inc.sourceNode as TattvaNode);
      }
    }
  }

  // Top prioritized lists
  const finalVerses = Array.from(expandedVerses.values()).slice(0, 8);
  const finalConcepts = Array.from(expandedConcepts.values()).slice(0, 6);
  const finalTattvas = Array.from(expandedTattvas.values()).slice(0, 4);

  const allIds = [
    ...finalVerses.map((v) => v.id),
    ...finalConcepts.map((c) => c.id),
    ...finalTattvas.map((t) => t.id),
  ];

  const executionTimeMs = Math.round(performance.now() - startTime);

  return {
    query,
    timestamp: new Date().toISOString(),
    retrievedVerses: finalVerses,
    retrievedConcepts: finalConcepts,
    retrievedTattvas: finalTattvas,
    retrievedNodeIds: allIds,
    executionTimeMs,
  };
}

// Build strictly constrained prompt with provenance citations
export function buildGraphRAGPrompt(query: string, retrieval: RetrievalResult): {
  systemPrompt: string;
  userPrompt: string;
} {
  const systemPrompt = `You are the lineage-accurate philosophical synthesis engine for TrikaKosh (Kashmir Shaivism / Trika).
NON-NEGOTIABLE RULES:
1. You MUST answer strictly using the retrieved canonical verses, concepts, and tattvas provided in the context.
2. Every philosophical statement MUST cite its exact canonical verse ID in square brackets, e.g. [PH.1], [SS.1.5], [VBT.24], [SK.1.1], [BS.1].
3. DO NOT invent, hallucinate, or cite verse IDs that are not present in the provided context.
4. Maintain Kashmir Shaivism's distinct non-dual vision (Dynamic Realism / Spanda / Pratyabhijñā). Clearly separate it from Classical Advaita Vedānta (no world-denying illusionism; the world is the real, vibrant light of Śiva).
5. Format your response cleanly in markdown with clear headings.`;

  let contextStr = `RETRIEVED GRAPH CONTEXT FOR QUERY: "${query}"\n\n`;

  if (retrieval.retrievedVerses.length > 0) {
    contextStr += `=== CANONICAL VERSES ===\n`;
    for (const v of retrieval.retrievedVerses) {
      contextStr += `[${v.id}] (${v.textId}):\n`;
      contextStr += `Devanagari: ${v.devanagari}\n`;
      contextStr += `IAST: ${v.iast}\n`;
      contextStr += `Study Gloss: ${v.studyGloss}\n`;
      contextStr += `Practical/Philosophical Context: ${v.practicalContext}\n\n`;
    }
  }

  if (retrieval.retrievedConcepts.length > 0) {
    contextStr += `=== TECHNICAL ONTOLOGY CONCEPTS ===\n`;
    for (const c of retrieval.retrievedConcepts) {
      contextStr += `[${c.id}] ${c.termIast} (${c.termDevanagari}):\n`;
      contextStr += `Etymology: ${c.rootEtymology}\n`;
      contextStr += `Definition: ${c.conciseDefinition}\n`;
      if (c.advaitaContrast) contextStr += `Advaita Contrast: ${c.advaitaContrast}\n`;
      contextStr += `\n`;
    }
  }

  if (retrieval.retrievedTattvas.length > 0) {
    contextStr += `=== 36-TATTVA ARCHITECTURE NODES ===\n`;
    for (const t of retrieval.retrievedTattvas) {
      contextStr += `[${t.id}] ${t.nameIast} (${t.nameDevanagari}) - #${t.number} (${t.order}):\n`;
      contextStr += `Function: ${t.functionDescription}\n`;
      contextStr += `Cosmic Role: ${t.cosmicRole}\n\n`;
    }
  }

  const userPrompt = `${contextStr}\nQUESTION: ${query}\n\nPlease synthesize a lineage-accurate explanation answering the question thoroughly, citing exact [ID] pills for every claim based strictly on the provided context.`;

  return { systemPrompt, userPrompt };
}

// Call BYOK LLM endpoint (Groq or OpenRouter)
export async function queryGraphRAG(
  query: string,
  retrieval: RetrievalResult,
  settings: ByokSettings
): Promise<{ text: string; error?: string }> {
  if (!settings.apiKey) {
    return {
      text: '',
      error: 'NO_API_KEY',
    };
  }

  const { systemPrompt, userPrompt } = buildGraphRAGPrompt(query, retrieval);

  const endpoint =
    settings.provider === 'groq'
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://openrouter.ai/api/v1/chat/completions';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${settings.apiKey.trim()}`,
        ...(settings.provider === 'openrouter'
          ? {
              'HTTP-Referer': 'https://trikakosh.org',
              'X-Title': 'TrikaKosh Kashmir Shaivism Platform',
            }
          : {}),
      },
      body: JSON.stringify({
        model: settings.model || (settings.provider === 'groq' ? 'llama-3.3-70b-versatile' : 'meta-llama/llama-3.3-70b-instruct'),
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 1500,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      return {
        text: '',
        error: `Inference error (${res.status}): ${errBody.slice(0, 300)}`,
      };
    }

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content || 'No answer generated.';
    return { text: answer };
  } catch (err: any) {
    return {
      text: '',
      error: `Network error connecting to ${settings.provider}: ${err.message}`,
    };
  }
}

// Test connection helper
export async function testByokConnection(settings: ByokSettings): Promise<{ success: boolean; message: string }> {
  if (!settings.apiKey) {
    return { success: false, message: 'API key is required.' };
  }

  const endpoint =
    settings.provider === 'groq'
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://openrouter.ai/api/v1/chat/completions';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${settings.apiKey.trim()}`,
        ...(settings.provider === 'openrouter'
          ? {
              'HTTP-Referer': 'https://trikakosh.org',
              'X-Title': 'TrikaKosh',
            }
          : {}),
      },
      body: JSON.stringify({
        model: settings.model || (settings.provider === 'groq' ? 'llama-3.3-70b-versatile' : 'meta-llama/llama-3.3-70b-instruct'),
        messages: [{ role: 'user', content: 'Respond with the single word "VERIFIED".' }],
        max_tokens: 10,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { success: false, message: `Status ${res.status}: ${errText.slice(0, 150)}` };
    }

    return { success: true, message: 'Connection successful!' };
  } catch (e: any) {
    return { success: false, message: `Connection failed: ${e.message}` };
  }
}
