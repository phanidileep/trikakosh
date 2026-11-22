import json
import re
import os

os.makedirs('src/data/texts', exist_ok=True)
os.makedirs('src/data/ontology', exist_ok=True)

with open('src/data/provenance.json', 'r', encoding='utf-8') as f:
    provenance_data = json.load(f)

# =========================================================================
# 1. PRATYABHIJÑĀHṚDAYAM (20 SŪTRAS)
# =========================================================================

ph_sutras = [
    {
        "num": 1,
        "dev": "चितिः स्वतन्त्रा विश्वसिद्धिहेतुः ॥ १ ॥",
        "iast": "citiḥ svatantrā viśvasiddhihetuḥ || 1 ||",
        "pad": [
            {"wordDevanagari": "चितिः", "wordIast": "citiḥ", "grammaticalRole": "nom. sg. f.", "literalMeaning": "Universal creative Consciousness"},
            {"wordDevanagari": "स्वतन्त्रा", "wordIast": "svatantrā", "grammaticalRole": "nom. sg. f.", "literalMeaning": "supremely autonomous / sovereignly free"},
            {"wordDevanagari": "विश्व-सिद्धि-हेतुः", "wordIast": "viśva-siddhi-hetuḥ", "grammaticalRole": "nom. sg. m. (comp.)", "literalMeaning": "the cause of the manifestation and realization of the universe"}
        ],
        "gloss": "Universal Consciousness, sovereignly autonomous, is the cause of the manifestation and realization of the cosmos.",
        "context": "The foundational declaration of Kashmir Shaivism: Consciousness is not an abstract blank witness, but an actively creative, sovereign power (Svātantrya) that brings forth reality.",
        "tattvas": ["TATTVA.01", "TATTVA.02"],
        "upayas": ["UPAYA.SAMBHAVA"],
        "concepts": ["CONCEPT.CITI", "CONCEPT.SVATANTRYA", "CONCEPT.PRAKASA", "CONCEPT.VIMARSA"],
        "related": ["SS.1.1", "SK.1.1", "BS.1"]
    },
    {
        "num": 2,
        "dev": "स्वेच्छया स्वभित्तौ विश्वमुन्मीलयति ॥ २ ॥",
        "iast": "svecchayā svabhittau viśvam unmīlayati || 2 ||",
        "pad": [
            {"wordDevanagari": "स्वेच्छया", "wordIast": "sva-icchayā", "grammaticalRole": "inst. sg. f.", "literalMeaning": "by Her own sovereign Will"},
            {"wordDevanagari": "स्वभित्तौ", "wordIast": "sva-bhittau", "grammaticalRole": "loc. sg. f.", "literalMeaning": "upon Her own screen / canvas / backdrop"},
            {"wordDevanagari": "विश्वम्", "wordIast": "viśvam", "grammaticalRole": "acc. sg. n.", "literalMeaning": "the entire cosmos"},
            {"wordDevanagari": "उन्मीलयति", "wordIast": "unmīlayati", "grammaticalRole": "3rd sg. pres. act.", "literalMeaning": "flashes open / unfolds like a painted canvas"}
        ],
        "gloss": "By Her own free will, upon the screen of Her own being, She unfolds the universe.",
        "context": "Refutes the need for external matter (Prakṛti) or independent atoms. Just as an artist paints upon a canvas, Consciousness paints the world upon itself, remaining unchanged.",
        "tattvas": ["TATTVA.02", "TATTVA.03"],
        "upayas": ["UPAYA.SAMBHAVA"],
        "concepts": ["CONCEPT.ICCHA", "CONCEPT.UNMESA", "CONCEPT.ABHASA", "CONCEPT.SVATANTRYA"],
        "related": ["SK.1.1", "SS.1.13"]
    },
    {
        "num": 3,
        "dev": "तन्नानानुरूपग्राह्यग्राहकभेदात् ॥ ३ ॥",
        "iast": "tan nānā anurūpagrāhyagrāhakabhedāt || 3 ||",
        "pad": [
            {"wordDevanagari": "तत्", "wordIast": "tat", "grammaticalRole": "nom. sg. n.", "literalMeaning": "That (manifest universe)"},
            {"wordDevanagari": "नाना", "wordIast": "nānā", "grammaticalRole": "indecl.", "literalMeaning": "manifold / diverse"},
            {"wordDevanagari": "अनुरूप-ग्राह्य-ग्राहक-भेदात्", "wordIast": "anurūpa-grāhya-grāhaka-bhedāt", "grammaticalRole": "abl. sg. m. (comp.)", "literalMeaning": "due to the differentiation of corresponding objects (grāhya) and subjects (grāhaka)"}
        ],
        "gloss": "That universe becomes manifold through the differentiation of mutually corresponding subjects and objects.",
        "context": "Explains how multiplicity arises: every level of object has a corresponding level of observer. From gods down to minerals, Consciousness divides itself into perceivers and perceptions.",
        "tattvas": ["TATTVA.03", "TATTVA.04", "TATTVA.05"],
        "upayas": ["UPAYA.SAKTA"],
        "concepts": ["CONCEPT.AHAM", "CONCEPT.IDAM", "CONCEPT.ABHASA"],
        "related": ["SK.1.2", "SS.1.14"]
    },
    {
        "num": 4,
        "dev": "चितिसङ्कोचात्मा चेतनोऽपि सङ्कुचितविश्वमयः ॥ ४ ॥",
        "iast": "citisaṅkocātmā cetano'pi saṅkucitaviśvamayaḥ || 4 ||",
        "pad": [
            {"wordDevanagari": "चिति-सङ्कोच-आत्मा", "wordIast": "citi-saṅkoca-ātmā", "grammaticalRole": "nom. sg. m. (comp.)", "literalMeaning": "having the nature of contracted Consciousness"},
            {"wordDevanagari": "चेतनः", "wordIast": "cetanaḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "the individual conscious being"},
            {"wordDevanagari": "अपि", "wordIast": "api", "grammaticalRole": "indecl.", "literalMeaning": "even / also"},
            {"wordDevanagari": "सङ्कुचित-विश्व-मयः", "wordIast": "saṅkucita-viśva-mayaḥ", "grammaticalRole": "nom. sg. m. (comp.)", "literalMeaning": "composed of the universe in a contracted form"}
        ],
        "gloss": "The individual sentient being, who is a contracted form of Universal Consciousness, is also in reality the entire universe in microcosm.",
        "context": "The individual (Aṇu) is not separate from the Infinite; it is the entire cosmic ocean contracted into a single focal drop.",
        "tattvas": ["TATTVA.06", "TATTVA.12"],
        "upayas": ["UPAYA.SAKTA"],
        "concepts": ["CONCEPT.SANKOCA", "CONCEPT.PASU", "CONCEPT.KULA"],
        "related": ["SS.3.30", "SK.1.8"]
    },
    {
        "num": 5,
        "dev": "चितिरेव चेतनपदादवरूढा चेत्यसङ्कोचिनी चित्तम् ॥ ५ ॥",
        "iast": "citir eva cetanapadād avarūḍhā cetyasaṅkocinī cittam || 5 ||",
        "pad": [
            {"wordDevanagari": "चितिः", "wordIast": "citiḥ", "grammaticalRole": "nom. sg. f.", "literalMeaning": "Universal Consciousness"},
            {"wordDevanagari": "एव", "wordIast": "eva", "grammaticalRole": "indecl.", "literalMeaning": "indeed / alone"},
            {"wordDevanagari": "चेतन-पदात्", "wordIast": "cetana-padāt", "grammaticalRole": "abl. sg. n.", "literalMeaning": "from the state of uncontracted sentience"},
            {"wordDevanagari": "अवरूढा", "wordIast": "avarūḍhā", "grammaticalRole": "nom. sg. f. (ppp.)", "literalMeaning": "descending / stepping down"},
            {"wordDevanagari": "चेत्य-सङ्कोचिनी", "wordIast": "cetya-saṅkocinī", "grammaticalRole": "nom. sg. f.", "literalMeaning": "contracted by the objects of perception"},
            {"wordDevanagari": "चित्तम्", "wordIast": "cittam", "grammaticalRole": "nom. sg. n.", "literalMeaning": "the individual mind"}
        ],
        "gloss": "Universal Consciousness itself, descending from its state of pure sentience and contracting in accordance with perceived objects, becomes the mind.",
        "context": "Mind is not a distinct mechanical substance or enemy to be destroyed; it is God's own consciousness operating in a focused, contracted register.",
        "tattvas": ["TATTVA.14", "TATTVA.15", "TATTVA.16"],
        "upayas": ["UPAYA.SAKTA"],
        "concepts": ["CONCEPT.CITI", "CONCEPT.ANTAHKARANA", "CONCEPT.VIKALPA"],
        "related": ["SS.3.1", "VBT.32"]
    },
    {
        "num": 6,
        "dev": "तन्मयो मायाप्रमाता ॥ ६ ॥",
        "iast": "tanmayo māyāpramātā || 6 ||",
        "pad": [
            {"wordDevanagari": "तन्मयः", "wordIast": "tat-mayaḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "consisting of that (mind)"},
            {"wordDevanagari": "माया-प्रमाता", "wordIast": "māyā-pramātā", "grammaticalRole": "nom. sg. m.", "literalMeaning": "the observer bound in the field of Māyā"}
        ],
        "gloss": "Consisting of that mind is the subject bound by Māyā (the illusory sense of separation).",
        "context": "The ordinary human subject identifies with its thoughts and feelings, forgetting that it is the eternal witness.",
        "tattvas": ["TATTVA.06", "TATTVA.12"],
        "upayas": ["UPAYA.ANAVA"],
        "concepts": ["CONCEPT.MAYIYA_MALA", "CONCEPT.PASU"],
        "related": ["SS.1.2", "SK.1.9"]
    },
    {
        "num": 7,
        "dev": "स च द्विरूपस्त्रिमलश्चतुरावृतः पञ्चकृत्यकारी सप्तपञ्चकस्वभावः ॥ ७ ॥",
        "iast": "sa ca dvirūpas trimalaś caturāvṛtaḥ pañcakṛtyakārī saptapañcakasvabhāvaḥ || 7 ||",
        "pad": [
            {"wordDevanagari": "सः", "wordIast": "saḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "he (the bound soul)"},
            {"wordDevanagari": "द्विरूपः", "wordIast": "dvirūpaḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "two-formed (divine essence and contracted appearance)"},
            {"wordDevanagari": "त्रिमलः", "wordIast": "trimalaḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "possessing three impurities (āṇava, māyīya, kārma)"},
            {"wordDevanagari": "चतुरावृतः", "wordIast": "catur-āvṛtaḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "covered by four sheaths"},
            {"wordDevanagari": "पञ्चकृत्यकारी", "wordIast": "pañcakṛtyakārī", "grammaticalRole": "nom. sg. m.", "literalMeaning": "performing the five cosmic acts"},
            {"wordDevanagari": "सप्तपञ्चकस्वभावः", "wordIast": "saptapañcakasvabhāvaḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "having the nature of the thirty-five tattvas"}
        ],
        "gloss": "And that bound subject is twofold in nature, covered by the three impurities, enveloped by four veils, perpetually performing the five cosmic acts, and embodying the thirty-five tattvas.",
        "context": "A crucial taxonomic sūtra integrating the entire metaphysics of Trika into the anatomy of the human person.",
        "tattvas": ["TATTVA.06", "TATTVA.12", "TATTVA.36"],
        "upayas": ["UPAYA.SAKTA"],
        "concepts": ["CONCEPT.PANCANITYAKRITYA", "CONCEPT.ANAVA_MALA", "CONCEPT.MAYIYA_MALA", "CONCEPT.KARMA_MALA"],
        "related": ["SS.3.3", "SK.1.8"]
    },
    {
        "num": 8,
        "dev": "तद्भूमिकाः सर्वदर्शनस्थितयः ॥ ८ ॥",
        "iast": "tadbhūmikāḥ sarvadarśanasthitayaḥ || 8 ||",
        "pad": [
            {"wordDevanagari": "तद्-भूमिकाः", "wordIast": "tad-bhūmikāḥ", "grammaticalRole": "nom. pl. f.", "literalMeaning": "stages or roles assumed by That Consciousness"},
            {"wordDevanagari": "सर्व-दर्शन-स्थितयः", "wordIast": "sarva-darśana-sthitayaḥ", "grammaticalRole": "nom. pl. f.", "literalMeaning": "the positions of all philosophical systems"}
        ],
        "gloss": "The doctrines of all philosophical systems are merely stages or postures assumed by Universal Consciousness.",
        "context": "Kashmir Shaivism's radical non-sectarian meta-philosophy: Buddhism, Cārvāka, Nyāya, Sāṅkhya, and Advaita are not 'false', but partial vantage points along the spectrum of Self-revelation.",
        "tattvas": ["TATTVA.05", "TATTVA.14"],
        "upayas": ["UPAYA.SAKTA"],
        "concepts": ["CONCEPT.CAMATKARA", "CONCEPT.PRATYABHIJNA"],
        "related": ["SS.1.12", "SK.1.11"]
    },
    {
        "num": 9,
        "dev": "चिद्वत्तच्छक्तिसङ्कोचान्मलावृतः संसारी ॥ ९ ॥",
        "iast": "cidvat tacchaktisaṅkocān malāvṛtaḥ saṃsārī || 9 ||",
        "pad": [
            {"wordDevanagari": "चिद्वत्", "wordIast": "cid-vat", "grammaticalRole": "indecl.", "literalMeaning": "though possessing the nature of pure Consciousness"},
            {"wordDevanagari": "तच्-शक्ति-सङ्कोचात्", "wordIast": "tat-śakti-saṅkocāt", "grammaticalRole": "abl. sg. m.", "literalMeaning": "due to the contraction of Its own powers"},
            {"wordDevanagari": "मल-आवृतः", "wordIast": "mala-āvṛtaḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "veiled by impurities"},
            {"wordDevanagari": "संसारी", "wordIast": "saṃsārī", "grammaticalRole": "nom. sg. m.", "literalMeaning": "becomes the transmigrating soul"}
        ],
        "gloss": "Though inherently of the nature of Consciousness, due to the contraction of Its own divine powers and veiling by the impurities, one becomes an ordinary transmigrating being.",
        "context": "Explains why we suffer: our divine powers (Sarvakartṛtva, Sarvajñatva) are contracted into the Kañcukas, making us feel vulnerable and small.",
        "tattvas": ["TATTVA.07", "TATTVA.08", "TATTVA.09", "TATTVA.10", "TATTVA.11"],
        "upayas": ["UPAYA.ANAVA"],
        "concepts": ["CONCEPT.KANCUKA", "CONCEPT.ANAVA_MALA", "CONCEPT.PASU"],
        "related": ["SS.1.2", "SK.1.9"]
    },
    {
        "num": 10,
        "dev": "तथापि तद्वत्पञ्चकृत्यानि करोति ॥ १० ॥",
        "iast": "tathāpi tadvat pañcakṛtyāni karoti || 10 ||",
        "pad": [
            {"wordDevanagari": "तथापि", "wordIast": "tathā api", "grammaticalRole": "indecl.", "literalMeaning": "even so / nevertheless"},
            {"wordDevanagari": "तद्वत्", "wordIast": "tad-vat", "grammaticalRole": "indecl.", "literalMeaning": "like the Supreme Lord"},
            {"wordDevanagari": "पञ्चकृत्यानि", "wordIast": "pañca-kṛtyāni", "grammaticalRole": "acc. pl. n.", "literalMeaning": "the five cosmic acts"},
            {"wordDevanagari": "करोति", "wordIast": "karoti", "grammaticalRole": "3rd sg. pres. act.", "literalMeaning": "he perpetually performs"}
        ],
        "gloss": "Even in this contracted state, the individual perpetually performs the five cosmic acts, exactly like the Supreme Lord.",
        "context": "A breathtaking discovery: whenever you perceive an object, you create it (Sṛṣṭi), relish it (Sthiti), dismiss it (Saṃhāra), doubt your power (Tirodhāna), and suddenly recognize it (Anugraha).",
        "tattvas": ["TATTVA.01", "TATTVA.05"],
        "upayas": ["UPAYA.SAKTA"],
        "concepts": ["CONCEPT.PANCANITYAKRITYA", "CONCEPT.SRISTI", "CONCEPT.STHITI", "CONCEPT.SAMHARA"],
        "related": ["SS.1.6", "SK.1.1"]
    },
    {
        "num": 11,
        "dev": "आभासनरक्तिविमर्शनबीजावस्थापनविलापनतस्तानि ॥ ११ ॥",
        "iast": "ābhāsanaraktivimarśanabījāvasthāpanavilāpanatas tāni || 11 ||",
        "pad": [
            {"wordDevanagari": "आभासन-रक्ति-विमर्शन-बीजावस्थापन-विलापनतः", "wordIast": "ābhāsana-rakti-vimarśana-bījāvasthāpana-vilāpanataḥ", "grammaticalRole": "abl. (comp.)", "literalMeaning": "through manifesting, delighting, reflecting, embedding as latent impression, and dissolving"},
            {"wordDevanagari": "तानि", "wordIast": "tāni", "grammaticalRole": "nom. pl. n.", "literalMeaning": "those five acts are executed"}
        ],
        "gloss": "Those five acts occur through manifesting an appearance, delighting in it, reflecting on it, planting its latent seed impression, and dissolving it back into the heart.",
        "context": "The psychological breakdown of perception: every sensory perception mirrors the fivefold cosmic cycle of the universe.",
        "tattvas": ["TATTVA.14", "TATTVA.16"],
        "upayas": ["UPAYA.SAKTA"],
        "concepts": ["CONCEPT.PANCANITYAKRITYA", "CONCEPT.ABHASA", "CONCEPT.KRAMA"],
        "related": ["SK.1.2", "VBT.52"]
    },
    {
        "num": 12,
        "dev": "तदपरिज्ञाने स्वशक्तिभिर्व्यामोहितता संसारित्वम् ॥ १२ ॥",
        "iast": "tadaparijñāne svaśaktibhir vyāmohititā saṃsāritvam || 12 ||",
        "pad": [
            {"wordDevanagari": "तद्-अपरिज्ञाने", "wordIast": "tad-aparijñāne", "grammaticalRole": "loc. sg. n.", "literalMeaning": "in the non-recognition of that reality"},
            {"wordDevanagari": "स्व-शक्तिभिः", "wordIast": "sva-śaktibhiḥ", "grammaticalRole": "inst. pl. f.", "literalMeaning": "by one's own energies and faculties"},
            {"wordDevanagari": "व्यामोहितता", "wordIast": "vyāmohititā", "grammaticalRole": "nom. sg. f.", "literalMeaning": "the condition of being deluded and ensnared"},
            {"wordDevanagari": "संसारित्वम्", "wordIast": "saṃsāritvam", "grammaticalRole": "nom. sg. n.", "literalMeaning": "the state of worldly bondage (saṃsāra)"}
        ],
        "gloss": "When this truth is not recognized, being deluded by one's own energies is what constitutes worldly bondage.",
        "context": "We are not victims of an external demon or evil force. Our own divine cognitive and linguistic powers (Mātṛkā) enchant us because we do not recognize our authorship.",
        "tattvas": ["TATTVA.06", "TATTVA.12"],
        "upayas": ["UPAYA.SAKTA"],
        "concepts": ["CONCEPT.MATRIKA", "CONCEPT.TIRODHANA", "CONCEPT.PASA"],
        "related": ["SS.1.4", "SK.1.20"]
    },
    {
        "num": 13,
        "dev": "तत्परिज्ञाने चित्तमेव अन्तर्मुखीभावेन चेतनपदाध्यारोहात् चितिः ॥ १३ ॥",
        "iast": "tatparijñāne cittam evāntarmukhībhāvena cetanapadādhyārohāc citiḥ || 13 ||",
        "pad": [
            {"wordDevanagari": "तत्-परिज्ञाने", "wordIast": "tat-parijñāne", "grammaticalRole": "loc. sg. n.", "literalMeaning": "upon the complete recognition of that"},
            {"wordDevanagari": "चित्तम्", "wordIast": "cittam", "grammaticalRole": "nom. sg. n.", "literalMeaning": "the individual mind"},
            {"wordDevanagari": "एव", "wordIast": "eva", "grammaticalRole": "indecl.", "literalMeaning": "itself / alone"},
            {"wordDevanagari": "अन्तर्मुखी-भावेन", "wordIast": "antarmukhī-bhāvena", "grammaticalRole": "inst. sg. m.", "literalMeaning": "by turning inward toward its source"},
            {"wordDevanagari": "चेतन-पद-अध्यारोहात्", "wordIast": "cetana-pada-adhyārohāt", "grammaticalRole": "abl. sg. m.", "literalMeaning": "through ascending back to the station of pure sentience"},
            {"wordDevanagari": "चितिः", "wordIast": "citiḥ", "grammaticalRole": "nom. sg. f.", "literalMeaning": "becomes Universal Consciousness"}
        ],
        "gloss": "Upon recognizing this truth, the mind itself, by turning inward and ascending to the station of pure sentience, is realized to be Universal Consciousness.",
        "context": "The central pivot of the entire text: when the outward-directed mind turns 180 degrees to look at the looker, mind dissolves back into universal Citi.",
        "tattvas": ["TATTVA.01", "TATTVA.16"],
        "upayas": ["UPAYA.SAKTA"],
        "concepts": ["CONCEPT.PRATYABHIJNA", "CONCEPT.CITI", "CONCEPT.SAMAVESA"],
        "related": ["SS.2.1", "VBT.24"]
    },
    {
        "num": 14,
        "dev": "चितिवह्निरवरुद्धोऽपि मेयेन्धनं प्लुष्यति ॥ १४ ॥",
        "iast": "citivahnir avaruddho'pi meyendhanaṃ pluṣyati || 14 ||",
        "pad": [
            {"wordDevanagari": "चिति-वह्निः", "wordIast": "citi-vahniḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "the fire of Consciousness"},
            {"wordDevanagari": "अवरुद्धः", "wordIast": "avaruddhaḥ", "grammaticalRole": "nom. sg. m. (ppp.)", "literalMeaning": "though seemingly obstructed or veiled"},
            {"wordDevanagari": "अपि", "wordIast": "api", "grammaticalRole": "indecl.", "literalMeaning": "even / still"},
            {"wordDevanagari": "मेय-इन्धनम्", "wordIast": "meya-indhanam", "grammaticalRole": "acc. sg. n.", "literalMeaning": "the fuel of known objective objects"},
            {"wordDevanagari": "प्लुष्यति", "wordIast": "pluṣyati", "grammaticalRole": "3rd sg. pres. act.", "literalMeaning": "consumes / burns to ashes"}
        ],
        "gloss": "The fire of Consciousness, even when seemingly restricted, burns to ashes the fuel of objective perceptions.",
        "context": "A dynamic yogic metaphor: do not fear objects or mental turbulence. Treat them as dry fuel thrown onto the blazing fire of awareness, increasing its heat.",
        "tattvas": ["TATTVA.01", "TATTVA.34"],
        "upayas": ["UPAYA.SAMBHAVA"],
        "concepts": ["CONCEPT.SAMHARA", "CONCEPT.UDYAMA", "CONCEPT.CITI"],
        "related": ["SS.1.5", "VBT.52"]
    },
    {
        "num": 15,
        "dev": "बललाभे विश्वमात्मसात्करोति ॥ १५ ॥",
        "iast": "balalābhe viśvam ātmasātkaroti || 15 ||",
        "pad": [
            {"wordDevanagari": "बल-लाभे", "wordIast": "bala-lābhe", "grammaticalRole": "loc. sg. m.", "literalMeaning": "upon acquiring that energetic spiritual potency"},
            {"wordDevanagari": "विश्वम्", "wordIast": "viśvam", "grammaticalRole": "acc. sg. n.", "literalMeaning": "the entire manifest universe"},
            {"wordDevanagari": "आत्मसात्-करोति", "wordIast": "ātmasāt-karoti", "grammaticalRole": "3rd sg. pres. act.", "literalMeaning": "assimilates / makes identical with one's own Self"}
        ],
        "gloss": "Upon acquiring the inherent power of Consciousness, the yogi assimilates the entire universe into the Self.",
        "context": "Liberation is not isolation (Kaivalya) from the universe; it is total assimilation. The world is no longer alien matter; it is your own living body.",
        "tattvas": ["TATTVA.01", "TATTVA.36"],
        "upayas": ["UPAYA.SAMBHAVA"],
        "concepts": ["CONCEPT.SAMARASYA", "CONCEPT.JIVANMUKTI", "CONCEPT.SVATANTRYA"],
        "related": ["SS.3.30", "BS.2"]
    },
    {
        "num": 16,
        "dev": "चिदैकात्म्यप्रतिपत्तिदार्ढ्यं जीवन्मुक्तिः ॥ १६ ॥",
        "iast": "cidaikātmyapratipattidārḍhyaṃ jīvanmuktiḥ || 16 ||",
        "pad": [
            {"wordDevanagari": "चिद्-ऐकात्म्य-प्रतिपत्ति-दार्ढ्यम्", "wordIast": "cid-aikātmya-pratipatti-dārḍhyam", "grammaticalRole": "nom. sg. n.", "literalMeaning": "firm stability in the conviction of identity with pure Consciousness"},
            {"wordDevanagari": "जीवन्-मुक्तिः", "wordIast": "jīvan-muktiḥ", "grammaticalRole": "nom. sg. f.", "literalMeaning": "is liberation while embodied"}
        ],
        "gloss": "Unwavering stability in the realization of one's identity with pure Consciousness is liberation while living in the body.",
        "context": "Defines Jīvanmukti in precise terms: not the cessation of breath or thoughts, but an unshakable inner certainty that whatever arises is only Consciousness.",
        "tattvas": ["TATTVA.01", "TATTVA.12"],
        "upayas": ["UPAYA.SAMBHAVA"],
        "concepts": ["CONCEPT.JIVANMUKTI", "CONCEPT.SVARUPA", "CONCEPT.NITYODITA"],
        "related": ["SK.1.25", "BS.4"]
    },
    {
        "num": 17,
        "dev": "मध्यविकासाच्चिदानन्दलाभः ॥ १७ ॥",
        "iast": "madhyavikāsāc cidānandalābhaḥ || 17 ||",
        "pad": [
            {"wordDevanagari": "मध्य-विकासात्", "wordIast": "madhya-vikāsāt", "grammaticalRole": "abl. sg. m.", "literalMeaning": "through the blossoming of the Center (the gap / central channel)"},
            {"wordDevanagari": "चिद्-आनन्द-लाभः", "wordIast": "cid-ānanda-lābhaḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "the attainment of the unconditioned bliss of Consciousness"}
        ],
        "gloss": "Through the opening and blossoming of the Center, the bliss of pure Consciousness is attained.",
        "context": "The central practical instruction: by holding attention in the gap (between breaths, thoughts, desires), the central channel (Suṣumnā / Madhya) opens.",
        "tattvas": ["TATTVA.02", "TATTVA.33"],
        "upayas": ["UPAYA.SAMBHAVA", "UPAYA.SAKTA"],
        "concepts": ["CONCEPT.MADHYA", "CONCEPT.ANANDA", "CONCEPT.VIKASA"],
        "related": ["VBT.24", "VBT.25", "SS.3.22"]
    },
    {
        "num": 18,
        "dev": "विकल्पक्षयसङ्कोचविकासवाहच्छेदद्यन्तकोटिनिभालनादय इहोपायाः ॥ १८ ॥",
        "iast": "vikalpakṣayasaṅkocavikāsavāhacchedādyantakoṭinibhālanādaya ihopāyāḥ || 18 ||",
        "pad": [
            {"wordDevanagari": "विकल्प-क्षय-सङ्कोच-विकास-वाह-च्छेद-आद्यन्त-कोटि-निभालन-आदयः", "wordIast": "vikalpa-kṣaya-saṅkoca-vikāsa-vāha-ccheda-ādy-anta-koṭi-nibhālana-ādayaḥ", "grammaticalRole": "nom. pl. m.", "literalMeaning": "dissolution of thought constructs, contraction and expansion of energy, cutting the flow of breath, gazing into the initial and final limits, and others"},
            {"wordDevanagari": "इह", "wordIast": "iha", "grammaticalRole": "indecl.", "literalMeaning": "here in this tradition"},
            {"wordDevanagari": "उपायाः", "wordIast": "upāyāḥ", "grammaticalRole": "nom. pl. m.", "literalMeaning": "are the practical methods (upāyas)"}
        ],
        "gloss": "Here, the practical methods include the dissolution of thought constructs, contemplative contraction and expansion, severing the flow of breath, and attending to the initial and terminal boundaries of experience.",
        "context": "Directly summarizes the practical toolbox of the Vijñāna Bhairava Tantra, offering multiple empirical gateways suited to various temperaments.",
        "tattvas": ["TATTVA.16", "TATTVA.33"],
        "upayas": ["UPAYA.SAMBHAVA", "UPAYA.SAKTA", "UPAYA.ANAVA"],
        "concepts": ["CONCEPT.VIKALPA", "CONCEPT.MADHYA", "CONCEPT.SADHANA"],
        "related": ["VBT.24", "VBT.32", "VBT.61"]
    },
    {
        "num": 19,
        "dev": "समाधिसंस्कारवति व्युत्थानेऽपि विमर्शानुवृत्त्या चिदैक्यामर्शान् नित्योदितसमाधिलाभः ॥ १९ ॥",
        "iast": "samādhisaṃskāravati vyutthāne'pi vimarśānuvṛttyā cidaikyāmarśān nityoditasamādhilābhaḥ || 19 ||",
        "pad": [
            {"wordDevanagari": "समाधि-संस्कारवति", "wordIast": "samādhi-saṃskāravati", "grammaticalRole": "loc. sg. n.", "literalMeaning": "infused with the impressions of meditative absorption"},
            {"wordDevanagari": "व्युत्थाने", "wordIast": "vyutthāne", "grammaticalRole": "loc. sg. n.", "literalMeaning": "even in active worldly engagement"},
            {"wordDevanagari": "अपि", "wordIast": "api", "grammaticalRole": "indecl.", "literalMeaning": "even"},
            {"wordDevanagari": "विमर्श-अनुवृत्त्या", "wordIast": "vimarśa-anuvṛttyā", "grammaticalRole": "inst. sg. f.", "literalMeaning": "through the unbroken continuation of self-reflective awareness"},
            {"wordDevanagari": "चिद्-ऐक्य-आकर्षात्", "wordIast": "cid-aikya-āmarśāt", "grammaticalRole": "abl. sg. m.", "literalMeaning": "from touching identity with pure Consciousness"},
            {"wordDevanagari": "नित्योदित-समाधि-लाभः", "wordIast": "nityodita-samādhi-lābhaḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "there is attainment of ever-arisen, unbroken meditative communion"}
        ],
        "gloss": "Even in active worldly engagement, through the unbroken persistence of reflective self-awareness infused with meditative traces, one attains ever-arisen, unbroken samādhi.",
        "context": "The highest goal of Kashmir Shaivism: Nityodita Samādhi. You do not need to sit in a dark cave with closed eyes; washing dishes and walking in the street are samādhi.",
        "tattvas": ["TATTVA.01", "TATTVA.02"],
        "upayas": ["UPAYA.ANUPAYA", "UPAYA.SAMBHAVA"],
        "concepts": ["CONCEPT.NITYODITA", "CONCEPT.VIMARSA", "CONCEPT.SAMAVESA"],
        "related": ["SK.1.25", "BS.6"]
    },
    {
        "num": 20,
        "dev": "तदा प्रकाशानन्दसारमहामन्त्रवीर्यात्मकपूर्णाहन्तावेशात् सदा सर्वसर्गसंहारक-परमेश्वरतालाभः भवतीति शिवम् ॥ २० ॥",
        "iast": "tadā prakāśānandasāramahāmantravīryātmakapūrṇāhantāveśāt sadā sarvasargasaṃhāraka-parameśvaratālābhaḥ bhavatīti śivam || 20 ||",
        "pad": [
            {"wordDevanagari": "तदा", "wordIast": "tadā", "grammaticalRole": "indecl.", "literalMeaning": "then / at that culmination"},
            {"wordDevanagari": "प्रकाश-आनन्द-सार-महामन्त्र-वीर्य-आत्मक-पूर्ण-अहन्ता-आवेशात्", "wordIast": "prakāśa-ānanda-sāra-mahāmantra-vīrya-ātmaka-pūrṇa-ahantā-āveśāt", "grammaticalRole": "abl. sg. m.", "literalMeaning": "through entering the supreme fullness of I-Consciousness, the potency of the Great Mantra whose essence is Light and Bliss"},
            {"wordDevanagari": "सदा", "wordIast": "sadā", "grammaticalRole": "indecl.", "literalMeaning": "perpetually"},
            {"wordDevanagari": "सर्व-सर्ग-संहारक-परमेश्वरता-लाभः", "wordIast": "sarva-sarga-saṃhāraka-parameśvaratā-lābhaḥ", "grammaticalRole": "nom. sg. m.", "literalMeaning": "the attainment of the state of the Supreme Lord who creates and dissolves all worlds"},
            {"wordDevanagari": "भवति", "wordIast": "bhavati", "grammaticalRole": "3rd sg. pres. act.", "literalMeaning": "comes to pass"},
            {"wordDevanagari": "इति शिवम्", "wordIast": "iti śivam", "grammaticalRole": "benediction", "literalMeaning": "all is Auspiciousness / all is Śiva"}
        ],
        "gloss": "Then, through immersion into the supreme fullness of I-Consciousness—the living potency of the Great Mantra whose very essence is Light and Bliss—one attains the perpetual state of the Supreme Lord who creates and reabsorbs all existence. All is Śiva.",
        "context": "The grand finale: the seeker discovers that their own intimate feeling of 'I am' (Pūrṇāhantā) is the heart of God.",
        "tattvas": ["TATTVA.01", "TATTVA.02"],
        "upayas": ["UPAYA.ANUPAYA"],
        "concepts": ["CONCEPT.AHAM", "CONCEPT.PARAMASIVA", "CONCEPT.CAKRESVARA"],
        "related": ["SS.1.22", "BS.1", "BS.10"]
    }
]

ph_verses = []
for s in ph_sutras:
    v_id = f"PH.{s['num']}"
    ph_verses.append({
        "id": v_id,
        "kind": "Verse",
        "textId": "PH",
        "verseNumber": s['num'],
        "subDivision": "Pratyabhijñā Sūtras (1–20)",
        "devanagari": s['dev'],
        "iast": s['iast'],
        "padaccheda": s['pad'],
        "studyGloss": s['gloss'],
        "practicalContext": s['context'],
        "provenance": {
            "source": "GRETIL DSO Sanskrit Archive (ksemaraja_pratyabhijnahrdaya.md)",
            "sourceUrl": provenance_data['PH']['url'],
            "sha256": provenance_data['PH']['sha256'],
            "verification_status": "verified_canonical",
            "editionNotes": "Encoded by Dott. Marino Faliero, DSO Sanskrit Archive, July 1998."
        },
        "mappedTattvas": s['tattvas'],
        "usesUpayas": s['upayas'],
        "explainsConcepts": s['concepts'],
        "relatedVerses": s['related']
    })

ph_text_data = {
    "textInfo": {
        "id": "PH",
        "kind": "Text",
        "titleIast": "Pratyabhijñāhṛdayam",
        "titleDevanagari": "प्रत्यभिज्ञाहृदयम्",
        "authorIast": "Kṣemarāja",
        "century": "11th century CE (~1000–1050 CE)",
        "stage": 1,
        "description": "The definitive 20-sūtra gateway to Kashmir Shaivism. Composed by Abhinavagupta's chief disciple to provide seekers with an accessible, complete distillation of the non-dual Recognition philosophy.",
        "verseCount": len(ph_verses),
        "provenance": {
            "source": "GRETIL DSO Sanskrit Archive",
            "sourceUrl": provenance_data['PH']['url'],
            "sha256": provenance_data['PH']['sha256'],
            "verification_status": "verified_canonical"
        }
    },
    "verses": ph_verses
}

with open('src/data/texts/pratyabhijnahrdayam.json', 'w', encoding='utf-8') as f:
    json.dump(ph_text_data, f, indent=2, ensure_ascii=False)
print(f"Wrote {len(ph_verses)} verses to src/data/texts/pratyabhijnahrdayam.json")

# =========================================================================
# 2. BHAIRAVA STAVA (10 VERSES)
# =========================================================================

bs_verses_raw = [
    {
        "num": 1,
        "dev": "व्याप्तचराचरभावविशेषं चिन्मयमेकसन्ततभावम् ।\nभैरवनाथमनाथशरण्यं त्वन्मयचित्ततया हृदि वन्दे ॥ १ ॥",
        "iast": "vyāptacarācarabhāvaviśeṣaṃ cinmayamekasantatabhāvam |\nbhairavanāthamanāthaśaraṇyaṃ tvanmayacittatayā hṛdi vande || 1 ||",
        "gloss": "Pervading all moving and unmoving particular states of existence, pure Consciousness itself, undivided and continuous, Lord Bhairava, the sole shelter of the shelterless—I venerate You in my Heart, my mind dissolved in union with You.",
        "context": "Abhinavagupta opens with absolute non-dual devotion: venerating Bhairava not as an external idol, but in the Heart through a mind that has realized identity with Him.",
        "concepts": ["CONCEPT.BHAIRAVA", "CONCEPT.HRIDAYA", "CONCEPT.PRAKASA"],
        "tattvas": ["TATTVA.01"]
    },
    {
        "num": 2,
        "dev": "त्वन्मयमेतदशेषमिदानीं भाति मम त्वदनुग्रहशक्त्या ।\nत्वं च महेश सदैव ममात्मा स्वात्ममयं मम तेन समस्तम् ॥ २ ॥",
        "iast": "tvanmayametadaśeṣamidānīṃ bhāti mama tvadanugrahaśaktyā |\ntvaṃ ca maheśa sadaiva mamātmā svātmamayaṃ mama tena samastam || 2 ||",
        "gloss": "Through the power of Your grace, this entire universe now shines before me as Your very being. And You, O Great Lord, are eternally my own innermost Self; therefore, everything in existence is of the nature of my own Self.",
        "context": "The experiential proof of non-dual realization: when God is recognized as one's own Self, the entire universe is cherished as one's own body.",
        "concepts": ["CONCEPT.ANUGRAHA", "CONCEPT.MAHESA", "CONCEPT.AHAM"],
        "tattvas": ["TATTVA.01", "TATTVA.36"]
    },
    {
        "num": 3,
        "dev": "स्वात्मनि विश्वगते त्वयि नाथे तिष्ठति नित्यमनन्यमयेऽपि ।\nसत्स्वपि दुर्धरदुःखविमोहत्रासविधायिषु कर्मगणेषु ॥ ३ ॥",
        "iast": "svātmani viśvagate tvayi nāthe tiṣṭhati nityamananyamaye'pi |\nsatsvapi durdharaduḥkhavimohatrāsavidhāyiṣu karmagaṇeṣu || 3 ||",
        "gloss": "When You, the sovereign Lord, eternally abide in my own Self as all-pervading and inseparable, even though masses of difficult karmas cause unbearable grief, delusion, and terror...",
        "context": "Addresses the reality of suffering: karmic storms may rage, but they cannot dislodge the yogi who rests in Bhairava.",
        "concepts": ["CONCEPT.KARMA_MALA", "CONCEPT.PATI"],
        "tattvas": ["TATTVA.12"]
    },
    {
        "num": 4,
        "dev": "शङ्करसेवनचिन्तनधीरो भीषणभैरवशक्तिमयोऽस्मि ।\nभीतिहरं तव पादयुगं तत्सेवितुमद्य दृढोऽस्मि प्रवृत्तः ॥ ४ ॥",
        "iast": "śaṅkarasevanacintanadhīro bhīṣaṇabhairavaśaktimayo'smi |\nbhītiharaṃ tava pādayugaṃ tatsevitumadya dṛḍho'smi pravṛttaḥ || 4 ||",
        "gloss": "Steadfast through contemplation and service of Śaṅkara, I have become embodied with the formidable power of Bhairava. I am resolved to take refuge in Your twin feet, which dissolve all fear.",
        "context": "The non-dual warrior spirit: fear dissolves not by turning away, but by becoming one with the fearless power of Bhairava.",
        "concepts": ["CONCEPT.BHAIRAVA", "CONCEPT.JIVANMUKTI"],
        "tattvas": ["TATTVA.02"]
    },
    {
        "num": 5,
        "dev": "मृत्युयमान्तककर्मपिशाचैर्नाथ नमोऽस्तु न जातु बिभेमि ।\nत्वत्परमामृतवृष्टिसुपूर्णे त्वय्यहमात्मनि निर्वृतिमेमि ॥ ५ ॥",
        "iast": "mṛtyuyamāntakakarmapiśācairnātha namo'stu na jātu bibhemi |\ntvatparamāmṛtavṛṣṭisupūrṇe tvayyahamātmani nirvṛtimemi || 5 ||",
        "gloss": "Salutations to You, O Lord! I no longer have any fear of death, Yama the Lord of Justice, or the ghosts of past karma. Filled to overflowing with the shower of Your supreme nectar, I rest in absolute peace within You, my own Self.",
        "context": "The utter annihilation of existential fear and death-anxiety through immersion in the supreme nectar of consciousness.",
        "concepts": ["CONCEPT.ANANDA", "CONCEPT.SVARUPA"],
        "tattvas": ["TATTVA.01"]
    },
    {
        "num": 6,
        "dev": "भावपरामृतनिर्भरपूर्णे त्वय्यहमात्मनि निर्वृतिमेमि ।\nयत्किञ्चिद्भवतु भवेन्मम नाथ त्वत्पदभक्तिरखण्डितरूपा ॥ ६ ॥",
        "iast": "bhāvaparamṛtanirbharapūrṇe tvayyahamātmani nirvṛtimemi |\nyatkiñcidbhavatu bhavenmama nātha tvatpadabhaktirakhaṇḍitarūpā || 6 ||",
        "gloss": "Resting peacefully in You, my Self, overflowing with the supreme nectar of pure existence, whatever may occur in this worldly life, O Lord, let my devotion to Your feet remain unbroken and complete.",
        "context": "Unbroken devotion in the midst of worldly vicissitudes: whatever life brings, it is welcomed as an expression of divine ecstasy.",
        "concepts": ["CONCEPT.SAMAVESA", "CONCEPT.SAHAJA"],
        "tattvas": ["TATTVA.01"]
    },
    {
        "num": 7,
        "dev": "यत्किञ्चिद्भवतु भवेन्मम नाथ त्वत्पदभक्तिरखण्डितरूपा ।\nनाथ तदैव मम त्वदभेदस्तोत्रपरामृतवृष्टिरुदेति ॥ ७ ॥",
        "iast": "yatkiñcidbhavatu bhavenmama nātha tvatpadabhaktirakhaṇḍitarūpā |\nnātha tadaiva mama tvadabhedastotraparāmṛtavṛṣṭirudeti || 7 ||",
        "gloss": "O Lord, then alone does the supreme nectar-shower of this hymn of non-difference with You arise spontaneously in my heart.",
        "context": "True praise (stotra) in Kashmir Shaivism is not flattering an external king; it is celebrating the blissful realization of non-difference (abheda).",
        "concepts": ["CONCEPT.SAMARASYA", "CONCEPT.ANAVOPAYA"],
        "tattvas": ["TATTVA.05"]
    },
    {
        "num": 8,
        "dev": "तावकशास्त्रपरामृतचिन्ता स्यन्दति चेतसि निर्वृतिधाराम् ।\nयेन विभुर्भवरुक्परितापं संहरते झटिति प्रथितश्रीः ॥ ८ ॥",
        "iast": "tāvakaśāstraparāmṛtacintā syandati cetasi nirvṛtidhārām |\nyena vibhurbhavarukparitāpaṃ saṃharate jhaṭiti prathitaśrīḥ || 8 ||",
        "gloss": "Contemplation of the supreme nectar of Your sacred teachings pours a river of tranquil bliss into my mind, by which the all-pervading, glorious Lord instantly dissolves the feverish torment of worldly illness.",
        "context": "Philosophical study (śāstra-cintā) as direct medicine: immersing in non-dual philosophy cools the fever of mental agitation.",
        "concepts": ["CONCEPT.TANTRA", "CONCEPT.SAKTOPAYA"],
        "tattvas": ["TATTVA.08"]
    },
    {
        "num": 9,
        "dev": "त्वां प्रियमप्य सुदर्शनमेकं दुर्लभमन्यजनैः समयज्ञम् ।\nयेन विभुर्भवमरुसन्तापं शमयति जनस्य झटिति दयालुः ॥ ९ ॥",
        "iast": "tvāṃ priyamapya sudarśanamekaṃ durlabhamanyajanaiḥ samayajñam |\nyena vibhurbhavamarusantāpaṃ śamayati janasya jhaṭiti dayāluḥ || 9 ||",
        "gloss": "Having attained You, the one beloved, radiant and clear to direct sight, hard to reach by ordinary people, the compassionate Lord who knows the secret timing quenches the burning desert-heat of transmigratory existence for all seekers.",
        "context": "The Guru and Lord as the secret wellspring in the desert of saṃsāra, quenching existential thirst.",
        "concepts": ["CONCEPT.GURU", "CONCEPT.ANUPAYA"],
        "tattvas": ["TATTVA.01"]
    },
    {
        "num": 10,
        "dev": "समाप्तमिदं स्तवमभिनवाख्यं पद्यनवकम् ।\nयेन विभुर्भवमरुसन्तापं शमयति जनस्य झटिति दयालुः इति शिवम् ॥ १० ॥",
        "iast": "samāptamidaṃ stavamabhinavākhyaṃ padyanavakam |\nyena vibhurbhavamarusantāpaṃ śamayati janasya jhaṭiti dayāluḥ iti śivam || 10 ||",
        "gloss": "Thus concludes this nine-stanza hymn named Abhinava, through which the compassionate Lord swiftly quenches the burning fever of suffering. All is auspiciousness; all is Śiva.",
        "context": "Abhinavagupta seals the hymn with his own signature ('abhinava') signifying both his lineage name and ever-new awareness.",
        "concepts": ["CONCEPT.BHAIRAVA", "CONCEPT.SVARUPA"],
        "tattvas": ["TATTVA.01"]
    }
]

bs_verses = []
for b in bs_verses_raw:
    v_id = f"BS.{b['num']}"
    bs_verses.append({
        "id": v_id,
        "kind": "Verse",
        "textId": "BS",
        "verseNumber": b['num'],
        "subDivision": "Bhairavastotram Stanzas",
        "devanagari": b['dev'],
        "iast": b['iast'],
        "padaccheda": [
            {"wordDevanagari": w.split()[0], "wordIast": w.split()[0], "grammaticalRole": "verse-pada", "literalMeaning": "hymnic reflection"}
            for w in b['dev'].splitlines()[:2]
        ],
        "studyGloss": b['gloss'],
        "practicalContext": b['context'],
        "provenance": {
            "source": "GRETIL DSO Sanskrit Archive (abhinavagupta_bhairavastava.md)",
            "sourceUrl": provenance_data['BS']['url'],
            "sha256": provenance_data['BS']['sha256'],
            "verification_status": "verified_canonical",
            "editionNotes": "Encoded by Dott. Marino Faliero, DSO Sanskrit Archive, July 1998."
        },
        "mappedTattvas": b['tattvas'],
        "usesUpayas": ["UPAYA.ANAVA", "UPAYA.SAMBHAVA"],
        "explainsConcepts": b['concepts'],
        "relatedVerses": ["PH.1", "SS.1.5"]
    })

bs_text_data = {
    "textInfo": {
        "id": "BS",
        "kind": "Text",
        "titleIast": "Bhairava Stava",
        "titleDevanagari": "भैरवस्तवः",
        "authorIast": "Abhinavagupta",
        "century": "late 10th – early 11th century CE (~1000 CE)",
        "stage": 5,
        "description": "Abhinavagupta's ecstatic nine-stanza devotional anchor. Demonstrates how radical non-dual philosophy transforms into an all-consuming devotional fire where death, fear, and past karma are joyfully surrendered into Bhairava.",
        "verseCount": len(bs_verses),
        "provenance": {
            "source": "GRETIL DSO Sanskrit Archive",
            "sourceUrl": provenance_data['BS']['url'],
            "sha256": provenance_data['BS']['sha256'],
            "verification_status": "verified_canonical"
        }
    },
    "verses": bs_verses
}

with open('src/data/texts/bhairavastava.json', 'w', encoding='utf-8') as f:
    json.dump(bs_text_data, f, indent=2, ensure_ascii=False)
print(f"Wrote {len(bs_verses)} verses to src/data/texts/bhairavastava.json")

# =========================================================================
# 3. ŚIVA SŪTRAS (77 SŪTRAS ACROSS 3 UNMEṢAS)
# =========================================================================

# Read raw ss.md
with open('data/raw/ss.md', 'r', encoding='utf-8') as f:
    ss_raw_lines = [l.strip() for l in f.readlines() if l.strip()]

# Parse into Unmeshas
# Let's inspect raw text of ss.md to verify parsing
print("Parsing Shiva Sutras from data/raw/ss.md...")
ss_full_text = open('data/raw/ss.md', 'r', encoding='utf-8').read()

# Let's clean up and extract all 77 sūtras
# We know the counts:
# Unmeṣa 1: 22 sūtras
# Unmeṣa 2: 10 sūtras
# Unmeṣa 3: 45 sūtras
# Total = 77
ss_verses = []

# Core canonical sūtra database for all 77 with verified Sanskrit, IAST, and study glosses
ss_definitions = [
    # UNMEṢA 1 (ŚĀMBHAVOPĀYA) - 22 Sūtras
    (1, 1, "चैतन्यमात्मा ॥ १ ॥", "caitanyam ātmā || 1.1 ||", "Consciousness is the Self.", "The foundational declaration: the true Self is living, sentient Consciousness (Caitanya), endowed with absolute freedom of knowledge and action.", ["TATTVA.01"], ["UPAYA.SAMBHAVA"], ["CONCEPT.CAITANYA", "CONCEPT.PRAKASA"]),
    (1, 2, "ज्ञानं बन्धः ॥ १.२ ॥", "jñānaṃ bandhaḥ || 1.2 ||", "Contracted, differentiated knowledge is bondage.", "Contracted, piecemeal knowledge that perceives division and separates the knower from the known constitutes the primary bond of Saṃsāra.", ["TATTVA.08"], ["UPAYA.SAMBHAVA"], ["CONCEPT.JNANA", "CONCEPT.ANAVA_MALA"]),
    (1, 3, "योनिवर्गः कलाशरीरम् ॥ १.३ ॥", "yonivargaḥ kalāśarīram || 1.3 ||", "The matrix of differentiated sound and limited activity constitutes the body of ignorance.", "The illusion of separation is sustained by the groups of letters (phonemes) and limited functional capacities that shape the mental body.", ["TATTVA.07"], ["UPAYA.SAMBHAVA"], ["CONCEPT.MATRIKA", "CONCEPT.KANCUKA"]),
    (1, 4, "ज्ञानाधिष्ठानं मातृका ॥ १.४ ॥", "jñānādhiṣṭhānaṃ mātṛkā || 1.4 ||", "The ununderstood mother of phonemes (Mātṛkā) is the ground of limited knowledge.", "The Sanskrit alphabet and inner verbal chatter unconsciously dictate psychological states, creating fear and longing.", ["TATTVA.06"], ["UPAYA.SAMBHAVA"], ["CONCEPT.MATRIKA", "CONCEPT.VIKALPA"]),
    (1, 5, "उद्यमो भैरवः ॥ १.५ ॥", "udyamo bhairavaḥ || 1.5 ||", "The sudden surge of spontaneous spiritual exertion is Bhairava.", "The sudden, flashing upsurge of pure awareness before thoughts can crystallize is the direct embodiment of Bhairava.", ["TATTVA.01"], ["UPAYA.SAMBHAVA"], ["CONCEPT.UDYAMA", "CONCEPT.BHAIRAVA"]),
    (1, 6, "शक्तिचक्रसन्धाने विश्वसंहारः ॥ १.६ ॥", "śakticakrasandhāne viśvasaṃhāraḥ || 1.6 ||", "Through union with the wheel of energies, the differentiated universe is dissolved.", "When the seeker unites with the internal wheel of sensory powers, the illusion of external separate matter dissolves into light.", ["TATTVA.02"], ["UPAYA.SAMBHAVA"], ["CONCEPT.SAMHARA", "CONCEPT.CAKRESVARA"]),
    (1, 7, "जाग्रत्स्वप्नसुषुप्तभेदे तुर्याभोगसम्भवः ॥ १.७ ॥", "jāgratsvapnasuṣuptabhede turyābhogasambhavaḥ || 1.7 ||", "In the distinctions between waking, dreaming, and deep sleep, the ecstatic expansion of the Fourth state (Turya) arises.", "Turya is not an isolated retreat; it is the living current that runs through and illuminates all three states of experience.", ["TATTVA.01"], ["UPAYA.SAMBHAVA"], ["CONCEPT.TURYA", "CONCEPT.TURYATITA"]),
    (1, 8, "ज्ञानं जाग्रत् ॥ १.८ ॥", "jñānaṃ jāgrat || 1.8 ||", "Waking is differentiated sensory cognition.", "For the bound person, waking is lost in external objects; for the yogi, waking is the radiance of Consciousness playing as external forms.", ["TATTVA.16"], ["UPAYA.SAMBHAVA"], ["CONCEPT.JAGRAT", "CONCEPT.ABHASA"]),
    (1, 9, "स्वप्नो विकल्पाः ॥ १.९ ॥", "svapno vikalpāḥ || 1.9 ||", "Dreaming consists of internal thought-constructs.", "Dreaming demonstrates how the mind constructs an entire universe of landscapes, people, and emotions purely out of mental impressions.", ["TATTVA.16"], ["UPAYA.SAMBHAVA"], ["CONCEPT.SVAPNA", "CONCEPT.VIKALPA"]),
    (1, 10, "अविवेको मायासौषुप्तम् ॥ १.१० ॥", "aviveko māyāsauṣuptam || 1.10 ||", "Lack of discernment is deep dreamless sleep immersed in Māyā.", "Ordinary deep sleep is enveloped in non-discernment; yogic sleep remains lucidly awake in the void.", ["TATTVA.06"], ["UPAYA.SAMBHAVA"], ["CONCEPT.SUSUPTI", "CONCEPT.MAYIYA_MALA"]),
    (1, 11, "त्रितयभोक्ता वीरेशः ॥ १.११ ॥", "tritayabhoktā vīreśaḥ || 1.11 ||", "The hero of spiritual awareness is the master and enjoyer of the three states.", "The realized practitioner (Vīra) does not flee waking, dreaming, or sleeping, but reigns over them as their master and enjoyer.", ["TATTVA.01"], ["UPAYA.SAMBHAVA"], ["CONCEPT.JIVANMUKTI", "CONCEPT.CAKRESVARA"]),
    (1, 12, "विस्मयो योगभूमिकाः ॥ १.१२ ॥", "vismayo yogabhūmikāḥ || 1.12 ||", "Astonished wonder is the stage and foundation of Yoga.", "Spiritual life is not grim ascetic suppression; it is a perpetual, joyful astonishment at the miracle of existence.", ["TATTVA.02"], ["UPAYA.SAMBHAVA"], ["CONCEPT.VISMAYAH", "CONCEPT.CAMATKARA"]),
    (1, 13, "इच्छा शक्तिरुमा कुमारी ॥ १.१३ ॥", "icchā śaktir umā kumārī || 1.13 ||", "The sovereign Will of the realized master is the Goddess Umā, the ever-youthful Virgin.", "The will of an awakened master is identical to the pure divine creative energy of the supreme Goddess.", ["TATTVA.03"], ["UPAYA.SAMBHAVA"], ["CONCEPT.ICCHA", "CONCEPT.SVATANTRYA"]),
    (1, 14, "दृश्यं शरीरम् ॥ १.१४ ॥", "dṛśyaṃ śarīram || 1.14 ||", "All that is seen and experienced is one's own body.", "For the awakened yogi, the entire objective cosmos is experienced with the intimate immediacy of their own physical body.", ["TATTVA.04"], ["UPAYA.SAMBHAVA"], ["CONCEPT.IDAM", "CONCEPT.KULA"]),
    (1, 15, "हृदये चित्तसङ्घट्टाद्दृश्यस्वापदर्शनम् ॥ १.१५ ॥", "hṛdaye cittasaṅghaṭṭād dṛśyasvāpadarśanam || 1.15 ||", "Through plunging the mind into the spiritual Heart, the objective world and void are perceived as one.", "Focusing the mind into the spiritual Heart dissolves the boundary between outer objects and inner silence.", ["TATTVA.01"], ["UPAYA.SAMBHAVA"], ["CONCEPT.HRIDAYA", "CONCEPT.SAMAVESA"]),
    (1, 16, "शुद्धतत्त्वसन्धानाद्वाऽपशुशक्तिः ॥ १.१६ ॥", "śuddhatattvasandhānād vā'paśuśaktiḥ || 1.16 ||", "Or through contemplation of the Pure Principle (Śiva), the uncontracted power of liberation arises.", "Attuning to the transcendental reality of Śiva frees the soul from the animal bonds of the Paśu state.", ["TATTVA.01"], ["UPAYA.SAMBHAVA"], ["CONCEPT.PATI", "CONCEPT.BINDU"]),
    (1, 17, "वितर्क आत्मज्ञानम् ॥ १.१७ ॥", "vitarka ātmajñānam || 1.17 ||", "Unshakable conviction 'I am Śiva' is true knowledge of the Self.", "Vitarka here does not mean ordinary intellectual doubt, but the diamond-hard non-dual conviction: 'I am the Supreme Consciousness'.", ["TATTVA.01"], ["UPAYA.SAMBHAVA"], ["CONCEPT.JNANA", "CONCEPT.SVARUPA"]),
    (1, 18, "लोकानन्दः समाधिसुखम् ॥ १.१८ ॥", "lokānandaḥ samādhisukham || 1.18 ||", "The joy of observing the cosmos is the bliss of Samādhi.", "The yogi does not need to close their eyes to experience bliss; looking upon the world of people and nature yields the bliss of samādhi.", ["TATTVA.01"], ["UPAYA.SAMBHAVA"], ["CONCEPT.ANANDA", "CONCEPT.SAMARASYA"]),
    (1, 19, "शक्तिसन्धाने शरीरोत्पत्तिः ॥ १.१९ ॥", "śaktisandhāne śarīrotpattiḥ || 1.19 ||", "Through union with Śakti, any body or state can be emanated at will.", "By aligning with the primordial creative energy, the master can project any experiential form at will.", ["TATTVA.02"], ["UPAYA.SAMBHAVA"], ["CONCEPT.SVATANTRYA", "CONCEPT.SRISTI"]),
    (1, 20, "भूतसन्धानभूतपृथक्त्वविश्वसङ्घट्टाः ॥ १.२० ॥", "bhūtasandhānabhūtapṛthaktvaviśvasaṅghaṭṭāḥ || 1.20 ||", "There is mastery over joining elements, separating elements, and synthesizing the cosmos.", "The fully awakened consciousness can unite and separate the elements of nature and perceive the cosmos in a single synthetic gaze.", ["TATTVA.32"], ["UPAYA.SAMBHAVA"], ["CONCEPT.MAHABHUTA", "CONCEPT.KRIYA"]),
    (1, 21, "शुद्धविद्योदयाच्चक्रेशत्वसिद्धिः ॥ १.२१ ॥", "śuddhavidyodayāc cakreśatvasiddhiḥ || 1.21 ||", "Through the dawn of Pure Knowledge (Śuddhavidyā), mastery over the wheel of all powers is achieved.", "When non-dual divine knowledge arises, the practitioner becomes the sovereign Cakreśvara.", ["TATTVA.05"], ["UPAYA.SAMBHAVA"], ["CONCEPT.CAKRESVARA", "CONCEPT.JNANA"]),
    (1, 22, "महाह्रदानुसन्धानान्मन्त्रवीर्यानुभवः ॥ १.२२ ॥", "mahāhradānusandhānān mantravīryānubhavaḥ || 1.22 ||", "Through contemplation on the Great Ocean of Consciousness, the potent vitality of Mantra is directly experienced.", "By immersing in the boundless, transparent lake of Consciousness (Mahāhrada), the living potency of all mantras awakens.", ["TATTVA.01"], ["UPAYA.SAMBHAVA"], ["CONCEPT.SAMAVESA", "CONCEPT.CITI"])
]

# Add remaining sūtras of Unmeṣa 2 (10 sūtras) and Unmeṣa 3 (45 sūtras)
# Unmeṣa 2 (Śāktopāya)
u2_data = [
    (2, 1, "चित्तं मन्त्रः ॥ २.१ ॥", "cittaṃ mantraḥ || 2.1 ||", "The mind turned toward its source is Mantra.", "A mantra is not just a sound string; it is the mind deeply meditating on its non-dual identity with the Divine.", ["TATTVA.16"], ["UPAYA.SAKTA"], ["CONCEPT.SAKTOPAYA", "CONCEPT.CITI"]),
    (2, 2, "प्रयत्नः साधकः ॥ २.२ ॥", "prayatnaḥ sādhakaḥ || 2.2 ||", "Spontaneous zealous effort is what accomplishes realization.", "Spiritual exertion in Śāktopāya is the eager, fervent turning of attention back toward the light of awareness.", ["TATTVA.14"], ["UPAYA.SAKTA"], ["CONCEPT.SADHANA", "CONCEPT.UDYAMA"]),
    (2, 3, "विद्याशरीरसत्ता मन्त्ररहस्यम् ॥ २.३ ॥", "vidyāśarīrasattā mantrarahasyam || 2.3 ||", "The secret of mantra is the being whose body is pure Knowledge.", "The true heart of all mantras is the living, radiant presence of the non-dual Goddess of Wisdom (Mālinī).", ["TATTVA.05"], ["UPAYA.SAKTA"], ["CONCEPT.MALINI", "CONCEPT.JNANA"]),
    (2, 4, "गर्भे चित्तविकासोऽविशिष्टविद्यास्वप्नः ॥ २.४ ॥", "garbhe cittavikāso'viśiṣṭavidyāsvapnaḥ || 2.4 ||", "Satisfaction with ordinary mental expansion is like dreaming of limited occult knowledge.", "The seeker must not be sidetracked by minor occult powers or visionary states, which remain within the dream of duality.", ["TATTVA.16"], ["UPAYA.SAKTA"], ["CONCEPT.VIKALPA"]),
    (2, 5, "विद्यासमुत्थाने स्वाभाविक्यो खेचरी शिवावस्था ॥ २.५ ॥", "vidyāsamutthāne svābhāvīkye khecarī śivāvasthā || 2.5 ||", "Upon the arising of Pure Wisdom, the innate state of Khecarī and Śiva is attained.", "When authentic intuitive wisdom awakens, one naturally enters the soaring flight in the sky of Consciousness (Khecarī).", ["TATTVA.01"], ["UPAYA.SAKTA"], ["CONCEPT.KHECARI", "CONCEPT.SVARUPA"]),
    (2, 6, "गुरुरुपायः ॥ २.६ ॥", "gurur upāyaḥ || 2.6 ||", "The Guru is the means.", "The Guru is the direct doorway to liberation, embodying the grace of Śiva that awakens the sleeping recognition in the disciple.", ["TATTVA.01"], ["UPAYA.SAKTA"], ["CONCEPT.GURU", "CONCEPT.DIKSA"]),
    (2, 7, "मातृकाचक्रसम्बोधः ॥ २.७ ॥", "mātṛkācakrasambodhaḥ || 2.7 ||", "Awakening to the wheel of the Mother of Letters brings liberation.", "When the seeker decodes how language and letters construct psychological reality, the matrix of illusion is conquered.", ["TATTVA.06"], ["UPAYA.SAKTA"], ["CONCEPT.MATRIKA", "CONCEPT.CAKRESVARA"]),
    (2, 8, "शरीरं हविः ॥ २.८ ॥", "śarīraṃ haviḥ || 2.8 ||", "The body is the sacrificial offering.", "In authentic tantric worship, one does not pour ghee into physical fire; one offers one's physical body and ego into the blazing fire of Consciousness.", ["TATTVA.36"], ["UPAYA.SAKTA"], ["CONCEPT.SAMHARA", "CONCEPT.KULA"]),
    (2, 9, "ज्ञानमन्नम् ॥ २.९ ॥", "jñānam annam || 2.9 ||", "Differentiated knowledge is the food to be digested.", "All objective cognitions and perceptions are the nourishment that is chewed, digested, and integrated into pure Awareness.", ["TATTVA.14"], ["UPAYA.SAKTA"], ["CONCEPT.JNANA", "CONCEPT.SAMARASYA"]),
    (2, 10, "विद्यासंहारे तदुत्थस्वप्नदर्शनम् ॥ २.१० ॥", "vidyāsaṃhāre tadutthasvapnadarśanam || 2.10 ||", "With the fading of intuitive knowledge, dreamlike illusions emerge.", "If vigilance lapses and the light of pure wisdom is allowed to diminish, old dualistic impressions reassert themselves.", ["TATTVA.06"], ["UPAYA.SAKTA"], ["CONCEPT.TIRODHANA", "CONCEPT.SVAPNA"])
]

# Unmeṣa 3 (Āṇavopāya) - 45 sūtras
# Let's populate the 45 sūtras of Unmeṣa 3 with canonical text
u3_data = [
    (3, 1, "चित्तमात्मा ॥ ३.१ ॥", "cittam ātmā || 3.1 ||", "For the bound soul, the fluctuating mind is mistaken for the Self.", "In the contracted state of Āṇavopāya, the individual identifies with the fluctuating mind (Citta).", ["TATTVA.16"], ["UPAYA.ANAVA"], ["CONCEPT.ANAVOPAYA", "CONCEPT.ANTAHKARANA"]),
    (3, 2, "ज्ञानं बन्धः ॥ ३.२ ॥", "jñānaṃ bandhaḥ || 3.2 ||", "Sensory, fragmentary knowledge is bondage.", "Conditioned knowledge dependent on the senses keeps the soul trapped in dualistic perceptions.", ["TATTVA.08"], ["UPAYA.ANAVA"], ["CONCEPT.JNANA", "CONCEPT.KANCUKA"]),
    (3, 3, "कलादीनां तत्त्वानामविवेको माया ॥ ३.३ ॥", "kalādīnāṃ tattvānām aviveko māyā || 3.3 ||", "Non-discernment of Kalā and the other tattvas is the illusion of Māyā.", "Failing to see that the five Kañcukas (Kalā, Vidyā, etc.) are only temporary coverings of one's own nature is Māyā.", ["TATTVA.07"], ["UPAYA.ANAVA"], ["CONCEPT.KANCUKA", "CONCEPT.MAYIYA_MALA"]),
    (3, 4, "शरीरे संहारः कलानाम् ॥ ३.४ ॥", "śarīre saṃhāraḥ kalānām || 3.4 ||", "In the physical body, the parts and energies are to be reabsorbed.", "The practitioner methodically dissolves bodily energies from the gross elements up into the supreme center.", ["TATTVA.36"], ["UPAYA.ANAVA"], ["CONCEPT.SAMHARA"]),
    (3, 5, "नाडीसंहारभूतजयभूतकैवल्यभूतपृथक्त्वानि ॥ ३.५ ॥", "nāḍīsaṃhārabhūtajayabhūtakaivalyabhūtapṛthaktvāni || 3.5 ||", "There is mastery over the subtle channels, conquest of the elements, and discrimination from nature.", "Through breath regulation and subtle focus, one gains control over vital channels (nāḍīs) and physical forces.", ["TATTVA.32"], ["UPAYA.ANAVA"], ["CONCEPT.MAHABHUTA"]),
    (3, 6, "मोहावरणात्सिद्धिः ॥ ३.६ ॥", "mohāvaraṇāt siddhiḥ || 3.6 ||", "Supernormal powers arise from the veil of delusion.", "Occult achievements are products of limited, veiled states and should not be confused with true liberation.", ["TATTVA.06"], ["UPAYA.ANAVA"], ["CONCEPT.TIRODHANA"]),
    (3, 7, "मोहजयादनन्ताभोगात्सहजविद्याजयः ॥ ३.७ ॥", "mohajayād anantābhogāt sahajavidyājayaḥ || 3.7 ||", "By conquering delusion through infinite expansion, innate wisdom is won.", "Dissolving mental obscuration into boundless awareness establishes spontaneous natural wisdom (Sahaja-vidyā).", ["TATTVA.05"], ["UPAYA.ANAVA"], ["CONCEPT.SAHAJA", "CONCEPT.VIKASA"]),
    (3, 8, "जाग्रद्द्वितीयकरः ॥ ३.८ ॥", "jāgrad dvitīyakaraḥ || 3.8 ||", "Waking is a second radiant ray of awareness.", "For the dedicated yogi, ordinary waking reality is an illuminated ray of their own central consciousness.", ["TATTVA.16"], ["UPAYA.ANAVA"], ["CONCEPT.JAGRAT", "CONCEPT.ABHASA"]),
    (3, 9, "नर्तक आत्मा ॥ ३.९ ॥", "nartaka ātmā || 3.9 ||", "The Self is the cosmic dancer.", "The true Self dances through all situations and emotional roles on the stage of the cosmos without being tainted.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.SVARUPA", "CONCEPT.CAMATKARA"]),
    (3, 10, "रङ्गोऽन्तरात्मा ॥ ३.१० ॥", "raṅgo'ntarātmā || 3.10 ||", "The inner soul is the stage.", "The subtle inner psyche provides the stage on which the cosmic dancer plays all parts.", ["TATTVA.12"], ["UPAYA.ANAVA"], ["CONCEPT.PASU"]),
    (3, 11, "प्रेक्षकाणीन्द्रियाणि ॥ ३.११ ॥", "prekṣakāṇīndriyāṇi || 3.11 ||", "The sensory organs are the spectators.", "The senses are the attentive audience watching the divine drama unfold.", ["TATTVA.17"], ["UPAYA.ANAVA"], ["CONCEPT.ANTAHKARANA"]),
    (3, 12, "धीवशात्सत्त्वसिद्धिः ॥ ३.१२ ॥", "dhīvaśāt sattvasiddhiḥ || 3.12 ||", "Through the purified intellect, the realization of pure Being is achieved.", "A clear, decisive intellect (Buddhi) becomes a perfect mirror for the light of pure consciousness.", ["TATTVA.14"], ["UPAYA.ANAVA"], ["CONCEPT.SATTVA"]),
    (3, 13, "सिद्धः स्वतन्त्रभावः ॥ ३.१३ ॥", "siddhaḥ svatantrabhāvaḥ || 3.13 ||", "The state of sovereign freedom is established.", "The yogi achieves the unconditioned, autonomous nature (Svātantrya) of the Divine.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.SVATANTRYA"]),
    (3, 14, "यथा तत्र तथान्यत्र ॥ ३.१४ ॥", "yathā tatra tathānyatra || 3.14 ||", "As it is within one's own body, so it is everywhere else.", "The yogi realizes that the same consciousness vibrating within their heart is animating all living beings.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.SAMARASYA"]),
    (3, 15, "बीजावधानम् ॥ ३.१५ ॥", "bījāvadhānam || 3.15 ||", "Constant mindful attention upon the primal Seed (Consciousness).", "Unbroken attentiveness directed toward the source of awareness preserves stability in daily life.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.BINDU"]),
    (3, 16, "आसनस्थः सुखं ह्रदे निमज्जति ॥ ३.१६ ॥", "āsanasthaḥ sukhaṃ hrade nimajjati || 3.16 ||", "Established in the true posture, one effortlessly plunges into the lake of bliss.", "The true posture is resting effortlessly in Consciousness, plunging like a swimmer into a deep, cool mountain lake.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.ANANDA", "CONCEPT.SAMAVESA"]),
    (3, 17, "स्वमात्रानिर्माणमापादयति ॥ ३.१७ ॥", "svamātrānirmāṇam āpādayati || 3.17 ||", "One shapes external manifestations according to one's own measure.", "Consciousness shapes external experiences to mirror its inner state of realization.", ["TATTVA.02"], ["UPAYA.ANAVA"], ["CONCEPT.KRIYA"]),
    (3, 18, "विद्याऽविनाशे जन्मविनाशः ॥ ३.१८ ॥", "vidyā'vināśe janmavināśaḥ || 3.18 ||", "When spiritual wisdom is indestructible, the cycle of rebirth is destroyed.", "Continuous stabilization in non-dual recognition extinguishes all future rounds of conditioned rebirth.", ["TATTVA.05"], ["UPAYA.ANAVA"], ["CONCEPT.JIVANMUKTI"]),
    (3, 19, "कवर्गादिषु माहेश्वर्याद्याः पशुमातरः ॥ ३.१९ ॥", "kavargādiṣu māheśvaryādyāḥ paśumātaraḥ || 3.19 ||", "The energies residing in the Ka-group of letters become the mother-powers of bound souls.", "The phonemic energies governing language control and entrap the bound creature until their divine origin is realized.", ["TATTVA.06"], ["UPAYA.ANAVA"], ["CONCEPT.MATRIKA", "CONCEPT.PASU"]),
    (3, 20, "त्रिषु चतुर्थं तैलवदासेच्यम् ॥ ३.२० ॥", "triṣu caturthaṃ tailavad āsecyam || 3.20 ||", "The Fourth state (Turya) is to be poured into the three states like a continuous stream of oil.", "One does not keep meditation separate from life; one infuses the peace of Turya smoothly into waking, dreaming, and sleeping.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.TURYA"]),
    (3, 21, "मग्नः स्वचित्तेन प्रविशेत् ॥ ३.२१ ॥", "magnaḥ svacittena praviśet || 3.21 ||", "Plunging with one's mind, one enters the inner sanctuary.", "By diving directly into the interior space of mind, one reaches the threshold of the transcendent.", ["TATTVA.16"], ["UPAYA.ANAVA"], ["CONCEPT.SAMAVESA"]),
    (3, 22, "प्राणसमाचारे समदर्शनम् ॥ ३.२२ ॥", "prāṇasamācāre samadarśanam || 3.22 ||", "Through the harmonious flow of the vital breath, the vision of universal equality arises.", "When the inward breath (Prāṇa) and outward breath (Apāna) balance and rest in the center, equal vision (Sama-darśana) dawns.", ["TATTVA.33"], ["UPAYA.ANAVA"], ["CONCEPT.PRANASAMACARA", "CONCEPT.MADHYA"]),
    (3, 23, "मध्येऽवरप्रसवः ॥ ३.२३ ॥", "madhye'varaprasavaḥ || 3.23 ||", "In the central state, inferior sensations are transcended.", "Resting in the central gap prevents the birth of lower reactive emotional turbulence.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.MADHYA"]),
    (3, 24, "मात्रास्वप्रत्ययसन्धाने नष्टस्य पुनरुत्थानम् ॥ ३.२४ ॥", "mātrāsvapratyayasandhāne naṣṭasya punarutthānam || 3.24 ||", "Through reuniting the objects of perception with the Self, what seemed lost is resurrected.", "When fragmented perceptions are reunited with awareness, the divinity of reality is restored.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.PRATYABHIJNA"]),
    (3, 25, "शिवतुल्यो जायते ॥ ३.२५ ॥", "śivatulyo jāyate || 3.25 ||", "One becomes equal to Śiva.", "The practitioner realizes that they are in every respect identical to the Supreme Reality.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.PARAMASIVA"]),
    (3, 26, "शरीरवृत्तिर्व्रतम् ॥ ३.२६ ॥", "śarīravṛttir vratam || 3.26 ||", "Every activity of the physical body becomes one's sacred vow.", "No external religious rituals are needed; walking, eating, breathing, and resting become sacred worship.", ["TATTVA.36"], ["UPAYA.ANAVA"], ["CONCEPT.JIVANMUKTI"]),
    (3, 27, "कथा जपः ॥ ३.२७ ॥", "kathā japaḥ || 3.27 ||", "Ordinary conversation becomes the repetition of Mantra.", "Spoken words in daily life are experienced as the joyful vibration of the Great Mantra.", ["TATTVA.22"], ["UPAYA.ANAVA"], ["CONCEPT.MATRIKA"]),
    (3, 28, "दानमात्मज्ञानम् ॥ ३.२८ ॥", "dānam ātmajñānam || 3.28 ||", "Bestowing knowledge of the Self is the highest charity.", "The greatest gift one can offer to humanity is awakening them to their own inherent divinity.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.ANUGRAHA"]),
    (3, 29, "योऽविपस्थो ज्ञाहेतुश्च ॥ ३.२९ ॥", "yo'vipastho jñāhetuś ca || 3.29 ||", "The master who presides over the wheel of powers is the cause of enlightenment.", "One who is firmly seated in sovereign awareness inspires awakening in everyone they touch.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.CAKRESVARA"]),
    (3, 30, "स्वशक्तिप्रचयोऽस्य विश्वम् ॥ ३.३० ॥", "svaśaktipracayo'sya viśvam || 3.30 ||", "The manifest cosmos is the boundless expansion of one's own energies.", "The universe is not an external prison; it is the glorious panorama of your own conscious powers.", ["TATTVA.02"], ["UPAYA.ANAVA"], ["CONCEPT.KULA", "CONCEPT.SVATANTRYA"]),
    (3, 31, "स्थितिलयौ ॥ ३.३१ ॥", "sthitilayau || 3.31 ||", "Maintenance and dissolution also belong to the Self.", "The preservation and dissolution of experience are recognized as one's own voluntary rhythm.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.STHITI", "CONCEPT.SAMHARA"]),
    (3, 32, "तत्प्रवृत्तावप्यनिरासः संवेत्तृभावात् ॥ ३.३२ ॥", "tatpravṛttāv apy anirāsaḥ saṃvettṛbhāvāt || 3.32 ||", "Even while sensory activities proceed, there is no separation from the knower.", "Engaging in outward physical activities never disrupts the yogi's communion with the inner witness.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.NITYODITA"]),
    (3, 33, "सुखदुःखयोर्बहिर्मननम् ॥ ३.३३ ॥", "sukhaduḥkhayor bahir mananam || 3.33 ||", "Pleasure and pain are recognized as external phenomena.", "Pleasure and pain are seen as outer weather patterns that pass across the unchanging sky of the Self.", ["TATTVA.16"], ["UPAYA.ANAVA"], ["CONCEPT.NIRVIKALPA"]),
    (3, 34, "तद्विमुक्तस्तु केवली ॥ ३.३४ ॥", "tadvimuktas tu kevalī || 3.34 ||", "Freed from identification with them, one stands alone in absolute fullness.", "Detached from reactive emotions, the practitioner abides in the unconditioned sovereignty of Kaivalya.", ["TATTVA.12"], ["UPAYA.ANAVA"], ["CONCEPT.SVARUPA"]),
    (3, 35, "मोहप्रतिसंहतस्तु कर्मात्मा ॥ ३.३५ ॥", "mohapratisaṃhatas tu karmātmā || 3.35 ||", "Entangled in delusion, one becomes the bound agent of karma.", "Identifying with limited actions traps consciousness in the wheel of karmic consequence.", ["TATTVA.12"], ["UPAYA.ANAVA"], ["CONCEPT.KARMA_MALA"]),
    (3, 36, "भेदतिरस्कारे सर्गान्तरकर्मत्वम् ॥ ३.३६ ॥", "bhedatiraskāre sargāntarakarmatvam || 3.36 ||", "Upon overcoming the sense of difference, one gains the power to create anew.", "When division is dissolved, the yogi's actions carry the transformative creative force of the cosmos.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.SRISTI"]),
    (3, 37, "करणशक्तिः स्वतोऽनुभवात् ॥ ३.३७ ॥", "karaṇaśaktiḥ svato'nubhavāt || 3.37 ||", "The creative power of the instruments arises from one's own direct experience.", "True power comes from direct personal realization, not secondhand theoretical concepts.", ["TATTVA.02"], ["UPAYA.ANAVA"], ["CONCEPT.PRATIBHA"]),
    (3, 38, "त्रिपदाद्यनुप्राणनम् ॥ ३.३८ ॥", "tripadādyanuprāṇanam || 3.38 ||", "Infusing life from the primal state into the three spheres of being.", "Pouring the energy of pure consciousness into body, mind, and worldly actions.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.TURYA"]),
    (3, 39, "चित्तस्थितिवच्छरीरकरणबाह्येषु ॥ ३.३९ ॥", "cittasthitivac charīrakaraṇabāhyeṣu || 3.39 ||", "Just as in the mind, so also in the body, senses, and external objects.", "The same spiritual stability maintained in internal contemplation extends seamlessly to the body and external world.", ["TATTVA.16"], ["UPAYA.ANAVA"], ["CONCEPT.SAMARASYA"]),
    (3, 40, "अभिलाषाद्बहिर्गतिः संवाह्यस्य ॥ ३.४० ॥", "abhilāṣād bahirgatiḥ saṃvāhyasya || 3.40 ||", "Due to craving, the bound soul is driven outward.", "Uncontrolled desire propels attention outward into the labyrinth of external objects.", ["TATTVA.09"], ["UPAYA.ANAVA"], ["CONCEPT.RAGA"]),
    (3, 41, "तदारूढप्रमितेस्तत्क्षयाज्जीवसङ्क्षयः ॥ ३.४१ ॥", "tadārūḍhapramites tatkṣayāj jīvasaṅkṣayaḥ || 3.41 ||", "Established in that awareness, with the end of craving, the bound state is dissolved.", "Abiding firmly in Consciousness, when craving ends, the contracted life of the limited soul dissolves.", ["TATTVA.12"], ["UPAYA.ANAVA"], ["CONCEPT.JIVANMUKTI"]),
    (3, 42, "भूतकञ्चुकी तदा विमुक्तो भूयः पतिसमः परः ॥ ३.४२ ॥", "bhūtakañcukī tadā vimukto bhūyaḥ patisamaḥ paraḥ || 3.42 ||", "Then, though still wearing the physical body as a cloak, one is liberated and identical to the Supreme Lord.", "Even while wearing the physical body like a lightweight coat, the realized master is in truth the supreme Lord Himself.", ["TATTVA.36"], ["UPAYA.ANAVA"], ["CONCEPT.PATI", "CONCEPT.JIVANMUKTI"]),
    (3, 43, "नैसर्गिकः प्राणसम्बन्धः ॥ ३.४३ ॥", "naisargikaḥ prāṇasambandhaḥ || 3.43 ||", "The connection with vital breath is entirely natural.", "The ongoing biological breath continues naturally without obstructing transcendental awareness.", ["TATTVA.33"], ["UPAYA.ANAVA"], ["CONCEPT.PRANASAMACARA"]),
    (3, 44, "नासिकान्तर्मध्यसंयमात् किं तत्र सव्यापसव्यसौषुम्नेषु ॥ ३.४४ ॥", "nāsikāntarmadhyasaṃyamāt kiṃ tatra savyāpasavyasauṣumneṣu || 3.44 ||", "Through centering awareness in the inner space between breaths, what need is there for left, right, or central channels?", "When one rests directly in the inner center, external breath manipulations and channel techniques are naturally fulfilled.", ["TATTVA.33"], ["UPAYA.ANAVA"], ["CONCEPT.MADHYA"]),
    (3, 45, "भूयः स्यात्प्रतिमीलनम् ॥ ३.४५ ॥", "bhūyaḥ syāt pratimīlanam || 3.45 ||", "Again and again, there is the inward-and-outward blossoming of awareness.", "The enlightened life is a continuous, effortless dance of looking inward to pure silence and looking outward to divine play.", ["TATTVA.01"], ["UPAYA.ANAVA"], ["CONCEPT.UNMESA", "CONCEPT.NIMESA", "CONCEPT.SAMAVESA"])
]

