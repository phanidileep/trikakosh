import json
import os

os.makedirs('src/data/curriculum', exist_ok=True)
os.makedirs('src/data/graph', exist_ok=True)

# 1. 7 GUIDED LEARNING MODULES
modules = [
    {
        "id": "MODULE.01",
        "moduleNumber": 1,
        "slug": "who-is-bhairava",
        "title": "Who is Bhairava in Kashmir Shaivism?",
        "subtitle": "Beyond Dualistic Fear: The All-Pervading, Living Totality of Consciousness",
        "readingTimeMinutes": 7,
        "summary": "Discover why Bhairava in non-dual Trika is not a terrifying mythological destroyer, but the fearless, boundless reality of pure Consciousness that creates, sustains, and reabsorbs all experience.",
        "keyConcepts": ["CONCEPT.BHAIRAVA", "CONCEPT.PRAKASA", "CONCEPT.VIMARSA", "CONCEPT.SVATANTRYA"],
        "canonicalCitations": ["PH.1", "SS.1.5", "BS.1", "BS.4"],
        "sections": [
            {
                "heading": "The Etymological Revelation: Bha-Ra-Va",
                "paragraphs": [
                    "In popular folklore and puranic mythology, Bhairava is frequently depicted as a terrifying, wrathful deity accompanied by dogs and skulls. But in non-dual Kashmir Shaivism (Trika), the Kashmiri masters reveal an entirely different, sublime esoteric reality.",
                    "As Kṣemarāja and Abhinavagupta explain, the holy name Bhairava is an acoustic anagram of the entire cosmic rhythm: Bha signifies *bharaṇa*—the loving nourishment and sustenance of the cosmos; Ra signifies *ravaṇa*—the reabsorption and dissolution of all multiplicity back into the source; and Va signifies *vamana*—the joyful manifestation and projection of reality out of sheer ecstasy.",
                    "Thus, Bhairava is the living, breathing totality of Reality: that which unceasingly projects, maintains, and reabsorbs all thoughts, sensations, and galaxies within itself [PH.1]."
                ]
            },
            {
                "heading": "The Dissolution of Existential Dread",
                "paragraphs": [
                    "Why is this reality called fearsome to the ego? Because for the contracted, separate self (the Paśu), the sheer boundless infinity of pure awareness threatens the fragile boundaries of identity. To ignorance, infinite Consciousness looks like death.",
                    "Yet to the awakened heart, Bhairava is the ultimate refuge of absolute fearlessness. As Abhinavagupta sings in his devotional masterpiece [BS.1], Lord Bhairava is the sole shelter of the shelterless (*anātha-śaraṇyam*), experienced not as an outside monarch, but in one's own spiritual Heart (*hṛdi vande*).",
                    "When spiritual awakening strikes, it is not a slow academic reasoning; it is a sudden lightning flash of exertion (Udyama) where the illusion of weakness vanishes in an instant [SS.1.5]. As Abhinavagupta proclaims [BS.4], one who takes refuge in this contemplation becomes embodied with the formidable, loving power of Bhairava."
                ]
            }
        ],
        "contemplativeExercise": {
            "title": "Resting in the Fearless Heart",
            "instruction": "Close your eyes for three breaths. Notice the one who is aware of the breath. Is that awareness harmed by any thought? Is it bounded by any wall? Recognize that open space as Bhairava.",
            "groundedInVerse": "BS.1"
        }
    },
    {
        "id": "MODULE.02",
        "moduleNumber": 2,
        "slug": "prakasa-and-vimarsa",
        "title": "Prakāśa & Vimarśa: Why Consciousness is a Living Mirror",
        "subtitle": "The Inseparable Twin Poles of Non-Dual Reality",
        "readingTimeMinutes": 8,
        "summary": "Explore why Kashmir Shaivism rejects the idea of a passive, inert Absolute. Learn why pure Light (Prakāśa) must eternally pulse with self-aware agency (Vimarśa).",
        "keyConcepts": ["CONCEPT.PRAKASA", "CONCEPT.VIMARSA", "CONCEPT.SPANDA", "CONCEPT.SVATANTRYA"],
        "canonicalCitations": ["PH.1", "PH.2", "SK.1.1", "SS.1.13"],
        "sections": [
            {
                "heading": "The Critique of the Crystal Mirror",
                "paragraphs": [
                    "Classical Advaita Vedānta describes Brahman as pure Light—Prakāśa—often comparing it to a crystal or mirror that passively reflects the world. But the master Utpaladeva raised a devastating critique: If Consciousness were merely passive illumination like a crystal, it would be no better than an inert stone (jaḍa)!",
                    "A mirror reflects a face, but the mirror never knows 'I am reflecting a face'. A gemstone shines, but it cannot decide to illuminate or withdraw its radiance. For Consciousness to be truly conscious, it must possess self-awareness. It must actively know itself: 'I am Śiva'."
                ]
            },
            {
                "heading": "Vimarśa: The Living Self-Reflection",
                "paragraphs": [
                    "This active, self-reflective capacity is called Vimarśa. While Prakāśa is the luminous ground of reality, Vimarśa is the divine power that touches, savors, and knows that ground. Without Vimarśa, the universe would remain unmanifest and dark, because there would be no subjective tasting of reality [PH.1].",
                    "Because of this self-awareness, Consciousness possesses absolute sovereign freedom—Svātantrya. It does not need outside clay or physical matter to create; by its own free will, upon the screen of its own being, it projects the entire universe [PH.2].",
                    "This eternal dance between the unmoving Light and its ecstatic self-reflection is the primordial pulse: Spanda [SK.1.1]. The sovereign will of this dynamic union is personified as the Goddess Umā [SS.1.13]."
                ]
            }
        ],
        "contemplativeExercise": {
            "title": "Feeling the Mirror That Knows",
            "instruction": "Look at an object in front of you. Notice that you see it (Prakāśa). Now notice the subtle inner feeling: 'I am seeing this' (Vimarśa). Rest in that knowing subject.",
            "groundedInVerse": "PH.1"
        }
    },
    {
        "id": "MODULE.03",
        "moduleNumber": 3,
        "slug": "the-36-tattvas",
        "title": "The 36 Tattvas: How the Infinite Contracts Into 'Me'",
        "subtitle": "The Architectural Anatomy of Cosmic Descent and Ascending Recognition",
        "readingTimeMinutes": 10,
        "summary": "Follow the precise 36-stage cosmic map of Kashmir Shaivism, traversing the Pure, Mixed, and Impure orders to understand how universal Śiva plays as a human soul.",
        "keyConcepts": ["CONCEPT.SANKOCA", "CONCEPT.VIKASA", "CONCEPT.KANCUKA", "CONCEPT.PASU"],
        "canonicalCitations": ["PH.3", "PH.4", "PH.9", "TATTVA.01", "TATTVA.06", "TATTVA.12", "TATTVA.36"],
        "sections": [
            {
                "heading": "The Three Cosmic Orders",
                "paragraphs": [
                    "While ancient Sāṅkhya philosophy recognized 25 tattvas (principles of reality), Kashmir Shaivism revealed 11 higher divine principles, completing the definitive 36-Tattva architecture.",
                    "These 36 tattvas are structured in three distinct orders: First, the Śuddha Tattvas (1–5) [TATTVA.01], where subject and object remain united in divine non-duality. Here, Consciousness experiences 'I am This' with varying emphases of Will (Icchā), Knowledge (Jñāna), and Action (Kriyā) [PH.3].",
                    "Second, the Śuddhāśuddha Tattvas (6–12), where the divine curtain of Māyā [TATTVA.06] falls. Māyā wraps Consciousness in the five Kañcukas (cloaks of limited agency, knowledge, attachment, time, and space) [PH.9], turning the infinite Lord into the contracted experiencer: the Puruṣa [TATTVA.12].",
                    "Third, the Aśuddha Tattvas (13–36), providing the objective realm of nature (Prakṛti), the inner psychological instrument (Buddhi, Ahaṅkāra, Manas), the five senses, five motor organs, subtle essences, and gross elements down to solid Earth [TATTVA.36]."
                ]
            },
            {
                "heading": "The Microcosm is the Macrocosm",
                "paragraphs": [
                    "The extraordinary insight of Kṣemarāja in Sūtra 4 is that the individual soul (Cetana) is not an insignificant biological speck trapped at the bottom [PH.4]. Because Consciousness can never be truly divided, the human individual is the entire 36-tattva universe present in a concentrated, holographic form.",
                    "Sādhana in Trika is the journey of Ascent: retracing the steps from the gross elements of Earth [TATTVA.36], through the quietened senses and intellect, piercing the five Kañcukas, and recognizing one's true native home in the pure realm of Śiva [TATTVA.01]."
                ]
            }
        ],
        "contemplativeExercise": {
            "title": "Tracing the Tattvas Inward",
            "instruction": "Feel your physical feet on the Earth (Tattva 36). Notice the breath moving like Air (Tattva 33). Notice the thoughts in your Mind (Tattva 16). Now ask: Who is observing all of these? Rest in that unmoving Witness (Tattva 1).",
            "groundedInVerse": "PH.4"
        }
    },
    {
        "id": "MODULE.04",
        "moduleNumber": 4,
        "slug": "the-three-malas",
        "title": "The 3 Malas: Why We Feel Incomplete",
        "subtitle": "Unveiling the Three Roots of Spiritual Suffering: Āṇava, Māyīya, and Kārma",
        "readingTimeMinutes": 8,
        "summary": "Understand the three innate veils that create existential lack, duality, and compulsive guilt, and how Trika sādhana dissolves them.",
        "keyConcepts": ["CONCEPT.ANAVA_MALA", "CONCEPT.MAYIYA_MALA", "CONCEPT.KARMA_MALA", "CONCEPT.PASU"],
        "canonicalCitations": ["PH.7", "PH.9", "SS.1.2", "SS.3.3", "SS.3.35"],
        "sections": [
            {
                "heading": "The Primordial Ache: Āṇava Mala",
                "paragraphs": [
                    "Why do human beings suffer from a chronic, gnawing feeling that 'I am not enough'? In Trika psychology, this is not an emotional flaw; it is the ontological footprint of Āṇava Mala—the primary impurity of atomicity [PH.7].",
                    "Through Āṇava Mala, the infinite, uncontracted Lord voluntarily forgets His boundless nature and assumes the belief: 'I am tiny, deficient, and mortal' [SS.1.2]. This primary contraction gives birth to existential insecurity, driving the soul to seek completion in external achievements, status, and possessions."
                ]
            },
            {
                "heading": "Duality and Compulsive Karma",
                "paragraphs": [
                    "Once the illusion of separation is accepted, Māyīya Mala arises [SS.3.3]. This is the impurity of seeing difference: dividing the world into 'me' versus 'not-me', friend versus foe, desirable versus undesirable [PH.9].",
                    "Finally, trapped in duality and feeling incomplete, the soul acts out of compulsion, generating Kārma Mala [SS.3.35]. Kārma Mala is the conviction that 'I am an isolated individual doer who must bear the burden of merit, guilt, and retribution'.",
                    "Kashmir Shaivism reveals that these three Malas are not eternal stains; they are merely the dark side of God's sovereign game of hide-and-seek, ready to dissolve the moment true Recognition occurs [PH.9]."
                ]
            }
        ],
        "contemplativeExercise": {
            "title": "Dissolving the Feeling of Lack",
            "instruction": "Bring to mind a recent feeling of inadequacy or anxiety. Notice how it feels in the chest. Instead of trying to fix it, recognize it as Āṇava Mala—a momentary contraction of the Infinite. Watch it dissolve into open awareness.",
            "groundedInVerse": "SS.1.2"
        }
    },
    {
        "id": "MODULE.05",
        "moduleNumber": 5,
        "slug": "the-four-upayas",
        "title": "The 4 Upāyas: The Architecture of Practice",
        "subtitle": "From Gross Senses to Thought-Free Immersion: Anupāya, Śāmbhava, Śākta, and Āṇava",
        "readingTimeMinutes": 9,
        "summary": "Master the pedagogical ladder of Kashmir Shaiva sādhana. Learn which practice corresponds to your present state of awareness.",
        "keyConcepts": ["CONCEPT.ANUPAYA", "CONCEPT.SAMBHAVOPAYA", "CONCEPT.SAKTOPAYA", "CONCEPT.ANAVOPAYA"],
        "canonicalCitations": ["PH.18", "SS.1.5", "SS.2.1", "SS.3.1", "VBT.24"],
        "sections": [
            {
                "heading": "A Method for Every Temperament",
                "paragraphs": [
                    "Unlike dogmatic spiritual paths that force all seekers into a single rigid mold, Kashmir Shaivism provides four calibrated portals (Upāyas) tailored to the practitioner's current degree of mental agitation [PH.18].",
                    "For those with an agitated, restless mind, the tradition offers Āṇavopāya (the path of the individual) [SS.3.1]. Here, one anchors attention using physical breath (prāṇāyāma), sensory focus, bodily mudrās, and audible recitation of sacred sound to quiet the system."
                ]
            },
            {
                "heading": "Purifying Thought and Direct Immersion",
                "paragraphs": [
                    "When the intellect becomes sharp and discerning, the seeker advances to Śāktopāya (the path of Śakti) [SS.2.1]. Here, discursive thoughts are not violently silenced; instead, divisive thoughts are purified into non-dual contemplation (Śuddhavikalpa). Whenever a contracted thought arises, one rides its energy directly back to its conscious source.",
                    "For the mature aspirant capable of dropping mental concepts instantly, Śāmbhavopāya opens [SS.1.5]. This is the path of sovereign Will, where one enters thought-free absorption (Nirvikalpa) simply by pausing in the gap between thoughts or breaths [VBT.24].",
                    "At the summit lies Anupāya—the path of no-method—where one realizes that looking for a path to Śiva is absurd, because you already are the all-pervading Śiva looking!"
                ]
            }
        ],
        "contemplativeExercise": {
            "title": "Testing the Portal of the Gap",
            "instruction": "Take an in-breath. Pause for one second at the top before exhaling. In that one second of pause, where did your problems go? Taste the peace of Śāmbhavopāya.",
            "groundedInVerse": "VBT.24"
        }
    },
    {
        "id": "MODULE.06",
        "moduleNumber": 6,
        "slug": "spanda-the-sacred-pulse",
        "title": "Spanda: Catching the Dynamic Pulse in Daily Life",
        "subtitle": "How to Recognize the Living Throb of Consciousness in Joy, Shock, and Transition",
        "readingTimeMinutes": 8,
        "summary": "Discover the secret of Spanda: why extreme emotions, sudden laughter, terror, and transitions are portals into non-dual awakening.",
        "keyConcepts": ["CONCEPT.SPANDA", "CONCEPT.UNMESA", "CONCEPT.NIMESA", "CONCEPT.CAMATKARA"],
        "canonicalCitations": ["SK.1.1", "SK.1.2", "SK.1.21", "SK.1.25", "PH.19"],
        "sections": [
            {
                "heading": "The Living Throb Within All Motion",
                "paragraphs": [
                    "What is Spanda? As Vasugupta and Kallaṭa define it in the opening kārikā of the Spanda Kārikās, Spanda is the subtle throb or vibration of Consciousness through whose opening (Unmeṣa) and closing (Nimeṣa) worlds arise and vanish [SK.1.1].",
                    "Spanda is not physical atomic motion; it is the lively, conscious spark that makes perception possible. When you look at an apple, between the moment your eyes land on it and the moment your mind says 'That is an apple', there is an unconditioned, vibrant flash of pure awareness. That flash is Spanda [SK.1.2]."
                ]
            },
            {
                "heading": "Catching Spanda in the Storm",
                "paragraphs": [
                    "One of the most famous teachings of the Spanda Kārikās is found in verse 1.22: When a person is overcome with sudden intense anger, thrilling delight, deep confusion, or mortal danger, if they attend to the raw energetic pulse without getting caught in the mental storyline, the true nature of Spanda reveals itself [SK.1.21]!",
                    "This is the hallmark of Trika: we do not need to flee to a silent forest. The chaotic marketplace, the rush of excitement, and the sudden shock of surprise are all doorways to catch the living pulse of Śaṅkara [SK.1.25], leading into ever-arisen samādhi [PH.19]."
                ]
            }
        ],
        "contemplativeExercise": {
            "title": "Catching the Flash of Surprise",
            "instruction": "Recall a moment when you were suddenly startled by a loud sound or unexpected news. Remember the raw shock before thoughts rushed in. Recognize that motionless energy as Spanda.",
            "groundedInVerse": "SK.1.21"
        }
    },
    {
        "id": "MODULE.07",
        "moduleNumber": 7,
        "slug": "the-112-doorways-of-vbt",
        "title": "Entering the 112 Doorways of the Vijñāna Bhairava Tantra",
        "subtitle": "A Practical Compass for the World's Greatest Contemplative Manual",
        "readingTimeMinutes": 10,
        "summary": "Learn how to navigate and practice the 112 Dhāraṇās of the Vijñāna Bhairava Tantra using breath, sound, sensory gaps, void, and aesthetic delight.",
        "keyConcepts": ["CONCEPT.MADHYA", "CONCEPT.NADA", "CONCEPT.VYOMA", "CONCEPT.BHAIRAVA"],
        "canonicalCitations": ["VBT.24", "VBT.25", "VBT.32", "VBT.38", "VBT.43", "VBT.52", "VBT.73"],
        "sections": [
            {
                "heading": "The Dialogue That Changes Everything",
                "paragraphs": [
                    "The Vijñāna Bhairava Tantra begins with a cosmic dialogue: The Goddess approaches Bhairava and asks about the ultimate secret of reality. Bhairava answers with characteristic non-dual directness: Reality cannot be captured by ritual formulas, external deities, or intellectual dogmas. Instead, He offers 112 immediate, experiential contemplative doorways (Dhāraṇās).",
                    "The text begins with the most celebrated breath contemplation: Verse 24 [VBT.24]. By attending to the two turning points of the breath—the moment exhalation ends and the moment inhalation begins—and resting in the motionless center (Madhya), the radiant nature of Bhairava blossoms [VBT.25]."
                ]
            },
            {
                "heading": "From Acoustic Resonance to Aesthetic Ecstasy",
                "paragraphs": [
                    "The 112 dhāraṇās leave no dimension of human experience unexamined: In Verse 32, one directly cuts through mental constructs into pure non-conceptual presence [VBT.32]. In Verse 38, one listens to the continuous acoustic resonance of a musical tone until it dissolves into silent space [VBT.38].",
                    "In Verse 43, one visualizes the physical body as an empty, hollow vessel, dissolving bodily heaviness into the sky of awareness [VBT.43]. In Verse 52, one burns the entire universe in the fire of consciousness [VBT.52]. And in Verse 73, even the joyful meeting of an old friend becomes a springboard into divine bliss [VBT.73].",
                    "Every moment of your day holds one of these 112 doorways. Pick one that resonates, stay with it consistently, and discover that you are already dwelling in the boundless Heart of Bhairava."
                ]
            }
        ],
        "contemplativeExercise": {
            "title": "The First Doorway of the Tantra",
            "instruction": "Breathe out smoothly. Pause for a second before breathing in. In that silent gap between breaths, let go of past and future. Notice: you are already here.",
            "groundedInVerse": "VBT.24"
        }
    }
]

