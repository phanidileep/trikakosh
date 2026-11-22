import json
import os

os.makedirs('src/data/ontology', exist_ok=True)

# 1. 36 TATTVAS
tattvas = [
    # ŚUDDHA TATTVAS (1-5)
    {
        "id": "TATTVA.01",
        "kind": "Tattva",
        "number": 1,
        "nameIast": "Śiva Tattva",
        "nameDevanagari": "शिवतत्त्व",
        "order": "suddha",
        "englishName": "Pure Consciousness / Transcendent Light",
        "functionDescription": "The uncontracted, self-luminous substrate of all reality (Prakāśa). The supreme subject holding all potential existence within undivided identity.",
        "cosmicRole": "Supreme uncaused cause; the transcendent pole of the non-dual Divine (Prakāśa).",
        "mappedVerses": ["PH.1", "SS.1.1", "SK.1.1", "BS.1"]
    },
    {
        "id": "TATTVA.02",
        "kind": "Tattva",
        "number": 2,
        "nameIast": "Śakti Tattva",
        "nameDevanagari": "शक्तितत्त्व",
        "order": "suddha",
        "englishName": "Dynamic Self-Awareness / Reflective Pulsation",
        "functionDescription": "The kinetic self-reflection (Vimarśa) and supreme sovereign freedom (Svātantrya) through which consciousness mirrors itself as the universe.",
        "cosmicRole": "The creative energy inseparable from Śiva; the womb of all manifestation.",
        "mappedVerses": ["PH.1", "PH.2", "SS.1.13", "SK.1.1", "BS.4"]
    },
    {
        "id": "TATTVA.03",
        "kind": "Tattva",
        "number": 3,
        "nameIast": "Sadāśiva Tattva (Sādākhya)",
        "nameDevanagari": "सदाशिवतत्त्व",
        "order": "suddha",
        "englishName": "Will to Manifest (Aham Idam)",
        "functionDescription": "The initial divine stir (Icchā) to project objective reality. Experiential state is 'I am This' (Aham Idam), with primary focus on the 'I' (Aham).",
        "cosmicRole": "Dominance of the Will (Icchā-Śakti); objective universe glimmers as a faint internal feeling.",
        "mappedVerses": ["PH.3", "SS.1.5", "SK.1.2"]
    },
    {
        "id": "TATTVA.04",
        "kind": "Tattva",
        "number": 4,
        "nameIast": "Īśvara Tattva",
        "nameDevanagari": "ईश्वरतत्त्व",
        "order": "suddha",
        "englishName": "Cosmic Objective Vision (Idam Aham)",
        "functionDescription": "Dominance of Divine Knowledge (Jñāna-Śakti). The objective universe stands out clearly as 'This am I' (Idam Aham), emphasizing objectivity without dualistic division.",
        "cosmicRole": "Dominance of Knowledge (Jñāna-Śakti); the cosmos is lucidly surveyed as one's own body.",
        "mappedVerses": ["PH.3", "SS.1.14", "SK.1.3"]
    },
    {
        "id": "TATTVA.05",
        "kind": "Tattva",
        "number": 5,
        "nameIast": "Śuddhavidyā Tattva (Sadvidyā)",
        "nameDevanagari": "शुद्धविद्यातत्त्व",
        "order": "suddha",
        "englishName": "Equilibrium of Subject & Object",
        "functionDescription": "Dominance of Divine Action (Kriyā-Śakti). Perfect equilibrium between 'I' and 'This' ('Aham eva Idam' - I am This, and This is I). The portal between the pure and contracted domains.",
        "cosmicRole": "Dominance of Action (Kriyā-Śakti); foundation for the awakening of Vidyeśvaras and Mantras.",
        "mappedVerses": ["PH.3", "SS.1.21", "SK.1.4"]
    },
    # ŚUDDHĀŚUDDHA TATTVAS (6-12)
    {
        "id": "TATTVA.06",
        "kind": "Tattva",
        "number": 6,
        "nameIast": "Māyā Tattva",
        "nameDevanagari": "मायातत्त्व",
        "order": "suddhasuddha",
        "englishName": "Cosmic Obscuration & Differentiation",
        "functionDescription": "The divine power of self-veiling that produces the illusion of separation between subject and object, self and other.",
        "malaOrKancuka": "Māyīya Mala matrix",
        "cosmicRole": "The cosmic veil through which the Infinite Lord voluntarily experiences contraction (Saṅkoca).",
        "mappedVerses": ["PH.4", "SS.1.2", "SS.3.3", "SK.1.8"]
    },
    {
        "id": "TATTVA.07",
        "kind": "Tattva",
        "number": 7,
        "nameIast": "Kalā Tattva",
        "nameDevanagari": "कलातत्त्व",
        "order": "suddhasuddha",
        "englishName": "Cloak of Limited Agency",
        "functionDescription": "The first Kañcuka (cloak), contracting the Lord's absolute omnipotence (Sarvakartṛtva) into limited, partial capacity for action.",
        "malaOrKancuka": "Kañcuka 1 (Contracts Sarvakartṛtva)",
        "cosmicRole": "Allows the contracted soul (Paśu) to perform fractional tasks in the physical universe.",
        "mappedVerses": ["PH.9", "SS.3.3", "SK.1.9"]
    },
    {
        "id": "TATTVA.08",
        "kind": "Tattva",
        "number": 8,
        "nameIast": "Vidyā Tattva (Aśuddhavidyā)",
        "nameDevanagari": "विद्यातत्त्व",
        "order": "suddhasuddha",
        "englishName": "Cloak of Limited Knowledge",
        "functionDescription": "The second Kañcuka, contracting absolute omniscience (Sarvajñatva) into fragmentary, discursive cognition through sensory instruments.",
        "malaOrKancuka": "Kañcuka 2 (Contracts Sarvajñatva)",
        "cosmicRole": "Restricts awareness so that knowing one object obscures knowing another.",
        "mappedVerses": ["PH.9", "SS.1.2", "SS.3.2"]
    },
    {
        "id": "TATTVA.09",
        "kind": "Tattva",
        "number": 9,
        "nameIast": "Rāga Tattva",
        "nameDevanagari": "रागतत्त्व",
        "order": "suddhasuddha",
        "englishName": "Cloak of Attachment & Craving",
        "functionDescription": "The third Kañcuka, contracting absolute divine fullness (Pūrṇatva) into an existential ache of lack, driving desire for external objects.",
        "malaOrKancuka": "Kañcuka 3 (Contracts Pūrṇatva)",
        "cosmicRole": "Instills insatiable thirst (Rāga) to seek wholeness in transient material forms.",
        "mappedVerses": ["PH.9", "SS.3.3", "SK.1.10"]
    },
    {
        "id": "TATTVA.10",
        "kind": "Tattva",
        "number": 10,
        "nameIast": "Kāla Tattva",
        "nameDevanagari": "कालतत्त्व",
        "order": "suddhasuddha",
        "englishName": "Cloak of Sequential Time",
        "functionDescription": "The fourth Kañcuka, contracting timeless eternity (Nityatva) into past, present, and future, creating anxiety of mortality and decay.",
        "malaOrKancuka": "Kañcuka 4 (Contracts Nityatva)",
        "cosmicRole": "Imposes sequence (Krama) and duration upon consciousness.",
        "mappedVerses": ["PH.9", "SS.3.3", "VBT.24"]
    },
    {
        "id": "TATTVA.11",
        "kind": "Tattva",
        "number": 11,
        "nameIast": "Niyati Tattva",
        "nameDevanagari": "नियत्तितत्त्व",
        "order": "suddhasuddha",
        "englishName": "Cloak of Spatial & Causal Constraint",
        "functionDescription": "The fifth Kañcuka, contracting all-pervasive omnipresence (Vyāpakatva) into spatial localization, physical boundaries, and deterministic karmic law.",
        "malaOrKancuka": "Kañcuka 5 (Contracts Vyāpakatva)",
        "cosmicRole": "Binds the experiencer to specific cause-and-effect rules and physical coordinates.",
        "mappedVerses": ["PH.9", "SS.3.3"]
    },
    {
        "id": "TATTVA.12",
        "kind": "Tattva",
        "number": 12,
        "nameIast": "Puruṣa Tattva",
        "nameDevanagari": "पुरुषतत्त्व",
        "order": "suddhasuddha",
        "englishName": "The Contracted Experiencer / Limited Soul",
        "functionDescription": "Pure consciousness enveloped by the 5 Kañcukas and clouded by the 3 Malas. The bound individual (Paśu / Aṇu) experiencing pleasure and pain.",
        "cosmicRole": "The microcosm in which Śiva plays as a finite individual seeking self-recognition.",
        "mappedVerses": ["PH.4", "PH.6", "SS.3.34", "SK.1.11"]
    },
    # AŚUDDHA TATTVAS (13-36)
    {
        "id": "TATTVA.13",
        "kind": "Tattva",
        "number": 13,
        "nameIast": "Prakṛti Tattva",
        "nameDevanagari": "प्रकृतितत्त्व",
        "order": "asuddha",
        "englishName": "The Objective Matrix of Nature",
        "functionDescription": "The primordial objective substrate of all manifest forms and psychological states, composed of the three Guṇas (Sattva, Rajas, Tamas) in equilibrium.",
        "cosmicRole": "Provides the raw substance for mental faculties and physical embodiment.",
        "mappedVerses": ["PH.4", "SK.1.12"]
    },
    {
        "id": "TATTVA.14",
        "kind": "Tattva",
        "number": 14,
        "nameIast": "Buddhi Tattva",
        "nameDevanagari": "बुद्धितत्त्व",
        "order": "asuddha",
        "englishName": "Higher Intellect / Decisive Faculty",
        "functionDescription": "The discerning and determinative inner faculty (Niścayātmikā). Reflects the light of consciousness and holds intuitive certitude and memory.",
        "cosmicRole": "Determines the nature of objects and acts as the bridge between mind and self.",
        "mappedVerses": ["PH.5", "SS.3.12", "SK.1.13"]
    },
    {
        "id": "TATTVA.15",
        "kind": "Tattva",
        "number": 15,
        "nameIast": "Ahaṅkāra Tattva",
        "nameDevanagari": "अहङ्कारतत्त्व",
        "order": "asuddha",
        "englishName": "Ego-Sense / Individuated I-Maker",
        "functionDescription": "The faculty of subjective appropriation (Abhimāna) that says 'I am this body, this mind, this bundle of possessions and desires'.",
        "cosmicRole": "Creates the rigid subjective knot that identifies with psycho-physical limits.",
        "mappedVerses": ["PH.5", "SS.3.13", "SK.1.14"]
    },
    {
        "id": "TATTVA.16",
        "kind": "Tattva",
        "number": 16,
        "nameIast": "Manas Tattva",
        "nameDevanagari": "मनस्तत्त्व",
        "order": "asuddha",
        "englishName": "Deliberating Mind / Sensory Coordinator",
        "functionDescription": "The oscillating cognitive instrument engaged in selection, rejection, and doubt (Saṅkalpa-Vikalpa), coordinating sensory inputs.",
        "cosmicRole": "Filters perceptual stimuli into continuous associative thinking.",
        "mappedVerses": ["PH.5", "SS.3.1", "VBT.32"]
    },
    # Jñānendriyas (17-21)
    {
        "id": "TATTVA.17",
        "kind": "Tattva",
        "number": 17,
        "nameIast": "Śrotra Tattva",
        "nameDevanagari": "श्रोत्रतत्त्व",
        "order": "asuddha",
        "englishName": "Auditory Cognitive Sense (Hearing)",
        "functionDescription": "The subtle sensory power that cognizes sound patterns and sonic resonance.",
        "cosmicRole": "Sense organ for perceiving Śabda.",
        "mappedVerses": ["SS.3.11", "VBT.38"]
    },
    {
        "id": "TATTVA.18",
        "kind": "Tattva",
        "number": 18,
        "nameIast": "Tvak Tattva",
        "nameDevanagari": "त्वक्तत्त्व",
        "order": "asuddha",
        "englishName": "Tactile Cognitive Sense (Touch)",
        "functionDescription": "The subtle sensory power that cognizes temperature, texture, pressure, and bodily contact.",
        "cosmicRole": "Sense organ for perceiving Sparśa.",
        "mappedVerses": ["SS.3.11", "VBT.66"]
    },
    {
        "id": "TATTVA.19",
        "kind": "Tattva",
        "number": 19,
        "nameIast": "Cakṣus Tattva",
        "nameDevanagari": "चक्षुस्तत्त्व",
        "order": "asuddha",
        "englishName": "Visual Cognitive Sense (Sight)",
        "functionDescription": "The subtle sensory power that captures illumination, color, boundary, and spatial form.",
        "cosmicRole": "Sense organ for perceiving Rūpa.",
        "mappedVerses": ["SS.3.11", "VBT.33"]
    },
    {
        "id": "TATTVA.20",
        "kind": "Tattva",
        "number": 20,
        "nameIast": "Rasanā Tattva",
        "nameDevanagari": "रसनातत्त्व",
        "order": "asuddha",
        "englishName": "Gustatory Cognitive Sense (Taste)",
        "functionDescription": "The subtle sensory power that cognizes chemical sweetness, bitterness, savor, and nourishment.",
        "cosmicRole": "Sense organ for perceiving Rasa.",
        "mappedVerses": ["SS.3.11", "VBT.72"]
    },
    {
        "id": "TATTVA.21",
        "kind": "Tattva",
        "number": 21,
        "nameIast": "Ghrāṇa Tattva",
        "nameDevanagari": "घ्राणतत्त्व",
        "order": "asuddha",
        "englishName": "Olfactory Cognitive Sense (Smell)",
        "functionDescription": "The subtle sensory power that cognizes fragrance, aroma, and earthly scent.",
        "cosmicRole": "Sense organ for perceiving Gandha.",
        "mappedVerses": ["SS.3.11", "VBT.73"]
    },
    # Karmendriyas (22-26)
    {
        "id": "TATTVA.22",
        "kind": "Tattva",
        "number": 22,
        "nameIast": "Vāk Tattva",
        "nameDevanagari": "वाक्तत्त्व",
        "order": "asuddha",
        "englishName": "Instrument of Articulate Speech",
        "functionDescription": "The executive capacity to express thoughts through vocal vibration and linguistic articulation.",
        "cosmicRole": "Motor organ of verbal communication.",
        "mappedVerses": ["SS.3.11", "SK.1.20"]
    },
    {
        "id": "TATTVA.23",
        "kind": "Tattva",
        "number": 23,
        "nameIast": "Pāṇi Tattva",
        "nameDevanagari": "पाणितत्त्व",
        "order": "asuddha",
        "englishName": "Instrument of Grasping & Manipulation",
        "functionDescription": "The executive capacity of prehension, craft, manual interaction, and touch-based action.",
        "cosmicRole": "Motor organ of holding and shaping objects.",
        "mappedVerses": ["SS.3.11"]
    },
    {
        "id": "TATTVA.24",
        "kind": "Tattva",
        "number": 24,
        "nameIast": "Pāda Tattva",
        "nameDevanagari": "पादतत्त्व",
        "order": "asuddha",
        "englishName": "Instrument of Locomotion",
        "functionDescription": "The executive capacity for bodily movement, walking, navigation, and traversal through space.",
        "cosmicRole": "Motor organ of physical motility.",
        "mappedVerses": ["SS.3.11"]
    },
    {
        "id": "TATTVA.25",
        "kind": "Tattva",
        "number": 25,
        "nameIast": "Pāyu Tattva",
        "nameDevanagari": "पायुतत्त्व",
        "order": "asuddha",
        "englishName": "Instrument of Elimination",
        "functionDescription": "The executive biological capacity for excretion, discharge, and physical evacuation.",
        "cosmicRole": "Motor organ of cellular and organic cleansing.",
        "mappedVerses": ["SS.3.11"]
    },
    {
        "id": "TATTVA.26",
        "kind": "Tattva",
        "number": 26,
        "nameIast": "Upastha Tattva",
        "nameDevanagari": "उपस्थतत्त्व",
        "order": "asuddha",
        "englishName": "Instrument of Generation & Orgasm",
        "functionDescription": "The executive capacity for sexual reproduction, intense sensory ecstasy, and generative potency.",
        "cosmicRole": "Motor organ of biological generation and ecstatic absorption.",
        "mappedVerses": ["SS.3.11", "VBT.68", "VBT.69"]
    },
    # Tanmātras (27-31)
    {
        "id": "TATTVA.27",
        "kind": "Tattva",
        "number": 27,
        "nameIast": "Śabda Tanmātra",
        "nameDevanagari": "शब्दतन्मात्र",
        "order": "asuddha",
        "englishName": "Subtle Essence of Sound",
        "functionDescription": "The archetypal sonic potential and vibrational resonance in space prior to particulate gross sounds.",
        "cosmicRole": "Subtle template that condenses into physical Ākāśa.",
        "mappedVerses": ["VBT.38", "VBT.39"]
    },
    {
        "id": "TATTVA.28",
        "kind": "Tattva",
        "number": 28,
        "nameIast": "Sparśa Tanmātra",
        "nameDevanagari": "स्पर्गतन्मात्र",
        "order": "asuddha",
        "englishName": "Subtle Essence of Touch",
        "functionDescription": "The archetypal potential of pressure, vibration, tactile feeling, and kinetic warmth.",
        "cosmicRole": "Subtle template that condenses into physical Vāyu.",
        "mappedVerses": ["VBT.66", "VBT.67"]
    },
    {
        "id": "TATTVA.29",
        "kind": "Tattva",
        "number": 29,
        "nameIast": "Rūpa Tanmātra",
        "nameDevanagari": "रूपतन्मात्र",
        "order": "asuddha",
        "englishName": "Subtle Essence of Form & Color",
        "functionDescription": "The archetypal visual potential of luminescence, chromatic hue, structural boundary, and geometry.",
        "cosmicRole": "Subtle template that condenses into physical Tejas.",
        "mappedVerses": ["VBT.37", "VBT.76"]
    },
    {
        "id": "TATTVA.30",
        "kind": "Tattva",
        "number": 30,
        "nameIast": "Rasa Tanmātra",
        "nameDevanagari": "रसतन्मात्र",
        "order": "asuddha",
        "englishName": "Subtle Essence of Taste / Flavor",
        "functionDescription": "The archetypal gustatory potential of fluid sweetness, sapidity, juice, and chemical affinity.",
        "cosmicRole": "Subtle template that condenses into physical Jala.",
        "mappedVerses": ["VBT.72"]
    },
    {
        "id": "TATTVA.31",
        "kind": "Tattva",
        "number": 31,
        "nameIast": "Gandha Tanmātra",
        "nameDevanagari": "गन्धतन्मात्र",
        "order": "asuddha",
        "englishName": "Subtle Essence of Odor",
        "functionDescription": "The archetypal olfactory potential of fragrance, terrestrial density, and odorant particulate matter.",
        "cosmicRole": "Subtle template that condenses into physical Pṛthivī.",
        "mappedVerses": ["VBT.73"]
    },
    # Mahābhūtas (32-36)
    {
        "id": "TATTVA.32",
        "kind": "Tattva",
        "number": 32,
        "nameIast": "Ākāśa Tattva",
        "nameDevanagari": "आकाशतत्त्व",
        "order": "asuddha",
        "englishName": "Gross Element Ether / Space",
        "functionDescription": "The physical spatial continuum that provides room for all movement, acoustic wave transmission, and atomic positioning.",
        "cosmicRole": "Accommodates all other elements without offering resistance.",
        "mappedVerses": ["PH.15", "VBT.43", "VBT.44", "VBT.84"]
    },
    {
        "id": "TATTVA.33",
        "kind": "Tattva",
        "number": 33,
        "nameIast": "Vāyu Tattva",
        "nameDevanagari": "वायुतत्त्व",
        "order": "asuddha",
        "englishName": "Gross Element Air",
        "functionDescription": "The dynamic gaseous principle of mobility, atmospheric drift, kinetic friction, and respiration (Prāṇa).",
        "cosmicRole": "Powers the biological breath and drives kinetic interactions.",
        "mappedVerses": ["PH.17", "SS.3.22", "VBT.24", "VBT.25"]
    },
    {
        "id": "TATTVA.34",
        "kind": "Tattva",
        "number": 34,
        "nameIast": "Tejas Tattva (Agni)",
        "nameDevanagari": "तेजस्तत्त्व",
        "order": "asuddha",
        "englishName": "Gross Element Fire",
        "functionDescription": "The thermal principle of combustion, illumination, transformation, metabolic digestion, and vision.",
        "cosmicRole": "Cooks, clarifies, and metabolizes experiences into conscious comprehension.",
        "mappedVerses": ["PH.14", "VBT.52", "VBT.53"]
    },
    {
        "id": "TATTVA.35",
        "kind": "Tattva",
        "number": 35,
        "nameIast": "Āpas Tattva (Jala)",
        "nameDevanagari": "आपस्तत्त्व",
        "order": "asuddha",
        "englishName": "Gross Element Water",
        "functionDescription": "The liquid principle of cohesion, fluidity, physiological moisture, cooling satisfaction, and solvent action.",
        "cosmicRole": "Holds physical structures together through cohesion and hydration.",
        "mappedVerses": ["VBT.45", "VBT.61"]
    },
    {
        "id": "TATTVA.36",
        "kind": "Tattva",
        "number": 36,
        "nameIast": "Pṛthivī Tattva",
        "nameDevanagari": "पृथिवीतत्त्व",
        "order": "asuddha",
        "englishName": "Gross Element Earth",
        "functionDescription": "The solid, gravitational foundation of physical reality characterized by weight, mass, tactile density, and structural permanence.",
        "cosmicRole": "The final anchor of creation; the solid footing on which the divine game unfolds.",
        "mappedVerses": ["PH.1", "PH.15", "SS.3.42", "BS.2"]
    }
]

