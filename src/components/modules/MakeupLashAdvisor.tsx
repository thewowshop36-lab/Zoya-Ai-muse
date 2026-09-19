import React, { useState } from 'react';
import { 
  Scan, 
  Sparkles, 
  Eye, 
  Layers, 
  Sliders, 
  Bookmark, 
  Check, 
  RefreshCw, 
  Info, 
  Wand2,
  ChevronRight,
  Palette
} from 'lucide-react';
import { EyeShape, LashStyle, MakeupLook, SkinTone, LanguageMode, ProductRecommendation } from '../../types';
import { EYE_SHAPES_DATA, LASH_STYLES, MAKEUP_LOOKS } from '../../data/beautyKnowledge';

interface MakeupLashAdvisorProps {
  language: LanguageMode;
  onSaveProduct: (product: ProductRecommendation) => void;
  onSaveLook: (look: MakeupLook) => void;
  userSkinTone: SkinTone;
  initialEyeShape: EyeShape;
}

export const MakeupLashAdvisor: React.FC<MakeupLashAdvisorProps> = ({
  language,
  onSaveProduct,
  onSaveLook,
  userSkinTone,
  initialEyeShape
}) => {
  const [eyeShape, setEyeShape] = useState<EyeShape>(initialEyeShape || 'Almond');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanCompleted, setScanCompleted] = useState(true);

  // Active Try-On State
  const [activeLash, setActiveLash] = useState<LashStyle>(LASH_STYLES[0]);
  const [activeLook, setActiveLook] = useState<MakeupLook>(MAKEUP_LOOKS[0]);
  const [showLashes, setShowLashes] = useState(true);
  const [showEyeliner, setShowEyeliner] = useState(true);
  const [showEyeshadow, setShowEyeshadow] = useState(true);
  const [showLipstick, setShowLipstick] = useState(true);
  const [compareSplit, setCompareSplit] = useState(50); // Before / After slider 0-100%

  // Eye shape info
  const shapeInfo = EYE_SHAPES_DATA[eyeShape];

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanCompleted(false);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanCompleted(true);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 pb-24 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-roseGold/20 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-roseGold-light">
              {language === 'ur' ? 'اے آئی میک اپ و لیش ایڈوائزر' : 'AI Makeup & Lash Advisor'}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-roseGold/15 text-roseGold border border-roseGold/30 font-medium">
              Facial AI & AR
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            {language === 'ur'
              ? 'آنکھوں کی ساخت کا اے آئی اسکین، موزوں ترین پلکوں اور میک اپ کی لائیو ورچوئل ٹرائی آن'
              : 'Facial scanning analysis with custom eye shape classification and live AR virtual try-on studio'}
          </p>
        </div>

        <button
          onClick={handleStartScan}
          disabled={isScanning}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-roseGold to-zoya-500 text-neutral-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Scan className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? `Scanning Face (${scanProgress}%)...` : 'Scan Face & Eyes'}</span>
        </button>
      </div>

      {/* Main Grid: Face & Eye Try-On Canvas (Left) + Analysis & Customizer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT / TOP: Virtual Try-On Canvas with Before/After Split */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="luxury-card rounded-3xl p-4 w-full border-roseGold/25 shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Canvas Header */}
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-roseGold/15 text-xs">
              <div className="flex items-center gap-1.5 text-roseGold-light font-medium">
                <Eye className="w-4 h-4 text-roseGold" />
                <span>AR Eye & Face Studio</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                <span>Eye Shape:</span>
                <span className="font-semibold text-roseGold">{shapeInfo.name}</span>
              </div>
            </div>

            {/* Simulated Interactive Face & Eye Canvas */}
            <div className="relative w-full aspect-[4/4.5] max-w-[340px] rounded-2xl overflow-hidden shadow-inner bg-[#1A0914] flex items-center justify-center p-2">
              {/* Scanning HUD Overlay if active */}
              {isScanning && (
                <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4">
                  <div className="w-36 h-36 rounded-full border-2 border-dashed border-roseGold animate-spin flex items-center justify-center relative">
                    <div className="w-24 h-24 rounded-full border border-roseGold/60 animate-ping" />
                  </div>
                  <div className="w-full bg-roseGold/20 rounded-full h-1.5 max-w-[200px] mt-4 overflow-hidden">
                    <div
                      className="bg-roseGold h-full transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-roseGold font-serif font-semibold mt-2">
                    Measuring Canthal Tilt & Eyelid Crease...
                  </span>
                </div>
              )}

              {/* Facial Graphic SVG Rendering */}
              <svg viewBox="0 0 300 320" className="w-full h-full drop-shadow-2xl">
                <defs>
                  {/* Skin Gradient */}
                  <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EAC8B1" />
                    <stop offset="100%" stopColor="#D4A78D" />
                  </linearGradient>

                  {/* Eyeshadow Gradient Blending */}
                  <radialGradient id="shadowGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={activeLook.eyeshadowPalette.shimmer} stopOpacity="0.85" />
                    <stop offset="60%" stopColor={activeLook.eyeshadowPalette.crease} stopOpacity="0.65" />
                    <stop offset="100%" stopColor={activeLook.eyeshadowPalette.outerV} stopOpacity="0" />
                  </radialGradient>

                  {/* Clip path for Before / After Split Slider */}
                  <clipPath id="afterClip">
                    <rect x="0" y="0" width={`${(compareSplit / 100) * 300}`} height="320" />
                  </clipPath>
                  <clipPath id="beforeClip">
                    <rect x={`${(compareSplit / 100) * 300}`} y="0" width="300" height="320" />
                  </clipPath>
                </defs>

                {/* --- FACE BASE LAYER (Rendered across full canvas) --- */}
                <g id="faceBase">
                  {/* Oval Face Contour */}
                  <ellipse cx="150" cy="160" rx="95" ry="120" fill="url(#faceGrad)" />

                  {/* Subtle Nose Contour */}
                  <path d="M 148 140 C 147 165, 142 185, 140 190 Q 150 196, 160 190" stroke="#8C4E3A" strokeWidth="1.5" strokeOpacity="0.25" fill="none" />
                  <ellipse cx="143" cy="190" rx="4" ry="2" fill="#8C4E3A" fillOpacity="0.15" />
                  <ellipse cx="157" cy="190" rx="4" ry="2" fill="#8C4E3A" fillOpacity="0.15" />

                  {/* Soft Blush Cheeks */}
                  <ellipse cx="95" cy="185" rx="22" ry="12" fill={showEyeshadow ? '#C05E46' : 'transparent'} fillOpacity="0.25" filter="blur(4px)" />
                  <ellipse cx="205" cy="185" rx="22" ry="12" fill={showEyeshadow ? '#C05E46' : 'transparent'} fillOpacity="0.25" filter="blur(4px)" />

                  {/* Eyebrows (Microbladed Arch) */}
                  <path d="M 85 105 Q 110 95, 132 104" stroke="#26120E" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 168 104 Q 190 95, 215 105" stroke="#26120E" strokeWidth="4" strokeLinecap="round" fill="none" />
                </g>

                {/* --- AFTER LAYER (With AR Makeup, Lashes, Lipstick Applied) --- */}
                <g id="afterMakeup" clipPath="url(#afterClip)">
                  {/* Eyeshadow Blends */}
                  {showEyeshadow && (
                    <g id="eyeshadowApplied">
                      {/* Left Lid Shadow */}
                      <ellipse cx="108" cy="128" rx="24" ry="14" fill="url(#shadowGlow)" />
                      {/* Right Lid Shadow */}
                      <ellipse cx="192" cy="128" rx="24" ry="14" fill="url(#shadowGlow)" />
                    </g>
                  )}

                  {/* Eyes Sclera & Irises */}
                  {/* Left Eye */}
                  <path d="M 86 130 Q 108 116, 130 130 Q 108 144, 86 130 Z" fill="#FFFDF8" stroke="#3A1C16" strokeWidth="1" />
                  <circle cx="108" cy="130" r="7.5" fill="#422517" />
                  <circle cx="108" cy="130" r="3.5" fill="#120603" />
                  <circle cx="110" cy="128" r="1.5" fill="#FFFFFF" />

                  {/* Right Eye */}
                  <path d="M 170 130 Q 192 116, 214 130 Q 192 144, 170 130 Z" fill="#FFFDF8" stroke="#3A1C16" strokeWidth="1" />
                  <circle cx="192" cy="130" r="7.5" fill="#422517" />
                  <circle cx="192" cy="130" r="3.5" fill="#120603" />
                  <circle cx="194" cy="128" r="1.5" fill="#FFFFFF" />

                  {/* Eyeliner Overlay */}
                  {showEyeliner && (
                    <g stroke="#14060B" strokeLinecap="round" fill="none">
                      {/* Left Upper Wing */}
                      <path d="M 86 130 Q 108 118, 128 128" strokeWidth="2.8" />
                      <path d="M 86 130 L 74 122" strokeWidth="2.5" />
                      {/* Right Upper Wing */}
                      <path d="M 172 128 Q 192 118, 214 130" strokeWidth="2.8" />
                      <path d="M 214 130 L 226 122" strokeWidth="2.5" />
                    </g>
                  )}

                  {/* False Lashes Overlay (Rendered with distinct curl & flare) */}
                  {showLashes && (
                    <g stroke="#0D0306" strokeLinecap="round" strokeWidth="1.6" fill="none">
                      {/* Left Eye Lashes */}
                      <path d="M 88 128 Q 80 114, 76 112" />
                      <path d="M 94 125 Q 90 110, 87 106" />
                      <path d="M 102 123 Q 101 106, 100 102" />
                      <path d="M 110 123 Q 111 106, 112 102" />
                      <path d="M 118 124 Q 122 109, 126 106" />
                      <path d="M 125 127 Q 131 116, 136 114" />
                      {/* 3D Extra flare density for Cat-Eye or Russian Volume */}
                      {activeLash.density.includes('Flare') || activeLash.density.includes('Volume') ? (
                        <>
                          <path d="M 84 129 Q 72 118, 68 116" strokeWidth="2" />
                          <path d="M 90 126 Q 82 112, 78 108" strokeWidth="1.8" />
                        </>
                      ) : null}

                      {/* Right Eye Lashes */}
                      <path d="M 175 127 Q 169 116, 164 114" />
                      <path d="M 182 124 Q 178 109, 174 106" />
                      <path d="M 190 123 Q 189 106, 188 102" />
                      <path d="M 198 123 Q 199 106, 200 102" />
                      <path d="M 206 125 Q 210 110, 213 106" />
                      <path d="M 212 128 Q 220 114, 224 112" />
                      {activeLash.density.includes('Flare') || activeLash.density.includes('Volume') ? (
                        <>
                          <path d="M 216 129 Q 228 118, 232 116" strokeWidth="2" />
                          <path d="M 210 126 Q 218 112, 222 108" strokeWidth="1.8" />
                        </>
                      ) : null}
                    </g>
                  )}

                  {/* Lipstick Full Lip Contouring */}
                  <g id="fullLipsAfter">
                    {/* Upper Lip */}
                    <path
                      d="M 125 235 Q 138 230, 145 232 Q 150 234, 155 232 Q 162 230, 175 235 Q 150 240, 125 235 Z"
                      fill={showLipstick ? activeLook.lipstickShade.colorHex : '#BA7F70'}
                    />
                    {/* Lower Lip */}
                    <path
                      d="M 125 235 Q 150 252, 175 235 Q 150 241, 125 235 Z"
                      fill={showLipstick ? activeLook.lipstickShade.colorHex : '#BA7F70'}
                    />
                    {/* Lip Highlight Sheen */}
                    {showLipstick && (
                      <ellipse cx="150" cy="242" rx="10" ry="2" fill="#FFFFFF" fillOpacity="0.3" />
                    )}
                  </g>
                </g>

                {/* --- BEFORE LAYER (Natural Un-madeup bare skin on right side of split) --- */}
                <g id="beforeBare" clipPath="url(#beforeClip)">
                  {/* Natural bare eyes */}
                  <path d="M 86 130 Q 108 118, 130 130 Q 108 142, 86 130 Z" fill="#F8F3EC" stroke="#4A251C" strokeWidth="0.8" />
                  <circle cx="108" cy="130" r="7" fill="#422517" />
                  <circle cx="108" cy="130" r="3" fill="#120603" />

                  <path d="M 170 130 Q 192 118, 214 130 Q 192 142, 170 130 Z" fill="#F8F3EC" stroke="#4A251C" strokeWidth="0.8" />
                  <circle cx="192" cy="130" r="7" fill="#422517" />
                  <circle cx="192" cy="130" r="3" fill="#120603" />

                  {/* Bare Lips */}
                  <path
                    d="M 128 236 Q 138 233, 150 234 Q 162 233, 172 236 Q 150 240, 128 236 Z"
                    fill="#C6897D"
                  />
                  <path
                    d="M 128 236 Q 150 249, 172 236 Q 150 241, 128 236 Z"
                    fill="#BD7F74"
                  />
                </g>

                {/* Vertical Comparison Split Line Indicator */}
                <line
                  x1={`${(compareSplit / 100) * 300}`}
                  y1="30"
                  x2={`${(compareSplit / 100) * 300}`}
                  y2="290"
                  stroke="#E5A99B"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <circle
                  cx={`${(compareSplit / 100) * 300}`}
                  cy="160"
                  r="10"
                  fill="#E5A99B"
                  stroke="#230F1E"
                  strokeWidth="2"
                />
              </svg>

              {/* Before/After Badges on Canvas */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-roseGold/30 text-[10px] text-roseGold font-semibold">
                After (AR Glam)
              </div>
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-[10px] text-neutral-300">
                Before (Bare)
              </div>
            </div>

            {/* Split Comparison Range Slider */}
            <div className="w-full mt-3 px-1 space-y-1">
              <div className="flex justify-between text-[11px] text-neutral-400 font-medium">
                <span>◀ Drag to compare Before / After</span>
                <span className="text-roseGold font-mono">{compareSplit}% Glam</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={compareSplit}
                onChange={(e) => setCompareSplit(Number(e.target.value))}
                className="w-full accent-roseGold cursor-pointer h-1.5 bg-black/40 rounded-lg"
              />
            </div>

            {/* Layer Visibility Toggles */}
            <div className="w-full grid grid-cols-4 gap-1.5 mt-3 pt-2.5 border-t border-roseGold/10">
              {[
                { label: 'Lashes', state: showLashes, toggle: () => setShowLashes(!showLashes) },
                { label: 'Eyeliner', state: showEyeliner, toggle: () => setShowEyeliner(!showEyeliner) },
                { label: 'Shadow', state: showEyeshadow, toggle: () => setShowEyeshadow(!showEyeshadow) },
                { label: 'Lipstick', state: showLipstick, toggle: () => setShowLipstick(!showLipstick) }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.toggle}
                  className={`py-1 rounded-xl text-[10px] font-semibold border transition-all ${
                    item.state
                      ? 'bg-roseGold/20 border-roseGold text-roseGold shadow-sm'
                      : 'border-white/10 text-neutral-500 hover:text-white'
                  }`}
                >
                  {item.label} {item.state ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Eye Shape Analysis, Lash Recommendation & Products */}
        <div className="lg:col-span-6 space-y-3.5">
          {/* Eye Shape Selector / Classifier Card */}
          <div className="luxury-card rounded-2xl p-3.5 border-roseGold/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-roseGold-light flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-roseGold" />
                <span>Eye Shape Classification:</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-sans">
                {language === 'ur' ? shapeInfo.urduName : 'AI Landmark Analysis'}
              </span>
            </div>

            {/* Shape Buttons Carousel */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {(['Almond', 'Hooded', 'Monolid', 'Round', 'Deep-set', 'Downturned'] as EyeShape[]).map((shp) => (
                <button
                  key={shp}
                  onClick={() => setEyeShape(shp)}
                  className={`py-1.5 px-1 rounded-xl text-[11px] font-medium border text-center transition-all ${
                    eyeShape === shp
                      ? 'bg-roseGold text-neutral-950 font-bold border-roseGold shadow-md'
                      : 'bg-[#200A19] text-neutral-300 border-roseGold/15 hover:border-roseGold/40'
                  }`}
                >
                  {shp}
                </button>
              ))}
            </div>

            {/* Shape Insights Box */}
            <div className="bg-[#1C0916] rounded-xl p-3 border border-roseGold/15 space-y-1.5 text-xs">
              <p className="text-neutral-300 leading-snug">
                {shapeInfo.description}
              </p>
              <div className="pt-1 text-[11px] text-roseGold-light flex items-start gap-1">
                <span className="font-semibold text-roseGold">Lash Match:</span>
                <span>{shapeInfo.bestLashes}</span>
              </div>
              <div className="text-[11px] text-neutral-300 flex items-start gap-1">
                <span className="font-semibold text-roseGold">Liner Secret:</span>
                <span>{shapeInfo.eyelinerSecret}</span>
              </div>
            </div>
          </div>

          {/* Lash Style Selection Deck */}
          <div className="luxury-card rounded-2xl p-3.5 border-roseGold/20 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-roseGold-light flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-roseGold" />
                <span>Select False Lash Style to Try On:</span>
              </span>
              <span className="text-[10px] text-roseGold font-mono">{activeLash.lengthMm}mm • {activeLash.curl}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {LASH_STYLES.map((lash) => {
                const isSelected = activeLash.id === lash.id;
                const isSuited = lash.suitedFor.includes(eyeShape);
                return (
                  <button
                    key={lash.id}
                    onClick={() => setActiveLash(lash)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-roseGold/20 border-roseGold text-white shadow-md'
                        : 'bg-[#1C0916] border-roseGold/15 hover:border-roseGold/40 text-neutral-300'
                    }`}
                  >
                    {isSuited && (
                      <span className="absolute top-2 right-2 text-[8px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                        Best Match ★
                      </span>
                    )}
                    <div className="text-xs font-semibold text-roseGold-light">
                      {lash.name}
                    </div>
                    <div className="text-[10px] text-roseGold/80 mt-0.5">
                      {lash.density} • {lash.lengthMm}mm ({lash.curl})
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-tight">
                      {language === 'ur' ? lash.urduDescription : lash.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Makeup Look Palette Switcher */}
          <div className="luxury-card rounded-2xl p-3.5 border-roseGold/20 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-roseGold-light flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-roseGold" />
                <span>Complete Glam Look & Lipstick:</span>
              </span>
              <span className="text-[10px] text-neutral-400">{activeLook.bestForOccasion}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {MAKEUP_LOOKS.map((look) => {
                const isSelected = activeLook.id === look.id;
                return (
                  <button
                    key={look.id}
                    onClick={() => setActiveLook(look)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-roseGold/20 border-roseGold text-white shadow-md'
                        : 'bg-[#1C0916] border-roseGold/15 hover:border-roseGold/40 text-neutral-300'
                    }`}
                  >
                    <div className="text-[11px] font-semibold text-roseGold-light truncate">
                      {language === 'ur' ? look.urduName : look.name}
                    </div>
                    {/* Swatches preview */}
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: look.eyeshadowPalette.shimmer }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: look.eyeshadowPalette.crease }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: look.lipstickShade.colorHex }} />
                    </div>
                    <div className="text-[9px] text-neutral-400 mt-1 truncate">
                      Lip: {look.lipstickShade.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Add Look to Vanity Bag button */}
            <button
              onClick={() => onSaveLook(activeLook)}
              className="w-full mt-2 py-2 rounded-xl bg-roseGold/15 hover:bg-roseGold/25 border border-roseGold/30 text-roseGold-light text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save Curated Look to Vanity Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
