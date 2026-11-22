import React, { useEffect, useRef } from 'react';
import { graphService } from '../services/graphService';
import { useApp } from '../context/AppContext';
import type { GraphNode } from '../types/graph';

interface RelationshipGraphMiniProps {
  nodeId: string;
  height?: number;
  className?: string;
  onNodeClick?: (id: string) => void;
}

export const RelationshipGraphMini: React.FC<RelationshipGraphMiniProps> = ({
  nodeId,
  height = 180,
  className = '',
  onNodeClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { openInspector } = useApp();

  const centerNode = graphService.getNode(nodeId);
  const neighbors = graphService.getNeighbors(nodeId);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !centerNode) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.clientWidth;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Collect distinct neighbor nodes
    const targetNodes = new Map<string, { node: GraphNode; edgeType: string; isIncoming: boolean }>();
    for (const out of neighbors.outgoing) {
      if (out.targetNode) {
        targetNodes.set(out.targetNode.id, { node: out.targetNode, edgeType: out.edge.type, isIncoming: false });
      }
    }
    for (const inc of neighbors.incoming) {
      if (inc.sourceNode && !targetNodes.has(inc.sourceNode.id)) {
        targetNodes.set(inc.sourceNode.id, { node: inc.sourceNode, edgeType: inc.edge.type, isIncoming: true });
      }
    }

    const neighborList = Array.from(targetNodes.values()).slice(0, 8); // top 8 for clean mini view
    const radius = Math.min(width, height) * 0.38;

    // Draw connecting threads
    neighborList.forEach((item, idx) => {
      const angle = (idx / neighborList.length) * Math.PI * 2 - Math.PI / 2;
      const nx = centerX + Math.cos(angle) * radius;
      const ny = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = item.isIncoming ? '#7A7A7A' : '#C94A4A';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw neighbor ball
      ctx.beginPath();
      ctx.arc(nx, ny, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#264653';
      ctx.fill();
      ctx.strokeStyle = '#DDD4C6';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Label
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#5C564E';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const labelY = ny > centerY ? ny + 12 : ny - 12;
      ctx.fillText(item.node.id, nx, labelY);
    });

    // Draw center node ("ball")
    ctx.beginPath();
    ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#8F242B';
    ctx.fill();
    ctx.strokeStyle = '#5F141A';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(centerNode.id.split('.')[0] || centerNode.id, centerX, centerY);

    ctx.restore();
  }, [nodeId, centerNode, neighbors, height]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const width = canvas.clientWidth;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.38;

    const targetNodes = new Map<string, GraphNode>();
    for (const out of neighbors.outgoing) if (out.targetNode) targetNodes.set(out.targetNode.id, out.targetNode);
    for (const inc of neighbors.incoming) if (inc.sourceNode) targetNodes.set(inc.sourceNode.id, inc.sourceNode);

    const neighborList = Array.from(targetNodes.values()).slice(0, 8);
    for (let idx = 0; idx < neighborList.length; idx++) {
      const angle = (idx / neighborList.length) * Math.PI * 2 - Math.PI / 2;
      const nx = centerX + Math.cos(angle) * radius;
      const ny = centerY + Math.sin(angle) * radius;
      const dx = px - nx;
      const dy = py - ny;
      if (dx * dx + dy * dy <= 144) {
        if (onNodeClick) onNodeClick(neighborList[idx].id);
        else openInspector(neighborList[idx].id);
        return;
      }
    }
  };

  return (
    <div className={`relative bg-surface/50 rounded-md hairline-border overflow-hidden ${className}`}>
      <div className="absolute top-2 left-2.5 z-10 text-[9px] font-mono uppercase tracking-wider text-ink-subtle">
        Context Neighborhood
      </div>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="w-full cursor-pointer block"
        style={{ height }}
      />
    </div>
  );
};
