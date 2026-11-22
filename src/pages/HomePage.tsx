import React from 'react';
import { useApp } from '../context/AppContext';
import { CitationPill } from '../components/CitationPill';
import { Compass, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useApp();

  const falseFriendsData = [
    {
      topic: 'The Manifest World (Jagat)',
      popularView: 'Māyā / Illusion (Mithyā): An inexplicable error or false snake-on-the-rope to be negated and dismissed.',
      trikaView: 'Real Divine Projection (Ābhāsa): The joyful, self-willed radiance of Consciousness. The world is God appearing as forms.',
      verses: ['PH.1', 'PH.2', 'SK.1.1'],
    },
    {
      topic: 'Ultimate Reality',
      popularView: 'Static Nirguṇa Brahman: Pure passive luminescence (Prakāśa) without internal dynamism, feeling, or agency.',
      trikaView: 'Paramaśiva (Prakāśa + Vimarśa): Pure Light inseparable from dynamic self-reflective power and sovereign freedom (Svātantrya).',
      verses: ['SK.1.1', 'SS.1.1', 'BS.1'],
    },
    {
      topic: 'Who is Bhairava?',
      popularView: 'Wrathful Mythological Deity: A terrifying, dark god of cremation grounds and graveyard rituals.',
      trikaView: 'Fearless Totality of Consciousness: Bha (sustenance) + Ra (withdrawal) + Va (manifestation)—the non-dual ground of reality.',
      verses: ['SS.1.5', 'BS.1', 'BS.4'],
    },
    {
      topic: 'Emotion, Sensation & Desire',
      popularView: 'Obstacles to be Suppressed: Kāma (desire) and Krodha (anger) are toxic impurities to be severed and extinguished.',
      trikaView: 'Raw Kinetic Energy of Śakti: To be caught at the instant of arising without conceptual storyline, revealing pure Spanda.',
      verses: ['SK.1.21', 'VBT.73', 'SS.1.12'],
    },
    {
      topic: 'Liberation (Mokṣa)',
      popularView: 'Kaivalya / World-Negating Escape: Isolation from matter, cessation of experience, or waiting for physical death.',
      trikaView: 'Jīvanmukti / Sāmarasya: Ecstatic realization while fully embodied; relishing the entire cosmos as one\'s own divine body.',
      verses: ['PH.16', 'SS.3.30', 'BS.2'],
    },
  ];

  const textsProgress = [
    {
      id: 'PH',
      title: 'Stage 1: Pratyabhijñāhṛdayam',
      sanskrit: 'प्रत्यभिज्ञाहृदयम्',
      author: 'Kṣemarāja',
      count: '20 Sūtras',
      desc: 'The essential 20-sūtra gateway to Recognition. Explains how Consciousness descends into mind and ascends back to universality.',
      route: '/texts/PH',
    },
    {
      id: 'SS',
      title: 'Stage 2: Śiva Sūtras',
      sanskrit: 'शिवसूत्राणि',
      author: 'Revealed to Vasugupta',
      count: '77 Sūtras (3 Unmeṣas)',
      desc: 'The foundational revelation mapped into the three great practical methods: Śāmbhava, Śākta, and Āṇava Upāyas.',
      route: '/texts/SS',
    },
    {
      id: 'SK',
      title: 'Stage 3: Spanda Kārikās',
      sanskrit: 'स्पन्दकारिकाः',
      author: 'Vasugupta / Bhaṭṭa Kallaṭa',
      count: '53 Kārikās (4 Niḥsyandas)',
      desc: 'The dynamic throb of reality. Shows why Consciousness is not inert stillness, but the ecstatic pulse of living presence.',
      route: '/texts/SK',
    },
    {
      id: 'VBT',
      title: 'Stage 4: Vijñāna Bhairava Tantra',
      sanskrit: 'विज्ञानभैरवतन्त्रम्',
      author: 'Rudrayāmala Tantra',
      count: '162 Verses / 112 Dhāraṇās',
      desc: 'The ultimate contemplative laboratory. 112 practical experiential doorways using breath, sound, gaps, and space.',
      route: '/sadhana',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-16">
      {/* Editorial Hero Header */}
      <section className="space-y-4 text-center sm:text-left hairline-b pb-12">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded hairline-border bg-vermilion-subtle text-vermilion text-xs font-mono">
          <ShieldCheck size={14} />
          <span>Lineage-Accurate • Verbatim Sanskrit • Zero AI Hallucination</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
          TrikaKosh <span className="text-vermilion font-sanskrit text-3xl sm:text-4xl">त्रिककोश</span>
        </h1>
        <p className="font-serif text-lg sm:text-xl text-ink-muted italic max-w-3xl leading-relaxed">
          The open architectural starter platform for non-dual Kashmir Shaivism (Trika) & Bhairava Sādhana. Bridging rigorous philosophy, verbatim canonical Sanskrit, and practical contemplation.
        </p>

        {/* Orientation Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left">
          <div className="p-4 bg-surface rounded hairline-border space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
              1. What is Trika?
            </span>
            <p className="text-xs text-ink-muted leading-relaxed">
              Trika ('The Triad') is Kashmir's non-dual tantric philosophy integrating Śiva (Consciousness), Śakti (Dynamic Agency), and Aṇu (the Individual Experiencer) into one seamless reality.
            </p>
          </div>

          <div className="p-4 bg-surface rounded hairline-border space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
              2. Who is Bhairava?
            </span>
            <p className="text-xs text-ink-muted leading-relaxed">
              Not a wrathful mythological god, but the fearless reality: <em>Bha</em> (nourishment) + <em>Ra</em> (reabsorption) + <em>Va</em> (emanation)—the all-pervading ocean of pure Awareness <CitationPill id="SS.1.5" />.
            </p>
          </div>

          <div className="p-4 bg-surface rounded hairline-border space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
              3. The Pedagogical Order
            </span>
            <p className="text-xs text-ink-muted leading-relaxed">
              Taught in strict classical succession: Recognition (Pratyabhijñā) → Foundational Revelation (Śiva Sūtras) → Dynamic Vibration (Spanda) → Practical Contemplation (Vijñāna Bhairava).
            </p>
          </div>
        </div>
      </section>

      {/* 4-Text Initiation Order Cards */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">
              The 4-Text Initiation Sequence
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Follow the pedagogical order prescribed by Kashmiri masters.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/texts')}
            className="text-xs font-mono text-vermilion hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Texts</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {textsProgress.map((text) => (
            <div
              key={text.id}
              onClick={() => navigateTo(text.route)}
              className="p-5 bg-surface hover:bg-surface-hover hairline-border rounded-lg cursor-pointer transition-all hover:border-vermilion/40 space-y-3 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-vermilion transition-colors">
                    {text.title}
                  </h3>
                  <span className="font-sanskrit text-sm text-ink-muted">
                    {text.sanskrit}
                  </span>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 bg-paper rounded hairline-border text-ink-subtle">
                  {text.count}
                </span>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                {text.desc}
              </p>

              <div className="flex items-center justify-between pt-2 hairline-t text-xs font-mono text-ink-subtle">
                <span>By {text.author}</span>
                <span className="text-vermilion flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Enter Reader <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive False Friends Disambiguator Table */}
      <section className="space-y-5 hairline-t pt-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
            Pedagogical Clarity
          </span>
          <h2 className="font-serif text-2xl font-bold text-ink mt-1">
            The "False Friends" Disambiguator
          </h2>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Kashmir Shaivism is often confused with Classical Advaita Vedānta, Patañjali Classical Yoga, or Puranic mythology. Examine the radical non-dual distinctions taught by the Kashmiri masters:
          </p>
        </div>

        <div className="hairline-border rounded-lg overflow-hidden bg-surface/30">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-surface hairline-b text-ink-subtle uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-3.5 w-1/4">Philosophical Domain</th>
                  <th className="p-3.5 w-1/3 text-ink-muted">Popular / Advaita Assumption</th>
                  <th className="p-3.5 w-1/3 text-vermilion font-semibold">Kashmir Shaivism (Trika) Truth</th>
                  <th className="p-3.5 text-center">Grounded Verses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {falseFriendsData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface/50">
                    <td className="p-3.5 font-serif font-semibold text-ink text-sm">
                      {row.topic}
                    </td>
                    <td className="p-3.5 text-ink-muted leading-relaxed">
                      {row.popularView}
                    </td>
                    <td className="p-3.5 text-ink leading-relaxed bg-vermilion-subtle/20 font-medium">
                      {row.trikaView}
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {row.verses.map((v) => (
                          <CitationPill key={v} id={v} />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guided Modules CTA */}
      <section className="p-6 bg-surface rounded-lg hairline-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Compass className="text-vermilion" size={18} />
            <h3 className="font-serif text-lg font-bold text-ink">
              Guided Learning Path: "Zero to Trika in 7 Modules"
            </h3>
          </div>
          <p className="text-xs text-ink-muted max-w-xl">
            A linear, distraction-free reading curriculum with progress tracking, interactive hover tooltips, and verified verse citations.
          </p>
        </div>
        <button
          onClick={() => navigateTo('/learn')}
          className="px-4 py-2 bg-vermilion text-paper rounded font-medium text-xs hover:bg-vermilion/90 cursor-pointer flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>Start Module 1</span>
          <ArrowRight size={14} />
        </button>
      </section>

      {/* Sādhana Ethics & Traditional Boundary Notice */}
      <section className="p-5 bg-paper rounded-lg hairline-border border-slate-trika/40 space-y-3">
        <div className="flex items-center gap-2 text-slate-trika">
          <AlertCircle size={16} />
          <h4 className="font-serif font-semibold text-sm tracking-wide">
            Sādhana Ethics & Traditional Boundary Notice
          </h4>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          The Kashmiri lineage clearly distinguishes between two domains: First, <strong>Universal Contemplation & Philosophical Study</strong> (such as the study of Pratyabhijñā and the 112 awareness doorways of the Vijñāna Bhairava Tantra), which are accessible to all earnest human beings regardless of background. Second, <strong>Initiated Āgamic Mantras and Tantric Rituals</strong>, which historically require <em>dīkṣā</em> (formal spiritual initiation) and personal oversight from a qualified, living master. TrikaKosh serves as an archival educational and contemplative companion, respecting this boundary with full scholarly integrity.
        </p>
      </section>
    </div>
  );
};