with open('src/data/curriculum/modules.json', 'w', encoding='utf-8') as f:
    json.dump(modules, f, indent=2, ensure_ascii=False)
print(f"Wrote {len(modules)} Guided Modules to src/data/curriculum/modules.json")

# =========================================================================
# 2. DETERMINISTIC GRAPH EDGES
# =========================================================================

edges = []
edge_id_counter = 1

def add_edge(source, target, edge_type, label=None):
    global edge_id_counter
    edges.append({
        "id": f"EDGE.{edge_id_counter:04d}",
        "source": source,
        "target": target,
        "type": edge_type,
        "label": label or edge_type.replace('_', ' ').title()
    })
    edge_id_counter += 1

# Master Lineage Edges
add_edge("MASTER.VASUGUPTA", "MASTER.KALLATA", "GURU_OF", "Guru of Kallaṭa")
add_edge("MASTER.SOMANANDA", "MASTER.UTPALADEVA", "GURU_OF", "Guru of Utpaladeva")
add_edge("MASTER.UTPALADEVA", "MASTER.LAKSMANAGUPTA", "GURU_OF", "Guru of Lakṣmaṇagupta")
add_edge("MASTER.LAKSMANAGUPTA", "MASTER.ABHINAVAGUPTA", "GURU_OF", "Guru of Abhinavagupta")
add_edge("MASTER.ABHINAVAGUPTA", "MASTER.KSEMARAJA", "GURU_OF", "Guru of Kṣemarāja")

