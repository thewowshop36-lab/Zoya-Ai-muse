import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Hand, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Sliders, 
  Bookmark, 
  Check, 
  Share2, 
  Layers, 
  Palette,
  Flame,
  Info,
  Clock,
  Sparkle
} from 'lucide-react';
import { MehndiDesign, MehndiStyle, NailArtStyle, SkinTone, LanguageMode } from '../../types';
import { MEHNDI_DESIGNS } from '../../data/beautyKnowledge';

interface MehndiNailDesignerProps {
  language: LanguageMode;
  onSaveDesign: (design: MehndiDesign) => void;
  savedDesignIds: string[];
}

export const MehndiNailDesigner: React.FC<MehndiNailDesignerProps> = ({
  language,
  onSaveDesign,
  savedDesignIds
}) => {
  // State for generator & try-on
  const [selectedStyle, setSelectedStyle] = useState<MehndiStyle>('Bridal Arabic');
  const [selectedPlacement, setSelectedPlacement] = useState<'Back of Hand' | 'Palm' | 'Fingers & Nails'>('Back of Hand');
  const [selectedDensity, setSelectedDensity] = useState<'Minimal' | 'Medium' | 'Heavy Bridal'>('Heavy Bridal');
  const [selectedOccasion, setSelectedOccasion] = useState<'Eid Mubarak' | 'Bridal / Barat' | 'Mehndi / Mayun' | 'Everyday Chic'>('Bridal / Barat');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [designs, setDesigns] = useState<MehndiDesign[]>(MEHNDI_DESIGNS);
  const [activeDesign, setActiveDesign] = useState<MehndiDesign>(MEHNDI_DESIGNS[0]);

  // AR Try-On Studio Controls
  const [handSkinTone, setHandSkinTone] = useState<SkinTone>('Golden Olive');
  const [stainStage, setStainStage] = useState<'paste' | 'oxidized'>('oxidized');
  const [oxidationHours, setOxidationHours] = useState(24); // 0 = fresh, 24 = deep mahogany
  const [designScale, setDesignScale] = useState(1);
  const [designRotation, setDesignRotation] = useState(0);
  const [designOffsetY, setDesignOffsetY] = useState(0);
  const [designOpacity, setDesignOpacity] = useState(0.92);

  // Nail Art Customizer
  const [nailShape, setNailShape] = useState<'Almond' | 'Coffin' | 'Oval' | 'Square'>('Almond');
  const [nailColor, setNailColor] = useState('#8C2D3A'); // Velvet berry
  const [nailArtType, setNailArtType] = useState<NailArtStyle>('Rose Gold Foil');

  // Skin tone hex mapping
  const skinTones: { [key in SkinTone]: { bg: string; name: string } } = {
    'Fair Ivory': { bg: '#F6E4D9', name: 'Fair Ivory' },
    'Warm Beige': { bg: '#EAC8B1', name: 'Warm Beige' },
    'Golden Olive': { bg: '#DEB593', name: 'Golden Olive' },
    'Caramel Wheatish': { bg: '#C5916A', name: 'Caramel Wheatish' },
    'Deep Bronze': { bg: '#915F40', name: 'Deep Bronze' }
  };

  // Calculate stain color based on oxidation simulation
  const getHennaColor = () => {
    if (stainStage === 'paste') return '#263318'; // Raised fresh greenish-black paste
    // Oxidation from orange (0h) to deep mahogany (24h)
    if (oxidationHours < 6) return '#D96838'; // Fresh orange stain
    if (oxidationHours < 14) return '#A83B1B'; // Rich terracotta
    return '#4E170E'; // 24-hour mature royal mahogany
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated: MehndiDesign = {
        id: 'ai-gen-' + Date.now(),
        title: customPrompt.trim() ? `AI: ${customPrompt.slice(0, 24)}...` : `AI ${selectedStyle} ${selectedOccasion}`,
        urduTitle: `شاہی اے آئی ${selectedStyle} ڈیزائن`,
        style: selectedStyle,
        placement: selectedPlacement,
        density: selectedDensity,
        occasion: selectedOccasion,
        estimatedTime: selectedDensity === 'Heavy Bridal' ? '50 mins' : '20 mins',
        description: `Bespoke neural generation incorporating ${selectedDensity.toLowerCase()} motifs optimized for ${selectedPlacement.toLowerCase()}. Seamless flow with balanced negative space.`,
        motifs: ['AI Curated Paisley', 'Micro Jaali', 'Royal Rosette', 'Contoured Tendrils'],
        patternType: 'ai_custom',
        svgPathData: 'M 150 160 C 130 180, 110 210, 120 240 C 130 270, 160 275, 175 250 C 190 225, 170 190, 150 160 Z M 150 210 C 155 195, 170 190, 180 205 C 190 220, 175 235, 160 230 Z'
      };
      setDesigns(prev => [generated, ...prev]);
      setActiveDesign(generated);
      setIsGenerating(false);
    }, 1200);
  };

  const isSaved = savedDesignIds.includes(activeDesign.id);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 pb-24 space-y-4">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-roseGold/20 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-roseGold-light">
              {language === 'ur' ? 'اے آئی مہندی و نیل آرٹ اسٹوڈیو' : 'AI Mehndi & Nail Art Designer'}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-roseGold/15 text-roseGold border border-roseGold/30 font-medium">
              AR Try-On
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            {language === 'ur'
              ? 'اپنے پسندیدہ انداز میں مہندی ڈیزائن تخلیق کریں اور ورچوئل ہاتھ پر ٹرائی آن دیکھیں'
              : 'Neural design generator with interactive virtual hand AR try-on and 24h henna oxidation simulator'}
          </p>
        </div>

        <button
          onClick={() => onSaveDesign(activeDesign)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-md ${
            isSaved
              ? 'bg-emerald-600 text-white border border-emerald-400'
              : 'bg-roseGold text-neutral-950 hover:brightness-110'
          }`}
        >
          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          <span>{isSaved ? 'Saved to Vanity' : 'Save Design'}</span>
        </button>
      </div>

      {/* Main Dual-Column Layout: AR Hand Canvas & Generator Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT / TOP: Interactive Hand & Nail AR Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="luxury-card rounded-3xl p-4 w-full border-roseGold/25 shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Canvas Controls Header */}
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-roseGold/15 text-xs">
              <div className="flex items-center gap-1 text-roseGold-light font-medium">
                <Hand className="w-3.5 h-3.5 text-roseGold" />
                <span>Virtual Hand Canvas</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-neutral-400">Skin Tone:</span>
                <span className="text-[10px] font-semibold text-roseGold">{handSkinTone}</span>
              </div>
            </div>

            {/* SVG Hand Canvas Representation */}
            <div className="relative w-full aspect-[4/5] max-w-[320px] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-2"
                 style={{ backgroundColor: '#1E0B18' }}>
              
              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-radial from-roseGold/10 via-transparent to-black/40 pointer-events-none" />

              {/* Hand Model Base SVG */}
              <svg
                viewBox="0 0 300 400"
                className="w-full h-full drop-shadow-2xl transition-colors duration-500"
              >
                <defs>
                  <linearGradient id="handShading" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={skinTones[handSkinTone].bg} stopOpacity="1" />
                    <stop offset="100%" stopColor="#1C0916" stopOpacity="0.45" />
                  </linearGradient>
                  
                  {/* Henna shadow filter */}
                  <filter id="hennaRelief" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0.5" dy="0.8" stdDeviation="0.6" floodColor="#1a0000" floodOpacity="0.6"/>
                  </filter>
                </defs>

                {/* Hand Silhouette (Wrist, Palm, 5 Fingers) */}
                <g id="handModel">
                  {/* Wrist & Forearm */}
                  <path
                    d="M 85 390 L 85 300 C 85 280, 80 260, 75 240 L 75 230 C 75 200, 95 185, 95 185 L 205 185 C 205 185, 225 200, 225 230 L 225 240 C 220 260, 215 280, 215 300 L 215 390 Z"
                    fill={skinTones[handSkinTone].bg}
                  />

                  {/* Palm Body */}
                  <path
                    d="M 80 260 C 75 210, 85 160, 100 150 C 105 140, 195 140, 200 150 C 215 160, 225 210, 220 260 C 215 290, 85 290, 80 260 Z"
                    fill={skinTones[handSkinTone].bg}
                  />

                  {/* Thumb */}
                  <path
                    d="M 80 230 C 60 210, 48 180, 45 150 C 43 130, 55 125, 65 135 C 75 145, 82 170, 90 190 Z"
                    fill={skinTones[handSkinTone].bg}
                  />
                  {/* Thumb Nail */}
                  <path
                    d="M 46 142 C 48 132, 58 132, 60 142 Z"
                    fill={nailColor}
                  />

                  {/* Index Finger */}
                  <path
                    d="M 98 150 C 95 110, 96 70, 99 45 C 102 35, 114 35, 117 45 C 120 70, 120 110, 122 150 Z"
                    fill={skinTones[handSkinTone].bg}
                  />
                  {/* Index Nail */}
                  <rect
                    x="101"
                    y="40"
                    width="14"
                    height="18"
                    rx={nailShape === 'Almond' ? 7 : nailShape === 'Oval' ? 5 : 2}
                    fill={nailColor}
                  />

                  {/* Middle Finger (Longest) */}
                  <path
                    d="M 125 145 C 124 100, 125 55, 129 25 C 132 15, 146 15, 149 25 C 153 55, 154 100, 153 145 Z"
                    fill={skinTones[handSkinTone].bg}
                  />
                  {/* Middle Nail */}
                  <rect
                    x="132"
                    y="20"
                    width="14"
                    height="18"
                    rx={nailShape === 'Almond' ? 7 : nailShape === 'Oval' ? 5 : 2}
                    fill={nailColor}
                  />

                  {/* Ring Finger */}
                  <path
                    d="M 156 148 C 157 105, 158 65, 161 40 C 164 30, 176 30, 179 40 C 182 65, 181 105, 180 148 Z"
                    fill={skinTones[handSkinTone].bg}
                  />
                  {/* Ring Nail */}
                  <rect
                    x="164"
                    y="35"
                    width="13"
                    height="17"
                    rx={nailShape === 'Almond' ? 7 : nailShape === 'Oval' ? 5 : 2}
                    fill={nailColor}
                  />

                  {/* Pinky Finger */}
                  <path
                    d="M 183 158 C 187 125, 192 95, 195 75 C 197 65, 208 65, 210 75 C 212 95, 206 125, 203 158 Z"
                    fill={skinTones[handSkinTone].bg}
                  />
                  {/* Pinky Nail */}
                  <rect
                    x="196"
                    y="70"
                    width="12"
                    height="15"
                    rx={nailShape === 'Almond' ? 6 : nailShape === 'Oval' ? 4 : 2}
                    fill={nailColor}
                  />

                  {/* Subtle Knuckle and Palm Contours */}
                  <path
                    d="M 98 175 C 120 185, 180 185, 202 175"
                    stroke="#000000"
                    strokeOpacity="0.12"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M 105 240 C 130 255, 170 255, 195 240"
                    stroke="#000000"
                    strokeOpacity="0.1"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </g>

                {/* OVERLAY: Dynamic Henna Art Layer with Zoom, Pan, Rotation */}
                <g
                  id="hennaOverlayLayer"
                  transform={`translate(150, ${220 + designOffsetY}) scale(${designScale}) rotate(${designRotation}) translate(-150, -220)`}
                  opacity={designOpacity}
                  filter="url(#hennaRelief)"
                >
                  {/* Central Motif depending on design */}
                  {activeDesign.patternType === 'arabic_vine' && (
                    <g stroke={getHennaColor()} fill="none" strokeLinecap="round" strokeLinejoin="round">
                      {/* Flowing Arabic Vine */}
                      <path
                        d="M 95 340 Q 140 280, 120 230 T 170 160 T 135 90 T 140 35"
                        strokeWidth={stainStage === 'paste' ? '4.5' : '3.5'}
                      />
                      {/* Leaflets and Petals */}
                      <path d="M 120 230 Q 150 220, 160 235 T 120 230" fill={getHennaColor()} />
                      <path d="M 140 190 Q 110 180, 115 160 T 140 190" fill={getHennaColor()} />
                      <path d="M 160 140 Q 190 130, 195 150 T 160 140" fill={getHennaColor()} />
                      {/* Shaded Rose Centre */}
                      <circle cx="130" cy="225" r="14" fill="none" strokeWidth="2.5" />
                      <circle cx="130" cy="225" r="8" fill={getHennaColor()} />
                      <circle cx="130" cy="225" r="3" fill="#FFF" fillOpacity="0.3" />
                      {/* Wrist Cuff Jaali */}
                      <path d="M 90 320 L 210 320 M 90 330 L 210 330 M 90 340 L 210 340" strokeWidth="2" />
                      <path d="M 110 315 L 130 345 M 140 315 L 160 345 M 170 315 L 190 345" strokeWidth="1.5" />
                    </g>
                  )}

                  {activeDesign.patternType === 'mandala' && (
                    <g stroke={getHennaColor()} fill="none" strokeLinecap="round">
                      {/* Center Royal Chakra Mandala */}
                      <circle cx="150" cy="220" r="38" strokeWidth="3" />
                      <circle cx="150" cy="220" r="28" strokeWidth="2" strokeDasharray="3 3" />
                      <circle cx="150" cy="220" r="18" fill={getHennaColor()} fillOpacity="0.4" strokeWidth="2" />
                      <circle cx="150" cy="220" r="7" fill={getHennaColor()} />
                      {/* Radiating Petal Rosette */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <path
                          key={i}
                          d="M 150 220 m 0 -38 q 8 -12 16 0"
                          transform={`rotate(${angle} 150 220)`}
                          strokeWidth="2.5"
                          fill={getHennaColor()}
                          fillOpacity="0.8"
                        />
                      ))}
                      {/* Finger Tip jaali caps */}
                      <path d="M 102 55 L 114 55 M 102 65 L 114 65" strokeWidth="2" />
                      <path d="M 132 35 L 148 35 M 132 45 L 148 45" strokeWidth="2" />
                      <path d="M 164 50 L 176 50 M 164 60 L 176 60" strokeWidth="2" />
                    </g>
                  )}

                  {activeDesign.patternType === 'minimal_floral' && (
                    <g stroke={getHennaColor()} fill="none" strokeLinecap="round">
                      {/* Modern Finger Flora */}
                      <path d="M 108 140 Q 110 80, 108 45" strokeWidth="2.5" />
                      <path d="M 108 90 Q 95 85, 98 75 T 108 90" fill={getHennaColor()} />
                      <path d="M 108 110 Q 120 105, 118 95 T 108 110" fill={getHennaColor()} />
                      <circle cx="108" cy="45" r="4" fill={getHennaColor()} />
                      <circle cx="108" cy="35" r="2.5" fill={getHennaColor()} />
                      {/* Geometric Linear Ring */}
                      <path d="M 160 105 L 180 105" strokeWidth="2.5" />
                      <path d="M 160 110 L 180 110" strokeWidth="1.5" strokeDasharray="2 2" />
                      <circle cx="170" cy="100" r="3" fill={getHennaColor()} />
                    </g>
                  )}

                  {activeDesign.patternType !== 'arabic_vine' &&
                   activeDesign.patternType !== 'mandala' &&
                   activeDesign.patternType !== 'minimal_floral' && (
                    <g stroke={getHennaColor()} fill="none" strokeLinecap="round">
                      {/* Khafif & Geometric Moroccan Fallback */}
                      <path d="M 120 250 L 150 190 L 180 250 Z" strokeWidth="3" />
                      <circle cx="150" cy="220" r="12" fill={getHennaColor()} />
                      <path d="M 100 320 Q 150 270, 200 320" strokeWidth="2" strokeDasharray="4 4" />
                      <path d="M 150 190 Q 150 120, 140 50" strokeWidth="2.5" />
                      <circle cx="140" cy="50" r="4" fill={getHennaColor()} />
                    </g>
                  )}
                </g>
              </svg>
            </div>

            {/* Henna Stain Stage Indicator Bar */}
            <div className="w-full mt-3 p-2.5 rounded-2xl bg-[#230C1C] border border-roseGold/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-roseGold-light font-medium">
                  <Flame className="w-3.5 h-3.5 text-roseGold" />
                  <span>Stain Simulator:</span>
                </div>
                <div className="flex gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5">
                  <button
                    onClick={() => setStainStage('paste')}
                    className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                      stainStage === 'paste'
                        ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500 font-semibold'
                        : 'text-neutral-400'
                    }`}
                  >
                    Fresh Paste
                  </button>
                  <button
                    onClick={() => setStainStage('oxidized')}
                    className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                      stainStage === 'oxidized'
                        ? 'bg-[#541D12] text-roseGold-light border border-roseGold font-semibold'
                        : 'text-neutral-400'
                    }`}
                  >
                    Matured Stain
                  </button>
                </div>
              </div>

              {stainStage === 'oxidized' && (
                <div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-300 mb-1">
                    <span>Oxidation Time:</span>
                    <span className="font-mono text-roseGold font-bold">{oxidationHours} Hours ({oxidationHours >= 20 ? 'Deep Mahogany' : oxidationHours >= 10 ? 'Rich Terracotta' : 'Fresh Orange'})</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={oxidationHours}
                    onChange={(e) => setOxidationHours(Number(e.target.value))}
                    className="w-full accent-roseGold cursor-pointer h-1.5 bg-black/50 rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Canvas Transformation Controls (Scale, Rotate, Offset) */}
            <div className="w-full grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-roseGold/10 text-[11px]">
              <div>
                <span className="text-neutral-400 text-[10px]">Scale:</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <button
                    onClick={() => setDesignScale(s => Math.max(0.7, s - 0.1))}
                    className="p-1 rounded bg-roseGold/10 hover:bg-roseGold/20 text-roseGold"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </button>
                  <span className="font-mono text-center flex-1">{designScale.toFixed(1)}x</span>
                  <button
                    onClick={() => setDesignScale(s => Math.min(1.5, s + 0.1))}
                    className="p-1 rounded bg-roseGold/10 hover:bg-roseGold/20 text-roseGold"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 text-[10px]">Rotate:</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <button
                    onClick={() => setDesignRotation(r => r - 15)}
                    className="p-1 rounded bg-roseGold/10 hover:bg-roseGold/20 text-roseGold"
                  >
                    ↺
                  </button>
                  <span className="font-mono text-center flex-1">{designRotation}°</span>
                  <button
                    onClick={() => setDesignRotation(r => r + 15)}
                    className="p-1 rounded bg-roseGold/10 hover:bg-roseGold/20 text-roseGold"
                  >
                    ↻
                  </button>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 text-[10px]">Position:</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <button
                    onClick={() => setDesignOffsetY(y => y - 10)}
                    className="p-1 rounded bg-roseGold/10 hover:bg-roseGold/20 text-roseGold text-xs"
                  >
                    ▲
                  </button>
                  <span className="font-mono text-center flex-1">{designOffsetY}</span>
                  <button
                    onClick={() => setDesignOffsetY(y => y + 10)}
                    className="p-1 rounded bg-roseGold/10 hover:bg-roseGold/20 text-roseGold text-xs"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: AI Generator Controls, Skin Tone & Nail Art Panel */}
        <div className="lg:col-span-6 space-y-3.5">
          {/* Skin Undertone Palette Selector */}
          <div className="luxury-card rounded-2xl p-3 border-roseGold/20">
            <label className="text-xs font-serif font-semibold text-roseGold-light flex items-center justify-between mb-2">
              <span>Hand Skin Undertone:</span>
              <span className="text-neutral-400 font-sans font-normal text-[11px]">{handSkinTone}</span>
            </label>
            <div className="flex items-center justify-between gap-2">
              {(Object.keys(skinTones) as SkinTone[]).map((st) => (
                <button
                  key={st}
                  onClick={() => setHandSkinTone(st)}
                  className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-xl transition-all border ${
                    handSkinTone === st
                      ? 'border-roseGold bg-roseGold/15 shadow-sm'
                      : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full border border-black/30 shadow"
                    style={{ backgroundColor: skinTones[st].bg }}
                  />
                  <span className="text-[9px] text-neutral-300 mt-1 truncate max-w-full">
                    {st.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Generator Preference Controls */}
          <div className="luxury-card rounded-2xl p-3.5 border-roseGold/25 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-roseGold-light">
                <Wand2 className="w-4 h-4 text-roseGold" />
                <span>AI Mehndi Generator</span>
              </div>
              <span className="text-[10px] text-neutral-400 font-sans">
                {language === 'ur' ? 'عربک، خفیف و برائیڈل' : 'Neural Pattern Synthesizer'}
              </span>
            </div>

            {/* Style Pills */}
            <div>
              <span className="text-[11px] text-neutral-400 mb-1.5 block">Select Style Category:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Bridal Arabic',
                  'Minimalist Floral',
                  'Khafif Gulf',
                  'Royal Mandala',
                  'Moroccan Geometric'
                ].map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style as MehndiStyle)}
                    className={`text-xs px-2.5 py-1 rounded-xl transition-all border ${
                      selectedStyle === style
                        ? 'bg-roseGold text-neutral-950 font-bold border-roseGold shadow-sm'
                        : 'bg-[#210A1B] text-neutral-300 border-roseGold/20 hover:border-roseGold/50'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Density & Occasion Row */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[11px] text-neutral-400 mb-1 block">Density:</span>
                <select
                  value={selectedDensity}
                  onChange={(e) => setSelectedDensity(e.target.value as any)}
                  className="w-full bg-[#1C0816] text-neutral-200 border border-roseGold/30 rounded-xl p-2 text-xs focus:outline-none"
                >
                  <option value="Minimal">Minimal (Negative Space)</option>
                  <option value="Medium">Medium (Balanced)</option>
                  <option value="Heavy Bridal">Heavy Bridal (Intricate)</option>
                </select>
              </div>

              <div>
                <span className="text-[11px] text-neutral-400 mb-1 block">Occasion:</span>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value as any)}
                  className="w-full bg-[#1C0816] text-neutral-200 border border-roseGold/30 rounded-xl p-2 text-xs focus:outline-none"
                >
                  <option value="Bridal / Barat">Bridal / Barat</option>
                  <option value="Mehndi / Mayun">Mehndi / Mayun</option>
                  <option value="Eid Mubarak">Eid Mubarak</option>
                  <option value="Everyday Chic">Everyday Chic</option>
                </select>
              </div>
            </div>

            {/* Custom AI Prompt Box */}
            <div>
              <span className="text-[11px] text-neutral-400 mb-1 block">Optional Custom Prompt / Motif Details:</span>
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Modern Arabic vine with micro-roses and pearl jaali on ring finger..."
                className="w-full bg-[#1C0816] text-xs text-neutral-100 placeholder-neutral-500 border border-roseGold/30 rounded-xl px-3 py-2 focus:outline-none focus:border-roseGold"
              />
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-roseGold via-zoya-500 to-roseGold-dark text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Synthesizing Neural Mehndi Motifs...' : 'Generate AI Mehndi Design'}</span>
            </button>
          </div>

          {/* Nail Art Customizer Studio Card */}
          <div className="luxury-card rounded-2xl p-3 border-roseGold/20 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-roseGold-light flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-roseGold" />
                <span>Nail Art Customizer:</span>
              </span>
              <span className="text-[10px] text-roseGold font-mono">{nailArtType}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Nail Shape */}
              <div>
                <span className="text-[10px] text-neutral-400 block mb-1">Nail Shape:</span>
                <div className="grid grid-cols-2 gap-1">
                  {(['Almond', 'Coffin', 'Oval', 'Square'] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setNailShape(shape)}
                      className={`py-1 text-[10px] rounded-lg border text-center transition-all ${
                        nailShape === shape
                          ? 'bg-roseGold/20 border-roseGold text-roseGold font-semibold'
                          : 'border-white/10 text-neutral-400'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Polish Swatches */}
              <div>
                <span className="text-[10px] text-neutral-400 block mb-1">Base Gel Polish:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { hex: '#8C2D3A', name: 'Velvet Berry' },
                    { hex: '#D4AF37', name: 'Royal Gold Foil' },
                    { hex: '#E5A99B', name: 'Rose Gold Glaze' },
                    { hex: '#F5E6E0', name: 'Milky French' },
                    { hex: '#2A101D', name: 'Deep Jamun' }
                  ].map((p) => (
                    <button
                      key={p.hex}
                      onClick={() => setNailColor(p.hex)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        nailColor === p.hex ? 'border-white scale-110 shadow-md ring-1 ring-roseGold' : 'border-black/30'
                      }`}
                      style={{ backgroundColor: p.hex }}
                      title={p.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Design Library Carousel */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5 text-neutral-400">
              <span>Preset & Generated Catalog:</span>
              <span className="text-[10px] text-roseGold">{designs.length} designs available</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {designs.map((des) => {
                const isCurrent = activeDesign.id === des.id;
                return (
                  <button
                    key={des.id}
                    onClick={() => setActiveDesign(des)}
                    className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-roseGold/20 border-roseGold shadow-md text-white'
                        : 'bg-[#1C0916] border-roseGold/15 hover:border-roseGold/40 text-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="text-[11px] font-semibold text-roseGold-light truncate">
                        {des.title}
                      </div>
                      <div className="text-[9px] text-neutral-400 mt-0.5">
                        {des.style} • {des.density}
                      </div>
                    </div>
                    <div className="text-[9px] text-roseGold/80 mt-1 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{des.estimatedTime}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
