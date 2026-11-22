import tattvasData from '../data/ontology/tattvas.json';
import lexiconData from '../data/ontology/lexicon.json';
import upayasData from '../data/ontology/upayas.json';
import malasData from '../data/ontology/malas.json';
import lineageData from '../data/ontology/lineage.json';
import dharanasData from '../data/ontology/dharanas.json';
import edgesData from '../data/graph/edges.json';
import modulesData from '../data/curriculum/modules.json';

import phData from '../data/texts/pratyabhijnahrdayam.json';
import ssData from '../data/texts/shivasutras.json';
import skData from '../data/texts/spandakarika.json';
import vbtData from '../data/texts/vijnanabhairava.json';
import bsData from '../data/texts/bhairavastava.json';

import type {
  GraphNode,
  GraphEdge,
  TextNode,
  VerseNode,
  TattvaNode,
  ConceptNode,
  UpayaNode,
  MalaNode,
  DharanaNode,
  MasterNode,
  LearningModule,
} from '../types/graph';

class GraphService {
  private nodes = new Map<string, GraphNode>();
  private edges: GraphEdge[] = [];
  private texts = new Map<string, TextNode>();
  private verses = new Map<string, VerseNode>();
  private tattvas: TattvaNode[] = [];
  private lexicon: ConceptNode[] = [];
  private upayas: UpayaNode[] = [];
  private malas: MalaNode[] = [];
  private dharanas: DharanaNode[] = [];
  private lineage: MasterNode[] = [];
  private modules: LearningModule[] = [];

  // Adjacency lists for fast 1-2 hop traversal
  private outgoingEdges = new Map<string, GraphEdge[]>();
  private incomingEdges = new Map<string, GraphEdge[]>();

  constructor() {
    this.init();
  }

  private init() {
    // 1. Load Texts and Verses
    const rawTexts = [phData, ssData, skData, vbtData, bsData];
    for (const item of rawTexts) {
      const textInfo = item.textInfo as TextNode;
      this.texts.set(textInfo.id, textInfo);
      this.nodes.set(textInfo.id, textInfo);

      for (const v of item.verses) {
        const verseNode = v as VerseNode;
        this.verses.set(verseNode.id, verseNode);
        this.nodes.set(verseNode.id, verseNode);
      }
    }

    // 2. Load Tattvas
    this.tattvas = tattvasData as TattvaNode[];
    for (const t of this.tattvas) {
      this.nodes.set(t.id, t);
    }

    // 3. Load Lexicon
    this.lexicon = lexiconData as ConceptNode[];
    for (const c of this.lexicon) {
      this.nodes.set(c.id, c);
    }

    // 4. Load Upayas
    this.upayas = upayasData as UpayaNode[];
    for (const u of this.upayas) {
      this.nodes.set(u.id, u);
    }

    // 5. Load Malas
    this.malas = malasData as MalaNode[];
    for (const m of this.malas) {
      this.nodes.set(m.id, m);
    }

    // 6. Load Dharanas
    this.dharanas = dharanasData as DharanaNode[];
    for (const d of this.dharanas) {
      this.nodes.set(d.id, d);
    }

    // 7. Load Lineage
    this.lineage = lineageData as MasterNode[];
    for (const m of this.lineage) {
      this.nodes.set(m.id, m);
    }

    // 8. Load Modules
    this.modules = modulesData as LearningModule[];

    // 9. Load Edges & build adjacency lists
    this.edges = edgesData as GraphEdge[];
    for (const edge of this.edges) {
      if (!this.outgoingEdges.has(edge.source)) {
        this.outgoingEdges.set(edge.source, []);
      }
      this.outgoingEdges.get(edge.source)!.push(edge);

      if (!this.incomingEdges.has(edge.target)) {
        this.incomingEdges.set(edge.target, []);
      }
      this.incomingEdges.get(edge.target)!.push(edge);
    }
  }

  // Node Getters
  public getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  public getVerse(id: string): VerseNode | undefined {
    return this.verses.get(id);
  }

  public getText(id: string): TextNode | undefined {
    return this.texts.get(id);
  }

  public getAllTexts(): TextNode[] {
    return Array.from(this.texts.values()).sort((a, b) => a.stage - b.stage);
  }

