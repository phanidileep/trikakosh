import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { graphService } from '../services/graphService';
import { CitationPill } from '../components/CitationPill';
import { LexiconText } from '../components/LexiconText';
import { Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export const TextsPage: React.FC = () => {
  const { currentPath, navigateTo, openInspector } = useApp();

  // Extract textId from path if route is /texts/:textId
  const pathParts = currentPath.split('/');
  const routeTextId = pathParts[2] || 'PH';

  const [activeTextId, setActiveTextId] = useState<string>(routeTextId);
  const [filterQuery, setFilterQuery] = useState('');
  const [expandedPadacchedaId, setExpandedPadacchedaId] = useState<string | null>(null);

  const texts = graphService.getAllTexts();
  const currentText = graphService.getText(activeTextId) || texts[0];
  const verses = graphService.getVersesForText(currentText.id);

  // Subdivisions in this text
  const subdivisions = useMemo(() => {
    const set = new Set<string>();
    verses.forEach((v) => {
      if (v.subDivision) set.add(v.subDivision);
    });
    return Array.from(set);
  }, [verses]);

  const [selectedSubdivision, setSelectedSubdivision] = useState<string>('all');

  // Filtered verses
  const filteredVerses = useMemo(() => {
    return verses.filter((v) => {
      const matchSub = selectedSubdivision === 'all' || v.subDivision === selectedSubdivision;
      if (!matchSub) return false;

      if (!filterQuery.trim()) return true;
      const q = filterQuery.toLowerCase();
      return (
        v.id.toLowerCase().includes(q) ||
        v.devanagari.includes(q) ||
        v.iast.toLowerCase().includes(q) ||
        v.studyGloss.toLowerCase().includes(q) ||
        v.practicalContext.toLowerCase().includes(q)
      );
    });
  }, [verses, selectedSubdivision, filterQuery]);

  const handleSelectText = (id: string) => {
    setActiveTextId(id);
    setSelectedSubdivision('all');
    setFilterQuery('');
    setExpandedPadacchedaId(null);
    navigateTo(`/texts/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Page Title & Text Tabs */}
      <div className="space-y-4 hairline-b pb-6">
        <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
          Canonical Corpus Reader
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
          The 4-Text Initiation Corpus
        </h1>
        <p className="text-xs text-ink-muted max-w-2xl leading-relaxed">
          Explore verbatim Sanskrit verses, original literal study glosses, padaccheda breakdowns, and verified provenance hashes directly from public-domain critical editions.
        </p>

        {/* Text Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          {texts.map((t) => {
            const isActive = t.id === currentText.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectText(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded hairline-border font-serif text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-surface font-semibold text-vermilion border-vermilion shadow-xs'
                    : 'bg-paper text-ink-muted hover:text-ink hover:bg-surface'
                }`}
              >
                <span>Stage {t.stage}: {t.titleIast}</span>
                <span className="font-mono text-[10px] text-ink-subtle">
                  ({t.verseCount})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Text Summary Banner */}
      <div className="p-5 bg-surface/60 rounded-lg hairline-border space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-2xl font-bold text-ink">
              {currentText.titleIast}
            </h2>
            <span className="font-sanskrit text-lg text-ink-muted">
              {currentText.titleDevanagari}
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-ink-subtle">
            <span>Author: {currentText.authorIast}</span>
            <span>•</span>
            <span>{currentText.century}</span>
          </div>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed font-sans">
          {currentText.description}
        </p>
      </div>

      {/* Search & Subdivision Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-3 text-ink-subtle" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={`Filter ${currentText.titleIast} verses or keywords...`}
            className="w-full pl-9 pr-3 py-2 bg-surface hairline-border rounded text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-vermilion"
          />
        </div>

        {subdivisions.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            <span className="text-ink-subtle text-[11px] mr-1">Section:</span>
            <button
              onClick={() => setSelectedSubdivision('all')}
              className={`px-2.5 py-1 rounded hairline-border cursor-pointer ${
                selectedSubdivision === 'all'
                  ? 'bg-vermilion-subtle text-vermilion border-vermilion font-semibold'
                  : 'bg-surface text-ink-muted hover:bg-surface-hover'
              }`}
            >
              All ({verses.length})
            </button>
            {subdivisions.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubdivision(sub)}
                className={`px-2.5 py-1 rounded hairline-border whitespace-nowrap cursor-pointer ${
                  selectedSubdivision === sub
                    ? 'bg-vermilion-subtle text-vermilion border-vermilion font-semibold'
                    : 'bg-surface text-ink-muted hover:bg-surface-hover'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Verses Cards List */}
      <div className="space-y-4">
        {filteredVerses.length === 0 ? (
          <div className="p-12 text-center text-ink-muted text-xs hairline-border rounded-lg bg-surface">
            No verses match your filter criteria.
          </div>
        ) : (
          filteredVerses.map((verse) => {
            const isPadExpanded = expandedPadacchedaId === verse.id;
            return (
              <article
                key={verse.id}
                className="p-5 sm:p-6 bg-paper rounded-lg hairline-border space-y-4 hover:border-border-subtle transition-all"
              >
                {/* Verse Header Badge Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CitationPill id={verse.id} />
                    {verse.subDivision && (
                      <span className="font-mono text-[10px] text-ink-subtle uppercase">
                        {verse.subDivision}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => openInspector(verse.id)}
                    className="text-xs font-mono text-vermilion hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ExternalLink size={12} />
                  </button>
                </div>

                {/* Verbatim Sanskrit Box */}
                <div className="p-4 bg-surface/70 rounded hairline-border space-y-2">
                  <div className="sanskrit-text text-lg sm:text-xl font-sanskrit text-ink font-medium leading-relaxed">
                    {verse.devanagari}
                  </div>
                  <div className="font-serif italic text-xs sm:text-sm text-ink-muted">
                    {verse.iast}
                  </div>
                </div>

                {/* Literal Study Gloss */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-subtle font-semibold block">
                    Literal Study Gloss
                  </span>
                  <div className="font-serif text-sm sm:text-base text-ink leading-relaxed">
                    <LexiconText text={verse.studyGloss} />
                  </div>
                </div>

                {/* Practical & Lineage Context */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-subtle font-semibold block">
                    Context & Application
                  </span>
                  <div className="text-xs text-ink-muted leading-relaxed font-sans">
                    <LexiconText text={verse.practicalContext} />
                  </div>
                </div>

                {/* Padaccheda Word Breakdown Accordion */}
                {verse.padaccheda && verse.padaccheda.length > 0 && (
                  <div className="hairline-border rounded overflow-hidden bg-surface/30 text-xs">
                    <button
                      onClick={() => setExpandedPadacchedaId(isPadExpanded ? null : verse.id)}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-ink-subtle hover:bg-surface-hover cursor-pointer"
                    >
                      <span>Word-by-word Breakdown ({verse.padaccheda.length} words)</span>
                      {isPadExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                    {isPadExpanded && (
                      <div className="overflow-x-auto hairline-t">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-surface text-ink-subtle text-[10px] font-mono hairline-b">
                            <tr>
                              <th className="px-3 py-1">Devanagari</th>
                              <th className="px-3 py-1">IAST</th>
                              <th className="px-3 py-1">Grammar</th>
                              <th className="px-3 py-1">Literal Meaning</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {verse.padaccheda.map((p, idx) => (
                              <tr key={idx} className="hover:bg-surface/50">
                                <td className="px-3 py-1.5 font-sanskrit text-ink">{p.wordDevanagari}</td>
                                <td className="px-3 py-1.5 font-serif italic text-ink">{p.wordIast}</td>
                                <td className="px-3 py-1.5 font-mono text-[10px] text-ink-subtle">{p.grammaticalRole}</td>
                                <td className="px-3 py-1.5 text-ink-muted">{p.literalMeaning}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Graph Connections Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 hairline-t text-xs">
                  <span className="font-mono text-[10px] uppercase text-ink-subtle mr-1">Graph Nodes:</span>
                  {verse.mappedTattvas?.map((t) => <CitationPill key={t} id={t} />)}
                  {verse.usesUpayas?.map((u) => <CitationPill key={u} id={u} />)}
                  {verse.explainsConcepts?.map((c) => <CitationPill key={c} id={c} />)}
                  {verse.relatedVerses?.map((r) => <CitationPill key={r} id={r} />)}
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
