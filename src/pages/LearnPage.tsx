import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { graphService } from '../services/graphService';
import { LexiconText } from '../components/LexiconText';
import { CitationPill } from '../components/CitationPill';
import { CheckCircle2, Circle, Clock, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export const LearnPage: React.FC = () => {
  const { completedModules, markModuleComplete } = useApp();
  const modules = graphService.getAllModules();

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const currentModule = modules[activeModuleIndex] || modules[0];

  const isCompleted = completedModules.includes(currentModule.id);

  const handleNext = () => {
    markModuleComplete(currentModule.id);
    if (activeModuleIndex < modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 hairline-b pb-6 mb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
            Guided Curriculum
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
            Zero to Trika in 7 Modules
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            Linear, distraction-free reading path with verified Sanskrit citations and interactive hover lexicon.
          </p>
        </div>

        {/* Overall Progress Tracker */}
        <div className="flex items-center gap-3 p-2 bg-surface rounded hairline-border font-mono text-xs text-ink-muted">
          <span>Progress:</span>
          <div className="w-28 h-2 bg-paper rounded-full overflow-hidden hairline-border">
            <div
              className="h-full bg-vermilion transition-all duration-300"
              style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
            />
          </div>
          <span className="font-semibold text-ink">
            {completedModules.length} / {modules.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Module Navigation Sidebar */}
        <aside className="lg:col-span-1 space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle font-semibold block px-2">
            Modules
          </span>
          <div className="space-y-1">
            {modules.map((m, idx) => {
              const active = idx === activeModuleIndex;
              const done = completedModules.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveModuleIndex(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3 rounded hairline-border transition-all flex items-start gap-2.5 cursor-pointer ${
                    active
                      ? 'bg-surface font-semibold text-vermilion border-vermilion/50 shadow-xs'
                      : 'hover:bg-surface text-ink-muted hover:text-ink'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {done ? (
                      <CheckCircle2 size={15} className="text-emerald-700" />
                    ) : (
                      <Circle size={15} className="text-ink-subtle" />
                    )}
                  </span>
                  <div className="overflow-hidden">
                    <span className="font-mono text-[10px] uppercase text-ink-subtle block">
                      Module {m.moduleNumber}
                    </span>
                    <span className="text-xs line-clamp-2 leading-snug">
                      {m.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Lesson Content */}
        <main className="lg:col-span-3 space-y-8 bg-paper p-6 sm:p-8 rounded-lg hairline-border">
          {/* Module Header */}
          <div className="space-y-3 hairline-b pb-6">
            <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
              <span className="uppercase text-vermilion font-semibold">
                Module {currentModule.moduleNumber} of {modules.length}
              </span>
              <div className="flex items-center gap-1.5">
                <Clock size={13} />
                <span>{currentModule.readingTimeMinutes} min read</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight leading-tight">
              {currentModule.title}
            </h2>

            <p className="font-serif italic text-base text-ink-muted leading-relaxed">
              {currentModule.subtitle}
            </p>

            {/* Citations in this module */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-mono text-[11px] text-ink-subtle mr-1">Canonical Anchors:</span>
              {currentModule.canonicalCitations.map((cid) => (
                <CitationPill key={cid} id={cid} />
              ))}
            </div>
          </div>

          {/* Module Sections */}
          <div className="space-y-8">
            {currentModule.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-3.5">
                <h3 className="font-serif text-xl font-bold text-ink tracking-wide">
                  {section.heading}
                </h3>
                <div className="space-y-4 text-ink text-sm sm:text-base leading-relaxed">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>
                      <LexiconText text={p} />
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contemplative Exercise Card */}
          {currentModule.contemplativeExercise && (
            <div className="p-5 bg-surface/70 hairline-border rounded-lg space-y-2.5">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-vermilion" />
                <h4 className="font-serif font-bold text-base text-ink">
                  Contemplative Practice: {currentModule.contemplativeExercise.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-serif italic">
                "{currentModule.contemplativeExercise.instruction}"
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs font-mono text-ink-subtle">
                <span>Grounded in canonical verse:</span>
                <CitationPill id={currentModule.contemplativeExercise.groundedInVerse} />
              </div>
            </div>
          )}

          {/* Navigation & Completion Bar */}
          <div className="flex items-center justify-between pt-6 hairline-t">
            <button
              onClick={handlePrev}
              disabled={activeModuleIndex === 0}
              className="flex items-center gap-2 px-3 py-2 rounded hairline-border bg-surface hover:bg-surface-hover text-ink text-xs font-mono disabled:opacity-30 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </button>

            <button
              onClick={() => markModuleComplete(currentModule.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-mono cursor-pointer transition-colors ${
                isCompleted
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 hairline-border'
                  : 'bg-surface hover:bg-surface-hover text-ink hairline-border'
              }`}
            >
              <CheckCircle2 size={14} className={isCompleted ? 'text-emerald-600' : 'text-ink-subtle'} />
              <span>{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={activeModuleIndex === modules.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded bg-vermilion text-paper font-medium text-xs hover:bg-vermilion/90 disabled:opacity-30 cursor-pointer shadow-xs"
            >
              <span>Next Module</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