  public getVersesForText(textId: string): VerseNode[] {
    return Array.from(this.verses.values())
      .filter((v) => v.textId === textId)
      .sort((a, b) => a.verseNumber - b.verseNumber);
  }

  public getAllTattvas(): TattvaNode[] {
    return [...this.tattvas].sort((a, b) => a.number - b.number);
  }

  public getAllLexicon(): ConceptNode[] {
    return [...this.lexicon].sort((a, b) => a.termIast.localeCompare(b.termIast));
  }

  public getAllUpayas(): UpayaNode[] {
    return this.upayas;
  }

  public getAllMalas(): MalaNode[] {
    return this.malas;
  }

  public getAllDharanas(): DharanaNode[] {
    return [...this.dharanas].sort((a, b) => a.number - b.number);
  }

  public getAllMasters(): MasterNode[] {
    return this.lineage;
  }

  public getAllModules(): LearningModule[] {
    return [...this.modules].sort((a, b) => a.moduleNumber - b.moduleNumber);
  }

  public getModuleBySlug(slug: string): LearningModule | undefined {
    return this.modules.find((m) => m.slug === slug || m.id === slug);
  }

  // Neighborhood Graph Traversal (1-2 hops)
  public getNeighbors(nodeId: string): {
    outgoing: { edge: GraphEdge; targetNode?: GraphNode }[];
    incoming: { edge: GraphEdge; sourceNode?: GraphNode }[];
  } {
    const out = (this.outgoingEdges.get(nodeId) || []).map((e) => ({
      edge: e,
      targetNode: this.nodes.get(e.target),
    }));
    const inc = (this.incomingEdges.get(nodeId) || []).map((e) => ({
      edge: e,
      sourceNode: this.nodes.get(e.source),
    }));
    return { outgoing: out, incoming: inc };
  }

  // Fast Global Search
  public search(query: string, limit: number = 20): {
    node: GraphNode;
    score: number;
    matchType: 'id' | 'title' | 'sanskrit' | 'text';
  }[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: {
      node: GraphNode;
      score: number;
      matchType: 'id' | 'title' | 'sanskrit' | 'text';
    }[] = [];

    for (const [id, node] of this.nodes) {
      let score = 0;
      let matchType: 'id' | 'title' | 'sanskrit' | 'text' = 'text';

      const lowId = id.toLowerCase();
      if (lowId === q) {
        score += 100;
        matchType = 'id';
      } else if (lowId.includes(q)) {
        score += 50;
        matchType = 'id';
      }

      // Check fields according to kind
      if (node.kind === 'Verse') {
        const v = node as VerseNode;
        if (v.iast.toLowerCase().includes(q)) {
          score += 40;
          matchType = 'sanskrit';
        } else if (v.devanagari.includes(q)) {
          score += 40;
          matchType = 'sanskrit';
        } else if (v.studyGloss.toLowerCase().includes(q)) {
          score += 25;
        } else if (v.practicalContext.toLowerCase().includes(q)) {
          score += 15;
        }
      } else if (node.kind === 'Concept') {
        const c = node as ConceptNode;
        if (c.termIast.toLowerCase().includes(q)) {
          score += 60;
          matchType = 'title';
        } else if (c.termDevanagari.includes(q)) {
          score += 60;
          matchType = 'sanskrit';
        } else if (c.conciseDefinition.toLowerCase().includes(q)) {
          score += 20;
        }
      } else if (node.kind === 'Tattva') {
        const t = node as TattvaNode;
        if (t.nameIast.toLowerCase().includes(q) || t.englishName.toLowerCase().includes(q)) {
          score += 60;
          matchType = 'title';
        } else if (t.nameDevanagari.includes(q)) {
          score += 60;
          matchType = 'sanskrit';
        } else if (t.functionDescription.toLowerCase().includes(q)) {
          score += 20;
        }
      } else if (node.kind === 'Dharana') {
        const d = node as DharanaNode;
        if (d.doorway.toLowerCase().includes(q) || d.instructionsSummary.toLowerCase().includes(q)) {
          score += 30;
          matchType = 'text';
        }
      } else if (node.kind === 'Master') {
        const m = node as MasterNode;
        if (m.nameIast.toLowerCase().includes(q)) {
          score += 60;
          matchType = 'title';
        }
      }

      if (score > 0) {
        results.push({ node, score, matchType });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit);
  }
}

export const graphService = new GraphService();