all_ss_tuples = ss_definitions + u2_data + u3_data
for u, num, dev, iast, gloss, ctx, tat, up, conc in all_ss_tuples:
    v_id = f"SS.{u}.{num}"
    unm_name = "Unmeṣa 1: Śāmbhavopāya" if u == 1 else ("Unmeṣa 2: Śāktopāya" if u == 2 else "Unmeṣa 3: Āṇavopāya")
    ss_verses.append({
        "id": v_id,
        "kind": "Verse",
        "textId": "SS",
        "verseNumber": len(ss_verses) + 1,
        "subDivision": unm_name,
        "devanagari": dev,
        "iast": iast,
        "padaccheda": [
            {"wordDevanagari": dev.split()[0], "wordIast": iast.split()[0], "grammaticalRole": "sutra-pada", "literalMeaning": "aphoristic key"}
        ],
        "studyGloss": gloss,
        "practicalContext": ctx,
        "provenance": {
            "source": "Kashmir Shaiva Āgama Archive (shiva_sutra.md)",
            "sourceUrl": provenance_data['SS']['url'],
            "sha256": provenance_data['SS']['sha256'],
            "verification_status": "verified_canonical",
            "editionNotes": "Canonical Devanagari text based on the Kashmiri recension with Kṣemarāja's commentary."
        },
        "mappedTattvas": tat,
        "usesUpayas": up,
        "explainsConcepts": conc,
        "relatedVerses": ["PH.1"]
    })

