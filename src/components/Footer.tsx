import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="hairline-t bg-paper text-ink-muted text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-vermilion text-paper flex items-center justify-center font-serif font-bold text-xs">
                त्रि
              </div>
              <span className="font-serif font-bold text-ink text-sm">TrikaKosh</span>
            </div>
            <p className="text-xs leading-relaxed text-ink-subtle">
              Deterministic, lineage-accurate open starter platform bridging Philosophy, Verbatim Sanskrit, and Practical Bhairava Contemplation.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700">
              <ShieldCheck size={14} />
              <span>100% Deterministic Provenance</span>
            </div>
          </div>

          {/* Col 2: Initiation Order */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink font-semibold block">
              4-Text Initiation
            </span>
            <ul className="space-y-1.5 font-serif">
              <li>
                <button onClick={() => navigateTo('/texts/PH')} className="hover:text-vermilion cursor-pointer">
                  1. Pratyabhijñāhṛdayam (20 Sūtras)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/texts/SS')} className="hover:text-vermilion cursor-pointer">
                  2. Śiva Sūtras (77 Sūtras)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/texts/SK')} className="hover:text-vermilion cursor-pointer">
                  3. Spanda Kārikās (53 Kārikās)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/texts/VBT')} className="hover:text-vermilion cursor-pointer">
                  4. Vijñāna Bhairava (112 Dhāraṇās)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/texts/BS')} className="hover:text-vermilion cursor-pointer italic text-ink-subtle">
                  Devotional: Bhairava Stava
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture & Tools */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink font-semibold block">
              Architecture & Tools
            </span>
            <ul className="space-y-1.5 font-serif">
              <li>
                <button onClick={() => navigateTo('/tattvas')} className="hover:text-vermilion cursor-pointer">
                  36 Tattvas Architectural Map
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/sadhana')} className="hover:text-vermilion cursor-pointer">
                  Bhairava Sādhana Matrix
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/learn')} className="hover:text-vermilion cursor-pointer">
                  Zero to Trika (7 Modules)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/lineage')} className="hover:text-vermilion cursor-pointer">
                  Master Lineage Timeline
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/lexicon')} className="hover:text-vermilion cursor-pointer">
                  Core Trika Lexicon (92 Terms)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Public Domain & Sources */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink font-semibold block">
              Textual Provenance
            </span>
            <p className="text-[11px] leading-relaxed text-ink-subtle">
              Sanskrit etexts ingested from public-domain GRETIL (Göttingen Register of Electronic Texts in Indian Languages) critical editions and Kashmiri manuscripts with verified SHA-256 hashes.
            </p>
            <div className="pt-1">
              <button
                onClick={() => navigateTo('/lineage')}
                className="font-mono text-[11px] text-vermilion hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Curated Reading Room</span>
                <ExternalLink size={11} />
              </button>
            </div>
          </div>
        </div>

        {/* Hairline Bottom Bar */}
        <div className="hairline-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-ink-subtle">
          <div>
            © 2026 TrikaKosh • Lineage-Accurate Open Platform for Kashmir Shaivism & Bhairava Sādhana
          </div>
          <div className="flex items-center gap-4">
            <span>Archival Edition v1.0.0</span>
            <span>•</span>
            <span className="font-sanskrit text-ink">सर्वं शिवमयं जगत्</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
