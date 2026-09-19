import { MehndiDesign, LashStyle, MakeupLook, AcademyLesson, EyeShape, SkinTone } from '../types';

export const MEHNDI_DESIGNS: MehndiDesign[] = [
  {
    id: 'mehndi-1',
    title: 'Royal Bridal Arabic Vine',
    urduTitle: 'شاہی عربی برائیڈل بیل',
    style: 'Bridal Arabic',
    placement: 'Back of Hand',
    density: 'Heavy Bridal',
    occasion: 'Bridal / Barat',
    estimatedTime: '45 mins',
    description: 'Flowing bold Arabic leaf trails intertwining with delicate shaded rose petals and cascading wrist cuff bracelets.',
    motifs: ['Arabic Rose', 'Trailing Vine', 'Bold Leaf Outline', 'Beaded Wristband'],
    patternType: 'arabic_vine',
    svgPathData: 'M 100 320 C 110 270, 130 230, 150 190 C 160 170, 170 140, 175 100 C 150 120, 130 150, 125 180 C 120 210, 105 250, 95 290 Z'
  },
  {
    id: 'mehndi-2',
    title: 'Minimalist Floral Finger Cascade',
    urduTitle: 'سادہ پھولوں والا انگلی ڈیزائن',
    style: 'Minimalist Floral',
    placement: 'Fingers & Nails',
    density: 'Minimal',
    occasion: 'Everyday Chic',
    estimatedTime: '15 mins',
    description: 'Modern aesthetic micro-florals focused along the index and ring fingers with clean negative space across the hand.',
    motifs: ['Micro Flora', 'Negative Space Dotting', 'Botanical Tendril', 'Linear Rings'],
    patternType: 'minimal_floral',
    svgPathData: 'M 175 100 C 178 80, 182 60, 185 40 C 182 50, 175 65, 170 80 Z'
  },
  {
    id: 'mehndi-3',
    title: 'Gulf Khafif Shaded Rose & Leaf',
    urduTitle: 'خلیجی خفیف شیڈڈ گلاب',
    style: 'Khafif Gulf',
    placement: 'Palm',
    density: 'Medium',
    occasion: 'Eid Mubarak',
    estimatedTime: '25 mins',
    description: 'Delicate Dubai-style Khafif art featuring multi-toned hatching, translucent leaf shading, and modern floral sprays.',
    motifs: ['Gulf Peony', 'Feather Shading', 'Negative Grid', 'Pearl Drops'],
    patternType: 'khafif',
    svgPathData: 'M 140 220 C 150 200, 170 195, 180 210 C 190 225, 180 245, 160 250 C 140 245, 130 230, 140 220 Z'
  },
  {
    id: 'mehndi-4',
    title: 'Majestic Central Chakra Mandala',
    urduTitle: 'مرکزی چکر منڈلا شاہی',
    style: 'Royal Mandala',
    placement: 'Back of Hand',
    density: 'Medium',
    occasion: 'Mehndi / Mayun',
    estimatedTime: '30 mins',
    description: 'Symmetrical circular sunburst chakra with intricate scalloped lace borders, jaali finger caps, and auspicious motifs.',
    motifs: ['Circular Mandala', 'Petal Rosettes', 'Jaali Netting', 'Finger Tips (Phor)'],
    patternType: 'mandala',
    svgPathData: 'M 150 210 A 35 35 0 1 0 150 280 A 35 35 0 1 0 150 210 Z'
  },
  {
    id: 'mehndi-5',
    title: 'Moroccan Geometric Lattice',
    urduTitle: 'مراکشی ہندسی لہریات',
    style: 'Moroccan Geometric',
    placement: 'Back of Hand',
    density: 'Medium',
    occasion: 'Everyday Chic',
    estimatedTime: '20 mins',
    description: 'Crisp diamond chevrons, tribal linear grids, and sharp geometric framing celebrating North African henna heritage.',
    motifs: ['Diamond Lattice', 'Chevron Peaks', 'Parallel Striations', 'Fez Triangles'],
    patternType: 'moroccan',
    svgPathData: 'M 150 180 L 180 220 L 150 260 L 120 220 Z'
  }
];

