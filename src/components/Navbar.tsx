import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sun, Moon, Key, Menu, X, BookOpen, Layers, Compass, GitBranch, MessageSquare, BookMarked } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigateTo, isDark, toggleDarkMode, openSearch, openByok, byokSettings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Start Here', icon: BookOpen },
    { path: '/learn', label: 'Learn (7 Modules)', icon: Compass },
    { path: '/tattvas', label: '36 Tattvas', icon: Layers },
    { path: '/texts', label: 'Corpus Reader', icon: BookMarked },
    { path: '/sadhana', label: 'Sādhana Matrix', icon: Compass },
    { path: '/lineage', label: 'Lineage', icon: GitBranch },
    { path: '/lexicon', label: 'Lexicon', icon: BookOpen },
    { path: '/ask', label: 'Ask Graph', icon: MessageSquare },
  ];

  const hasApiKey = Boolean(byokSettings.apiKey);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md hairline-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => navigateTo('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded bg-vermilion text-paper flex items-center justify-center font-serif font-bold text-base shadow-xs">
            त्रि
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-base font-bold tracking-tight text-ink group-hover:text-vermilion transition-colors">
                TrikaKosh
              </span>
              <span className="font-sanskrit text-xs text-ink-subtle">
                त्रिककोश
              </span>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-ink-subtle -mt-0.5">
              Kashmir Shaivism Architecture
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-surface font-semibold text-vermilion hairline-border'
                    : 'text-ink-muted hover:text-ink hover:bg-surface/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Cmd+K Search Button */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-2.5 py-1 bg-surface hover:bg-surface-hover text-ink-muted hover:text-ink rounded hairline-border text-xs transition-colors cursor-pointer"
            title="Search (Cmd+K / Ctrl+K)"
          >
            <Search size={14} />
            <span className="hidden sm:inline font-mono text-[11px]">Search</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] text-ink-subtle px-1 rounded bg-paper hairline-border">
              ⌘K
            </kbd>
          </button>

          {/* BYOK Status Pill */}
          <button
            onClick={openByok}
            className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded hairline-border text-[11px] font-mono cursor-pointer transition-colors ${
              hasApiKey
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-surface text-ink-muted hover:bg-surface-hover'
            }`}
            title="In-app BYOK Settings (Groq / OpenRouter)"
          >
            <Key size={12} className={hasApiKey ? 'text-emerald-600' : 'text-ink-subtle'} />
            <span className="capitalize">{byokSettings.provider}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${hasApiKey ? 'bg-emerald-500' : 'bg-amber-500'}`}
            />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded hairline-border bg-surface hover:bg-surface-hover text-ink transition-colors cursor-pointer"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded lg:hidden hairline-border bg-surface text-ink"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 hairline-b bg-paper space-y-1">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                onClick={() => {
                  navigateTo(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left text-sm cursor-pointer ${
                  isActive
                    ? 'bg-surface font-semibold text-vermilion hairline-border'
                    : 'text-ink-muted hover:bg-surface/50'
                }`}
              >
                <link.icon size={16} />
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="pt-2 hairline-t flex items-center justify-between text-xs font-mono text-ink-subtle">
            <button
              onClick={() => {
                openByok();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 py-1 text-vermilion"
            >
              <Key size={14} />
              <span>BYOK API Key Settings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
