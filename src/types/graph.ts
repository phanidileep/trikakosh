export type NodeKind =
  | 'Text'
  | 'Verse'
  | 'Concept'
  | 'Tattva'
  | 'Upaya'
  | 'Mala'
  | 'Dharana'
  | 'Master';

export type EdgeType =
  | 'EXPLAINS_CONCEPT'
  | 'MAPS_TO_TATTVA'
  | 'GROUNDED_IN'
  | 'USES_UPAYA'
  | 'DISSOLVES_MALA'
  | 'COMMENTS_ON'
  | 'GURU_OF'
  | 'AUTHORED';

export interface ProvenanceInfo {
  source: string;
  sourceUrl: string;
  sha256?: string;
  verification_status: 'verified_canonical' | 'pending_canonical_source';
  editionNotes?: string;
}

export interface TextNode {
  id: string; // e.g. "PH", "SS", "SK", "VBT", "BS"
  kind: 'Text';
  titleIast: string;
  titleDevanagari: string;
  authorIast: string;
  century: string;
  stage: number; // 1 to 5 initiation order
  description: string;
  verseCount: number;
  provenance: ProvenanceInfo;
}

export interface PadacchedaWord {
  wordDevanagari: string;
  wordIast: string;
  grammaticalRole: string; // e.g. "nom. sg. f.", "loc. sg. n.", "indecl."
  literalMeaning: string;
}

export interface VerseNode {
  id: string; // e.g. "PH.1", "SS.1.1", "SK.1.1", "VBT.24", "BS.1"
  kind: 'Verse';
  textId: string;
  verseNumber: number;
  subDivision?: string; // e.g. "Unmeṣa 1: Śāmbhavopāya", "Niḥsyanda 1"
  devanagari: string;
  iast: string;
  padaccheda: PadacchedaWord[];
  studyGloss: string; // Original literal study gloss
  practicalContext: string; // Lineage-accurate practical and philosophical context
  provenance: ProvenanceInfo;
  mappedTattvas?: string[]; // IDs like "TATTVA.01"
  usesUpayas?: string[]; // IDs like "UPAYA.SAMBHAVA"
  explainsConcepts?: string[]; // IDs like "CONCEPT.PRAKASA"
  relatedVerses?: string[]; // IDs like "SS.1.1"
}

export interface ConceptNode {
  id: string; // e.g. "CONCEPT.PRAKASA"
  kind: 'Concept';
  termIast: string;
  termDevanagari: string;
  category: 'Metaphysics' | 'Epistemology' | 'Sādhana' | 'Psychology' | 'Linguistic';
  rootEtymology: string;
  conciseDefinition: string;
  advaitaContrast?: string;
  linkedVerses: string[];
}

export type TattvaOrder = 'suddha' | 'suddhasuddha' | 'asuddha';

export interface TattvaNode {
  id: string; // "TATTVA.01" to "TATTVA.36"
  kind: 'Tattva';
  number: number; // 1 to 36
  nameIast: string;
  nameDevanagari: string;
  order: TattvaOrder;
  englishName: string;
  functionDescription: string;
  malaOrKancuka?: string;
  cosmicRole: string;
  mappedVerses: string[];
}

export interface UpayaNode {
  id: string; // "UPAYA.ANUPAYA", "UPAYA.SAMBHAVA", "UPAYA.SAKTA", "UPAYA.ANAVA"
  kind: 'Upaya';
  nameIast: string;
  nameDevanagari: string;
  level: string;
  facultyEmployed: string;
  orientation: string;
  practicalApproach: string;
  canonicalAnchor: string;
  mappedVerses: string[];
}

export interface MalaNode {
  id: string; // "MALA.ANAVA", "MALA.MAYIYA", "MALA.KARMA"
  kind: 'Mala';
  nameIast: string;
  nameDevanagari: string;
  description: string;
  manifestation: string;
  dissolutionMethod: string;
  mappedVerses: string[];
}

export type DharanaDoorway =
  | 'breath'
  | 'sound'
  | 'emotion'
  | 'gap'
  | 'gaze'
  | 'space'
  | 'body';

export interface DharanaNode {
  id: string; // "DHARANA.001" to "DHARANA.112"
  kind: 'Dharana';
  number: number;
  verseId: string; // "VBT.24" etc.
  upayaId: string;
  doorway: DharanaDoorway;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructionsSummary: string;
  contemplativeFocalPoint: string;
  whyItWorksGraphProof: {
    targetTextId: string;
    targetVerseId: string;
    rationale: string;
  };
}

export interface MasterNode {
  id: string; // "MASTER.VASUGUPTA", etc.
  kind: 'Master';
  nameIast: string;
  nameDevanagari: string;
  century: string;
  lineageRole: string;
  biographicalNotes: string;
  coreWorks: string[];
  guruOf: string[];
  studentOf: string[];
}

export type GraphNode =
  | TextNode
  | VerseNode
  | ConceptNode
  | TattvaNode
  | UpayaNode
  | MalaNode
  | DharanaNode
  | MasterNode;

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  label?: string;
}

export interface LearningModule {
  id: string; // "MODULE.01" to "MODULE.07"
  moduleNumber: number;
  slug: string;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  summary: string;
  keyConcepts: string[]; // Concept IDs
  canonicalCitations: string[]; // Verse IDs
  sections: {
    heading: string;
    paragraphs: string[]; // paragraphs with [ID] citations and technical terms
  }[];
  contemplativeExercise?: {
    title: string;
    instruction: string;
    groundedInVerse: string;
  };
}

export interface CorpusManifest {
  version: string;
  title: string;
  lastUpdated: string;
  texts: {
    id: string;
    file: string;
    verseCount: number;
  }[];
  ontology: {
    tattvas: string;
    lexicon: string;
    upayas: string;
    malas: string;
    lineage: string;
  };
  graph: {
    edges: string;
  };
  curriculum: {
    modules: string;
  };
}