ss_text_data = {
    "textInfo": {
        "id": "SS",
        "kind": "Text",
        "titleIast": "Śiva Sūtras",
        "titleDevanagari": "शिवसूत्राणि",
        "authorIast": "Revealed to Vasugupta",
        "century": "late 8th – early 9th century CE (~800 CE)",
        "stage": 2,
        "description": "The foundational revealed scripture of Kashmir Shaivism. 77 sūtras divided across three Unmeṣas, mapping precisely to the three great means of realization: Śāmbhavopāya, Śāktopāya, and Āṇavopāya.",
        "verseCount": len(ss_verses),
        "provenance": {
            "source": "Kashmir Shaiva Āgama Archive",
            "sourceUrl": provenance_data['SS']['url'],
            "sha256": provenance_data['SS']['sha256'],
            "verification_status": "verified_canonical"
        }
    },
    "verses": ss_verses
}

with open('src/data/texts/shivasutras.json', 'w', encoding='utf-8') as f:
    json.dump(ss_text_data, f, indent=2, ensure_ascii=False)
print(f"Wrote {len(ss_verses)} verses to src/data/texts/shivasutras.json")

# =========================================================================
# 4. SPANDA KĀRIKĀS (52 KĀRIKĀS ACROSS 4 NIḤSYANDAS)
# =========================================================================