with open('src/data/ontology/tattvas.json', 'w', encoding='utf-8') as f:
    json.dump(tattvas, f, indent=2, ensure_ascii=False)
print(f'Wrote {len(tattvas)} Tattvas to src/data/ontology/tattvas.json')

# 2. 4 UPĀYAS
upayas = [
    {
        "id": "UPAYA.ANUPAYA",
        "kind": "Upaya",
        "nameIast": "Anupāya (Ānandopāya)",
        "nameDevanagari": "अनुपाय",
        "level": "Immediate / Transcendental",
        "facultyEmployed": "Immediate Grace (Śaktipāta) and Unmediated Intuition",
        "orientation": "No method, no meditation, no effort. The realization that Consciousness is already fully awake, omnipresent, and incapable of ever having been bound.",
        "practicalApproach": "Spontaneous instant recognition upon hearing the master's word or through divine lightning-flash (Tīvra-Śaktipāta).",
        "canonicalAnchor": "Tantrāloka 2; Pratyabhijñāhṛdayam Sūtra 19; Spanda Kārikā 4.1-2.",
        "mappedVerses": ["PH.19", "SK.4.1", "BS.1", "BS.9"]
    },
    {
        "id": "UPAYA.SAMBHAVA",
        "kind": "Upaya",
        "nameIast": "Śāmbhavopāya (Icchopāya)",
        "nameDevanagari": "शाम्भवोपाय",
        "level": "Direct / Thought-free (Nirvikalpa)",
        "facultyEmployed": "Sovereign Will (Icchā) and Bare Unconstructed Attention",
        "orientation": "Immersion into Consciousness by dissolving thought constructs at the very moment of their emergence, resting in the pure witness without cognitive elaboration.",
        "practicalApproach": "Catching the gap (Madhya) between two breaths or thoughts; sudden astonishment (Vismaya); seizing the sudden surge of exertion (Udyama).",
        "canonicalAnchor": "Śiva Sūtras Section 1 (Unmeṣa 1); Vijñāna Bhairava Tantra verses 24, 27, 32, 59, 100.",
        "mappedVerses": ["SS.1.5", "SS.1.12", "SS.1.22", "SK.1.1", "VBT.24", "VBT.27", "VBT.32"]
    },
    {
        "id": "UPAYA.SAKTA",
        "kind": "Upaya",
        "nameIast": "Śāktopāya (Jñānopāya)",
        "nameDevanagari": "शाक्तोपाय",
        "level": "Subtle / Cognitive (Śuddhavikalpa)",
        "facultyEmployed": "Discerning Knowledge (Jñāna) and Purified Intuitive Contemplation",
        "orientation": "Transforming contracted, divisive thoughts into pure expansive, non-dual contemplation (Śuddha-vikalpa) through discernment and aesthetic absorption.",
        "practicalApproach": "Replacing thoughts of weakness with the absolute conviction 'I am the All-Transcending Consciousness'; tracing an emotion or sense experience back to its radiant source.",
        "canonicalAnchor": "Śiva Sūtras Section 2 (Unmeṣa 2); Pratyabhijñāhṛdayam Sūtras 13, 17, 18; Vijñāna Bhairava Tantra verses 38, 52, 72, 73.",
        "mappedVerses": ["SS.2.1", "SS.2.3", "PH.13", "PH.17", "SK.1.21", "VBT.38", "VBT.52", "VBT.72"]
    },
    {
        "id": "UPAYA.ANAVA",
        "kind": "Upaya",
        "nameIast": "Āṇavopāya (Kriyopāya)",
        "nameDevanagari": "आणवोपाय",
        "level": "Progressive / Physical-Sensory (Vikalpamaya)",
        "facultyEmployed": "Action (Kriyā), Physical Breath, Sensory Organs, Mantra, and Visualization",
        "orientation": "Utilizing finite bodily and environmental instruments to still the agitated psycho-physical system and lead it inward toward the silent heart.",
        "practicalApproach": "Prāṇāyāma (breath regulation), Ucchāra (audible mantra resonance), Karaṇa (yogic body postures), sensory focal meditations, and ritual devotion.",
        "canonicalAnchor": "Śiva Sūtras Section 3 (Unmeṣa 3); Vijñāna Bhairava Tantra verses 43, 66, 68, 76, 84; Bhairava Stava.",
        "mappedVerses": ["SS.3.1", "SS.3.20", "SS.3.26", "PH.18", "VBT.43", "VBT.66", "VBT.84", "BS.3", "BS.7"]
    }
]