export const EYE_SHAPES_DATA: { [key in EyeShape]: {
  name: string;
  urduName: string;
  description: string;
  bestLashes: string;
  eyelinerSecret: string;
  eyeshadowTip: string;
} } = {
  'Almond': {
    name: 'Almond Eyes',
    urduName: 'بادامی آنکھیں',
    description: 'Naturally balanced with a gentle upward lift at the outer corners; iris touches both top and bottom lids.',
    bestLashes: 'Cat-Eye Flare (10mm to 14mm gradient) or evenly dispersed Wispy Silk.',
    eyelinerSecret: 'Classic winged liner following the natural curve of the lower waterline.',
    eyeshadowTip: 'Accentuate outer-V with deep plum or warm bronze to exaggerate the sultry almond contour.'
  },
  'Hooded': {
    name: 'Hooded Eyes',
    urduName: 'جھکی ہوئی / ہوڈڈ آنکھیں',
    description: 'An extra layer of skin droops over the crease, obscuring the upper eyelid when eyes are open.',
    bestLashes: 'Center-accentuated Doll Eye (11mm-13mm) longer in the middle to visually open the eye.',
    eyelinerSecret: 'Bat-wing liner or tightlining. Never draw thick lines across the mobile lid!',
    eyeshadowTip: 'Bring the transition crease shade slightly above the natural fold so it remains visible.'
  },
  'Monolid': {
    name: 'Monolid Eyes',
    urduName: 'مونو لڈ آنکھیں',
    description: 'A smooth lid surface without a defined crease fold, common in East and Central Asian descent.',
    bestLashes: 'Criss-cross layered lashes with strong curl (D-Curl or L-Curl) that lift above the lashline.',
    eyelinerSecret: 'Soft smudged gradient liner or floating crease graphic liner that frames the lid.',
    eyeshadowTip: 'Vertical ombré: light champagne shimmer near lashes blending up to velvety satin terracotta.'
  },
  'Round': {
    name: 'Round Eyes',
    urduName: 'گول آنکھیں',
    description: 'Large, expressive eyes where white (sclera) is often visible above or below the iris.',
    bestLashes: 'Elongating Half-Lashes or outer corner accent wings to balance circular proportions.',
    eyelinerSecret: 'Elongated horizontal wing with kohl along outer half of waterline only.',
    eyeshadowTip: 'Avoid highlighting the very center ball of the eye; focus depth outward to elongate.'
  },
  'Deep-set': {
    name: 'Deep-set Eyes',
    urduName: 'گہری آنکھیں',
    description: 'Set deeper into the skull with a prominent brow bone casting a natural shadow over the lid.',
    bestLashes: 'Long, wispy lashes (12mm-15mm) with light density that won’t brush heavily against the brow bone.',
    eyelinerSecret: 'Thin, crisp line with metallic reflective finish (bronze or rose gold) to bring eyes forward.',
    eyeshadowTip: 'Use bright champagne and peach shimmer on the lid; avoid dark matte shades in the crease.'
  },
  'Downturned': {
    name: 'Downturned Eyes',
    urduName: 'ڈاؤن ٹرنڈ آنکھیں',
    description: 'Outer corners slant downward lower than the inner corners, creating a sweet puppy-eye look.',
    bestLashes: 'Extreme lifting Cat-Eye flare with D-Curl focused on the outer third to lift the gaze.',
    eyelinerSecret: 'Start the wing flick early, before the lashline dips, aiming upward toward the brow tail.',
    eyeshadowTip: 'Blend upward and outward in a 45-degree angle to create an instant optical facelift.'
  }
};

export const LASH_STYLES: LashStyle[] = [
  {
    id: 'lash-1',
    name: 'Zoya Signature Silk Cat-Eye',
    suitedFor: ['Almond', 'Round', 'Downturned'],
    lengthMm: 13,
    curl: 'D-Curl',
    density: 'Cat-Eye Flare',
    description: 'Featherweight Korean silk fibers transitioning seamlessly from 8mm at the inner tear duct to an ultra-flirty 13mm wing.',
    urduDescription: 'ہلکی ریشمی پلکیں جو آنکھ کے بیرونی کونے کو مسحور کن اور پُرکشش اٹھاؤ دیتی ہیں۔'
  },
  {
    id: 'lash-2',
    name: 'Noor Center Doll-Eye Opener',
    suitedFor: ['Hooded', 'Deep-set', 'Monolid'],
    lengthMm: 12,
    curl: 'C-Curl',
    density: 'Doll-Eye Center',
    description: 'Longest clusters placed directly above the pupil to immediately create wide-eyed freshness and conceal eyelid hooding.',
    urduDescription: 'آنکھ کو بڑا، چمکدار اور کُشادہ دکھانے کے لیے مرکز میں لمبی اور دلکش پلکیں۔'
  },
  {
    id: 'lash-3',
    name: 'Subah Wispy Minimalist',
    suitedFor: ['Almond', 'Monolid', 'Round', 'Deep-set'],
    lengthMm: 10,
    curl: 'J-Curl',
    density: 'Wispy Natural',
    description: 'Individual cluster look with clear invisible band. Indistinguishable from natural lashes with two coats of luxury mascara.',
    urduDescription: 'قدرتی روزمرہ انداز، ہلکی اور نفیس جو بغیر کسی بھاری پن کے خوبصورتی بڑھاتی ہے۔'
  },
  {
    id: 'lash-4',
    name: 'Mughal Empress Royal Volume',
    suitedFor: ['Almond', 'Deep-set', 'Round'],
    lengthMm: 15,
    curl: 'D-Curl',
    density: 'Russian Volume',
    description: 'Multi-dimensional 5D dimensional volume engineered for grand bridal entry, barat photography, and heavy festive glam.',
    urduDescription: 'برائیڈل اور شادی بیاہ کے لیے شاہانہ اور گھنی پرتعیش فائیو-ڈی والیوم پلکیں۔'
  }
];