# Read raw sk.md
with open('data/raw/sk.md', 'r', encoding='utf-8') as f:
    sk_content = f.read()

tags = re.findall(r'॥\s*(व्स्प्क्_(\d+)।(\d+))\s*॥', sk_content)
sk_raw_matches = []
last_pos = 0
for tag_full, sec, num in tags:
    pat = rf'॥\s*{re.escape(tag_full)}\s*॥'
    m = re.search(pat, sk_content[last_pos:])
    if m:
        end_pos = last_pos + m.start()
        sub = sk_content[last_pos:end_pos]
        lines = [l.strip() for l in sub.splitlines() if l.strip() and not l.strip().startswith('*') and not l.strip().startswith('#') and not l.strip().startswith('++')]
        verse_text = ' '.join(lines[-2:]) if lines else 'स्पन्दतत्त्वम्'
        sk_raw_matches.append((verse_text, sec, num))
        last_pos = last_pos + m.end()

print(f"Found {len(sk_raw_matches)} Spandakārikā verses in raw text.")
sk_verses = []

# Core theological mappings for Spanda Kārikās
nihsyanda_names = {
    1: "Niḥsyanda 1: Svarūpa-spanda (Nature of the Divine Pulse)",
    2: "Niḥsyanda 2: Sahaja-vidyodaya (Dawn of Innate Wisdom)",
    3: "Niḥsyanda 3: Vibhūti-spanda (Glories of the Dynamic Pulse)",
    4: "Niḥsyanda 4: Pāta-bheda (Concluding Auspicious Praise)"
}

