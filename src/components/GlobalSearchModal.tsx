import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { graphService } from '../services/graphService';
import { Search, BookOpen, Layers, Sparkles, User, Key, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, openInspector } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim() ? graphService.search(query, 15) : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        openInspector(results[selectedIndex].node.id);
        closeSearch();
      }
    }
  };

  return (
    <div
      onClick={closeSearch}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 bg-ink/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-paper hairline-border shadow-2xl rounded-lg overflow-hidden flex flex-col text-ink"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 hairline-b bg-surface/50">
          <Search size={18} className="text-ink-subtle" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search verses (PH.1, VBT.24), tattvas, concepts, or Sanskrit..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-ink placeholder:text-ink-subtle"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono text-ink-subtle hover:text-ink"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface hairline-border text-ink-subtle">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!query.trim() ? (
            <div className="p-8 text-center text-ink-muted text-xs space-y-3">
              <p className="font-serif text-sm">Quick Jump Ideas:</p>
              <div className="flex flex-wrap justify-center gap-2 font-mono text-xs">
                {['PH.1', 'SS.1.1', 'VBT.24', 'SK.1.1', 'BS.1', 'TATTVA.01', 'Prakāśa', 'Spanda', 'Madhya'].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="px-2 py-1 rounded bg-surface hairline-border hover:bg-surface-hover text-ink cursor-pointer"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-ink-muted text-xs">
              No matching nodes found for "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((item, idx) => {
                const node = item.node;
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={node.id}
                    onClick={() => {
                      openInspector(node.id);
                      closeSearch();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-2.5 rounded text-xs cursor-pointer transition-colors ${
                      isSelected ? 'bg-surface-hover text-ink' : 'hover:bg-surface text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="p-1 rounded bg-surface hairline-border text-ink-muted">
                        {node.kind === 'Verse' ? (
                          <BookOpen size={14} />
                        ) : node.kind === 'Tattva' ? (
                          <Layers size={14} />
                        ) : node.kind === 'Concept' ? (
                          <Sparkles size={14} />
                        ) : node.kind === 'Master' ? (
                          <User size={14} />
                        ) : (
                          <Key size={14} />
                        )}
                      </span>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-vermilion">
                            {node.id}
                          </span>
                          <span className="text-[10px] uppercase font-mono text-ink-subtle">
                            {node.kind}
                          </span>
                        </div>
                        <div className="truncate text-ink-muted mt-0.5">
                          {node.kind === 'Verse'
                            ? (node as any).studyGloss
                            : node.kind === 'Concept'
                            ? `${(node as any).termIast} (${(node as any).termDevanagari}): ${(node as any).conciseDefinition}`
                            : node.kind === 'Tattva'
                            ? `${(node as any).nameIast} — ${(node as any).englishName}`
                            : (node as any).titleIast || (node as any).nameIast || ''}
                        </div>
                      </div>
                    </div>

                    <ArrowRight size={14} className="text-ink-subtle shrink-0 ml-2" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="px-4 py-2 hairline-t bg-surface/30 flex items-center justify-between text-[11px] font-mono text-ink-subtle">
          <span>Navigate with ↑ / ↓, Select with Enter</span>
          <span>{results.length} result(s)</span>
        </div>
      </div>
    </div>
  );
};
