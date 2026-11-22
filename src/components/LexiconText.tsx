import React, { useState, useRef } from 'react';
import { graphService } from '../services/graphService';
import { useApp } from '../context/AppContext';
import { CitationPill } from './CitationPill';
import type { ConceptNode } from '../types/graph';

interface LexiconTextProps {
  text: string;
  className?: string;
}

export const LexiconText: React.FC<LexiconTextProps> = ({ text, className = '' }) => {
  const { openInspector } = useApp();
  const [activePopover, setActivePopover] = useState<{
    concept: ConceptNode;
    rect: DOMRect;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Load all lexicon terms for matching
  const concepts = graphService.getAllLexicon();
  const termMap = new Map<string, ConceptNode>();
  concepts.forEach((c) => {
    termMap.set(c.termIast.toLowerCase(), c);
    // Also without diacritics
    const normalized = c.termIast.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    termMap.set(normalized, c);
  });

  // Regex for citations [ID] and words
  // First split by citations
  const parts: React.ReactNode[] = [];
  const citationRegex = /\[([A-Z0-9_\.]+)\]/g;

  let lastIndex = 0;
  let match;

  while ((match = citationRegex.exec(text)) !== null) {
    const preText = text.slice(lastIndex, match.index);
    if (preText) {
      parts.push(renderTextWithTerms(preText));
    }
    const citedId = match[1];
    parts.push(
      <span key={`cite-${match.index}`} className="inline-block mx-0.5">
        <CitationPill id={citedId} />
      </span>
    );
    lastIndex = match.index + match[0].length;
  }

  const remaining = text.slice(lastIndex);
  if (remaining) {
    parts.push(renderTextWithTerms(remaining));
  }

  function renderTextWithTerms(raw: string): React.ReactNode {
    // Regex for words that might match lexicon
    // Match words like *Prakāśa*, Spanda, Śāmbhavopāya
    const tokenRegex = /(\*[^*]+\*|[A-Za-zĀāĪīŪūṚṛṜṝḶḷḸḹṄṅÑñṬṭḌḍṆṇŚśṢṣḤḥṂṃ]+)/g;
    const subParts: React.ReactNode[] = [];
    let subLast = 0;
    let tMatch;

    while ((tMatch = tokenRegex.exec(raw)) !== null) {
      const before = raw.slice(subLast, tMatch.index);
      if (before) subParts.push(before);

      const rawWord = tMatch[0];
      const cleanWord = rawWord.replace(/\*/g, '').trim();
      const normWord = cleanWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

      const matchedConcept = termMap.get(cleanWord.toLowerCase()) || termMap.get(normWord);

      if (matchedConcept && cleanWord.length > 3) {
        subParts.push(
          <span
            key={`term-${tMatch.index}`}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setActivePopover({ concept: matchedConcept, rect });
            }}
            onMouseLeave={() => setActivePopover(null)}
            onClick={() => openInspector(matchedConcept.id)}
            className="border-b border-dotted border-vermilion/60 text-ink hover:text-vermilion cursor-help font-medium transition-colors"
          >
            {cleanWord}
          </span>
        );
      } else {
        subParts.push(rawWord);
      }
      subLast = tMatch.index + tMatch[0].length;
    }

    const rest = raw.slice(subLast);
    if (rest) subParts.push(rest);

    return <React.Fragment key={`chunk-${raw.slice(0, 10)}`}>{subParts}</React.Fragment>;
  }

  return (
    <div ref={containerRef} className={`relative inline ${className}`}>
      {parts}

      {/* Floating Lexicon Tooltip Popover */}
      {activePopover && (
        <div
          style={{
            position: 'fixed',
            top: `${Math.min(window.innerHeight - 260, Math.max(10, activePopover.rect.bottom + 8))}px`,
            left: `${Math.min(window.innerWidth - 340, Math.max(10, activePopover.rect.left - 40))}px`,
            zIndex: 9999,
          }}
          className="w-80 p-3.5 bg-paper hairline-border shadow-xl rounded-md pointer-events-none text-left animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-baseline justify-between mb-1 pb-1 hairline-b">
            <div>
              <span className="font-serif font-semibold text-ink text-base">
                {activePopover.concept.termIast}
              </span>
              <span className="ml-2 font-sanskrit text-ink-muted text-sm">
                {activePopover.concept.termDevanagari}
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono tracking-wider px-1 py-0.5 bg-surface text-ink-muted rounded">
              {activePopover.concept.category}
            </span>
          </div>

          <p className="text-[11px] font-mono text-ink-subtle italic mb-1.5">
            {activePopover.concept.rootEtymology}
          </p>

          <p className="text-xs text-ink leading-relaxed mb-2">
            {activePopover.concept.conciseDefinition}
          </p>

          {activePopover.concept.advaitaContrast && (
            <div className="p-1.5 bg-surface rounded text-[11px] text-ink-muted leading-snug">
              <span className="font-semibold text-ink text-[10px] uppercase tracking-wider block mb-0.5">
                Trika vs. Advaita:
              </span>
              {activePopover.concept.advaitaContrast}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
