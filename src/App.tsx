import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VerseInspectorModal } from './components/VerseInspectorModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ByokSettingsModal } from './components/ByokSettingsModal';

import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { TattvasPage } from './pages/TattvasPage';
import { TextsPage } from './pages/TextsPage';
import { SadhanaPage } from './pages/SadhanaPage';
import { LineagePage } from './pages/LineagePage';
import { LexiconPage } from './pages/LexiconPage';
import { AskPage } from './pages/AskPage';

const AppContent: React.FC = () => {
  const { currentPath } = useApp();

  // Route router logic
  let pageComponent = <HomePage />;

  if (currentPath.startsWith('/learn')) {
    pageComponent = <LearnPage />;
  } else if (currentPath.startsWith('/tattvas')) {
    pageComponent = <TattvasPage />;
  } else if (currentPath.startsWith('/texts')) {
    pageComponent = <TextsPage />;
  } else if (currentPath.startsWith('/sadhana')) {
    pageComponent = <SadhanaPage />;
  } else if (currentPath.startsWith('/lineage')) {
    pageComponent = <LineagePage />;
  } else if (currentPath.startsWith('/lexicon')) {
    pageComponent = <LexiconPage />;
  } else if (currentPath.startsWith('/ask')) {
    pageComponent = <AskPage />;
  } else {
    pageComponent = <HomePage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-vermilion/20 selection:text-ink">
      <Navbar />
      <main className="flex-1">{pageComponent}</main>
      <Footer />

      {/* Global Modals */}
      <VerseInspectorModal />
      <GlobalSearchModal />
      <ByokSettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