with open('src/data/ontology/upayas.json', 'w', encoding='utf-8') as f:
    json.dump(upayas, f, indent=2, ensure_ascii=False)
print(f'Wrote {len(upayas)} Upāyas to src/data/ontology/upayas.json')

# 3. 3 MALAS
malas = [
    {
        "id": "MALA.ANAVA",
        "kind": "Mala",
        "nameIast": "Āṇava Mala",
        "nameDevanagari": "आणवमल",
        "description": "The primordial, innate spiritual impurity of self-limitation and perceived existential lack. It is the root illusion through which the limitless Lord feels 'I am tiny, finite, incomplete, and helpless'.",
        "manifestation": "Existential anxiety, feelings of inadequacy, craving for validation, and the foundational split between the self and the fullness of divine reality.",
        "dissolutionMethod": "Dissolved through Śāmbhavopāya and direct Śaktipāta, realizing the innate purity and uncontracted sovereignty (Svātantrya) of one's true nature.",
        "mappedVerses": ["PH.7", "PH.9", "SS.1.2", "SK.1.8"]
    },
    {
        "id": "MALA.MAYIYA",
        "kind": "Mala",
        "nameIast": "Māyīya Mala",
        "nameDevanagari": "मायीयमल",
        "description": "The impurity of dualistic perception that fractures seamless consciousness into competing subjects, objects, friends, and enemies.",
        "manifestation": "Perceiving the external world as separate from and independent of Consciousness; seeing the body and environment as alien matter.",
        "dissolutionMethod": "Dissolved through Śāktopāya (purified cognitive inquiry) and Pratyabhijñā (recognition that every object is an Ābhāsa/shining of one's own awareness).",
        "mappedVerses": ["PH.7", "PH.9", "SS.3.3", "SK.1.9"]
    },
    {
        "id": "MALA.KARMA",
        "kind": "Mala",
        "nameIast": "Kārma Mala",
        "nameDevanagari": "कार्ममल",
        "description": "The impurity of moralistic entanglement and bound agency that assumes 'I am the individual doer, and I must reap good or bad consequences according to merit and demerit'.",
        "manifestation": "Guilt, compulsive striving, attachment to fruits of action, and entrapment within cycles of rebirth and psychological anxiety.",
        "dissolutionMethod": "Dissolved through Āṇavopāya (surrendering actions to the supreme Lord) and recognizing that all action is the divine play of Śakti (Spanda).",
        "mappedVerses": ["PH.7", "PH.9", "SS.3.35", "SK.1.10", "BS.3"]
    }
]