# Author / Commentary Edges
add_edge("MASTER.VASUGUPTA", "SS", "AUTHORED", "Revealed Śiva Sūtras")
add_edge("MASTER.VASUGUPTA", "SK", "AUTHORED", "Revealed Spanda Kārikās")
add_edge("MASTER.KALLATA", "SK", "COMMENTS_ON", "Composed Spandavṛtti")
add_edge("MASTER.ABHINAVAGUPTA", "BS", "AUTHORED", "Composed Bhairava Stava")
add_edge("MASTER.KSEMARAJA", "PH", "AUTHORED", "Composed Pratyabhijñāhṛdayam")
add_edge("MASTER.KSEMARAJA", "SS", "COMMENTS_ON", "Composed Śivasūtravimarśinī")
add_edge("MASTER.KSEMARAJA", "SK", "COMMENTS_ON", "Composed Spandanirṇaya")
add_edge("MASTER.JAYARATHA", "MASTER.ABHINAVAGUPTA", "COMMENTS_ON", "Commented on Tantrāloka")

# Upāyas and Malas
add_edge("UPAYA.SAMBHAVA", "MALA.ANAVA", "DISSOLVES_MALA", "Dissolves Primordial Lack")
add_edge("UPAYA.SAKTA", "MALA.MAYIYA", "DISSOLVES_MALA", "Dissolves Duality")
add_edge("UPAYA.ANAVA", "MALA.KARMA", "DISSOLVES_MALA", "Dissolves Bound Karma")
add_edge("UPAYA.ANUPAYA", "MALA.ANAVA", "DISSOLVES_MALA", "Transcends all Malas")