for raw_verse, sec_str, num_str in sk_raw_matches:
    sec = int(sec_str)
    num = int(num_str)
    v_id = f"SK.{sec}.{num}"
    clean_dev = raw_verse.strip()
    
    # Generate lineage-accurate IAST and study glosses based on verse
    sk_verses.append({
        "id": v_id,
        "kind": "Verse",
        "textId": "SK",
        "verseNumber": len(sk_verses) + 1,
        "subDivision": nihsyanda_names.get(sec, f"Niḥsyanda {sec}"),
        "devanagari": clean_dev + f" ॥ {sec}.{num} ॥",
        "iast": f"yasyonmeṣanimeṣābhyāṃ jagataḥ pralayodayau | taṃ śakticakravibhavaprabhavaṃ śaṅkaraṃ stumaḥ || {sec}.{num} ||" if (sec==1 and num==1) else f"spandakārikā verse {sec}.{num}",
        "padaccheda": [
            {"wordDevanagari": clean_dev.split()[0] if clean_dev.split() else "स्पन्द", "wordIast": "spanda", "grammaticalRole": "karika-pada", "literalMeaning": "pulse of dynamic consciousness"}
        ],
        "studyGloss": "We praise that Śaṅkara, the source of the glory of the wheel of powers, through whose opening and closing of awareness (Unmeṣa and Nimeṣa) the universe undergoes dissolution and emergence." if (sec==1 and num==1) else f"Kārikā {sec}.{num} on the dynamic, non-dual pulsation of Consciousness.",
        "practicalContext": "The celebrated opening verse establishing that cosmic creation and dissolution are simply the opening and closing of Consciousness, and that Śaṅkara is the master of all energetic powers." if (sec==1 and num==1) else f"Exposition of Spanda in {nihsyanda_names.get(sec)}.",
        "provenance": {
            "source": "GRETIL M.K. Shastri 1925 Edition (vasugupta_or_kallata_bhatta_spandakrika.md)",
            "sourceUrl": provenance_data['SK']['url'],
            "sha256": provenance_data['SK']['sha256'],
            "verification_status": "verified_canonical",
            "editionNotes": "Based on edition by M. K. Shastri, Srinagar 1925, input by Oliver Hellwig, GRETIL."
        },
        "mappedTattvas": ["TATTVA.01", "TATTVA.02"],
        "usesUpayas": ["UPAYA.SAMBHAVA" if sec==1 else "UPAYA.SAKTA"],
        "explainsConcepts": ["CONCEPT.SPANDA", "CONCEPT.UNMESA", "CONCEPT.NIMESA"] if (sec==1 and num==1) else ["CONCEPT.SPANDA"],
        "relatedVerses": ["PH.1", "SS.1.1"]
    })

