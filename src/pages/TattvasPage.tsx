import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { graphService } from '../services/graphService';
import { CitationPill } from '../components/CitationPill';
import { ArrowDown, ArrowUp, ChevronRight } from 'lucide-react';
import type { TattvaNode } from '../types/graph';

export const TattvasPage: React.FC = () => {
  const { openInspector } = useApp();
  const [direction, setDirection] = useState<'descent' | 'ascent'>('descent');
  const [selectedTattvaId, setSelectedTattvaId] = useState<string>('TATTVA.01');

  const allTattvas = graphService.getAllTattvas();
  const selectedTattva = graphService.getNode(selectedTattvaId) as TattvaNode | undefined;

  // Filter groups
  const suddha = allTattvas.filter((t) => t.order === 'suddha');
  const suddhasuddha = allTattvas.filter((t) => t.order === 'suddhasuddha');
  const asuddha = allTattvas.filter((t) => t.order === 'asuddha');

  // Groups ordered by direction
  const displayGroups =
    direction === 'descent'
      ? [
          { name: '1. Śuddha Tattvas (1–5) — Pure Divine Reality', items: suddha, desc: 'Consciousness experiencing undivided identity (Aham and Idam in harmony)' },
          { name: '2. Śuddhāśuddha Tattvas (6–12) — The Mixed Veil & Kañcukas', items: suddhasuddha, desc: 'Māyā and the 5 Cloaks contracting the infinite Lord into the Puruṣa' },
          { name: '3. Aśuddha Tattvas (13–36) — The Impure / Material Order', items: asuddha, desc: 'Prakṛti, the psychological inner instrument, sensory organs, subtle essences, and gross elements' },
        ]
      : [
          { name: '3. Aśuddha Tattvas (36–13) — Transcending the Material', items: [...asuddha].reverse(), desc: 'Retracing the steps from solid Earth back to the inner instrument' },
          { name: '2. Śuddhāśuddha Tattvas (12–6) — Piercing the Kañcukas', items: [...suddhasuddha].reverse(), desc: 'Dismantling the 5 cloaks of limited time, agency, and craving' },
          { name: '1. Śuddha Tattvas (5–1) — Recognition of Śiva', items: [...suddha].reverse(), desc: 'Awakening to uncontracted, sovereign Consciousness (Śiva-Śakti)' },
        ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 hairline-b pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-trika font-semibold">
              Cosmological Architecture
            </span>
            <span className="text-xs px-2 py-0.5 rounded hairline-border bg-surface text-ink-subtle font-mono">
              36 Tattvas (Complete 1..36)
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
            The 36-Tattva Architecture Map
          </h1>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl">
            Stratified 2D architectural diagram mapping the journey of Contraction (Descent: 1 → 36) and Recognition (Ascent: 36 → 1).
          </p>
        </div>

        {/* Descent / Ascent Direction Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-surface rounded hairline-border text-xs font-mono">
          <button
            onClick={() => setDirection('descent')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded cursor-pointer transition-colors ${
              direction === 'descent'
                ? 'bg-paper text-vermilion font-semibold shadow-xs hairline-border'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <ArrowDown size={14} />
            <span>Descent (1 → 36)</span>
          </button>
          <button
            onClick={() => setDirection('ascent')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded cursor-pointer transition-colors ${
              direction === 'ascent'
                ? 'bg-paper text-slate-trika font-semibold shadow-xs hairline-border'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <ArrowUp size={14} />
            <span>Ascent (36 → 1)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: SVG Diagram Left + Inspector Drawer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 2D Stratified Architecture SVG & Flow Diagram (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {displayGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-3">
              <div className="hairline-b pb-1.5">
                <h3 className="font-serif font-bold text-sm tracking-wide text-ink">
                  {group.name}
                </h3>
                <p className="text-[11px] text-ink-muted font-sans mt-0.5">
                  {group.desc}
                </p>
              </div>

              {/* Tattvas Stratum Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.items.map((t) => {
                  const isSelected = t.id === selectedTattvaId;
                  const tierColor =
                    t.order === 'suddha'
                      ? 'border-vermilion/40 bg-vermilion-subtle/30 text-ink'
                      : t.order === 'suddhasuddha'
                      ? 'border-slate-trika/40 bg-slate-subtle/30 text-ink'
                      : 'border-border bg-surface text-ink';

                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTattvaId(t.id)}
                      className={`p-3 rounded hairline-border cursor-pointer transition-all flex items-center justify-between group ${tierColor} ${
                        isSelected ? 'ring-1 ring-vermilion shadow-xs font-semibold' : 'hover:border-ink/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className="font-mono text-xs font-bold text-ink-subtle w-6 text-right shrink-0">
                          {t.number}.
                        </span>
                        <div className="truncate">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-serif text-sm font-semibold truncate group-hover:text-vermilion transition-colors">
                              {t.nameIast}
                            </span>
                            <span className="font-sanskrit text-xs text-ink-muted hidden sm:inline">
                              {t.nameDevanagari}
                            </span>
                          </div>
                          <span className="text-[10px] text-ink-muted truncate block">
                            {t.englishName}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform ${
                          isSelected ? 'text-vermilion translate-x-0.5' : 'text-ink-subtle opacity-50'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Deterministic Tattva Inspector Drawer (lg:col-span-5) */}
        <aside className="lg:col-span-5 sticky top-20 bg-paper hairline-border rounded-lg p-5 sm:p-6 space-y-5 shadow-xs">
          {selectedTattva ? (
            <div className="space-y-4">
              <div className="flex items-baseline justify-between hairline-b pb-3">
                <div>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded hairline-border bg-surface text-slate-trika uppercase">
                    Tattva #{selectedTattva.number} • {selectedTattva.order}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-ink mt-1.5">
                    {selectedTattva.nameIast}
                  </h2>
                  <span className="font-sanskrit text-lg text-ink-muted">
                    {selectedTattva.nameDevanagari}
                  </span>
                </div>
                <button
                  onClick={() => openInspector(selectedTattva.id)}
                  className="text-xs font-mono text-vermilion hover:underline cursor-pointer"
                >
                  Full Modal
                </button>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                  English Designation
                </span>
                <p className="font-serif text-base font-semibold text-ink">
                  {selectedTattva.englishName}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                  Function & Epistemic Role
                </span>
                <p className="text-xs text-ink leading-relaxed">
                  {selectedTattva.functionDescription}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                  Cosmic Architecture Role
                </span>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {selectedTattva.cosmicRole}
                </p>
              </div>

              {selectedTattva.malaOrKancuka && (
                <div className="p-3 bg-vermilion-subtle/40 hairline-border border-vermilion/30 rounded text-xs space-y-0.5">
                  <span className="font-mono font-semibold text-vermilion uppercase text-[10px] block">
                    Associated Mala or Kañcuka
                  </span>
                  <p className="text-ink">{selectedTattva.malaOrKancuka}</p>
                </div>
              )}

              {/* Mapped Verses in Corpus */}
              <div className="pt-2 hairline-t">
                <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block mb-2">
                  Mapped Canonical Verses ({selectedTattva.mappedVerses?.length || 0})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTattva.mappedVerses && selectedTattva.mappedVerses.length > 0 ? (
                    selectedTattva.mappedVerses.map((vid) => (
                      <CitationPill key={vid} id={vid} />
                    ))
                  ) : (
                    <span className="text-xs text-ink-muted italic">Direct ontological principle.</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-ink-muted text-xs">
              Select a Tattva on the left to inspect its architectural properties.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