export const MAKEUP_LOOKS: MakeupLook[] = [
  {
    id: 'look-1',
    name: 'Gulabi Rose Gold Shimmer',
    urduName: 'گلابی روز گولڈ جھلک',
    eyeshadowPalette: {
      base: '#F5DFD5',
      crease: '#C05E46',
      shimmer: '#F7E7CE',
      outerV: '#481E38'
    },
    eyelinerStyle: 'Precise Clean Wing',
    lipstickShade: {
      name: 'Kashmiri Chai Rose',
      colorHex: '#C56A6D',
      finish: 'Velvet Matte'
    },
    blushShade: 'Peachy Rose Luster',
    bestForOccasion: 'Daytime Nikkah & Sangeet'
  },
  {
    id: 'look-2',
    name: 'Sultana Smokey Kohl & Berry',
    urduName: 'سلطانہ سموکی کاجل و بیری',
    eyeshadowPalette: {
      base: '#E8D3B7',
      crease: '#7F3626',
      shimmer: '#D4AF37',
      outerV: '#2A0B06'
    },
    eyelinerStyle: 'Smudged Arabic Kohl with Inner Teardrop Wing',
    lipstickShade: {
      name: 'Royal Velvet Jamun',
      colorHex: '#6F1D3C',
      finish: 'Velvet Matte'
    },
    blushShade: 'Terracotta Warm Spice',
    bestForOccasion: 'Barat & Grand Reception'
  },
  {
    id: 'look-3',
    name: 'Noor-e-Sahar Clean Dewy',
    urduName: 'نورِ سحر ڈیوئی گلاس',
    eyeshadowPalette: {
      base: '#FFFDF9',
      crease: '#ECC4B6',
      shimmer: '#FFFFFF',
      outerV: '#A86D5D'
    },
    eyelinerStyle: 'Soft Brown Tightline',
    lipstickShade: {
      name: 'Sheer Khurma Nude Glaze',
      colorHex: '#D28B78',
      finish: 'Dewy Satin'
    },
    blushShade: 'Fresh Apricot Sheen',
    bestForOccasion: 'Eid Morning & Everyday Elegance'
  }
];