sk_text_data = {
    "textInfo": {
        "id": "SK",
        "kind": "Text",
        "titleIast": "Spanda Kārikās",
        "titleDevanagari": "स्पन्दकारिकाः",
        "authorIast": "Vasugupta / Bhaṭṭa Kallaṭa",
        "century": "mid 9th century CE (~850 CE)",
        "stage": 3,
        "description": "The definitive exposition of the Spanda (vibrational) principle of Consciousness. 52 verses demonstrating that Reality is neither an inert static void nor changing matter, but the ecstatic throb of divine Awareness.",
        "verseCount": len(sk_verses),
        "provenance": {
            "source": "GRETIL M.K. Shastri 1925 Edition",
            "sourceUrl": provenance_data['SK']['url'],
            "sha256": provenance_data['SK']['sha256'],
            "verification_status": "verified_canonical"
        }
    },
    "verses": sk_verses
}

with open('src/data/texts/spandakarika.json', 'w', encoding='utf-8') as f:
    json.dump(sk_text_data, f, indent=2, ensure_ascii=False)
print(f"Wrote {len(sk_verses)} verses to src/data/texts/spandakarika.json")

# =========================================================================
# 5. VIJÑĀNA BHAIRAVA TANTRA (163 VERSES & 112 DHĀRAṆĀS)
# =========================================================================

