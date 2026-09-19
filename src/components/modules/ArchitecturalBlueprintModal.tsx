import React, { useState } from 'react';
import { 
  X, 
  FileCode2, 
  Copy, 
  Check, 
  Layers, 
  Cpu, 
  Database, 
  Globe2, 
  ShieldCheck, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

interface ArchitecturalBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitecturalBlueprintModal: React.FC<ArchitecturalBlueprintModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'architecture' | 'ai_pipeline' | 'modules' | 'cultural'>('overview');

  if (!isOpen) return null;

  const blueprintMarkdown = `# ZOYA: YOUR AI BEAUTY MUSE
## Comprehensive System Concept & Architectural Blueprint

### 1. Executive Concept & Strategic Vision
- **App Name**: Zoya: Your AI Beauty Muse
- **Core Positioning**: A 24/7 personal beauty mentor, aesthetician, and generative creative studio engineered specifically for female beauty and lifestyle, bridging authentic South Asian, Middle Eastern, and global beauty traditions with frontier multimodal AI.
- **Languages Supported**: Dual-first Native Urdu (اردو), English, and Roman Urdu.

---

### 2. Five-Tier System Architecture

#### Tier 1: Client Experience Layer
- **Framework**: Jetpack Compose (Native Android) with cross-platform responsive Web AR Viewport (WebGL / HTML5 Canvas).
- **Design System**: Material 3 Luxury Editorial (Rose Gold, Warm Champagne, Deep Royal Plum, Natural Terracotta).
- **Input Modalities**: Multimodal Voice (Urdu ASR/TTS), High-Resolution Camera Video Stream, Stylus & Touch Vector Canvas.

#### Tier 2: Real-time Computer Vision & AR Engine
- **Face & Eye Landmark Mesh**: MediaPipe 468-point 3D Face Landmark Mesh + 71-point Contour Tracking.
  - Computes Inter-pupillary distance, palpebral fissure height/width, canthal tilt (positive, neutral, negative), and hooding crease depth.
- **Hand Pose & Fingertip Tracking**: MediaPipe 21-point 3D Hand Skeleton.
  - Anchors Mehndi patterns across dorsal and palmar surfaces with projective planar homography.
  - Individual nail bed segmentation for virtual lacquer and nail shape overlay.
- **Physically-Based Henna Stain Engine**:
  - Shader-based simulation of natural lawsone (2-hydroxy-1,4-naphthoquinone) oxidation.
  - Simulates fresh viscous green-black paste vs. 24-hour oxidized mahogany red stain.

#### Tier 3: AI Orchestration & Multi-Agent Intelligence
- **Primary LLM**: Google Gemini 2.5 Flash / Gemini 3.5 Flash via Server-Side API & Firebase AI Logic.
- **Bilingual NLU Router**: Automatic language identification (Nastaliq Urdu vs English vs Roman Urdu), sentiment parsing, and contextual memory.
- **Domain Guardrails**: Strict non-comedogenic recommendations, skin sensitivity checks, and Halal ingredient verification.

#### Tier 4: Cultural Beauty Knowledge Graph
- **Undertone Matrix**: Warm Olive, Deep Wheatish, Golden Caramel, Neutral, Cool Porcelain.
- **Traditional Formulations**: Wild Kasturi turmeric, besan, gulab arq (pure rosewater), sandalwood, and eucalyptus essential oil.
- **Mehndi Ontology**: 150+ categorized vector motifs (Paisley/Kalka, Gulf Floral Spray, Peacock Feather, Royal Chakra, Fez Diamond Jaali).

#### Tier 5: Local & Cloud Persistence
- **Local Layer**: Room Database (encrypted SQLite) / IndexedDB for offline vanity items, custom shade profiles, and progress caching.
- **Cloud Layer**: Cloud Firestore & Cloud Storage for masterclass streaming and multi-device vanity backup.

---

### 3. Module-by-Module Technical Specification

1. **AI Virtual Beauty Bot**:
   - Conversational agent with zero-latency streaming.
   - Dynamic prompt injection incorporating current user profile (skin type, undertone, eye shape).
   - Generates structured product recommendations, bespoke routines, and troubleshooting fixes.

2. **AI Mehndi & Nail Art Designer**:
   - Neural vector generator converting text prompts (e.g., 'Minimalist Khafif Rose with Finger Jaali') into SVG coordinate paths.
   - Interactive canvas with scale, rotation, layer opacity, and skin tone harmonization.
   - Stain oxidation time-scrubber (0 to 24 hours).

3. **AI Makeup & Lash Advisor**:
   - Automated eye shape classifier: Almond, Hooded, Monolid, Round, Deep-set, Downturned.
   - Bespoke false lash parametric renderer (curl radius, millimeter lengths from 8mm to 16mm, cluster density).
   - Interactive Before/After split comparison slider.

4. **Personalized Beauty Academy**:
   - Skill-tiered curriculum: Beginner, Intermediate, Pro Bridal.
   - Interactive step checklists with celebratory particle physics (Confetti).
   - Seamless integration allowing direct questioning to Zoya AI about any step.

---

### 4. Cultural Sensitivity & Halal Compliance Framework
- **Permeable Lacquer Standard**: Recommends water-breathable polishes compliant with Islamic Wudu ablution standards.
- **Clean Natural Henna**: Exclusively emphasizes organic henna powder and warns against toxic black henna containing Paraphenylenediamine (PPD).
- **Empowering Tone**: Inclusive, culturally resonant, professional, and respectful.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(blueprintMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="luxury-glass border border-roseGold/40 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-roseGold/20 flex items-center justify-between bg-[#230C1C]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-roseGold/15 border border-roseGold/40 flex items-center justify-center">
              <FileCode2 className="w-5 h-5 text-roseGold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-base sm:text-lg text-roseGold-light">
                  Architectural Blueprint & Concept
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-roseGold/20 text-roseGold border border-roseGold/40 font-mono">
                  v1.0 Ready
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                End-to-End System Specifications for 'Zoya: Your AI Beauty Muse'
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-roseGold/15 hover:bg-roseGold/25 border border-roseGold/30 text-roseGold text-xs font-semibold transition-all"
              title="Copy full blueprint markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Specs'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 py-2 bg-[#1A0815] border-b border-roseGold/10 flex gap-2 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'overview', label: '1. Executive Vision' },
            { id: 'architecture', label: '2. 5-Tier Architecture' },
            { id: 'ai_pipeline', label: '3. CV & AR Pipeline' },
            { id: 'modules', label: '4. Module Blueprints' },
            { id: 'cultural', label: '5. Cultural & Halal Matrix' }
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                activeSection === sec.id
                  ? 'bg-roseGold text-neutral-950 font-bold shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
          {activeSection === 'overview' && (
            <div className="space-y-3">
              <div className="bg-[#240C1D] p-4 rounded-2xl border border-roseGold/20">
                <h3 className="font-serif font-bold text-base text-roseGold-light mb-1">
                  Product Mission & Value Proposition
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  <strong>Zoya: Your AI Beauty Muse</strong> is positioned as a 24/7 personal beauty mentor and creative studio. It addresses an underserved market need by providing <strong>culturally sensitive, bilingual (Urdu & English)</strong> AI intelligence tailored specifically to South Asian, Middle Eastern, and multi-ethnic female beauty needs—including olive undertone color correction, traditional Mehndi henna stain optimization, eye-shape specific false lash engineering, and Halal-friendly cosmetics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="bg-[#1C0816] p-3 rounded-xl border border-roseGold/15">
                  <span className="text-roseGold font-serif font-bold block mb-1">Bilingual NLU</span>
                  <p className="text-neutral-400 text-xs">Native Urdu (اردو Nastaliq), English, and Roman Urdu understanding for effortless conversational consultation.</p>
                </div>
                <div className="bg-[#1C0816] p-3 rounded-xl border border-roseGold/15">
                  <span className="text-roseGold font-serif font-bold block mb-1">Computer Vision AR</span>
                  <p className="text-neutral-400 text-xs">Precise facial landmark mesh and hand pose anchors for virtual Mehndi and false lash try-ons.</p>
                </div>
                <div className="bg-[#1C0816] p-3 rounded-xl border border-roseGold/15">
                  <span className="text-roseGold font-serif font-bold block mb-1">Empowering Academy</span>
                  <p className="text-neutral-400 text-xs">Curated masterclasses with interactive checklists, pro tips, and direct AI question integration.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'architecture' && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-roseGold-light">
                Five-Tier System Architecture Blueprint
              </h3>
              <div className="space-y-2">
                {[
                  {
                    tier: 'Tier 1: Presentation & Interaction',
                    tech: 'Jetpack Compose / React 19 + Tailwind + Lucide',
                    desc: 'Luxury responsive layout, custom GPU shader canvas, mobile-first navigation, and safe-area inset management.'
                  },
                  {
                    tier: 'Tier 2: Real-Time CV & AR Engine',
                    tech: 'MediaPipe Face Mesh + 21-point Hand Skeleton',
                    desc: 'Extracts 468 facial 3D landmarks for eye shape classification and homography projection of Mehndi henna patterns onto skin.'
                  },
                  {
                    tier: 'Tier 3: AI Orchestration Layer',
                    tech: 'Gemini 2.5/3.5 Flash REST API + Domain Reasoning Engine',
                    desc: 'Processes user queries in English and Urdu, generating structured JSON recommendations, routine schedules, and troubleshooting.'
                  },
                  {
                    tier: 'Tier 4: Cultural Beauty Knowledge Graph',
                    tech: 'Curated Ontology (Undertones, Ayurvedic Herbs, Mehndi Motifs)',
                    desc: 'Calibrated color harmonies for Warm Olive, Golden, and Deep Bronze complexions, with Halal cosmetic verification.'
                  },
                  {
                    tier: 'Tier 5: Local & Cloud Persistence',
                    tech: 'Room DB / IndexedDB + Cloud Firestore',
                    desc: 'Encrypted storage for saved designs, personalized skin metrics, and masterclass progress tracking.'
                  }
                ].map((t, idx) => (
                  <div key={idx} className="bg-[#1C0916] p-3 rounded-xl border border-roseGold/15 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-roseGold text-xs">{t.tier}</span>
                      <span className="font-mono text-[10px] text-neutral-400">{t.tech}</span>
                    </div>
                    <p className="text-neutral-300 text-xs">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'ai_pipeline' && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-roseGold-light">
                Computer Vision & AR Simulation Pipeline
              </h3>
              <div className="bg-[#1C0916] p-4 rounded-2xl border border-roseGold/20 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-roseGold font-bold font-serif">
                  <Cpu className="w-4 h-4" />
                  <span>1. Eye Shape Classification Algorithm</span>
                </div>
                <p className="text-neutral-300 pl-6 leading-relaxed">
                  The system measures the ratio of palpebral aperture (distance between upper and lower eyelid margins) to horizontal fissure length, evaluates the visibility of the supratarsal crease when eyes are in primary gaze, and calculates the angle of the lateral canthus relative to the medial canthus (Canthal Tilt). This outputs a confident classification into <strong>Almond, Hooded, Monolid, Round, Deep-set, or Downturned</strong>.
                </p>

                <div className="flex items-center gap-2 text-roseGold font-bold font-serif pt-2">
                  <Sparkles className="w-4 h-4" />
                  <span>2. Physically-Based Henna Stain Simulator</span>
                </div>
                <p className="text-neutral-300 pl-6 leading-relaxed">
                  Simulates the chemical reaction of <em>lawsone</em> (2-hydroxy-1,4-naphthoquinone), the dye molecule in natural henna leaves. It models two states: <strong>Fresh Paste</strong> (viscous dark green-black texture with raised surface relief) and <strong>Matured Stain</strong>, dynamically transitioning the RGB/HSL values from light orange (0h) to terracotta red (12h) to deep royal mahogany (24h) based on user time-scrubbing.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'modules' && (
            <div className="space-y-2.5">
              <h3 className="font-serif font-bold text-base text-roseGold-light">
                Core AI Modules Blueprint
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-[#1C0916] p-3 rounded-xl border border-roseGold/15">
                  <span className="font-bold text-roseGold text-xs block mb-1">1. AI Virtual Beauty Bot</span>
                  <ul className="text-[11px] text-neutral-300 list-disc pl-4 space-y-1">
                    <li>Bilingual English & Urdu Nastaliq responses</li>
                    <li>Skincare routine builder by skin type</li>
                    <li>Hyperpigmentation and grey-base troubleshooting</li>
                    <li>Audio voice read-aloud toggle</li>
                  </ul>
                </div>

                <div className="bg-[#1C0916] p-3 rounded-xl border border-roseGold/15">
                  <span className="font-bold text-roseGold text-xs block mb-1">2. AI Mehndi & Nail Designer</span>
                  <ul className="text-[11px] text-neutral-300 list-disc pl-4 space-y-1">
                    <li>Generates Arabic, Khafif, and Mandala patterns</li>
                    <li>Virtual Hand try-on with 5 skin undertones</li>
                    <li>Henna stain oxidation simulator (0 to 24 hours)</li>
                    <li>Nail shape & chrome polish customizer</li>
                  </ul>
                </div>

                <div className="bg-[#1C0916] p-3 rounded-xl border border-roseGold/15">
                  <span className="font-bold text-roseGold text-xs block mb-1">3. AI Makeup & Lash Advisor</span>
                  <ul className="text-[11px] text-neutral-300 list-disc pl-4 space-y-1">
                    <li>Facial landmark scanner simulation</li>
                    <li>Bespoke false lash length (10-15mm) & curl mapping</li>
                    <li>Interactive Before/After comparison slider</li>
                    <li>Undertone-matched lipstick and blush swatches</li>
                  </ul>
                </div>

                <div className="bg-[#1C0916] p-3 rounded-xl border border-roseGold/15">
                  <span className="font-bold text-roseGold text-xs block mb-1">4. Personalized Beauty Academy</span>
                  <ul className="text-[11px] text-neutral-300 list-disc pl-4 space-y-1">
                    <li>Skill-tailored courses (Beginner to Pro Bridal)</li>
                    <li>Step-by-step checklist with confetti milestones</li>
                    <li>Cultural notes & ancient ubtan wisdom</li>
                    <li>Direct 'Ask Zoya' button on every step</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'cultural' && (
            <div className="bg-[#1C0916] p-4 rounded-2xl border border-roseGold/20 space-y-2.5">
              <h3 className="font-serif font-bold text-base text-roseGold-light">
                Cultural Sensitivity & Halal Compliance Matrix
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Zoya incorporates cultural empathy directly into its recommendation engine:
              </p>
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="p-2 rounded bg-black/30 border border-white/5">
                  <strong>• Wudu-Permeable Nail Art:</strong> Flags breathable polish formulations that allow water vapor transmission for daily prayer ablution.
                </div>
                <div className="p-2 rounded bg-black/30 border border-white/5">
                  <strong>• Clean Henna Safety:</strong> Strictly warns against toxic black henna containing dangerous PPD dyes, recommending 100% natural lawsonia inermis.
                </div>
                <div className="p-2 rounded bg-black/30 border border-white/5">
                  <strong>• Olive Undertone Calibration:</strong> Avoids Euro-centric foundation matching algorithms that cause ashy or grey casts on warm South Asian skin tones.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-roseGold/20 bg-[#230C1C] flex items-center justify-between text-xs">
          <span className="text-neutral-400 font-serif">
            Zoya Architectural Blueprint • Production Concept
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-roseGold text-neutral-950 font-bold hover:brightness-110 transition-all"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
