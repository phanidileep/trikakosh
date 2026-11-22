import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { graphService } from '../services/graphService';
import { CitationPill } from '../components/CitationPill';
import type { MasterNode } from '../types/graph';

export const LineagePage: React.FC = () => {
  const { openInspector } = useApp();
  const masters = graphService.getAllMasters();
  const [selectedMasterId, setSelectedMasterId] = useState<string>('MASTER.ABHINAVAGUPTA');

  const selectedMaster = graphService.getNode(selectedMasterId) as MasterNode | undefined;

  const bibliography = [
    {
      author: 'Jaideva Singh (Motilal Banarsidass)',
      works: [
        'Pratyabhijñāhṛdayam: The Secret of Self-Recognition',
        'Śiva Sūtras: The Yoga of Supreme Identity',
        'Spanda-Kārikās: The Divine Creative Pulsation',
        'Vijñānabhairava or Divine Consciousness',
      ],
      description: 'The standard scholarly entry point for 20th-century students, providing literal Sanskrit text, padaccheda, and thorough line-by-line exposition.',
    },
    {
      author: 'Swami Lakshmanjoo (Ishwar Ashram Trust)',
      works: [
        'Kashmir Shaivism: The Secret Supreme',
        'Vijnana Bhairava: The Practice of Centering Awareness',
        'Shiva Sutras: The Supreme Awakening',
        'Spanda Sandoha & Spanda Nirnaya',
      ],
      description: 'The last living fully realized master of the oral Trika paramparā in Kashmir. Essential for practical pronunciation, oral transmission, and esoteric keys.',
    },
    {
      author: 'Mark S. G. Dyczkowski (Indira Gandhi National Centre for the Arts)',
      works: [
        'The Doctrine of Vibration: An Analysis of the Doctrines and Practices of Kashmir Shaivism',
        'The Stanzas on Vibration: The Spandakārikā with Four Commentaries',
        'A Journey in the World of the Tantras',
        'The Canon of the Śaivāgama and the Kubjikā Tantras',
      ],
      description: 'Encyclopedic modern academic authority who translated the four primary classical commentaries on the Spanda Kārikās.',
    },
    {
      author: 'Christopher D. Wallis (Hareesh)',
      works: [
        'Tantra Illuminated: The Philosophy, History, and Practice of a Timeless Tradition',
        'The Recognition Sūtras: Illuminating a 1,000-Year-Old Spiritual Masterpiece',
        'Near Hearing: Teachings on Non-Dual Tantra',
      ],
      description: 'Combines rigorous Sanskrit philology with accessible contemporary practice-oriented translation of Kṣemarāja and Abhinavagupta.',
    },
    {
      author: 'Paul Eduardo Muller-Ortega',
      works: [
        'The Triadic Heart of Śiva: Kaula Tantricism of Abhinavagupta in the Non-dual Shaivism of Kashmir',
      ],
      description: 'The definitive monograph exploring Abhinavagupta’s doctrine of the radiant Spiritual Heart (Hṛdaya) and the acoustic mystery of the Sanskrit phonemes.',
    },
    {
      author: 'Alexis Sanderson (All Souls College, Oxford)',
      works: [
        'Śaivism and the Tantric Traditions',
        'The Śaiva Exegesis of Kashmir',
        'A Commentary on the Opening Verses of the Tantrāloka',
      ],
      description: 'The world’s foremost critical historian of Śaivism, establishing the definitive historical chronology, manuscript stemma, and textual transmission of Kashmir Shaivism.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="hairline-b pb-6 space-y-2">
        <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
          Textual Provenance & Living Transmission
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
          The Master Lineage Timeline
        </h1>
        <p className="text-xs text-ink-muted max-w-2xl leading-relaxed">
          Historical succession of the Kashmiri masters tracing the revelation of the <em>Śiva Sūtras</em>, the development of the <em>Spanda</em> school, and the supreme synthesis of <em>Trika</em> and <em>Pratyabhijñā</em>.
        </p>
      </div>

      {/* Interactive 2D Architecture SVG Timeline */}
      <section className="space-y-6">
        <div className="p-4 bg-surface rounded-lg hairline-border">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle font-semibold block mb-4">
            Interactive Succession Chart (Click any Master to inspect works & lineage)
          </span>

          {/* Clean 2D Orthogonal Flow Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {masters.map((master, idx) => {
              const isSelected = master.id === selectedMasterId;
              return (
                <div
                  key={master.id}
                  onClick={() => setSelectedMasterId(master.id)}
                  className={`p-3.5 rounded-lg hairline-border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-paper border-vermilion shadow-xs ring-1 ring-vermilion'
                      : 'bg-paper/70 hover:bg-paper hover:border-ink/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] text-ink-subtle">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] text-ink-subtle">
                      {master.century.split(' ')[0]}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-ink">
                      {master.nameIast}
                    </h3>
                    <span className="font-sanskrit text-xs text-ink-muted">
                      {master.nameDevanagari}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-mono text-vermilion line-clamp-1">
                    {master.lineageRole}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Master Details Banner */}
        {selectedMaster && (
          <div className="p-6 bg-paper rounded-lg hairline-border space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 hairline-b pb-3">
              <div>
                <h3 className="font-serif text-2xl font-bold text-ink">
                  {selectedMaster.nameIast} ({selectedMaster.nameDevanagari})
                </h3>
                <span className="text-xs font-mono text-vermilion uppercase font-semibold">
                  {selectedMaster.lineageRole} • {selectedMaster.century}
                </span>
              </div>
              <button
                onClick={() => openInspector(selectedMaster.id)}
                className="text-xs font-mono text-vermilion hover:underline cursor-pointer"
              >
                Full Node Inspector
              </button>
            </div>

            <p className="text-xs sm:text-sm text-ink leading-relaxed">
              {selectedMaster.biographicalNotes}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 bg-surface rounded hairline-border space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                  Core Authored Works
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-ink-muted">
                  {selectedMaster.coreWorks.map((w, idx) => (
                    <li key={idx} className="font-serif italic">{w}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-surface rounded hairline-border space-y-2">
                <span className="font-mono text-[10px] uppercase text-ink-subtle font-semibold block">
                  Lineage Links (Paramparā)
                </span>
                {selectedMaster.studentOf.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-ink-subtle">Student of:</span>
                    {selectedMaster.studentOf.map((gid) => (
                      <CitationPill key={gid} id={gid} />
                    ))}
                  </div>
                )}
                {selectedMaster.guruOf.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-ink-subtle">Guru of:</span>
                    {selectedMaster.guruOf.map((did) => (
                      <CitationPill key={did} id={did} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Curated Reading Room & Bibliography */}
      <section className="space-y-6 hairline-t pt-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-slate-trika font-semibold">
            Authoritative Bibliography
          </span>
          <h2 className="font-serif text-2xl font-bold text-ink mt-1">
            The Curated Reading Room
          </h2>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            TrikaKosh is designed to be the single best starting resource, pointing serious aspirants directly to verified critical editions, authoritative print translations, and unbroken oral lineages:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bibliography.map((entry, idx) => (
            <div key={idx} className="p-5 bg-surface/50 rounded-lg hairline-border space-y-3">
              <h3 className="font-serif font-bold text-base text-ink">
                {entry.author}
              </h3>
              <ul className="list-disc list-inside text-xs font-serif italic text-vermilion space-y-1">
                {entry.works.map((w, wIdx) => (
                  <li key={wIdx}>{w}</li>
                ))}
              </ul>
              <p className="text-xs text-ink-muted leading-relaxed font-sans pt-1">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