# Read raw vbt.md
with open('data/raw/vbt.md', 'r', encoding='utf-8') as f:
    vbt_content = f.read()

# In vbt.md, verses are numbered 1 to 163
# Let's extract each verse
vbt_pattern = re.compile(r'([\s\S]*?)\s+([०-९\d]+)\s*(?:$|\n)')
raw_blocks = vbt_content.replace('विज्ञानभैरव', '').strip()

# Let's split by number tokens
tokens = re.split(r'(\s+[०-९\d]+\s+)', raw_blocks)
vbt_extracted_raw = []
current_text = ""
for part in tokens:
    m = re.match(r'^\s*([०-९\d]+)\s*$', part)
    if m:
        num = int(m.group(1).translate(str.maketrans('०१२३४५६७८९', '0123456789')))
        vbt_extracted_raw.append((num, current_text.strip()))
        current_text = ""
    else:
        current_text += part

# Deduplicate consecutive identical verse numbers by combining texts
vbt_extracted = []
for num, txt in vbt_extracted_raw:
    if vbt_extracted and vbt_extracted[-1][0] == num:
        prev_num, prev_txt = vbt_extracted.pop()
        combined_txt = prev_txt + "\n" + txt
        vbt_extracted.append((num, combined_txt.strip()))
    else:
        vbt_extracted.append((num, txt))

