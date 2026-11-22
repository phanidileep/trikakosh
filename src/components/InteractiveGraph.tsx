import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCollide,
  forceCenter,
  type Simulation,
} from 'd3-force';
import {
  buildGraphVisualizationData,
  CATEGORY_COLORS,
  type GraphVisualNode,
  type GraphVisualLink,
  type NodeCategory,
} from '../services/graphLayoutService';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Pause,
  Play,
  Search,
  Crosshair,
  Sliders,
} from 'lucide-react';

interface InteractiveGraphProps {
  onSelectNode: (nodeId: string) => void;
  selectedNodeId?: string | null;
  className?: string;
  initialFilter?: NodeCategory[];
  height?: number | string;
}

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({
  onSelectNode,
  selectedNodeId,
  className = '',
  initialFilter,
  height = '100%',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Raw Graph Data
  const rawData = useMemo(() => buildGraphVisualizationData(), []);

  // Filter States
  const [activeCategories, setActiveCategories] = useState<Set<NodeCategory>>(() => {
    if (initialFilter && initialFilter.length > 0) {
      return new Set(initialFilter);
    }
    return new Set<NodeCategory>(['text', 'master', 'tattva', 'concept', 'dharana', 'upaya', 'mala', 'verse']);
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [egoFocusMode, setEgoFocusMode] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [showPhysicsControls, setShowPhysicsControls] = useState(false);

  // Force simulation parameters
  const [chargeStrength, setChargeStrength] = useState(-180);
  const [linkDistance, setLinkDistance] = useState(70);

  // Viewport Transform (Pan & Zoom)
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const transformRef = useRef(transform);
  transformRef.current = transform;

  // Interaction State
  const [hoveredNode, setHoveredNode] = useState<GraphVisualNode | null>(null);
  const hoveredNodeRef = useRef<GraphVisualNode | null>(null);
  hoveredNodeRef.current = hoveredNode;

  const selectedNodeRef = useRef<string | null>(selectedNodeId || null);
  selectedNodeRef.current = selectedNodeId || null;

  // D3 Simulation Instance
  const simRef = useRef<Simulation<GraphVisualNode, GraphVisualLink> | null>(null);

  // Dragging state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const draggedNodeRef = useRef<GraphVisualNode | null>(null);

  // Dash offset animation for active link pulses
  const dashOffsetRef = useRef(0);

  // Determine active visible nodes & links based on categories & ego focus mode
  const { visibleNodes, visibleLinks, neighborSet } = useMemo(() => {
    // 1. Filter by category
    let nodes = rawData.nodes.filter((n) => activeCategories.has(n.category));
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    // Find direct 1-hop neighbors of selected node
    const nSet = new Set<string>();
    const selId = selectedNodeId;

    if (selId) {
      nSet.add(selId);
      for (const link of rawData.links) {
        const sId = typeof link.source === 'object' ? (link.source as GraphVisualNode).id : (link.source as string);
        const tId = typeof link.target === 'object' ? (link.target as GraphVisualNode).id : (link.target as string);
        if (sId === selId) nSet.add(tId);
        if (tId === selId) nSet.add(sId);
      }
    }

    // If ego focus mode is ON and a node is selected, keep ONLY selected node and direct neighbors
    if (egoFocusMode && selId) {
      nodes = nodes.filter((n) => nSet.has(n.id));
      const egoMap = new Map(nodes.map((n) => [n.id, n]));
      const links = rawData.links.filter((l) => {
        const sId = typeof l.source === 'object' ? (l.source as GraphVisualNode).id : (l.source as string);
        const tId = typeof l.target === 'object' ? (l.target as GraphVisualNode).id : (l.target as string);
        return egoMap.has(sId) && egoMap.has(tId);
      });
      return { visibleNodes: nodes, visibleLinks: links, neighborSet: nSet };
    }

    // Normal mode: all nodes in active categories
    const links = rawData.links.filter((l) => {
      const sId = typeof l.source === 'object' ? (l.source as GraphVisualNode).id : (l.source as string);
      const tId = typeof l.target === 'object' ? (l.target as GraphVisualNode).id : (l.target as string);
      return nodeMap.has(sId) && nodeMap.has(tId);
    });

    return { visibleNodes: nodes, visibleLinks: links, neighborSet: nSet };
  }, [rawData, activeCategories, selectedNodeId, egoFocusMode]);

  // Initialize or update D3 force simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 600;

    // Center transform initially if at (0,0)
    if (transformRef.current.x === 0 && transformRef.current.y === 0) {
      setTransform({ x: width / 2, y: height / 2, k: 0.85 });
    }

    // Stop existing simulation
    if (simRef.current) {
      simRef.current.stop();
    }

    const sim = forceSimulation<GraphVisualNode, GraphVisualLink>(visibleNodes)
      .force(
        'link',
        forceLink<GraphVisualNode, GraphVisualLink>(visibleLinks)
          .id((d) => d.id)
          .distance(linkDistance)
      )
      .force('charge', forceManyBody().strength(chargeStrength).distanceMax(500))
      .force('collide', forceCollide().radius((d: any) => (d.radius || 10) + 4))
      .force('center', forceCenter(0, 0).strength(0.04))
      .alphaDecay(0.028)
      .velocityDecay(0.4);

    simRef.current = sim;

    if (isFrozen) {
      sim.stop();
    }

    return () => {
      sim.stop();
    };
  }, [visibleNodes, visibleLinks, chargeStrength, linkDistance, isFrozen]);

  // Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      dashOffsetRef.current -= 0.5;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Apply Pan & Zoom Transform
      const { x, y, k } = transformRef.current;
      ctx.translate(x, y);
      ctx.scale(k, k);

      const selId = selectedNodeRef.current;
      const hovNode = hoveredNodeRef.current;
      const hovId = hovNode ? hovNode.id : null;

      // Active target for highlight is hovered node or selected node
      const focusId = hovId || selId;

      // Draw Links
      for (const link of visibleLinks) {
        const src = link.source as GraphVisualNode;
        const tgt = link.target as GraphVisualNode;
        if (!src || !tgt || src.x === undefined || tgt.x === undefined) continue;

        const isConnectedToFocus = focusId && (src.id === focusId || tgt.id === focusId);
        const isDimmed = focusId && !isConnectedToFocus;

        ctx.beginPath();
        ctx.moveTo(src.x, src.y!);
        ctx.lineTo(tgt.x, tgt.y!);

        if (isConnectedToFocus) {
          ctx.strokeStyle = link.color;
          ctx.lineWidth = 2 / k;
          ctx.setLineDash([4 / k, 4 / k]);
          ctx.lineDashOffset = dashOffsetRef.current;
        } else {
          ctx.strokeStyle = link.color;
          ctx.lineWidth = 0.8 / k;
          ctx.setLineDash([]);
          ctx.globalAlpha = isDimmed ? 0.08 : 0.28;
        }

        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.setLineDash([]);
      }

      // Draw Nodes (The Connected Balls)
      for (const node of visibleNodes) {
        if (node.x === undefined || node.y === undefined) continue;

        const isSelected = selId === node.id;
        const isHovered = hovId === node.id;
        const isNeighbor = selId && neighborSet.has(node.id);
        const isMatchSearch = searchQuery.trim() && (
          node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          node.label.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const isDimmed = focusId && focusId !== node.id && !neighborSet.has(node.id) && !isMatchSearch;

        ctx.globalAlpha = isDimmed ? 0.12 : 1;

        // Outer Glow / Halo for Selected, Neighbor, or Search Match
        if (isSelected || isMatchSearch || isHovered || isNeighbor) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + (isSelected ? 6 : 4) / k, 0, Math.PI * 2);
          ctx.fillStyle = isSelected
            ? 'rgba(143, 36, 43, 0.28)'
            : isNeighbor
            ? 'rgba(217, 160, 91, 0.22)'
            : isMatchSearch
            ? 'rgba(217, 160, 91, 0.35)'
            : 'rgba(38, 70, 83, 0.20)';
          ctx.fill();
        }

        // Node Body ("Ball")
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Double Hairline Border
        ctx.lineWidth = 1.5 / k;
        ctx.strokeStyle = node.strokeColor;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(2, node.radius - 2.5), 0, Math.PI * 2);
        ctx.lineWidth = 0.7 / k;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.stroke();

        // Label Rendering based on zoom level and importance
        const shouldShowLabel =
          k > 1.2 ||
          node.radius >= 18 ||
          isSelected ||
          isHovered ||
          isMatchSearch ||
          (k > 0.6 && node.radius >= 14);

        if (shouldShowLabel && !isDimmed) {
          ctx.font = `${Math.max(9, Math.min(13, 11 / Math.sqrt(k)))}px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';

          // Label text shadow/outline for crisp readability
          ctx.lineWidth = 3 / k;
          ctx.strokeStyle = 'rgba(250, 247, 242, 0.9)';
          ctx.strokeText(node.label, node.x, node.y + node.radius + 3 / k);

          ctx.fillStyle = isSelected ? '#8F242B' : '#1A1816';
          ctx.fillText(node.label, node.x, node.y + node.radius + 3 / k);
        }

        ctx.globalAlpha = 1;
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [visibleNodes, visibleLinks, neighborSet, searchQuery]);

  // Spatial Helper Functions
  const handleZoom = (factor: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.clientWidth / 2;
    const cy = canvas.clientHeight / 2;
    setTransform((prev) => ({
      x: cx - (cx - prev.x) * factor,
      y: cy - (cy - prev.y) * factor,
      k: Math.max(0.2, Math.min(4, prev.k * factor)),
    }));
  };

  const handleZoomToFit = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || visibleNodes.length === 0) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const n of visibleNodes) {
      if (n.x === undefined || n.y === undefined) continue;
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    }

    const padding = 60;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const graphWidth = maxX - minX + padding * 2;
    const graphHeight = maxY - minY + padding * 2;

    const k = Math.min(1.8, Math.max(0.3, Math.min(width / graphWidth, height / graphHeight)));
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    setTransform({
      x: width / 2 - centerX * k,
      y: height / 2 - centerY * k,
      k,
    });
  }, [visibleNodes]);

  // Mouse & Touch Interaction Handlers
  const getNodeAtPoint = (px: number, py: number): GraphVisualNode | null => {
    const { x, y, k } = transformRef.current;
    const graphX = (px - x) / k;
    const graphY = (py - y) / k;

    // Search in reverse so top-drawn nodes take precedence
    for (let i = visibleNodes.length - 1; i >= 0; i--) {
      const node = visibleNodes[i];
      if (node.x === undefined || node.y === undefined) continue;
      const dx = graphX - node.x;
      const dy = graphY - node.y;
      const hitRadius = (node.radius + 6) ;
      if (dx * dx + dy * dy <= hitRadius * hitRadius) {
        return node;
      }
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const hit = getNodeAtPoint(px, py);
    if (hit) {
      draggedNodeRef.current = hit;
      hit.fx = hit.x;
      hit.fy = hit.y;
      if (simRef.current) simRef.current.alphaTarget(0.3).restart();
    } else {
      isDraggingRef.current = true;
      dragStartRef.current = { x: px - transformRef.current.x, y: py - transformRef.current.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    if (draggedNodeRef.current) {
      const { x, y, k } = transformRef.current;
      draggedNodeRef.current.fx = (px - x) / k;
      draggedNodeRef.current.fy = (py - y) / k;
      return;
    }

    if (isDraggingRef.current) {
      setTransform((prev) => ({
        ...prev,
        x: px - dragStartRef.current.x,
        y: py - dragStartRef.current.y,
      }));
      return;
    }

    // Hover detection
    const hit = getNodeAtPoint(px, py);
    if (hit !== hoveredNodeRef.current) {
      setHoveredNode(hit);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggedNodeRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const hit = getNodeAtPoint(px, py);

      if (hit && hit.id === draggedNodeRef.current.id) {
        // Click on node
        onSelectNode(hit.id);
      }

      draggedNodeRef.current.fx = null;
      draggedNodeRef.current.fy = null;
      draggedNodeRef.current = null;
      if (simRef.current) simRef.current.alphaTarget(0);
    }

    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    setTransform((prev) => {
      const newK = Math.max(0.2, Math.min(4, prev.k * zoomFactor));
      return {
        x: px - (px - prev.x) * (newK / prev.k),
        y: py - (py - prev.y) * (newK / prev.k),
        k: newK,
      };
    });
  };

  // Center on node if search match selected
  const handleCenterOnNode = (nodeId: string) => {
    const target = visibleNodes.find((n) => n.id === nodeId);
    if (!target || target.x === undefined || target.y === undefined) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    onSelectNode(nodeId);
    setTransform({
      x: canvas.clientWidth / 2 - target.x * 1.5,
      y: canvas.clientHeight / 2 - target.y * 1.5,
      k: 1.5,
    });
  };

  // Category Toggle
  const toggleCategory = (cat: NodeCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-paper select-none ${className}`} style={{ minHeight: height }}>
      {/* Top Floating Overlay: Search & Categories */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pointer-events-none">
        {/* Search Input Bar */}
        <div className="pointer-events-auto relative max-w-xs w-full text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-paper/95 backdrop-blur-md rounded-md hairline-border shadow-md">
            <Search size={14} className="text-ink-subtle" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  const match = visibleNodes.find(
                    (n) =>
                      n.id.toLowerCase() === searchQuery.trim().toLowerCase() ||
                      n.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
                  );
                  if (match) {
                    handleCenterOnNode(match.id);
                  }
                }
              }}
              placeholder="Search & jump to node (Enter)..."
              className="flex-1 bg-transparent border-none outline-none text-ink placeholder:text-ink-subtle text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-ink-subtle hover:text-ink font-mono text-[10px]"
              >
                ✕
              </button>
            )}
          </div>

          {searchQuery.trim().length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-paper/98 backdrop-blur-md rounded-md hairline-border shadow-xl z-30 divide-y divide-border text-[11px] font-mono">
              {visibleNodes
                .filter(
                  (n) =>
                    n.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    n.label.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 5)
                .map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      handleCenterOnNode(m.id);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-surface flex items-center justify-between cursor-pointer"
                  >
                    <span className="font-semibold text-ink">{m.id}</span>
                    <span className="text-[10px] text-ink-subtle truncate max-w-[140px]">{m.label}</span>
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 bg-paper/90 backdrop-blur-md p-1 rounded-md hairline-border shadow-xs text-xs">
          {(Object.keys(CATEGORY_COLORS) as NodeCategory[]).map((cat) => {
            const isActive = activeCategories.has(cat);
            const color = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-surface font-semibold text-ink hairline-border shadow-xs'
                    : 'text-ink-subtle hover:text-ink opacity-40 line-through'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color.fill }} />
                <span>{color.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Graph Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Bottom Floating Control Panel */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 bg-paper/95 backdrop-blur-md p-1 rounded-md hairline-border shadow-md text-xs font-mono">
          <button
            onClick={() => handleZoom(1.25)}
            className="p-1.5 rounded hover:bg-surface text-ink cursor-pointer"
            title="Zoom In (+)"
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={() => handleZoom(0.8)}
            className="p-1.5 rounded hover:bg-surface text-ink cursor-pointer"
            title="Zoom Out (-)"
          >
            <ZoomOut size={15} />
          </button>
          <button
            onClick={handleZoomToFit}
            className="p-1.5 rounded hover:bg-surface text-ink cursor-pointer"
            title="Fit to Screen"
          >
            <Maximize2 size={15} />
          </button>
          <div className="w-px h-4 bg-border mx-0.5" />
          <button
            onClick={() => setIsFrozen(!isFrozen)}
            className={`p-1.5 rounded cursor-pointer ${isFrozen ? 'text-vermilion bg-vermilion-subtle' : 'hover:bg-surface text-ink'}`}
            title={isFrozen ? 'Unfreeze Physics' : 'Freeze Simulation'}
          >
            {isFrozen ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button
            onClick={() => setEgoFocusMode(!egoFocusMode)}
            disabled={!selectedNodeId}
            className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer disabled:opacity-30 ${
              egoFocusMode ? 'bg-vermilion text-paper font-semibold' : 'hover:bg-surface text-ink'
            }`}
            title="Focus Mode: View only selected node and its direct 1-hop connections"
          >
            <Crosshair size={13} />
            <span className="text-[10px]">Ego Mode</span>
          </button>
          <button
            onClick={() => setShowPhysicsControls(!showPhysicsControls)}
            className={`p-1.5 rounded cursor-pointer ${showPhysicsControls ? 'bg-surface font-semibold text-vermilion' : 'hover:bg-surface text-ink'}`}
            title="Adjust Physics Forces"
          >
            <Sliders size={15} />
          </button>
        </div>

        {/* Physics Force Adjusters Drawer */}
        {showPhysicsControls && (
          <div className="pointer-events-auto p-3 bg-paper/95 backdrop-blur-md rounded-md hairline-border shadow-lg space-y-2 text-xs font-mono w-60">
            <span className="text-[10px] uppercase font-bold text-ink-subtle block">
              Simulation Physics
            </span>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-ink-muted">
                <span>Charge (Repulsion):</span>
                <span>{chargeStrength}</span>
              </div>
              <input
                type="range"
                min="-400"
                max="-40"
                value={chargeStrength}
                onChange={(e) => setChargeStrength(Number(e.target.value))}
                className="w-full accent-vermilion cursor-pointer"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-ink-muted">
                <span>Link Distance:</span>
                <span>{linkDistance}px</span>
              </div>
              <input
                type="range"
                min="30"
                max="180"
                value={linkDistance}
                onChange={(e) => setLinkDistance(Number(e.target.value))}
                className="w-full accent-vermilion cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Hover Info Tooltip Badge */}
      {hoveredNode && (
        <div
          className="absolute bottom-4 right-4 z-10 pointer-events-none p-3 bg-paper/95 backdrop-blur-md rounded-md hairline-border shadow-lg max-w-xs text-xs animate-in fade-in zoom-in-95"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
            <span className="font-mono font-semibold text-ink text-xs">{hoveredNode.id}</span>
            <span className="font-mono uppercase text-[9px] text-ink-subtle px-1 rounded bg-surface">
              {hoveredNode.category}
            </span>
          </div>
          <div className="font-serif font-bold text-sm text-ink">{hoveredNode.label}</div>
          {hoveredNode.subLabel && (
            <div className="font-sanskrit text-xs text-ink-muted">{hoveredNode.subLabel}</div>
          )}
          <div className="text-[10px] font-mono text-ink-subtle mt-1.5 flex items-center justify-between">
            <span>Connections: {hoveredNode.degree} links</span>
            <span className="text-vermilion">Click to Inspect</span>
          </div>
        </div>
      )}
    </div>
  );
};