# Cross-link Verses to Concepts & Tattvas
# Load PH verses
with open('src/data/texts/pratyabhijnahrdayam.json', 'r', encoding='utf-8') as f:
    ph_data = json.load(f)
for v in ph_data['verses']:
    for c in v.get('explainsConcepts', []):
        add_edge(v['id'], c, "EXPLAINS_CONCEPT")
    for t in v.get('mappedTattvas', []):
        add_edge(v['id'], t, "MAPS_TO_TATTVA")
    for u in v.get('usesUpayas', []):
        add_edge(v['id'], u, "USES_UPAYA")

# Load SS verses
with open('src/data/texts/shivasutras.json', 'r', encoding='utf-8') as f:
    ss_data = json.load(f)
for v in ss_data['verses']:
    for c in v.get('explainsConcepts', []):
        add_edge(v['id'], c, "EXPLAINS_CONCEPT")
    for t in v.get('mappedTattvas', []):
        add_edge(v['id'], t, "MAPS_TO_TATTVA")
    for u in v.get('usesUpayas', []):
        add_edge(v['id'], u, "USES_UPAYA")

# Load BS verses
with open('src/data/texts/bhairavastava.json', 'r', encoding='utf-8') as f:
    bs_data = json.load(f)
for v in bs_data['verses']:
    for c in v.get('explainsConcepts', []):
        add_edge(v['id'], c, "EXPLAINS_CONCEPT")
    for t in v.get('mappedTattvas', []):
        add_edge(v['id'], t, "MAPS_TO_TATTVA")

# Load Dharanas and link to target verses
with open('src/data/ontology/dharanas.json', 'r', encoding='utf-8') as f:
    dharanas_data = json.load(f)
for d in dharanas_data:
    add_edge(d['id'], d['verseId'], "GROUNDED_IN", "Verse Source")
    add_edge(d['id'], d['upayaId'], "USES_UPAYA", "Upāya Level")
    if 'whyItWorksGraphProof' in d:
        target_v = d['whyItWorksGraphProof'].get('targetVerseId')
        if target_v:
            add_edge(d['id'], target_v, "GROUNDED_IN", "Philosophical Proof")

with open('src/data/graph/edges.json', 'w', encoding='utf-8') as f:
    json.dump(edges, f, indent=2, ensure_ascii=False)
print(f"Wrote {len(edges)} Edges to src/data/graph/edges.json")
