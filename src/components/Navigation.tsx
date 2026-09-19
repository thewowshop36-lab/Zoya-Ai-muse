import React from 'react';
import { 
  Sparkles, 
  MessageSquareHeart, 
  Hand, 
  Eye, 
  GraduationCap, 
  Heart, 
  FileCode2, 
  Globe2,
  SlidersHorizontal
} from 'lucide-react';
import { LanguageMode } from '../types';

interface NavigationProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: LanguageMode;
  onToggleLanguage: (lang: LanguageMode) => void;
  onOpenBlueprint: () => void;
  savedCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  onOpenBlueprint,
  savedCount
}) => {
  const tabs = [
    {
      id: 'bot',
      label: language === 'ur' ? 'زویا بوٹ' : 'AI Muse',
      sublabel: language === 'ur' ? 'مشیر' : 'Beauty Bot',
      icon: MessageSquareHeart
    },
    {
      id: 'mehndi',
      label: language === 'ur' ? 'مہندی و ناخن' : 'Mehndi & Nails',
      sublabel: language === 'ur' ? 'ڈیزائنر' : 'AR Studio',
      icon: Hand
    },
    {
      id: 'makeup',
      label: language === 'ur' ? 'میک اپ و پلکیں' : 'Makeup & Lashes',
      sublabel: language === 'ur' ? 'آئی ایڈوائزر' : 'Face Scan',
      icon: Eye
    },
    {
      id: 'academy',
      label: language === 'ur' ? 'اکیڈمی' : 'Academy',
      sublabel: language === 'ur' ? 'کورسز' : 'Tutorials',
      icon: GraduationCap
    },
    {
      id: 'vanity',
      label: language === 'ur' ? 'وینٹی بکس' : 'Vanity',
      sublabel: language === 'ur' ? 'محفوظات' : 'My Profile',
      icon: Heart,
      badge: savedCount > 0 ? savedCount : undefined
    }
  ];

  return (
    <>
      {/* Top Luxury App Bar */}
      <header className="sticky top-0 z-40 luxury-glass border-b border-roseGold/20 px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-plum-dark via-roseGold-dark to-roseGold p-[1px] shadow-lg shadow-roseGold/10">
              <div className="w-full h-full rounded-full bg-[#200A18] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-roseGold animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-serif tracking-widest text-lg font-bold text-roseGold-light uppercase">
                  Zoya
                </h1>
                <span className="text-[10px] font-sans uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-roseGold/15 text-roseGold border border-roseGold/30">
                  AI Muse
                </span>
              </div>
              <p className="text-[10px] text-roseGold/70 font-sans tracking-wide">
                {language === 'ur' ? 'آپ کی ذاتی بیوٹی مشیر و تخلیقی اسٹوڈیو' : '24/7 Personal Beauty Mentor & AR Studio'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector Pill */}
            <div className="flex items-center bg-[#290F20] border border-roseGold/25 rounded-full p-0.5 text-xs">
              <button
                onClick={() => onToggleLanguage('en')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-roseGold to-zoya-500 text-neutral-950 shadow-sm'
                    : 'text-roseGold/70 hover:text-roseGold-light'
                }`}
                title="English mode"
              >
                EN
              </button>
              <button
                onClick={() => onToggleLanguage('ur')}
                className={`px-2.5 py-1 rounded-full font-urdu text-[11px] transition-all ${
                  language === 'ur'
                    ? 'bg-gradient-to-r from-roseGold to-zoya-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-roseGold/70 hover:text-roseGold-light'
                }`}
                title="اردو میں موڈ تبدیل کریں"
              >
                اردو
              </button>
            </div>

            {/* Blueprint & Architecture Documentation Button */}
            <button
              onClick={onOpenBlueprint}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-roseGold/10 hover:bg-roseGold/20 border border-roseGold/30 text-roseGold-light text-xs transition-colors"
              title="View Architectural Blueprint & System Concept"
            >
              <FileCode2 className="w-3.5 h-3.5 text-roseGold" />
              <span className="hidden sm:inline text-[11px] font-medium tracking-wide">
                Blueprint
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Luxury Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 luxury-glass border-t border-roseGold/20 py-1.5 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-roseGold-light bg-roseGold/15 shadow-inner'
                    : 'text-neutral-400 hover:text-roseGold/80'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-110 text-roseGold' : 'scale-100'
                    }`}
                  />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-roseGold text-neutral-950 font-bold text-[9px] flex items-center justify-center shadow-md">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] tracking-tight mt-1 truncate max-w-full font-medium ${
                  isActive ? 'text-roseGold-light font-semibold' : ''
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-roseGold mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
