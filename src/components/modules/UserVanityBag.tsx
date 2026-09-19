import React from 'react';
import { 
  Heart, 
  Sparkles, 
  Bookmark, 
  Trash2, 
  User, 
  CheckCircle2, 
  Hand, 
  Eye, 
  ShieldCheck, 
  Sliders,
  Share2
} from 'lucide-react';
import { UserBeautyProfile, ProductRecommendation, MehndiDesign, EyeShape, SkinTone, LanguageMode } from '../../types';
import { MEHNDI_DESIGNS } from '../../data/beautyKnowledge';

interface UserVanityBagProps {
  userProfile: UserBeautyProfile;
  onUpdateProfile: (updated: Partial<UserBeautyProfile>) => void;
  savedProducts: ProductRecommendation[];
  onRemoveProduct: (index: number) => void;
  onNavigateToTab: (tab: string) => void;
  language: LanguageMode;
}

export const UserVanityBag: React.FC<UserVanityBagProps> = ({
  userProfile,
  onUpdateProfile,
  savedProducts,
  onRemoveProduct,
  onNavigateToTab,
  language
}) => {
  const savedMehndi = MEHNDI_DESIGNS.filter(d => userProfile.savedDesigns.includes(d.id));

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 pb-24 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-roseGold/20 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-roseGold-light">
              {language === 'ur' ? 'آپ کا ذاتی وینٹی بکس و پروفائل' : 'My Vanity Bag & Beauty Profile'}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-roseGold/15 text-roseGold border border-roseGold/30 font-medium">
              Curated Wishlist
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            {language === 'ur'
              ? 'آپ کے محفوظ کردہ مہندی ڈیزائن، میک اپ پروڈکٹس اور بیوٹی پروفائل سیٹنگز'
              : 'Your personalized skin specifications, saved Mehndi designs, and beauty wishlist'}
          </p>
        </div>
      </div>

      {/* Beauty Profile Card */}
      <div className="luxury-card rounded-3xl p-4 sm:p-5 border-roseGold/25 shadow-2xl space-y-3.5">
        <div className="flex items-center justify-between border-b border-roseGold/15 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-plum-royal to-roseGold flex items-center justify-center text-neutral-950 font-serif font-bold text-base shadow">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-white">{userProfile.name}</h3>
              <p className="text-[11px] text-roseGold/80">AI Personalized Beauty Matrix</p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3 h-3" /> Profile Synced
          </span>
        </div>

        {/* Profile Attributes Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          {/* Skin Type */}
          <div className="bg-[#1C0916] p-2.5 rounded-xl border border-roseGold/15">
            <label className="text-[10px] text-neutral-400 block mb-1">Skin Type:</label>
            <select
              value={userProfile.skinType}
              onChange={(e) => onUpdateProfile({ skinType: e.target.value as any })}
              className="w-full bg-transparent text-roseGold font-semibold text-xs focus:outline-none"
            >
              <option value="Oily" className="bg-[#1C0916]">Oily (Sebum prone)</option>
              <option value="Dry" className="bg-[#1C0916]">Dry (Flaky)</option>
              <option value="Combination" className="bg-[#1C0916]">Combination (T-Zone)</option>
              <option value="Sensitive" className="bg-[#1C0916]">Sensitive</option>
              <option value="Normal" className="bg-[#1C0916]">Normal Balanced</option>
            </select>
          </div>

          {/* Skin Tone */}
          <div className="bg-[#1C0916] p-2.5 rounded-xl border border-roseGold/15">
            <label className="text-[10px] text-neutral-400 block mb-1">Skin Tone:</label>
            <select
              value={userProfile.skinTone}
              onChange={(e) => onUpdateProfile({ skinTone: e.target.value as any })}
              className="w-full bg-transparent text-roseGold font-semibold text-xs focus:outline-none"
            >
              <option value="Fair Ivory" className="bg-[#1C0916]">Fair Ivory</option>
              <option value="Warm Beige" className="bg-[#1C0916]">Warm Beige</option>
              <option value="Golden Olive" className="bg-[#1C0916]">Golden Olive</option>
              <option value="Caramel Wheatish" className="bg-[#1C0916]">Caramel Wheatish</option>
              <option value="Deep Bronze" className="bg-[#1C0916]">Deep Bronze</option>
            </select>
          </div>

          {/* Undertone */}
          <div className="bg-[#1C0916] p-2.5 rounded-xl border border-roseGold/15">
            <label className="text-[10px] text-neutral-400 block mb-1">Undertone:</label>
            <select
              value={userProfile.undertone}
              onChange={(e) => onUpdateProfile({ undertone: e.target.value as any })}
              className="w-full bg-transparent text-roseGold font-semibold text-xs focus:outline-none"
            >
              <option value="Warm Olive" className="bg-[#1C0916]">Warm Olive (Desi base)</option>
              <option value="Golden" className="bg-[#1C0916]">Golden Yellow</option>
              <option value="Neutral" className="bg-[#1C0916]">Neutral Balanced</option>
              <option value="Cool Rose" className="bg-[#1C0916]">Cool Rose</option>
            </select>
          </div>

          {/* Eye Shape */}
          <div className="bg-[#1C0916] p-2.5 rounded-xl border border-roseGold/15">
            <label className="text-[10px] text-neutral-400 block mb-1">Eye Shape:</label>
            <select
              value={userProfile.eyeShape}
              onChange={(e) => onUpdateProfile({ eyeShape: e.target.value as any })}
              className="w-full bg-transparent text-roseGold font-semibold text-xs focus:outline-none"
            >
              <option value="Almond" className="bg-[#1C0916]">Almond (Lifted)</option>
              <option value="Hooded" className="bg-[#1C0916]">Hooded (Folded lid)</option>
              <option value="Monolid" className="bg-[#1C0916]">Monolid (Smooth)</option>
              <option value="Round" className="bg-[#1C0916]">Round (Large)</option>
              <option value="Deep-set" className="bg-[#1C0916]">Deep-set</option>
              <option value="Downturned" className="bg-[#1C0916]">Downturned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Culturally Sensitive & Halal Beauty Guide Pill */}
      <div className="bg-gradient-to-r from-[#2B101E] to-[#1F0A17] rounded-2xl p-3.5 border border-roseGold/25 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-roseGold/15 border border-roseGold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-roseGold" />
        </div>
        <div className="space-y-1 text-xs">
          <h4 className="font-serif font-bold text-roseGold-light">
            Cultural Sensitivity & Halal Cosmetics Philosophy
          </h4>
          <p className="text-neutral-300 leading-relaxed text-[11px]">
            Zoya AI prioritizes <strong>water-permeable (Wudu-friendly) breathable nail polishes</strong>, 100% natural lawsonia inermis (organic henna) without chemical PPD dyes, alcohol-free toner mists, and undertone pigments calibrated specifically for South Asian, Middle Eastern, and multi-ethnic complexions.
          </p>
        </div>
      </div>

      {/* Saved Mehndi Designs Section */}
      <div className="luxury-card rounded-2xl p-3.5 border-roseGold/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-roseGold-light">
            <Hand className="w-4 h-4 text-roseGold" />
            <span>Saved Mehndi & Nail Looks ({savedMehndi.length})</span>
          </div>
          <button
            onClick={() => onNavigateToTab('mehndi')}
            className="text-[11px] text-roseGold hover:underline"
          >
            Open AR Studio →
          </button>
        </div>

        {savedMehndi.length === 0 ? (
          <div className="text-center py-6 text-neutral-500 text-xs">
            <Hand className="w-8 h-8 mx-auto mb-1.5 opacity-30 text-roseGold" />
            <span>No Mehndi designs saved yet. Visit the Mehndi Studio to generate and save designs!</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {savedMehndi.map((des) => (
              <div
                key={des.id}
                className="bg-[#1C0916] rounded-xl p-3 border border-roseGold/20 flex items-center justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-roseGold-light">{des.title}</h5>
                  <p className="text-[10px] text-neutral-400">{des.style} • {des.density}</p>
                </div>
                <button
                  onClick={() => onNavigateToTab('mehndi')}
                  className="px-2.5 py-1 rounded-lg bg-roseGold/15 hover:bg-roseGold/25 text-roseGold text-xs font-medium transition-all"
                >
                  Try in AR
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved Products Wishlist */}
      <div className="luxury-card rounded-2xl p-3.5 border-roseGold/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-roseGold-light">
            <Heart className="w-4 h-4 text-roseGold" />
            <span>Curated Vanity Bag Products ({savedProducts.length})</span>
          </div>
        </div>

        {savedProducts.length === 0 ? (
          <div className="text-center py-6 text-neutral-500 text-xs">
            <Heart className="w-8 h-8 mx-auto mb-1.5 opacity-30 text-roseGold" />
            <span>No products saved yet. Ask Zoya Bot for recommendations to populate your vanity!</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {savedProducts.map((prod, idx) => (
              <div
                key={idx}
                className="bg-[#1C0916] rounded-xl p-3 border border-roseGold/20 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-white">{prod.name}</span>
                    <button
                      onClick={() => onRemoveProduct(idx)}
                      className="text-neutral-500 hover:text-red-400 transition-colors"
                      title="Remove from vanity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[10px] text-roseGold">
                    {prod.brand} • <span className="text-neutral-300">{prod.shade}</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-snug">
                    {prod.whySuited}
                  </p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-roseGold/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>{prod.priceEst}</span>
                  <span className="text-roseGold">{prod.undertoneMatch}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
