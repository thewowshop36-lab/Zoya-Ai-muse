export type LanguageMode = 'en' | 'ur' | 'roman_ur';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'zoya';
  text: string;
  urduText?: string;
  timestamp: string;
  category?: 'skincare' | 'makeup' | 'mehndi' | 'troubleshoot' | 'bridal';
  suggestedActions?: string[];
  productPicks?: ProductRecommendation[];
}

export interface ProductRecommendation {
  name: string;
  brand: string;
  category: string;
  shade: string;
  priceEst: string;
  whySuited: string;
  undertoneMatch: string;
}

export type MehndiStyle =
  | 'Bridal Arabic'
  | 'Minimalist Floral'
  | 'Khafif Gulf'
  | 'Royal Mandala'
  | 'Moroccan Geometric'
  | 'Indo-Western Fusion'
  | 'Jaali Netting';

export type NailArtStyle =
  | 'Chrome Glaze'
  | 'Rose Gold Foil'
  | 'French Tip with Pearl'
  | 'Velvet Cat Eye'
  | 'Minimal Henna Accents'
  | 'Matte Burgundy Royalty';

export interface MehndiDesign {
  id: string;
  title: string;
  urduTitle: string;
  style: MehndiStyle;
  placement: 'Back of Hand' | 'Palm' | 'Feet' | 'Fingers & Nails';
  density: 'Minimal' | 'Medium' | 'Heavy Bridal';
  occasion: 'Eid Mubarak' | 'Bridal / Barat' | 'Mehndi / Mayun' | 'Everyday Chic';
  description: string;
  estimatedTime: string;
  svgPathData: string;
  patternType: string;
  motifs: string[];
}

export type EyeShape =
  | 'Almond'
  | 'Hooded'
  | 'Monolid'
  | 'Round'
  | 'Deep-set'
  | 'Downturned';

export type SkinTone =
  | 'Fair Ivory'
  | 'Warm Beige'
  | 'Golden Olive'
  | 'Caramel Wheatish'
  | 'Deep Bronze';

export interface LashStyle {
  id: string;
  name: string;
  suitedFor: EyeShape[];
  lengthMm: number;
  curl: 'C-Curl' | 'D-Curl' | 'J-Curl' | 'L-Curl';
  density: 'Wispy Natural' | 'Cat-Eye Flare' | 'Doll-Eye Center' | 'Russian Volume';
  description: string;
  urduDescription: string;
}

export interface MakeupLook {
  id: string;
  name: string;
  urduName: string;
  eyeshadowPalette: {
    base: string;
    crease: string;
    shimmer: string;
    outerV: string;
  };
  eyelinerStyle: string;
  lipstickShade: {
    name: string;
    colorHex: string;
    finish: 'Velvet Matte' | 'Dewy Satin' | 'Hydrating Tint';
  };
  blushShade: string;
  bestForOccasion: string;
}

export interface AcademyLesson {
  id: string;
  title: string;
  urduTitle: string;
  category: 'Makeup' | 'Skincare' | 'Hairstyling' | 'Mehndi';
  level: 'Beginner' | 'Intermediate' | 'Pro Bridal';
  durationMinutes: number;
  rating: number;
  enrolledCount: number;
  thumbnailGradient: string;
  description: string;
  urduDescription: string;
  instructor: string;
  steps: {
    stepNumber: number;
    title: string;
    urduTitle: string;
    details: string;
    proTip: string;
    culturalNote?: string;
  }[];
  keyProducts: string[];
}

export interface UserBeautyProfile {
  name: string;
  skinType: 'Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'Normal';
  skinTone: SkinTone;
  undertone: 'Warm Olive' | 'Golden' | 'Neutral' | 'Cool Rose';
  eyeShape: EyeShape;
  preferredLanguage: LanguageMode;
  savedDesigns: string[];
  completedLessonIds: string[];
}
