import React from 'react';
import { useApp } from '../context/AppContext';
import { graphService } from '../services/graphService';

interface CitationPillProps {
  id: string;
  label?: string;
  className?: string;
}

export const CitationPill: React.FC<CitationPillProps> = ({ id, label, className = '' }) => {
  const { openInspector } = useApp();
  const cleanId = id.replace(/[\[\]]/g, '').trim();
  const node = graphService.getNode(cleanId);

  const isVerse = cleanId.startsWith('PH.') || cleanId.startsWith('SS.') || cleanId.startsWith('SK.') || cleanId.startsWith('VBT.') || cleanId.startsWith('BS.');
  const isTattva = cleanId.startsWith('TATTVA.');
  const isConcept = cleanId.startsWith('CONCEPT.');

  const colorClass = isVerse
    ? 'text-vermilion bg-vermilion-subtle/50 hover:bg-vermilion/15 border-vermilion/30'
    : isTattva
    ? 'text-slate-trika bg-slate-subtle/50 hover:bg-slate-trika/15 border-slate-trika/30'
    : isConcept
    ? 'text-ink-muted bg-surface hover:bg-surface-hover border-border'
    : 'text-ink-muted bg-surface hover:bg-surface-hover border-border';

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        openInspector(cleanId);
      }}
      title={node ? `${node.kind}: ${cleanId} — Click to inspect verbatim Sanskrit & context` : `Inspect ${cleanId}`}
      className={`inline-flex items-center gap-1 font-mono text-xs px-1.5 py-0.5 rounded hairline-border font-medium cursor-pointer transition-colors ${colorClass} ${className}`}
    >
      <span>{label || cleanId}</span>
    </button>
  );
};
