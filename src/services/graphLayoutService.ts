import { graphService } from './graphService';
import type { GraphNode } from '../types/graph';
import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

export type NodeCategory = 'text' | 'master' | 'tattva' | 'concept' | 'dharana' | 'verse' | 'upaya' | 'mala';

export interface GraphVisualNode extends SimulationNodeDatum {
  id: string;
  kind: GraphNode['kind'];
  category: NodeCategory;
  label: string;
  subLabel?: string;
  radius: number;
  color: string;
  strokeColor: string;
  degree: number;
  rawNode: GraphNode;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphVisualLink extends SimulationLinkDatum<GraphVisualNode> {
  id: string;
  source: string | GraphVisualNode;
  target: string | GraphVisualNode;
  type: string;
  color: string;
  sourceId: string;
  targetId: string;
}

export const CATEGORY_COLORS: Record<NodeCategory, { fill: string; stroke: string; label: string }> = {
  text: { fill: '#8F242B', stroke: '#5F141A', label: 'Texts' },
  master: { fill: '#A3343C', stroke: '#6B1B21', label: 'Masters' },
  tattva: { fill: '#D9A05B', stroke: '#9E6E32', label: '36 Tattvas' },
  concept: { fill: '#264653', stroke: '#152932', label: 'Concepts' },
  dharana: { fill: '#C94A4A', stroke: '#8A2B2B', label: '112 Dhāraṇās' },
  verse: { fill: '#B85D63', stroke: '#7A3439', label: 'Verses' },
  upaya: { fill: '#4A4A4A', stroke: '#2A2A2A', label: 'Upāyas' },
  mala: { fill: '#5C564E', stroke: '#36322C', label: 'Malas' },
};

export const EDGE_COLORS: Record<string, string> = {
  EXPLAINS_CONCEPT: '#4E8194',
  MAPS_TO_TATTVA: '#D9A05B',
  GROUNDED_IN: '#C94A4A',
  USES_UPAYA: '#7A7A7A',
  DISSOLVES_MALA: '#5C564E',
  COMMENTS_ON: '#8F242B',
  GURU_OF: '#A3343C',
  AUTHORED: '#8F242B',
};

export function buildGraphVisualizationData(): {
  nodes: GraphVisualNode[];
  links: GraphVisualLink[];
} {
  const nodesMap = new Map<string, GraphVisualNode>();
  const degrees = new Map<string, number>();

  // Helper to determine node category
  function getCategory(node: GraphNode): NodeCategory {
    switch (node.kind) {
      case 'Text': return 'text';
      case 'Master': return 'master';
      case 'Tattva': return 'tattva';
      case 'Concept': return 'concept';
      case 'Dharana': return 'dharana';
      case 'Verse': return 'verse';
      case 'Upaya': return 'upaya';
      case 'Mala': return 'mala';
      default: return 'concept';
    }
  }

  // Calculate degrees from edges
  const allNeighbors = new Map<string, Set<string>>();
  
  // Register all nodes
  const texts = graphService.getAllTexts();
  const masters = graphService.getAllMasters();
  const tattvas = graphService.getAllTattvas();
  const concepts = graphService.getAllLexicon();
  const dharanas = graphService.getAllDharanas();
  const upayas = graphService.getAllUpayas();
  const malas = graphService.getAllMalas();

  // Load verses from each text
  const verses: GraphNode[] = [];
  for (const t of texts) {
    verses.push(...graphService.getVersesForText(t.id));
  }

  const allRawNodes: GraphNode[] = [
    ...texts,
    ...masters,
    ...tattvas,
    ...concepts,
    ...dharanas,
    ...upayas,
    ...malas,
    ...verses,
  ];

  for (const n of allRawNodes) {
    degrees.set(n.id, 0);
    allNeighbors.set(n.id, new Set<string>());
  }

  // Compute degrees from neighbors
  for (const n of allRawNodes) {
    const { outgoing, incoming } = graphService.getNeighbors(n.id);
    outgoing.forEach((o) => {
      allNeighbors.get(n.id)?.add(o.edge.target);
      allNeighbors.get(o.edge.target)?.add(n.id);
    });
    incoming.forEach((i) => {
      allNeighbors.get(n.id)?.add(i.edge.source);
      allNeighbors.get(i.edge.source)?.add(n.id);
    });
  }

  for (const [id, set] of allNeighbors) {
    degrees.set(id, set.size);
  }

  // Build nodes with radius and colors
  for (const n of allRawNodes) {
    const category = getCategory(n);
    const deg = degrees.get(n.id) || 0;
    const colors = CATEGORY_COLORS[category];

    let radius = 10;
    let label = n.id;
    let subLabel = '';

    if (n.kind === 'Text') {
      radius = 24;
      label = (n as any).titleIast;
      subLabel = (n as any).titleDevanagari;
    } else if (n.kind === 'Master') {
      radius = 20;
      label = (n as any).nameIast;
      subLabel = (n as any).nameDevanagari;
    } else if (n.kind === 'Tattva') {
      radius = 16;
      label = `#${(n as any).number} ${(n as any).nameIast}`;
      subLabel = (n as any).nameDevanagari;
    } else if (n.kind === 'Concept') {
      radius = Math.min(20, Math.max(12, 10 + deg * 0.8));
      label = (n as any).termIast;
      subLabel = (n as any).termDevanagari;
    } else if (n.kind === 'Dharana') {
      radius = 12;
      label = `Dhāraṇā #${(n as any).number}`;
      subLabel = (n as any).doorway;
    } else if (n.kind === 'Verse') {
      radius = 8;
      label = n.id;
    } else if (n.kind === 'Upaya') {
      radius = 18;
      label = (n as any).nameIast;
      subLabel = (n as any).nameDevanagari;
    } else if (n.kind === 'Mala') {
      radius = 16;
      label = (n as any).nameIast;
    }

    // Initial radial layout based on category to pre-warm physics
    let initialAngle = 0;
    let initialDist = 200;
    if (category === 'text') { initialDist = 60; initialAngle = Math.PI * 0.2; }
    else if (category === 'tattva') { initialDist = 260; initialAngle = Math.PI * 0.7; }
    else if (category === 'concept') { initialDist = 380; initialAngle = Math.PI * 1.3; }
    else if (category === 'dharana') { initialDist = 480; initialAngle = Math.PI * 1.8; }
    else if (category === 'master') { initialDist = 140; initialAngle = Math.PI * 0.4; }
    else { initialDist = 550; initialAngle = Math.random() * Math.PI * 2; }

    const jitter = (Math.random() - 0.5) * 80;
    const angle = initialAngle + (Math.random() - 0.5) * 0.9;
    const x = Math.cos(angle) * (initialDist + jitter);
    const y = Math.sin(angle) * (initialDist + jitter);

    nodesMap.set(n.id, {
      id: n.id,
      kind: n.kind,
      category,
      label,
      subLabel,
      radius,
      color: colors.fill,
      strokeColor: colors.stroke,
      degree: deg,
      rawNode: n,
      x,
      y,
    });
  }

  // Build links
  const links: GraphVisualLink[] = [];
  const linkIdSet = new Set<string>();

  for (const n of allRawNodes) {
    const { outgoing } = graphService.getNeighbors(n.id);
    for (const out of outgoing) {
      if (nodesMap.has(out.edge.source) && nodesMap.has(out.edge.target)) {
        const linkKey = `${out.edge.source}->${out.edge.target}:${out.edge.type}`;
        if (!linkIdSet.has(linkKey)) {
          linkIdSet.add(linkKey);
          links.push({
            id: out.edge.id,
            source: out.edge.source,
            target: out.edge.target,
            sourceId: out.edge.source,
            targetId: out.edge.target,
            type: out.edge.type,
            color: EDGE_COLORS[out.edge.type] || '#7A7A7A',
          });
        }
      }
    }
  }

  return {
    nodes: Array.from(nodesMap.values()),
    links,
  };
}
