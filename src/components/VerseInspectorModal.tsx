import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { graphService } from '../services/graphService';
import { CitationPill } from './CitationPill';
import { LexiconText } from './LexiconText';
import { X, ChevronDown, ChevronUp, ShieldCheck, GitBranch } from 'lucide-react';
import type { VerseNode, TattvaNode, ConceptNode, MasterNode, DharanaNode } from '../types/graph';

export const VerseInspectorModal: React.FC = () => {
  const { inspectorNodeId, closeInspector } = useApp();
  const [showPadaccheda, setShowPadaccheda] = useState(true);
  const [showDevanagari, setShowDevanagari] = useState(true);
  const [showIast, setShowIast] = useState(true);

  if (!inspectorNodeId) return null;

  const node = graphService.getNode(inspectorNodeId);
  const neighbors = graphService.getNeighbors(inspectorNodeId);

  return (
    <div
      onClick={closeInspector}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-paper hairline-border shadow-2xl rounded-lg overflow-hidden text-ink"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 hairline-b bg-surface/60">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded hairline-border bg-vermilion-subtle text-vermilion">
              {inspectorNodeId}
            </span>
            <span className="text-xs uppercase font-mono tracking-wider text-ink-muted">
              {node?.kind || 'Node Inspector'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={closeInspector}
              className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {!node ? (
            <div className="p-8 text-center text-ink-muted">
              <p>Node with ID <span className="font-mono text-ink">{inspectorNodeId}</span> not found in graph.</p>
            </div>
          ) : node.kind === 'Verse' ? (
            renderVerse(node as VerseNode)
          ) : node.kind === 'Tattva' ? (
            renderTattva(node as TattvaNode)
          ) : node.kind === 'Concept' ? (
            renderConcept(node as ConceptNode)
          ) : node.kind === 'Master' ? (
            renderMaster(node as MasterNode)
          ) : node.kind === 'Dharana' ? (
            renderDharana(node as DharanaNode)
          ) : (
            <div className="p-4">
              <pre className="text-xs font-mono">{JSON.stringify(node, null, 2)}</pre>
            </div>
          )}

          {/* Graph Neighborhood Panel (1-hop connected nodes) */}
          <div className="hairline-t pt-5">
            <div className="flex items-center gap-2 mb-3">
              <GitBranch size={16} className="text-vermilion" />
              <h4 className="font-serif font-semibold text-sm tracking-wide text-ink">
                Deterministic Graph Neighborhood
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {neighbors.outgoing.length > 0 && (
                <div className="p-3 bg-surface rounded hairline-border space-y-1.5">
                  <span className="font-mono uppercase text-[10px] tracking-wider text-ink-subtle block mb-1">
                    Outgoing Relations ({neighbors.outgoing.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {neighbors.outgoing.map((out, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1">
                        <span className="text-[10px] text-ink-muted">{out.edge.type}:</span>
                        <CitationPill id={out.edge.target} />
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {neighbors.incoming.length > 0 && (
                <div className="p-3 bg-surface rounded hairline-border space-y-1.5">
                  <span className="font-mono uppercase text-[10px] tracking-wider text-ink-subtle block mb-1">
                    Incoming References ({neighbors.incoming.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {neighbors.incoming.map((inc, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1">
                        <CitationPill id={inc.edge.source} />
                        <span className="text-[10px] text-ink-muted">→ {inc.edge.type}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer with Provenance */}
        <div className="px-5 py-2.5 hairline-t bg-surface/40 flex items-center justify-between text-[11px] font-mono text-ink-subtle">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Deterministic Graph Node</span>
          </div>
          <span>ID: {inspectorNodeId}</span>
        </div>
      </div>
    </div>
  );

  function renderVerse(v: VerseNode) {
    return (
      <div className="space-y-5">
        {/* Sub-division badge */}
        {v.subDivision && (
          <div className="text-xs font-mono tracking-wider uppercase text-ink-subtle">
            {v.subDivision}
          </div>
        )}

        {/* Script toggles */}
        <div className="flex items-center justify-end gap-3 text-xs font-mono text-ink-muted">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={showDevanagari}
              onChange={(e) => setShowDevanagari(e.target.checked)}
              className="rounded"
            />
            Devanagari
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={showIast}
              onChange={(e) => setShowIast(e.target.checked)}
              className="rounded"
            />
            IAST
          </label>
        </div>

        {/* Verbatim Sanskrit Box */}
        <div className="p-4 sm:p-5 bg-surface/70 hairline-border rounded-md space-y-3">
          {showDevanagari && (
            <div className="sanskrit-text text-xl sm:text-2xl font-sanskrit text-ink font-medium tracking-wide">
              {v.devanagari}
            </div>
          )}
          {showIast && (
            <div className="font-serif italic text-base sm:text-lg text-ink-muted tracking-wide">
              {v.iast}
            </div>
          )}
        </div>

        {/* Word-by-word Padaccheda */}
        {v.padaccheda && v.padaccheda.length > 0 && (
          <div className="hairline-border rounded-md overflow-hidden bg-surface/30">
            <button
              onClick={() => setShowPadaccheda(!showPadaccheda)}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-ink-muted hover:bg-surface-hover cursor-pointer"
            >
              <span>Word-by-Word Analysis (Padaccheda)</span>
              {showPadaccheda ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showPadaccheda && (
              <div className="overflow-x-auto hairline-t">
                <table className="w-full text-xs text-left">
                  <thead className="bg-surface text-ink-subtle uppercase text-[10px] font-mono hairline-b">
                    <tr>
                      <th className="px-3 py-1.5">Devanagari</th>
                      <th className="px-3 py-1.5">IAST</th>
                      <th className="px-3 py-1.5">Grammar</th>
                      <th className="px-3 py-1.5">Literal Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {v.padaccheda.map((p, idx) => (
                      <tr key={idx} className="hover:bg-surface/50">
                        <td className="px-3 py-1.5 font-sanskrit text-sm text-ink">{p.wordDevanagari}</td>
                        <td className="px-3 py-1.5 font-serif italic text-ink">{p.wordIast}</td>
                        <td className="px-3 py-1.5 font-mono text-[11px] text-ink-subtle">{p.grammaticalRole}</td>
                        <td className="px-3 py-1.5 text-ink-muted">{p.literalMeaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Literal Study Gloss */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ink-subtle font-semibold">
            Literal Study Gloss
          </span>
          <div className="p-3 bg-surface/50 hairline-border rounded text-sm sm:text-base text-ink leading-relaxed font-serif">
            <LexiconText text={v.studyGloss} />
          </div>
        </div>

        {/* Practical / Philosophical Context */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ink-subtle font-semibold">
            Lineage Context & Practical Application
          </span>
          <div className="p-3 bg-surface/30 hairline-border rounded text-xs sm:text-sm text-ink-muted leading-relaxed">
            <LexiconText text={v.practicalContext} />
          </div>
        </div>

        {/* Provenance Metadata Box */}
        {v.provenance && (
          <div className="p-2.5 bg-surface/30 rounded hairline-border text-[11px] font-mono text-ink-subtle space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-ink font-medium">Source: {v.provenance.source}</span>
              <span className="text-emerald-700 uppercase">{v.provenance.verification_status}</span>
            </div>
            {v.provenance.sha256 && (
              <div className="truncate">
                SHA-256: <span className="text-ink">{v.provenance.sha256}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  function renderTattva(t: TattvaNode) {
    return (
      <div className="space-y-4">
        <div className="flex items-baseline justify-between hairline-b pb-2">
          <div>
            <h3 className="font-serif text-2xl font-bold text-ink">{t.nameIast}</h3>
            <span className="font-sanskrit text-lg text-ink-muted">{t.nameDevanagari}</span>
          </div>
          <div className="text-right">
            <span className="font-mono text-base font-bold text-slate-trika">Tattva #{t.number}</span>
            <span className="block font-mono text-[10px] uppercase text-ink-subtle">{t.order} order</span>
          </div>
        </div>

        <div className="p-3 bg-surface/60 rounded hairline-border">
          <span className="text-xs uppercase font-mono text-ink-subtle block mb-1">English Title</span>
          <div className="font-serif text-lg font-semibold text-ink">{t.englishName}</div>
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-mono text-ink-subtle">Function Description</span>
          <p className="text-sm text-ink leading-relaxed">{t.functionDescription}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-mono text-ink-subtle">Cosmic Role</span>
          <p className="text-xs text-ink-muted leading-relaxed">{t.cosmicRole}</p>
        </div>

        {t.malaOrKancuka && (
          <div className="p-2.5 bg-vermilion-subtle/40 hairline-border border-vermilion/30 rounded text-xs text-ink">
            <span className="font-mono font-semibold text-vermilion block mb-0.5">Operative Mala / Kañcuka:</span>
            {t.malaOrKancuka}
          </div>
        )}

        {t.mappedVerses && t.mappedVerses.length > 0 && (
          <div className="pt-2">
            <span className="text-xs uppercase font-mono text-ink-subtle block mb-2">Canonical Mapped Verses</span>
            <div className="flex flex-wrap gap-1.5">
              {t.mappedVerses.map((vid) => (
                <CitationPill key={vid} id={vid} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderConcept(c: ConceptNode) {
    return (
      <div className="space-y-4">
        <div className="flex items-baseline justify-between hairline-b pb-2">
          <div>
            <h3 className="font-serif text-2xl font-bold text-ink">{c.termIast}</h3>
            <span className="font-sanskrit text-lg text-ink-muted">{c.termDevanagari}</span>
          </div>
          <span className="font-mono text-xs uppercase px-2 py-0.5 bg-surface rounded hairline-border text-ink-muted">
            {c.category}
          </span>
        </div>

        <div className="text-xs font-mono text-ink-subtle italic">
          Root Etymology: {c.rootEtymology}
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-mono text-ink-subtle">Concise Definition</span>
          <p className="text-sm text-ink leading-relaxed">{c.conciseDefinition}</p>
        </div>

        {c.advaitaContrast && (
          <div className="p-3 bg-surface/70 rounded hairline-border text-xs leading-relaxed space-y-1">
            <span className="font-mono font-semibold uppercase text-ink block text-[10px]">
              Contrast with Classical Advaita Vedānta
            </span>
            <p className="text-ink-muted">{c.advaitaContrast}</p>
          </div>
        )}

        {c.linkedVerses && c.linkedVerses.length > 0 && (
          <div className="pt-2">
            <span className="text-xs uppercase font-mono text-ink-subtle block mb-2">Grounded in Verses</span>
            <div className="flex flex-wrap gap-1.5">
              {c.linkedVerses.map((vid) => (
                <CitationPill key={vid} id={vid} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderMaster(m: MasterNode) {
    return (
      <div className="space-y-4">
        <div className="flex items-baseline justify-between hairline-b pb-2">
          <div>
            <h3 className="font-serif text-2xl font-bold text-ink">{m.nameIast}</h3>
            <span className="font-sanskrit text-lg text-ink-muted">{m.nameDevanagari}</span>
          </div>
          <span className="font-mono text-xs text-ink-subtle">{m.century}</span>
        </div>

        <div className="text-xs uppercase font-mono text-vermilion font-semibold">
          {m.lineageRole}
        </div>

        <div className="text-sm text-ink leading-relaxed">
          {m.biographicalNotes}
        </div>

        <div>
          <span className="text-xs uppercase font-mono text-ink-subtle block mb-1.5">Core Authoritative Works</span>
          <ul className="list-disc list-inside text-xs text-ink-muted space-y-1">
            {m.coreWorks.map((work, idx) => (
              <li key={idx} className="font-serif italic">{work}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function renderDharana(d: DharanaNode) {
    return (
      <div className="space-y-4">
        <div className="flex items-baseline justify-between hairline-b pb-2">
          <div>
            <h3 className="font-serif text-2xl font-bold text-ink">Dhāraṇā #{d.number}</h3>
            <span className="font-mono text-xs text-ink-subtle">Mapped to {d.verseId}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 bg-vermilion-subtle text-vermilion rounded hairline-border">
              {d.doorway} doorway
            </span>
            <span className="font-mono text-xs uppercase px-2 py-0.5 bg-surface text-ink-muted rounded hairline-border">
              {d.level}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-mono text-ink-subtle">Contemplation Instructions</span>
          <p className="text-sm font-serif text-ink leading-relaxed p-3 bg-surface rounded hairline-border">
            {d.instructionsSummary}
          </p>
        </div>

        {d.whyItWorksGraphProof && (
          <div className="p-3 bg-slate-subtle/50 border-slate-trika/30 hairline-border rounded text-xs space-y-1.5">
            <span className="font-mono font-semibold uppercase text-slate-trika block text-[10px]">
              Why This Works (Deterministic Graph Proof)
            </span>
            <p className="text-ink-muted">{d.whyItWorksGraphProof.rationale}</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-ink-subtle text-[11px]">Proved in:</span>
              <CitationPill id={d.whyItWorksGraphProof.targetVerseId} />
            </div>
          </div>
        )}
      </div>
    );
  }
};