export const ACADEMY_LESSONS: AcademyLesson[] = [
  {
    id: 'lesson-1',
    title: 'Flawless Desi Base: Olive Undertone Mastery',
    urduTitle: 'دیسی بیس اور زیتونی انڈرٹون درستگی کا ماسٹرکلاس',
    category: 'Makeup',
    level: 'Beginner',
    durationMinutes: 18,
    rating: 4.9,
    enrolledCount: 14200,
    thumbnailGradient: 'from-[#4E1D13] to-[#C05E46]',
    instructor: 'Zoya AI Senior Aesthetician',
    description: 'Learn color correction for hyperpigmentation around the mouth and eyes without creating grey or ashy foundation in humidity.',
    urduDescription: 'چہرے کے ارد گرد سیاہی دور کرنے، پیچ کلر کریکٹر کے استعمال اور بغیر سرمئی ہوئے پائیدار بیس بنانے کا طریقہ۔',
    keyProducts: ['Peach Color Corrector', 'Warm Olive Liquid Foundation', 'Translucent Banana Powder', 'Hydrating Setting Mist'],
    steps: [
      {
        stepNumber: 1,
        title: 'Skin Prep & Thermal Hydration',
        urduTitle: 'جلد کی تیاری اور ہائیڈریشن',
        details: 'Cleanse and apply a lightweight hyaluronic serum followed by non-comedogenic ceramide cream. Wait 3 minutes before makeup.',
        proTip: 'Damp skin absorbs moisturizer 5x better; never apply primer directly onto parched or un-prepped skin.',
        culturalNote: 'Traditional gulab arq (pure rose water mist) serves as an extraordinary natural pore-tightener before priming.'
      },
      {
        stepNumber: 2,
        title: 'Targeted Peach / Terracotta Neutralization',
        urduTitle: 'پیچ کلر کوریکشن کا درست طریقہ',
        details: 'Dab a micro-drop of warm peach corrector onto dark circles and smile lines. Blend with finger heat, do not drag or over-spread.',
        proTip: 'If your foundation turns grey by midday, it means pigmentation was covered with light concealer instead of being neutralized first.'
      },
      {
        stepNumber: 3,
        title: 'Micro-Dot Foundation & Wet Sponge Press',
        urduTitle: 'فاؤنڈیشن لگانا اور اسفنج سے بلینڈ کرنا',
        details: 'Apply foundation in micro-dots starting at the center of face moving outward. Use a damp microfiber sponge with bouncing motions.',
        proTip: 'Never swipe the sponge; press and bounce to fuse foundation with skin texture.'
      },
      {
        stepNumber: 4,
        title: 'Baking & Humidity Lock',
        urduTitle: 'بیکنگ اور گرمی سے حفاظت',
        details: 'Press finely milled warm yellow/banana powder onto the T-zone and smile creases. Leave for 90 seconds then sweep away with a fluffy brush.',
        proTip: 'For humid wedding halls, spray setting mist onto your sponge before your final foundation pass.'
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'Bridal Arabic Eye & Precise Kohl Wings',
    urduTitle: 'برائیڈل عربی آئی میک اپ اور کاجل ونگ',
    category: 'Makeup',
    level: 'Pro Bridal',
    durationMinutes: 24,
    rating: 5.0,
    enrolledCount: 21500,
    thumbnailGradient: 'from-[#280F1E] to-[#7D325E]',
    instructor: 'Zoya AI Bridal Master',
    description: 'Master the iconic cut-crease with pressed antique gold glitter, razor-sharp Arabic inner tear-duct wings, and smudge-proof waterline kohl.',
    urduDescription: 'شاہانہ کٹ کریز، سنہری گلیٹر، آنکھ کے اندرونی کونے کا نوکیلا ونگ اور کاجل لگانے کا مکمل طریقہ۔',
    keyProducts: ['Matte Plum Eyeshadow', 'Gold Foil Leaf Glitter', 'Waterproof Gel Eyeliner', '5D Russian Volume Lashes'],
    steps: [
      {
        stepNumber: 1,
        title: 'Crease Carving & Sunset Gradient',
        urduTitle: 'کریز بنانا اور رنگوں کا امتزاج',
        details: 'Map the crease using a tapered blending brush with warm terracotta, deepening the socket with rich plum and espresso.',
        proTip: 'Keep your chin slightly lifted and look downward into your mirror to see your entire crease unfold clearly.'
      },
      {
        stepNumber: 2,
        title: 'Half Cut-Crease with Flat Concealer Brush',
        urduTitle: 'ہاف کٹ کریز بنانا',
        details: 'Use a full-coverage flat synthetic brush with ivory concealer to stamp a clean sharp half-moon arch from inner corner to mid-lid.',
        proTip: 'Look straight up into the ceiling after placing a dot of concealer on the lid; wherever it transfers marks your crease boundary!'
      },
      {
        stepNumber: 3,
        title: 'Arabic Inner Teardrop Wing Extension',
        urduTitle: 'عربی اندرونی نوک اور ونگ',
        details: 'Using a 0.1mm micro-fine gel brush, extend a razor-sharp inverted triangle at the inner canthus pointing downward along the nose contour.',
        proTip: 'Rest your pinky finger on your cheekbone as a steady anchor to prevent shaking.'
      },
      {
        stepNumber: 4,
        title: 'Lash Placement & Kohl Lock',
        urduTitle: 'پلکیں لگانا اور کاجل لاک کرنا',
        details: 'Wait 30 seconds for lash glue to become tacky. Place lash center first with tweezers, then secure outer and inner edges. Set waterline kohl with matte black shadow.',
        proTip: 'Setting waterproof gel kohl with black eyeshadow prevents any bleeding or watery tear damage throughout wedding emotional moments.'
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Henna Cone Grip, Pressure & Jaali Line Precision',
    urduTitle: 'مہندی کون کی گرفت، پریشر اور جالی لائنز میں مہارت',
    category: 'Mehndi',
    level: 'Intermediate',
    durationMinutes: 15,
    rating: 4.8,
    enrolledCount: 9800,
    thumbnailGradient: 'from-[#8C3821] to-[#541D12]',
    instructor: 'Ustadah Mehndi Specialist',
    description: 'Learn the pen-grip method, draping henna paste without tearing lines, symmetrical mandala geometry, and natural dark mahogany stain secrets.',
    urduDescription: 'مہندی کون صحیح پکڑنے، باریک جالی اور خوبصورت گہرے رنگ کے قدرتی نسخے۔',
    keyProducts: ['Fresh Organic Henna Cone', 'Eucalyptus Clove Essential Oil', 'Lemon & Sugar Glaze', 'Mustard / Vicks Balm'],
    steps: [
      {
        stepNumber: 1,
        title: 'Ergonomic Pen Grip & Cone Needle Trimming',
        urduTitle: 'کون پکڑنے کا درست طریقہ',
        details: 'Hold the cone near the tip like a fine fountain pen. Cut only 0.3mm off the cellophane tip. Squeeze from the top thumb pressure.',
        proTip: 'Never drag the tip against the skin; let the henna string drape through the air onto the skin surface like a thread.'
      },
      {
        stepNumber: 2,
        title: 'Jaali Netting & Symmetry Lines',
        urduTitle: 'سیدھی جالی اور باریک لائنز',
        details: 'Pull straight parallel diagonal lines at equal 4mm distances. Cross with opposing diagonals to create a clean diamond jaali.',
        proTip: 'Fill alternate diamond intersections with micro-dots to create a royal lace embroidery effect.'
      },
      {
        stepNumber: 3,
        title: 'The 24-Hour Dark Mahogany Stain Ritual',
        urduTitle: 'مہندی کا رنگ انتہائی گہرا کرنے کا طریقہ',
        details: 'Once dry, dab warm lemon-sugar syrup with cotton. Keep on for 6-8 hours. Scrape off without water, apply clove smoke fumes and warm mustard oil.',
        proTip: 'Water halts the natural oxidation process of lawsone molecules; keep hands completely water-free for 12 hours after removal for rich dark maroon!',
        culturalNote: 'Traditional clove steam (laung ki dhooni) gently heats the henna oil in the skin, intensifying the bridal stain dramatically.'
      }
    ]
  },
  {
    id: 'lesson-4',
    title: 'Ancient Ubtan Secrets & Modern Barrier Repair',
    urduTitle: 'قدیم اپٹن کے راز اور جدید اسکن کیئر بیرئیر',
    category: 'Skincare',
    level: 'Beginner',
    durationMinutes: 12,
    rating: 4.9,
    enrolledCount: 16400,
    thumbnailGradient: 'from-[#D47E68] to-[#9E442F]',
    instructor: 'Dr. Zoya Clinical Cosmetology',
    description: 'Blending organic wild turmeric (Kasturi Manjal), sandalwood, and chickpea flour with modern niacinamide and hyaluronic ceramides.',
    urduDescription: 'ہلدی اور صندل کے خالص اپٹن اور جدید وٹامنز سے جلد چمکدار بنانے کا نسخہ۔',
    keyProducts: ['Kasturi Manjal (Non-staining Wild Turmeric)', 'Besan (Gram Flour)', 'Pure Cold-Pressed Almond Oil', 'Ceramide Barrier Cream'],
    steps: [
      {
        stepNumber: 1,
        title: 'Safe Ubtan Formulation for Facial Skin',
        urduTitle: 'چہرے کے لیے محفوظ اپٹن تیار کرنا',
        details: 'Mix 1 tbsp chickpea flour with 1/4 tsp Kasturi Manjal, 1 tsp milk cream (malai) or yogurt, and 3 drops of pure sweet almond oil.',
        proTip: 'Always use wild Kasturi turmeric instead of cooking haldi; it imparts radiant glow without yellow food-dye staining.'
      },
      {
        stepNumber: 2,
        title: 'Gentle Circular Exfoliation & Rinse',
        urduTitle: 'آہستگی سے مساج اور دھونا',
        details: 'Let it dry to 80%. Gently roll off in upward circular strokes to remove dead keratin cells and fine peach fuzz naturally.',
        proTip: 'Never scrub dry ubtan aggressively; soften with warm rosewater if it becomes too tight.'
      }
    ]
  }
];