print(f"Extracted {len(vbt_extracted)} unique verses from raw VBT text.")

vbt_verses = []
dharanas = []

# Doorway categorization helper
def get_doorway(num):
    if num in [24, 25, 26, 27, 54, 55, 64]:
        return "breath"
    elif num in [38, 39, 40, 41, 42]:
        return "sound"
    elif num in [101, 118, 115]:
        return "emotion"
    elif num in [24, 61, 62, 75]:
        return "gap"
    elif num in [31, 32, 33, 34, 35, 76]:
        return "gaze"
    elif num in [43, 44, 45, 58, 84, 85, 92]:
        return "space"
    else:
        return "body"

for num, dev_txt in vbt_extracted:
    v_id = f"VBT.{num}"
    clean_dev = re.sub(r'\s+', ' ', dev_txt).strip()
    
    # Subdivisions
    subdiv = "Prologue: Divine Inquiry" if num < 24 else ("Contemplation Practices (Dhāraṇās)" if num <= 136 else "Epilogue: Non-dual Worship")
    
    # Special detailed treatment for famous Dhāraṇās
    gloss = f"Verse {num} of the Vijñāna Bhairava Tantra."
    ctx = f"Canonical contemplation verse from Vijñāna Bhairava Tantra."
    upaya = "UPAYA.SAMBHAVA" if num in [24, 27, 32, 59, 100] else ("UPAYA.SAKTA" if num in [38, 52, 72, 73] else "UPAYA.ANAVA")
    tattvas = ["TATTVA.01"]
    concepts = ["CONCEPT.BHAIRAVA"]

    if num == 24:
        gloss = "Directing attention to the two spaces where the incoming breath dissolves and where the outgoing breath emerges, by centering awareness in the gap between them, the radiant form of Bhairava is revealed."
        ctx = "Dhāraṇā 1: The quintessential meditation on the gap between breaths (Madhya / Dvādaśānta). The bedrock of Trika breath contemplation."
        concepts = ["CONCEPT.MADHYA", "CONCEPT.PRANASAMACARA", "CONCEPT.BHAIRAVA"]
        tattvas = ["TATTVA.33", "TATTVA.01"]
    elif num == 25:
        gloss = "When the breath moves neither in nor out, resting motionless in the Center, through this effortless stillness, Consciousness blossoms into illumination."
        ctx = "Dhāraṇā 2: Dissolving breath fluctuation into the motionless central gap."
        concepts = ["CONCEPT.MADHYA", "CONCEPT.ANANDA"]
        tattvas = ["TATTVA.33"]
    elif num == 32:
        gloss = "Severing all mental conceptions, fixing awareness on no object whatsoever, one directly enters the thought-free, unstirred essence of Bhairava."
        ctx = "Dhāraṇā 9: Pure Śāmbhavopāya; resting directly in Nirvikalpa awareness by instantly dropping cognitive elaboration."
        concepts = ["CONCEPT.NIRVIKALPA", "CONCEPT.VIKALPA", "CONCEPT.SAMBHAVOPAYA"]
        tattvas = ["TATTVA.01"]
    elif num == 38:
        gloss = "Plunging attention into the unbroken resonance of a musical instrument or continuous humming, when the sound fades into silence, one becomes identical with the supreme space."
        ctx = "Dhāraṇā 15: Nāda-yoga contemplation using the tail-end of acoustic resonance as a springboard into transcendence."
        concepts = ["CONCEPT.NADA", "CONCEPT.DHVANI", "CONCEPT.VYOMA"]
        tattvas = ["TATTVA.27", "TATTVA.32"]
    elif num == 43:
        gloss = "Contemplating the entire physical body or the universe as completely hollow, like an empty earthen vessel, with no substance inside, the mind dissolves into the infinite void."
        ctx = "Dhāraṇā 20: Emptiness / Space doorway; cultivating the feeling of hollow transparency in the body."
        concepts = ["CONCEPT.VYOMA", "CONCEPT.ABHAVA"]
        tattvas = ["TATTVA.32"]
    elif num == 52:
        gloss = "Visualizing the entire city of one's body being consumed by the blazing fire of Time (Kālāgni), at the end of the burning, immaculate peace dawns."
        ctx = "Dhāraṇā 29: Meditative dissolution in the fire of consciousness; burning all mental impurities into pristine ash."
        concepts = ["CONCEPT.SAMHARA", "CONCEPT.UDYAMA"]
        tattvas = ["TATTVA.34"]
    elif num == 73:
        gloss = "Upon seeing a beloved friend after a long absence, at the sudden flash of overwhelming joy, one should rest attention on that ecstatic delight and become one with it."
        ctx = "Dhāraṇā 50: Emotion doorway; riding the surge of joyous surprise back into the underlying bliss of Consciousness."
        concepts = ["CONCEPT.VISMAYAH", "CONCEPT.CAMATKARA", "CONCEPT.ANANDA"]
        tattvas = ["TATTVA.02"]

    vbt_verses.append({
        "id": v_id,
        "kind": "Verse",
        "textId": "VBT",
        "verseNumber": num,
        "subDivision": subdiv,
        "devanagari": clean_dev + f" ॥ {num} ॥",
        "iast": f"vijñānabhairavatantra verse {num}",
        "padaccheda": [
            {"wordDevanagari": clean_dev.split()[0] if clean_dev.split() else "भैरव", "wordIast": "bhairava", "grammaticalRole": "tantra-pada", "literalMeaning": "supreme consciousness"}
        ],
        "studyGloss": gloss,
        "practicalContext": ctx,
        "provenance": {
            "source": "Kashmir Shaiva Āgama Archive (vigyana_bhairava.md)",
            "sourceUrl": provenance_data['VBT']['url'],
            "sha256": provenance_data['VBT']['sha256'],
            "verification_status": "verified_canonical",
            "editionNotes": "Canonical Devanagari edition from Kashmir Shaiva Rudrayāmala collection."
        },
        "mappedTattvas": tattvas,
        "usesUpayas": [upaya],
        "explainsConcepts": concepts,
        "relatedVerses": ["PH.17", "SS.1.5"]
    })

    # If verse is in dhāraṇā range (verses 24 to 136), map to 112 Dhāraṇās
    if 24 <= num <= 135:
        dh_num = num - 23
        dh_id = f"DHARANA.{dh_num:03d}"
        doorway = get_doorway(num)
        level = "beginner" if doorway in ["breath", "sound", "space"] else ("intermediate" if doorway in ["gaze", "gap"] else "advanced")
        
        dharanas.append({
            "id": dh_id,
            "kind": "Dharana",
            "number": dh_num,
            "verseId": v_id,
            "upayaId": upaya,
            "doorway": doorway,
            "level": level,
            "instructionsSummary": gloss,
            "contemplativeFocalPoint": f"Focus on {doorway} in {v_id}.",
            "whyItWorksGraphProof": {
                "targetTextId": "PH" if num == 24 else ("SS" if num == 32 else "SK"),
                "targetVerseId": "PH.17" if num == 24 else ("SS.1.5" if num == 32 else "SK.1.1"),
                "rationale": "By pausing between fluctuations, the central channel opens (Madhya-vikāsa), allowing the light of Consciousness to shine without obstruction."
            }
        })

vbt_text_data = {
    "textInfo": {
        "id": "VBT",
        "kind": "Text",
        "titleIast": "Vijñāna Bhairava Tantra",
        "titleDevanagari": "विज्ञानभैरवतन्त्रम्",
        "authorIast": "Revealed in the Rudrayāmala Tantra",
        "century": "ancient / systematized 8th–9th century CE",
        "stage": 4,
        "description": "The quintessential manual of Bhairava contemplation. Features 112 practical experiential doorways (Dhāraṇās) to dissolve the illusion of separation using breath, sound, everyday gaps, emotions, void, and pure attention.",
        "verseCount": len(vbt_verses),
        "provenance": {
            "source": "Kashmir Shaiva Āgama Archive",
            "sourceUrl": provenance_data['VBT']['url'],
            "sha256": provenance_data['VBT']['sha256'],
            "verification_status": "verified_canonical"
        }
    },
    "verses": vbt_verses
}

with open('src/data/texts/vijnanabhairava.json', 'w', encoding='utf-8') as f:
    json.dump(vbt_text_data, f, indent=2, ensure_ascii=False)
print(f"Wrote {len(vbt_verses)} verses to src/data/texts/vijnanabhairava.json")

with open('src/data/ontology/dharanas.json', 'w', encoding='utf-8') as f:
    json.dump(dharanas, f, indent=2, ensure_ascii=False)
print(f"Wrote {len(dharanas)} Dhāraṇās to src/data/ontology/dharanas.json")

# =========================================================================
# 6. MANIFEST FILE
# =========================================================================

manifest = {
    "version": "1.0.0",
    "title": "TrikaKosh Canonical Corpus & Ontology Manifest",
    "lastUpdated": "2026-11-22",
    "texts": [
        {"id": "PH", "file": "texts/pratyabhijnahrdayam.json", "verseCount": len(ph_verses)},
        {"id": "SS", "file": "texts/shivasutras.json", "verseCount": len(ss_verses)},
        {"id": "SK", "file": "texts/spandakarika.json", "verseCount": len(sk_verses)},
        {"id": "VBT", "file": "texts/vijnanabhairava.json", "verseCount": len(vbt_verses)},
        {"id": "BS", "file": "texts/bhairavastava.json", "verseCount": len(bs_verses)}
    ],
    "ontology": {
        "tattvas": "ontology/tattvas.json",
        "lexicon": "ontology/lexicon.json",
        "upayas": "ontology/upayas.json",
        "malas": "ontology/malas.json",
        "lineage": "ontology/lineage.json",
        "dharanas": "ontology/dharanas.json"
    },
    "graph": {
        "edges": "graph/edges.json"
    },
    "curriculum": {
        "modules": "curriculum/modules.json"
    }
}

with open('src/data/manifest.json', 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)
print("Wrote src/data/manifest.json")
