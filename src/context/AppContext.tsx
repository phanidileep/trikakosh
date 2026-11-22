import React, { createContext, useContext, useState, useEffect } from 'react';
import { getByokSettings, type ByokSettings } from '../services/retrievalService';

interface AppContextType {
  currentPath: string;
  navigateTo: (path: string) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
  inspectorNodeId: string | null;
  openInspector: (nodeId: string) => void;
  closeInspector: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isByokOpen: boolean;
  openByok: () => void;
  closeByok: () => void;
  byokSettings: ByokSettings;
  updateByokSettings: (settings: ByokSettings) => void;
  completedModules: string[];
  markModuleComplete: (moduleId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simple robust hash/history router
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash ? window.location.hash.slice(1) : window.location.pathname || '/';
  });

  // Dark mode
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('trikakosh_theme') === 'dark';
  });

  // Inspector
  const [inspectorNodeId, setInspectorNodeId] = useState<string | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isByokOpen, setIsByokOpen] = useState<boolean>(false);
  const [byokSettings, setByokSettings] = useState<ByokSettings>(getByokSettings);

  // Curriculum progress
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('trikakosh_completed_modules');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPath(hash || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('trikakosh_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('trikakosh_theme', 'light');
    }
  }, [isDark]);

  // Global Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isByokOpen) setIsByokOpen(false);
        if (inspectorNodeId) setInspectorNodeId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isByokOpen, inspectorNodeId]);

  const navigateTo = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  const openInspector = (nodeId: string) => setInspectorNodeId(nodeId);
  const closeInspector = () => setInspectorNodeId(null);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openByok = () => setIsByokOpen(true);
  const closeByok = () => setIsByokOpen(false);

  const updateByokSettings = (newSettings: ByokSettings) => {
    setByokSettings(newSettings);
  };

  const markModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) => {
      if (prev.includes(moduleId)) return prev;
      const updated = [...prev, moduleId];
      localStorage.setItem('trikakosh_completed_modules', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigateTo,
        isDark,
        toggleDarkMode,
        inspectorNodeId,
        openInspector,
        closeInspector,
        isSearchOpen,
        openSearch,
        closeSearch,
        isByokOpen,
        openByok,
        closeByok,
        byokSettings,
        updateByokSettings,
        completedModules,
        markModuleComplete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
