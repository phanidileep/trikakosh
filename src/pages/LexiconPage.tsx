import React, { useState, useMemo } from 'react';
import { graphService } from '../services/graphService';
import { CitationPill } from '../components/CitationPill';
import { Search } from 'lucide-react';

export const LexiconPage: React.FC = () => {
  const allConcepts = graphService.getAllLexicon();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', 'Metaphysics', 'Epistemology', 'Sādhana', 'Psychology', 'Linguistic'];

  const filteredConcepts = useMemo(() => {
    return allConcepts.filter((c) => {
      if (categoryFilter !== 'all' && c.category !== categoryFilter) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.termIast.toLowerCase().includes(q) ||
        c.termDevanagari.includes(q) ||
        c.rootEtymology.toLowerCase().includes(q) ||
        c.conciseDefinition.toLowerCase().includes(q) ||
        (c.advaitaContrast && c.advaitaContrast.toLowerCase().includes(q))
      );
    });
  }, [allConcepts, categoryFilter, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
            Glossary & Technical Ontology
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
            Core Trika Lexicon
          </h1>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Curated dictionary of 92 technical Sanskrit terms in Kashmir Shaivism, complete with root etymologies, precision definitions, and explicit contrasts with Classical Advaita Vedānta.
          </p>
        </div>

        <span className="font-mono text-xs text-ink-subtle bg-surface px-3 py-1.5 rounded hairline-border">
          {filteredConcepts.length} Term(s)
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-surface/50 rounded-lg hairline-border">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded hairline-border font-mono text-xs cursor-pointer capitalize transition-colors ${
                categoryFilter === cat
                  ? 'bg-vermilion text-paper font-semibold border-vermilion'
                  : 'bg-paper text-ink-muted hover:text-ink'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3 top-3 text-ink-subtle" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search term, root, or definition..."
            className="w-full pl-9 pr-3 py-2 bg-paper hairline-border rounded font-mono text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-vermilion"
          />
        </div>
      </div>

      {/* Concepts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredConcepts.map((c) => (
          <article
            key={c.id}
            className="p-5 bg-paper rounded-lg hairline-border space-y-3.5 hover:border-vermilion/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-baseline justify-between hairline-b pb-2">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-serif text-xl font-bold text-ink">
                    {c.termIast}
                  </h3>
                  <span className="font-sanskrit text-base text-ink-muted">
                    {c.termDevanagari}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 bg-surface text-ink-subtle rounded hairline-border">
                  {c.category}
                </span>
              </div>

              <div className="text-[11px] font-mono text-ink-subtle italic">
                {c.rootEtymology}
              </div>

              <p className="text-xs text-ink leading-relaxed">
                {c.conciseDefinition}
              </p>

              {c.advaitaContrast && (
                <div className="p-2.5 bg-surface/60 rounded hairline-border text-[11px] space-y-0.5">
                  <span className="font-mono font-semibold uppercase text-vermilion block text-[9px]">
                    Contrast with Classical Advaita:
                  </span>
                  <p className="text-ink-muted leading-relaxed">{c.advaitaContrast}</p>
                </div>
              )}
            </div>

            {/* Linked Verses */}
            {c.linkedVerses && c.linkedVerses.length > 0 && (
              <div className="pt-2 hairline-t flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[10px] text-ink-subtle mr-1">Verses:</span>
                {c.linkedVerses.map((vid) => (
                  <CitationPill key={vid} id={vid} />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
