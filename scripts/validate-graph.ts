import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalNodes: number;
    totalEdges: number;
    textsCount: number;
    versesCount: number;
    tattvasCount: number;
    conceptsCount: number;
    upayasCount: number;
    malasCount: number;
    dharanasCount: number;
    mastersCount: number;
    modulesCount: number;
  };
}

function runValidation(): ValidationResult {
  const baseDir = path.resolve(process.cwd(), 'src/data');
  const errors: string[] = [];
  const warnings: string[] = [];

  const nodeMap = new Map<string, any>();

  // Helper to load JSON safely
  function loadJson<T>(relPath: string): T | null {
    const fullPath = path.join(baseDir, relPath);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing required data file: ${relPath} (expected at ${fullPath})`);
      return null;
    }
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      return JSON.parse(content) as T;
    } catch (e: any) {
      errors.push(`Failed to parse JSON in ${relPath}: ${e.message}`);
      return null;
    }
  }

  // 1. Load manifest
  const manifest = loadJson<any>('manifest.json');
  if (!manifest) {
    return {
      passed: false,
      errors,
      warnings,
      stats: {
        totalNodes: 0,
        totalEdges: 0,
        textsCount: 0,
        versesCount: 0,
        tattvasCount: 0,
        conceptsCount: 0,
        upayasCount: 0,
        malasCount: 0,
        dharanasCount: 0,
        mastersCount: 0,
        modulesCount: 0,
      },
    };
  }

  let textsCount = 0;
  let versesCount = 0;
  let tattvasCount = 0;
  let conceptsCount = 0;
  let upayasCount = 0;
  let malasCount = 0;
  let dharanasCount = 0;
  let mastersCount = 0;
  let modulesCount = 0;

  // Register a node with duplicate check
  function registerNode(node: any, sourceFile: string) {
    if (!node || !node.id) {
      errors.push(`Node without id found in ${sourceFile}: ${JSON.stringify(node)}`);
      return;
    }
    if (nodeMap.has(node.id)) {
      errors.push(`Duplicate node id "${node.id}" found in ${sourceFile} (previously defined in ${nodeMap.get(node.id)._sourceFile})`);
    } else {
      nodeMap.set(node.id, { ...node, _sourceFile: sourceFile });
    }
  }

  // 2. Load Tattvas
  const tattvas = loadJson<any[]>('ontology/tattvas.json') || [];
  tattvasCount = tattvas.length;
  tattvas.forEach((t) => registerNode(t, 'ontology/tattvas.json'));

  // Validate Tattva sequence 1..36
  const tattvaNumbers = new Set<number>();
  tattvas.forEach((t) => {
    if (typeof t.number !== 'number') {
      errors.push(`Tattva ${t.id} missing valid 'number' attribute.`);
    } else {
      tattvaNumbers.add(t.number);
    }
  });

  for (let i = 1; i <= 36; i++) {
    if (!tattvaNumbers.has(i)) {
      errors.push(`Tattva sequence broken: missing tattva number ${i} (expected 1..36 with zero gaps).`);
    }
  }

  // 3. Load Concepts / Lexicon
  const lexicon = loadJson<any[]>('ontology/lexicon.json') || [];
  conceptsCount = lexicon.length;
  lexicon.forEach((c) => registerNode(c, 'ontology/lexicon.json'));

  // 4. Load Upayas
  const upayas = loadJson<any[]>('ontology/upayas.json') || [];
  upayasCount = upayas.length;
  upayas.forEach((u) => registerNode(u, 'ontology/upayas.json'));

  // 5. Load Malas
  const malas = loadJson<any[]>('ontology/malas.json') || [];
  malasCount = malas.length;
  malas.forEach((m) => registerNode(m, 'ontology/malas.json'));

  // 6. Load Lineage
  const lineage = loadJson<any[]>('ontology/lineage.json') || [];
  mastersCount = lineage.length;
  lineage.forEach((m) => registerNode(m, 'ontology/lineage.json'));

  // 7. Load Texts and Verses
  if (manifest.texts && Array.isArray(manifest.texts)) {
    for (const tEntry of manifest.texts) {
      const textData = loadJson<any>(tEntry.file);
      if (textData) {
        textsCount++;
        registerNode(textData.textInfo, tEntry.file);

        if (Array.isArray(textData.verses)) {
          for (const v of textData.verses) {
            versesCount++;
            registerNode(v, tEntry.file);

            // Invariant: required fields on verses
            if (!v.devanagari || typeof v.devanagari !== 'string' || v.devanagari.trim().length === 0) {
              errors.push(`Verse ${v.id} in ${tEntry.file} missing required 'devanagari' field.`);
            }
            if (!v.iast || typeof v.iast !== 'string' || v.iast.trim().length === 0) {
              errors.push(`Verse ${v.id} in ${tEntry.file} missing required 'iast' field.`);
            }
            if (!v.provenance || !v.provenance.source) {
              errors.push(`Verse ${v.id} in ${tEntry.file} missing required 'provenance' field.`);
            }
          }
        }
      }
    }
  }

  // 8. Load Dharanas (if stored separately or inside VBT)
  const dharanasFile = 'ontology/dharanas.json';
  if (fs.existsSync(path.join(baseDir, dharanasFile))) {
    const dharanas = loadJson<any[]>(dharanasFile) || [];
    dharanasCount = dharanas.length;
    dharanas.forEach((d) => registerNode(d, dharanasFile));
  }

  // 9. Load Edges and check for orphan edges
  const edges = loadJson<any[]>('graph/edges.json') || [];
  edges.forEach((edge, idx) => {
    if (!edge.id) {
      errors.push(`Edge at index ${idx} missing id: ${JSON.stringify(edge)}`);
    }
    if (!edge.source || !nodeMap.has(edge.source)) {
      errors.push(`Orphan edge ${edge.id || idx}: source "${edge.source}" does not exist in graph.`);
    }
    if (!edge.target || !nodeMap.has(edge.target)) {
      errors.push(`Orphan edge ${edge.id || idx}: target "${edge.target}" does not exist in graph.`);
    }
  });

  // 10. Load Modules and validate citation references
  const modules = loadJson<any[]>('curriculum/modules.json') || [];
  modulesCount = modules.length;
  modules.forEach((mod) => {
    // Check citation references in paragraphs
    const citationRegex = /\[([A-Z0-9_\.]+)\]/g;
    mod.sections?.forEach((sec: any) => {
      sec.paragraphs?.forEach((p: string) => {
        let match;
        while ((match = citationRegex.exec(p)) !== null) {
          const citedId = match[1];
          // Check if it's a verse or node id
          if (!nodeMap.has(citedId)) {
            errors.push(`Broken citation in Module ${mod.id} (${mod.title}): cited ID "[${citedId}]" does not exist in the graph.`);
          }
        }
      });
    });

    if (mod.canonicalCitations) {
      mod.canonicalCitations.forEach((cid: string) => {
        if (!nodeMap.has(cid)) {
          errors.push(`Module ${mod.id} canonicalCitations lists unknown ID "${cid}".`);
        }
      });
    }
  });

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    stats: {
      totalNodes: nodeMap.size,
      totalEdges: edges.length,
      textsCount,
      versesCount,
      tattvasCount,
      conceptsCount,
      upayasCount,
      malasCount,
      dharanasCount,
      mastersCount,
      modulesCount,
    },
  };
}

// Execution
const result = runValidation();
console.log('====================================================');
console.log('       TRIKAKOSH GRAPH VALIDATION REPORT            ');
console.log('====================================================');
console.log(`Total Nodes:       ${result.stats.totalNodes}`);
console.log(`  - Texts:         ${result.stats.textsCount}`);
console.log(`  - Verses:        ${result.stats.versesCount}`);
console.log(`  - Tattvas:       ${result.stats.tattvasCount} (1..36 sequence check)`);
console.log(`  - Concepts:      ${result.stats.conceptsCount}`);
console.log(`  - Upāyas:        ${result.stats.upayasCount}`);
console.log(`  - Malas:         ${result.stats.malasCount}`);
console.log(`  - Dhāraṇās:      ${result.stats.dharanasCount}`);
console.log(`  - Masters:       ${result.stats.mastersCount}`);
console.log(`Total Edges:       ${result.stats.totalEdges}`);
console.log(`Guided Modules:    ${result.stats.modulesCount}`);
console.log('----------------------------------------------------');

if (result.warnings.length > 0) {
  console.log(`Warnings (${result.warnings.length}):`);
  result.warnings.forEach((w) => console.warn(`  [WARN] ${w}`));
}

if (result.errors.length > 0) {
  console.error(`\n❌ VALIDATION FAILED WITH ${result.errors.length} ERROR(S):`);
  result.errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('\n✅ VALIDATION PASSED: 100% Deterministic Integrity Verified.');
  process.exit(0);
}
