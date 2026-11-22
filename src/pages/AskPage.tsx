import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { retrieveGroundedContext, queryGraphRAG, type RetrievalResult } from '../services/retrievalService';
import { CitationPill } from '../components/CitationPill';
import { LexiconText } from '../components/LexiconText';
import { MessageSquare, Send, Sparkles, Key, GitBranch, ShieldCheck, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';

export const AskPage: React.FC = () => {
  const { byokSettings, openByok, openInspector } = useApp();

  const starterQuestions = [
    'How does Kashmir Shaivism work with intense anger or desire?',
    'What is the fundamental difference between Prakāśa and Vimarśa?',
    'Which VBT dhāraṇās use the gap (Madhya) between breaths?',
    'Why are there 36 tattvas in Trika instead of 25 as in Sāṅkhya?',
    'What is the meaning of Udyamo Bhairavaḥ in Śiva Sūtra 1.5?',
  ];

  const [inputQuery, setInputQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [retrievalResult, setRetrievalResult] = useState<RetrievalResult | null>(null);
  const [synthesisText, setSynthesisText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearchAndAsk = async (queryToRun: string) => {
    const q = queryToRun.trim();
    if (!q) return;

    setActiveQuery(q);
    setInputQuery(q);
    setIsLoading(true);
    setErrorMessage(null);
    setSynthesisText('');

    // Step 1: Run deterministic client-side hybrid graph retrieval FIRST
    const retrieval = retrieveGroundedContext(q);
    setRetrievalResult(retrieval);

    // Step 2: If API key is present, call LLM for synthesis; else gracefully show deterministic results
    if (byokSettings.apiKey) {
      const response = await queryGraphRAG(q, retrieval, byokSettings);
      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setSynthesisText(response.text);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
            Grounded GraphRAG Inference
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
            Grounded Q&A: Ask the Trika Graph
          </h1>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Deterministic-first retrieval. Before any LLM is queried, the exact canonical verses, *tattvas*, and glossary definitions are retrieved and traced with 100% transparent provenance.
          </p>
        </div>

        {/* BYOK Status / Settings Trigger */}
        <button
          onClick={openByok}
          className="flex items-center gap-2 px-3 py-1.5 rounded hairline-border bg-surface hover:bg-surface-hover text-xs font-mono text-ink cursor-pointer transition-colors shadow-xs"
        >
          <Key size={13} className={byokSettings.apiKey ? 'text-emerald-600' : 'text-amber-600'} />
          <span>
            BYOK Key: {byokSettings.apiKey ? `${byokSettings.provider} (Active)` : 'Not Configured'}
          </span>
        </button>
      </div>

      {/* Query Input Bar & Starters */}
      <div className="space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchAndAsk(inputQuery);
          }}
          className="flex items-center gap-2 p-2 bg-paper rounded-lg hairline-border shadow-xs focus-within:border-vermilion"
        >
          <MessageSquare size={18} className="text-ink-subtle ml-2" />
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a philosophical or sādhana question (e.g. 'How does Spanda operate in daily life?')..."
            className="flex-1 px-2 py-1.5 bg-transparent border-none outline-none text-xs sm:text-sm text-ink placeholder:text-ink-subtle"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="px-4 py-2 bg-vermilion text-paper rounded font-medium text-xs hover:bg-vermilion/90 disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            {isLoading ? <RefreshCw size={13} className="animate-spin" /> : <Send size={13} />}
            <span className="hidden sm:inline">Ask Graph</span>
          </button>
        </form>

        {/* Starter Question Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-mono text-[10px] text-ink-subtle uppercase mr-1">Starters:</span>
          {starterQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSearchAndAsk(sq)}
              className="px-2.5 py-1 rounded-full bg-surface hairline-border hover:bg-surface-hover text-ink-muted hover:text-ink text-[11px] font-sans cursor-pointer transition-colors"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Synthesis Response (lg:col-span-7) */}
        <section className="lg:col-span-7 space-y-6">
          {!retrievalResult && !isLoading ? (
            <div className="p-12 text-center text-ink-muted text-xs bg-surface/50 rounded-lg hairline-border space-y-3">
              <Sparkles size={24} className="mx-auto text-ink-subtle" />
              <p className="font-serif text-base text-ink">
                Ask any question above or choose a starter to begin.
              </p>
              <p className="max-w-md mx-auto text-ink-subtle leading-relaxed">
                The engine will first deterministically pull relevant verses from <em>Pratyabhijñāhṛdayam</em>, <em>Śiva Sūtras</em>, <em>Spanda Kārikās</em>, and <em>Vijñāna Bhairava Tantra</em> into the live trace panel.
              </p>
            </div>
          ) : (
            <div className="bg-paper p-6 sm:p-8 rounded-lg hairline-border space-y-6">
              {/* Question Banner */}
              <div className="hairline-b pb-4 space-y-1">
                <span className="font-mono text-[10px] uppercase text-vermilion font-semibold">
                  Active Query
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                  "{activeQuery}"
                </h3>
              </div>

              {/* Offline / No API Key Notice */}
              {!byokSettings.apiKey && (
                <div className="p-4 bg-surface rounded hairline-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-ink flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-700" />
                      Deterministic Graph Matches (Offline Mode)
                    </span>
                    <button
                      onClick={openByok}
                      className="text-xs font-mono text-vermilion hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Enable BYOK Synthesis</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    You are in 100% deterministic offline mode. Relevant canonical verses and ontology terms are displayed below and in the Live Retrieval Trace panel. To generate a synthesized natural language answer, optionally add your Groq or OpenRouter key.
                  </p>
                </div>
              )}

              {/* Error Message if any */}
              {errorMessage && (
                <div className="p-4 bg-rose-50 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200 hairline-border rounded text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold font-mono">
                    <AlertCircle size={14} />
                    <span>Inference Notice</span>
                  </div>
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="p-8 text-center text-xs text-ink-muted font-mono flex items-center justify-center gap-2">
                  <RefreshCw size={14} className="animate-spin text-vermilion" />
                  <span>Synthesizing lineage-accurate response...</span>
                </div>
              )}

              {/* Synthesized Response */}
              {synthesisText && (
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-vermilion uppercase font-semibold">
                    <Sparkles size={13} />
                    <span>Synthesized Response with Verified [ID] Citations</span>
                  </div>
                  <div className="text-sm sm:text-base text-ink leading-relaxed font-serif space-y-3 prose dark:prose-invert max-w-none">
                    <LexiconText text={synthesisText} />
                  </div>
                </div>
              )}

              {/* Matching Canonical Verses Cards (Always visible deterministically) */}
              {retrievalResult && (
                <div className="pt-6 hairline-t space-y-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-ink-subtle font-semibold block">
                    Grounded Canonical Verses ({retrievalResult.retrievedVerses.length})
                  </span>

                  <div className="space-y-3">
                    {retrievalResult.retrievedVerses.map((verse) => (
                      <div
                        key={verse.id}
                        onClick={() => openInspector(verse.id)}
                        className="p-4 bg-surface rounded hairline-border cursor-pointer hover:border-vermilion/40 transition-all space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <CitationPill id={verse.id} />
                          <span className="text-[10px] font-mono text-ink-subtle group-hover:text-vermilion">
                            Click to inspect verbatim
                          </span>
                        </div>
                        <div className="font-sanskrit text-sm font-medium text-ink">
                          {verse.devanagari}
                        </div>
                        <div className="font-serif text-xs text-ink-muted line-clamp-2">
                          {verse.studyGloss}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Right Column: Live Retrieval Trace Panel (lg:col-span-5) */}
        <aside className="lg:col-span-5 bg-paper hairline-border rounded-lg p-5 sm:p-6 space-y-5 sticky top-20 shadow-xs">
          <div className="flex items-center justify-between hairline-b pb-3">
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-vermilion" />
              <h3 className="font-serif font-bold text-base text-ink">
                Live Retrieval Trace Panel
              </h3>
            </div>
            {retrievalResult && (
              <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded hairline-border">
                {retrievalResult.executionTimeMs} ms
              </span>
            )}
          </div>

          {!retrievalResult ? (
            <p className="text-xs text-ink-muted italic leading-relaxed">
              When a query is executed, this panel displays the raw nodes, IDs, and edges retrieved by the client-side hybrid search before being injected into the prompt context.
            </p>
          ) : (
            <div className="space-y-5 text-xs">
              {/* Retrieved Node IDs Pill Cloud */}
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                  Context Window Nodes ({retrievalResult.retrievedNodeIds.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {retrievalResult.retrievedNodeIds.map((id) => (
                    <CitationPill key={id} id={id} />
                  ))}
                </div>
              </div>

              {/* Retrieved Lexicon Concepts */}
              {retrievalResult.retrievedConcepts.length > 0 && (
                <div className="space-y-2 pt-2 hairline-t">
                  <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                    Ontology Concepts Injected ({retrievalResult.retrievedConcepts.length})
                  </span>
                  <div className="space-y-1.5">
                    {retrievalResult.retrievedConcepts.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => openInspector(c.id)}
                        className="p-2 bg-surface rounded hairline-border cursor-pointer hover:bg-surface-hover"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="font-serif font-semibold text-ink">{c.termIast}</span>
                          <span className="font-sanskrit text-xs text-ink-muted">{c.termDevanagari}</span>
                        </div>
                        <p className="text-[11px] text-ink-muted line-clamp-1 mt-0.5">{c.conciseDefinition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Retrieved Tattvas */}
              {retrievalResult.retrievedTattvas.length > 0 && (
                <div className="space-y-2 pt-2 hairline-t">
                  <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                    Tattva Nodes Injected ({retrievalResult.retrievedTattvas.length})
                  </span>
                  <div className="space-y-1.5">
                    {retrievalResult.retrievedTattvas.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => openInspector(t.id)}
                        className="p-2 bg-surface rounded hairline-border cursor-pointer hover:bg-surface-hover"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="font-serif font-semibold text-ink">#{t.number} {t.nameIast}</span>
                          <span className="font-mono text-[10px] text-slate-trika uppercase">{t.order}</span>
                        </div>
                        <p className="text-[11px] text-ink-muted line-clamp-1 mt-0.5">{t.functionDescription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Provenance Guarantee Notice */}
              <div className="p-3 bg-surface/50 rounded hairline-border text-[11px] text-ink-subtle space-y-1">
                <span className="font-mono font-semibold text-ink block">Deterministic Guarantee:</span>
                <p>
                  Zero hallucinations permitted. The model context is locked strictly to these canonical records. Any cited [ID] in the synthesis links directly to verified critical editions.
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
