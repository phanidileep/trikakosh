import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { graphService } from '../services/graphService';
import { CitationPill } from '../components/CitationPill';
import { LexiconText } from '../components/LexiconText';
import { Compass, Search, Maximize2, Minimize2, ArrowRight } from 'lucide-react';
import type { DharanaDoorway } from '../types/graph';

export const SadhanaPage: React.FC = () => {
  const { openInspector } = useApp();
  const allDharanas = graphService.getAllDharanas();

  // Filters
  const [selectedUpaya, setSelectedUpaya] = useState<string>('all');
  const [selectedDoorway, setSelectedDoorway] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Contemplation Single-Card Reading Mode
  const [readingModeDharanaId, setReadingModeDharanaId] = useState<string | null>(null);

  const doorways: { id: DharanaDoorway | 'all'; label: string }[] = [
    { id: 'all', label: 'All Doorways' },
    { id: 'breath', label: 'Breath (Prāṇa)' },
    { id: 'gap', label: 'Everyday Gaps (Madhya)' },
    { id: 'sound', label: 'Sound (Nāda)' },
    { id: 'emotion', label: 'Emotion & Intensity' },
    { id: 'gaze', label: 'Gaze & Light' },
    { id: 'space', label: 'Space / Void (Vyoma)' },
    { id: 'body', label: 'Body & Sensation' },
  ];

  const upayas = [
    { id: 'all', label: 'All Upāyas' },
    { id: 'UPAYA.SAMBHAVA', label: 'Śāmbhavopāya (Thought-free)' },
    { id: 'UPAYA.SAKTA', label: 'Śāktopāya (Cognitive)' },
    { id: 'UPAYA.ANAVA', label: 'Āṇavopāya (Sensory / Body)' },
  ];

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Direct Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Subtle / Advanced' },
  ];

  const filteredDharanas = useMemo(() => {
    return allDharanas.filter((d) => {
      if (selectedUpaya !== 'all' && d.upayaId !== selectedUpaya) return false;
      if (selectedDoorway !== 'all' && d.doorway !== selectedDoorway) return false;
      if (selectedLevel !== 'all' && d.level !== selectedLevel) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        d.id.toLowerCase().includes(q) ||
        d.verseId.toLowerCase().includes(q) ||
        d.instructionsSummary.toLowerCase().includes(q) ||
        d.contemplativeFocalPoint.toLowerCase().includes(q) ||
        d.whyItWorksGraphProof.rationale.toLowerCase().includes(q)
      );
    });
  }, [allDharanas, selectedUpaya, selectedDoorway, selectedLevel, searchQuery]);

  const activeReadingDharana = readingModeDharanaId
    ? allDharanas.find((d) => d.id === readingModeDharanaId) || null
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
            Experiential Laboratory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
            Bhairava Sādhana Matrix
          </h1>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl">
            Interactive multi-facet explorer over the 112 Dhāraṇās of the <em>Vijñāna Bhairava Tantra</em>, cross-linked to verified theoretical proofs in the <em>Śiva Sūtras</em>, <em>Spanda Kārikās</em>, and <em>Pratyabhijñāhṛdayam</em>.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-ink-subtle bg-surface px-3 py-1.5 rounded hairline-border">
          <Compass size={14} className="text-vermilion" />
          <span>Showing {filteredDharanas.length} of 112 Dhāraṇās</span>
        </div>
      </div>

      {/* Multi-facet Filter Controls */}
      <div className="p-5 bg-surface/70 rounded-lg hairline-border space-y-4 text-xs">
        {/* Doorway Filter Pills */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
            Sensory / Experiential Doorway
          </span>
          <div className="flex flex-wrap gap-1.5">
            {doorways.map((dw) => (
              <button
                key={dw.id}
                onClick={() => setSelectedDoorway(dw.id)}
                className={`px-2.5 py-1 rounded hairline-border font-mono cursor-pointer transition-colors ${
                  selectedDoorway === dw.id
                    ? 'bg-vermilion text-paper font-semibold border-vermilion'
                    : 'bg-paper text-ink-muted hover:text-ink hover:bg-surface-hover'
                }`}
              >
                {dw.label}
              </button>
            ))}
          </div>
        </div>

        {/* Upaya & Level Filters + Search */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 hairline-t">
          {/* Upāya Selector */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase text-ink-subtle block font-semibold">
              Upāya Method Level
            </span>
            <select
              value={selectedUpaya}
              onChange={(e) => setSelectedUpaya(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-paper hairline-border rounded font-mono text-xs text-ink focus:outline-none focus:border-vermilion"
            >
              {upayas.map((u) => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
          </div>

          {/* Level Selector */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase text-ink-subtle block font-semibold">
              Difficulty / Entry Level
            </span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-paper hairline-border rounded font-mono text-xs text-ink focus:outline-none focus:border-vermilion"
            >
              {levels.map((l) => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase text-ink-subtle block font-semibold">
              Filter Text
            </span>
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-2.5 text-ink-subtle" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search instructions..."
                className="w-full pl-8 pr-2.5 py-1.5 bg-paper hairline-border rounded font-mono text-xs text-ink focus:outline-none focus:border-vermilion"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contemplation Reading View Modal (Distraction-Free) */}
      {activeReadingDharana && (
        <div
          onClick={() => setReadingModeDharanaId(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-ink/60 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-paper hairline-border rounded-lg p-6 sm:p-10 space-y-6 shadow-2xl relative"
          >
            <button
              onClick={() => setReadingModeDharanaId(null)}
              className="absolute top-4 right-4 p-1 rounded text-ink-muted hover:text-ink hairline-border"
              title="Close Reading View (Esc)"
            >
              <Minimize2 size={16} />
            </button>

            <div className="text-center space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
                Contemplation Reading View • {activeReadingDharana.doorway} doorway
              </span>
              <h2 className="font-serif text-3xl font-bold text-ink">
                Dhāraṇā #{activeReadingDharana.number}
              </h2>
              <div className="flex justify-center gap-2">
                <CitationPill id={activeReadingDharana.verseId} />
                <CitationPill id={activeReadingDharana.upayaId} />
              </div>
            </div>

            <div className="p-6 bg-surface/50 rounded-lg hairline-border text-center">
              <p className="font-serif text-lg sm:text-xl text-ink leading-relaxed italic">
                "{activeReadingDharana.instructionsSummary}"
              </p>
            </div>

            <div className="p-4 bg-slate-subtle/40 rounded hairline-border text-xs space-y-1.5">
              <span className="font-mono font-semibold uppercase text-slate-trika block text-[10px]">
                Why This Works (Deterministic Theoretical Proof)
              </span>
              <p className="text-ink-muted leading-relaxed">
                {activeReadingDharana.whyItWorksGraphProof.rationale}
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-[11px]">
                <span>Demonstrated in:</span>
                <CitationPill id={activeReadingDharana.whyItWorksGraphProof.targetVerseId} />
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  const targetId = activeReadingDharana.verseId;
                  setReadingModeDharanaId(null);
                  openInspector(targetId);
                }}
                className="px-4 py-2 bg-vermilion text-paper rounded text-xs font-mono font-medium hover:bg-vermilion/90 cursor-pointer shadow-xs"
              >
                Inspect Verbatim Sanskrit Verse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dhāraṇā Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDharanas.map((d) => (
          <div
            key={d.id}
            className="p-5 bg-paper rounded-lg hairline-border space-y-4 hover:border-vermilion/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base text-ink">
                    Dhāraṇā #{d.number}
                  </span>
                  <CitationPill id={d.verseId} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 bg-vermilion-subtle text-vermilion rounded hairline-border">
                    {d.doorway}
                  </span>
                  <button
                    onClick={() => setReadingModeDharanaId(d.id)}
                    className="p-1 rounded text-ink-subtle hover:text-ink hover:bg-surface"
                    title="Open in quiet contemplation reading view"
                  >
                    <Maximize2 size={13} />
                  </button>
                </div>
              </div>

              {/* Instructions Summary */}
              <div className="font-serif text-sm text-ink leading-relaxed">
                <LexiconText text={d.instructionsSummary} />
              </div>
            </div>

            {/* Why This Works (Graph Proof) */}
            <div className="pt-3 hairline-t space-y-2">
              <div className="p-2.5 bg-slate-subtle/30 rounded hairline-border text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-semibold text-slate-trika">
                    Why This Works (Graph Proof)
                  </span>
                  <CitationPill id={d.whyItWorksGraphProof.targetVerseId} />
                </div>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  {d.whyItWorksGraphProof.rationale}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <CitationPill id={d.upayaId} />
                <button
                  onClick={() => openInspector(d.verseId)}
                  className="font-mono text-[11px] text-vermilion hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Sanskrit Inspector</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
