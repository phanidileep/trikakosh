import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { graphService } from '../services/graphService';
import { InteractiveGraph } from '../components/InteractiveGraph';
import { CitationPill } from '../components/CitationPill';
import { RelationshipGraphMini } from '../components/RelationshipGraphMini';
import { GitBranch, X, Maximize2 } from 'lucide-react';
import type { VerseNode, TattvaNode, ConceptNode, DharanaNode, MasterNode } from '../types/graph';

export const GraphPage: React.FC = () => {
  const { openInspector } = useApp();

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('PH.1');
  const [drawerOpen, setDrawerOpen] = useState(true);

  const selectedNode = selectedNodeId ? graphService.getNode(selectedNodeId) : null;
  const neighbors = selectedNodeId ? graphService.getNeighbors(selectedNodeId) : { outgoing: [], incoming: [] };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setDrawerOpen(true);
  };

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden bg-paper fade-in-up">
      {/* Top Header Stats Bar */}
      <div className="h-12 px-4 sm:px-6 hairline-b bg-surface/50 backdrop-blur-xs flex items-center justify-between shrink-0 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-serif font-bold text-ink">
            <GitBranch size={16} className="text-vermilion" />
            <span>Interactive Relationship Graph</span>
          </div>
          <span className="hidden md:inline text-border">•</span>
          <span className="hidden md:inline text-[11px] font-mono text-ink-subtle">
            582 Nodes ("Balls") • 794 Relationship Threads
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedNodeId && (
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-ink-subtle hidden sm:inline">Active:</span>
              <CitationPill id={selectedNodeId} />
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="px-2 py-1 rounded hairline-border bg-surface hover:bg-surface-hover text-ink text-[11px] cursor-pointer"
              >
                {drawerOpen ? 'Hide Drawer' : 'Show Drawer'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Graph & Sliding Drawer Layout */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Full Interactive Physics Canvas */}
        <div className="flex-1 h-full relative">
          <InteractiveGraph
            onSelectNode={handleNodeSelect}
            selectedNodeId={selectedNodeId}
            height="100%"
          />
        </div>

        {/* Sliding Node Inspector Drawer (Right) */}
        {drawerOpen && selectedNode && (
          <aside
            className="w-full sm:w-96 md:w-[420px] h-full bg-paper/98 backdrop-blur-md hairline-l shadow-2xl flex flex-col z-20 shrink-0 animate-in slide-in-from-right duration-200"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3 hairline-b bg-surface/60 shrink-0">
              <div className="flex items-center gap-2">
                <CitationPill id={selectedNode.id} />
                <span className="font-mono text-[10px] uppercase text-ink-subtle">
                  {selectedNode.kind} Inspector
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openInspector(selectedNode.id)}
                  className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface"
                  title="Open Full Modal"
                >
                  <Maximize2 size={14} />
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface"
                  title="Close Drawer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {/* Node Details based on Kind */}
              {selectedNode.kind === 'Verse' ? (
                <div className="space-y-3">
                  <div className="p-3 bg-surface rounded hairline-border space-y-1.5">
                    <div className="sanskrit-text text-base font-sanskrit text-ink font-medium leading-relaxed">
                      {(selectedNode as VerseNode).devanagari}
                    </div>
                    <div className="font-serif italic text-xs text-ink-muted">
                      {(selectedNode as VerseNode).iast}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                      Literal Study Gloss
                    </span>
                    <p className="font-serif text-sm text-ink leading-relaxed">
                      {(selectedNode as VerseNode).studyGloss}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                      Context & Sādhana Application
                    </span>
                    <p className="text-ink-muted leading-relaxed">
                      {(selectedNode as VerseNode).practicalContext}
                    </p>
                  </div>
                </div>
              ) : selectedNode.kind === 'Tattva' ? (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-ink">
                      {(selectedNode as TattvaNode).nameIast}
                    </h3>
                    <span className="font-sanskrit text-sm text-ink-muted">
                      {(selectedNode as TattvaNode).nameDevanagari}
                    </span>
                  </div>

                  <div className="p-2.5 bg-surface rounded hairline-border font-serif text-sm font-semibold text-ink">
                    {(selectedNode as TattvaNode).englishName}
                  </div>

                  <p className="text-ink leading-relaxed">
                    {(selectedNode as TattvaNode).functionDescription}
                  </p>

                  {(selectedNode as TattvaNode).malaOrKancuka && (
                    <div className="p-2 bg-vermilion-subtle/40 rounded hairline-border text-[11px] text-vermilion font-mono">
                      Kañcuka/Mala: {(selectedNode as TattvaNode).malaOrKancuka}
                    </div>
                  )}
                </div>
              ) : selectedNode.kind === 'Concept' ? (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-ink">
                      {(selectedNode as ConceptNode).termIast}
                    </h3>
                    <span className="font-sanskrit text-sm text-ink-muted">
                      {(selectedNode as ConceptNode).termDevanagari}
                    </span>
                  </div>

                  <div className="font-mono text-[10px] text-ink-subtle italic">
                    {(selectedNode as ConceptNode).rootEtymology}
                  </div>

                  <p className="text-ink leading-relaxed">
                    {(selectedNode as ConceptNode).conciseDefinition}
                  </p>

                  {(selectedNode as ConceptNode).advaitaContrast && (
                    <div className="p-2.5 bg-surface rounded hairline-border text-[11px] text-ink-muted space-y-0.5">
                      <span className="font-mono font-semibold uppercase text-vermilion text-[9px] block">
                        Advaita Contrast:
                      </span>
                      <p>{(selectedNode as ConceptNode).advaitaContrast}</p>
                    </div>
                  )}
                </div>
              ) : selectedNode.kind === 'Dharana' ? (
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-lg font-bold text-ink">
                      Dhāraṇā #{(selectedNode as DharanaNode).number}
                    </h3>
                    <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 bg-vermilion-subtle text-vermilion rounded hairline-border">
                      {(selectedNode as DharanaNode).doorway}
                    </span>
                  </div>

                  <p className="font-serif text-sm text-ink leading-relaxed p-3 bg-surface rounded hairline-border">
                    "{(selectedNode as DharanaNode).instructionsSummary}"
                  </p>

                  <div className="p-2.5 bg-slate-subtle/40 rounded hairline-border text-[11px] space-y-1">
                    <span className="font-mono font-semibold text-slate-trika block uppercase text-[9px]">
                      Why This Works (Graph Proof)
                    </span>
                    <p className="text-ink-muted">
                      {(selectedNode as DharanaNode).whyItWorksGraphProof.rationale}
                    </p>
                    <CitationPill id={(selectedNode as DharanaNode).whyItWorksGraphProof.targetVerseId} />
                  </div>
                </div>
              ) : selectedNode.kind === 'Master' ? (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-ink">
                      {(selectedNode as MasterNode).nameIast}
                    </h3>
                    <span className="font-sanskrit text-sm text-ink-muted">
                      {(selectedNode as MasterNode).nameDevanagari}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-vermilion font-semibold">
                    {(selectedNode as MasterNode).lineageRole}
                  </div>
                  <p className="text-ink leading-relaxed">
                    {(selectedNode as MasterNode).biographicalNotes}
                  </p>
                </div>
              ) : null}

              {/* Embedded Mini Neighborhood Graph */}
              <div className="pt-2">
                <RelationshipGraphMini
                  nodeId={selectedNode.id}
                  height={150}
                  onNodeClick={handleNodeSelect}
                />
              </div>

              {/* Direct Connected Links List */}
              <div className="space-y-2 pt-2 hairline-t">
                <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                  Direct Connected Relationship Threads ({neighbors.outgoing.length + neighbors.incoming.length})
                </span>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {neighbors.outgoing.map((out, idx) => (
                    <div
                      key={`out-${idx}`}
                      onClick={() => handleNodeSelect(out.edge.target)}
                      className="flex items-center justify-between p-1.5 bg-surface/60 hover:bg-surface rounded hairline-border cursor-pointer text-[11px]"
                    >
                      <span className="font-mono text-[10px] text-ink-subtle">
                        → {out.edge.type}
                      </span>
                      <CitationPill id={out.edge.target} />
                    </div>
                  ))}
                  {neighbors.incoming.map((inc, idx) => (
                    <div
                      key={`inc-${idx}`}
                      onClick={() => handleNodeSelect(inc.edge.source)}
                      className="flex items-center justify-between p-1.5 bg-surface/60 hover:bg-surface rounded hairline-border cursor-pointer text-[11px]"
                    >
                      <CitationPill id={inc.edge.source} />
                      <span className="font-mono text-[10px] text-ink-subtle">
                        {inc.edge.type} →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 hairline-t bg-surface/40 flex items-center justify-between text-xs shrink-0">
              <button
                onClick={() => openInspector(selectedNode.id)}
                className="w-full py-1.5 bg-vermilion text-paper rounded font-medium text-xs hover:bg-vermilion/90 cursor-pointer text-center shadow-xs"
              >
                Open Full Modal Inspector
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