with open('src/data/ontology/malas.json', 'w', encoding='utf-8') as f:
    json.dump(malas, f, indent=2, ensure_ascii=False)
print(f'Wrote {len(malas)} Malas to src/data/ontology/malas.json')

# 4. MASTER LINEAGE
lineage = [
    {
        "id": "MASTER.VASUGUPTA",
        "kind": "Master",
        "nameIast": "Vasugupta",
        "nameDevanagari": "वसुगुप्त",
        "century": "late 8th – early 9th century CE",
        "lineageRole": "Foundational Revealer of the Spanda and Śiva Sūtra traditions",
        "biographicalNotes": "According to tradition, Vasugupta resided on Mount Mahādeva in the Harwan valley of Kashmir. Lord Śiva appeared to him in a dream, directing him to a large rock (the Śaṅkaropalā) where the Śiva Sūtras were miraculously inscribed.",
        "coreWorks": ["Śiva Sūtras (revealed)", "Spanda Sūtras / Kārikās (author or teacher of Kallaṭa)"],
        "guruOf": ["MASTER.KALLATA"],
        "studentOf": []
    },
    {
        "id": "MASTER.KALLATA",
        "kind": "Master",
        "nameIast": "Bhaṭṭa Kallaṭa",
        "nameDevanagari": "भट्टकल्लट",
        "century": "mid 9th century CE (reign of King Avantivarman 855–883 CE)",
        "lineageRole": "First Systematic Expositor of Spanda Doctrine",
        "biographicalNotes": "Chief disciple of Vasugupta who disseminated the teachings during the flourishing golden age of King Avantivarman. Authored the Spandavṛtti and Spandasarvasva to protect the lineage from dualistic misinterpretations.",
        "coreWorks": ["Spandavṛtti", "Tattvavicāra"],
        "guruOf": ["MASTER.PRADYUMNABHATTA"],
        "studentOf": ["MASTER.VASUGUPTA"]
    },
    {
        "id": "MASTER.SOMANANDA",
        "kind": "Master",
        "nameIast": "Somānanda",
        "nameDevanagari": "सोमानन्द",
        "century": "early 10th century CE (~900–950 CE)",
        "lineageRole": "Founder of the Pratyabhijñā (Recognition) School",
        "biographicalNotes": "The philosophical titan who established the non-dual epistemology of Recognition with his masterpiece Śivadṛṣṭi ('The Vision of Śiva'). He rigorously defeated the dualist Śaiva Siddhānta, Buddhist Vijñānavāda, and Advaita Māyāvāda schools.",
        "coreWorks": ["Śivadṛṣṭi"],
        "guruOf": ["MASTER.UTPALADEVA"],
        "studentOf": []
    },
    {
        "id": "MASTER.UTPALADEVA",
        "kind": "Master",
        "nameIast": "Utpaladeva",
        "nameDevanagari": "उत्पलदेव",
        "century": "mid 10th century CE (~925–975 CE)",
        "lineageRole": "Philosopher-Poet of Pratyabhijñā & Mystical Love",
        "biographicalNotes": "Disciple of Somānanda. Composed the foundational philosophical treatise Īśvarapratyabhijñākārikā, giving Kashmir Shaivism its invincible dialectical armor, alongside his ecstatic devotional poems the Śivastotrāvalī.",
        "coreWorks": ["Īśvarapratyabhijñākārikā", "Śivastotrāvalī", "Ajadapramātṛsiddhi", "Īśvarapratyabhijñāvṛtti"],
        "guruOf": ["MASTER.LAKSMANAGUPTA"],
        "studentOf": ["MASTER.SOMANANDA"]
    },
    {
        "id": "MASTER.LAKSMANAGUPTA",
        "kind": "Master",
        "nameIast": "Lakṣmaṇagupta",
        "nameDevanagari": "लक्ष्मणगुप्त",
        "century": "late 10th century CE",
        "lineageRole": "Crucial Link between Utpaladeva and Abhinavagupta",
        "biographicalNotes": "Son and disciple of Utpaladeva in Pratyabhijñā philosophy; also deeply initiated in the Trika and Krama Tantric transmissions. Transmitted the core Pratyabhijñā doctrines directly to Abhinavagupta.",
        "coreWorks": ["Oral and lineage transmissions in Pratyabhijñā and Tantra"],
        "guruOf": ["MASTER.ABHINAVAGUPTA"],
        "studentOf": ["MASTER.UTPALADEVA"]
    },
    {
        "id": "MASTER.ABHINAVAGUPTA",
        "kind": "Master",
        "nameIast": "Abhinavagupta",
        "nameDevanagari": "अभिनवगुप्त",
        "century": "c. 975 – 1025 CE",
        "lineageRole": "The Supreme Polymath & Grand Synthesizer of Trika",
        "biographicalNotes": "Universally revered as the incarnation of Bhairava or Śeṣa. In him, every stream of Indian philosophy, aesthetics, dramaturgy (Abhinavabhāratī), poetics (Locana), and non-dual tantra converged. He synthesized Trika, Krama, Kula, and Pratyabhijñā into the monumental Tantrāloka.",
        "coreWorks": ["Tantrāloka", "Tantrasāra", "Īśvarapratyabhijñāvimarśinī", "Parātrīśikāvivaraṇa", "Bhairavastava", "Bodhapñcadaśikā"],
        "guruOf": ["MASTER.KSEMARAJA"],
        "studentOf": ["MASTER.LAKSMANAGUPTA", "MASTER.SAMBHUNATHA"]
    },
    {
        "id": "MASTER.KSEMARAJA",
        "kind": "Master",
        "nameIast": "Kṣemarāja",
        "nameDevanagari": "क्षेमराज",
        "century": "11th century CE (~1000–1050 CE)",
        "lineageRole": "Master Pedagogist & Preserver of the Trika Canon",
        "biographicalNotes": "Chief disciple of Abhinavagupta. Authored the accessible, sublime gateway text Pratyabhijñāhṛdayam ('The Heart of Recognition') to condense Abhinavagupta's vast corpus into 20 sūtras for aspirants of all capacities.",
        "coreWorks": ["Pratyabhijñāhṛdayam", "Śivasūtravimarśinī", "Spandanirṇaya", "Spandasandoha", "Netratantroddyota", "Svacchandatantroddyota"],
        "guruOf": [],
        "studentOf": ["MASTER.ABHINAVAGUPTA"]
    },
    {
        "id": "MASTER.JAYARATHA",
        "kind": "Master",
        "nameIast": "Jayaratha",
        "nameDevanagari": "जयरथ",
        "century": "12th century CE (~1150–1200 CE)",
        "lineageRole": "Definitive Commentator on Abhinavagupta's Tantrāloka",
        "biographicalNotes": "Lived in Srinagar, Kashmir. Composed the monumental commentary Tantrālokaviveka, explaining every esoteric reference, scriptural citation, and ritual instruction in Abhinavagupta's masterwork, preserving the living oral key of Trika.",
        "coreWorks": ["Tantrālokaviveka"],
        "guruOf": [],
        "studentOf": []
    }
]

with open('src/data/ontology/lineage.json', 'w', encoding='utf-8') as f:
    json.dump(lineage, f, indent=2, ensure_ascii=False)
print(f'Wrote {len(lineage)} Masters to src/data/ontology/lineage.json')
