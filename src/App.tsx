import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { VirtualBeautyBot } from './components/modules/VirtualBeautyBot';
import { MehndiNailDesigner } from './components/modules/MehndiNailDesigner';
import { MakeupLashAdvisor } from './components/modules/MakeupLashAdvisor';
import { BeautyAcademy } from './components/modules/BeautyAcademy';
import { UserVanityBag } from './components/modules/UserVanityBag';
import { ArchitecturalBlueprintModal } from './components/modules/ArchitecturalBlueprintModal';
import { LanguageMode, UserBeautyProfile, ProductRecommendation, MehndiDesign, MakeupLook } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('bot');
  const [language, setLanguage] = useState<LanguageMode>('en');
  const [isBlueprintOpen, setIsBlueprintOpen] = useState<boolean>(false);

  // User Profile State (persisted in localStorage)
  const [userProfile, setUserProfile] = useState<UserBeautyProfile>(() => {
    const saved = localStorage.getItem('zoya_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: 'Ayla Noor',
      skinType: 'Combination',
      skinTone: 'Golden Olive',
      undertone: 'Warm Olive',
      eyeShape: 'Almond',
      preferredLanguage: 'en',
      savedDesigns: ['m-arabic-01'],
      completedLessonIds: ['acad-01']
    };
  });

  // Saved Products State (persisted in localStorage)
  const [savedProducts, setSavedProducts] = useState<ProductRecommendation[]>(() => {
    const saved = localStorage.getItem('zoya_saved_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        name: 'Rose Gold Hydration Mist',
        brand: 'Zoya Atelier',
        category: 'Prep & Set',
        shade: 'Rose Quartz Dew',
        priceEst: '₨ 1,200',
        whySuited: 'Alcohol-free formula locks bridal base without causing oxidation or shine.',
        undertoneMatch: 'Universal Warm'
      },
      {
        name: 'Sultana Velvet Matte Liquid Lip',
        brand: 'Zoya Atelier',
        category: 'Lips',
        shade: 'Kashmiri Chai Nude',
        priceEst: '₨ 1,850',
        whySuited: 'Formulated with muted terracotta undertones preventing ashy appearance on olive skin.',
        undertoneMatch: 'Warm Olive & Golden'
      }
    ];
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('zoya_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('zoya_saved_products', JSON.stringify(savedProducts));
  }, [savedProducts]);

  const handleUpdateProfile = (updated: Partial<UserBeautyProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updated }));
  };

  const handleSaveProduct = (product: ProductRecommendation) => {
    setSavedProducts(prev => {
      // Avoid exact duplicate
      if (prev.some(p => p.name === product.name && p.shade === product.shade)) {
        return prev;
      }
      return [product, ...prev];
    });
  };

  const handleRemoveProduct = (index: number) => {
    setSavedProducts(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveMehndiDesign = (design: MehndiDesign) => {
    setUserProfile(prev => {
      if (prev.savedDesigns.includes(design.id)) {
        return { ...prev, savedDesigns: prev.savedDesigns.filter(id => id !== design.id) };
      }
      return { ...prev, savedDesigns: [...prev.savedDesigns, design.id] };
    });
  };

  const handleSaveLook = (look: MakeupLook) => {
    // Also save lipstick product to vanity
    handleSaveProduct({
      name: `${look.name} Lip Choice`,
      brand: 'Zoya Atelier',
      category: 'Lips',
      shade: look.lipstickShade.name,
      priceEst: '₨ 1,950',
      whySuited: `Curated specifically for ${userProfile.undertone} complexions with ${look.bestForOccasion} styling.`,
      undertoneMatch: userProfile.undertone
    });
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    setUserProfile(prev => {
      const exists = prev.completedLessonIds.includes(lessonId);
      const updated = exists 
        ? prev.completedLessonIds.filter(id => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];
      return { ...prev, completedLessonIds: updated };
    });
  };

  const handleAskZoyaAboutStep = (question: string) => {
    setCurrentTab('bot');
  };

  return (
    <div className={`min-h-screen bg-[#14060E] text-neutral-100 flex flex-col font-sans ${
      language === 'ur' ? 'font-urdu' : ''
    }`}>
      {/* Navigation Header & Bottom Tabs */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onToggleLanguage={(l) => {
          setLanguage(l);
          handleUpdateProfile({ preferredLanguage: l });
        }}
        onOpenBlueprint={() => setIsBlueprintOpen(true)}
        savedCount={savedProducts.length + userProfile.savedDesigns.length}
      />

      {/* Main Module Content */}
      <main className="flex-1 overflow-x-hidden">
        {currentTab === 'bot' && (
          <VirtualBeautyBot
            language={language}
            userProfile={userProfile}
            onSaveProduct={handleSaveProduct}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'mehndi' && (
          <MehndiNailDesigner
            language={language}
            onSaveDesign={handleSaveMehndiDesign}
            savedDesignIds={userProfile.savedDesigns}
          />
        )}

        {currentTab === 'makeup' && (
          <MakeupLashAdvisor
            language={language}
            onSaveProduct={handleSaveProduct}
            onSaveLook={handleSaveLook}
            userSkinTone={userProfile.skinTone}
            initialEyeShape={userProfile.eyeShape}
          />
        )}

        {currentTab === 'academy' && (
          <BeautyAcademy
            language={language}
            onAskZoyaAboutStep={handleAskZoyaAboutStep}
            onSaveProduct={handleSaveProduct}
            completedLessonIds={userProfile.completedLessonIds}
            onToggleLessonComplete={handleToggleLessonComplete}
          />
        )}

        {currentTab === 'vanity' && (
          <UserVanityBag
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            savedProducts={savedProducts}
            onRemoveProduct={handleRemoveProduct}
            onNavigateToTab={setCurrentTab}
            language={language}
          />
        )}
      </main>

      {/* Architectural Blueprint & Concept Modal */}
      <ArchitecturalBlueprintModal
        isOpen={isBlueprintOpen}
        onClose={() => setIsBlueprintOpen(false)}
      />
    </div>
  );
}

export default App;
