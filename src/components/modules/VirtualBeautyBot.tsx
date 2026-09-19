import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Languages, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Bookmark, 
  RefreshCw, 
  Wand2,
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';
import { ChatMessage, LanguageMode, ProductRecommendation, UserBeautyProfile } from '../../types';
import { askZoyaAI } from '../../services/geminiService';

interface VirtualBeautyBotProps {
  language: LanguageMode;
  userProfile: UserBeautyProfile;
  onSaveProduct: (product: ProductRecommendation) => void;
  onNavigateToTab: (tab: string) => void;
}

export const VirtualBeautyBot: React.FC<VirtualBeautyBotProps> = ({
  language,
  userProfile,
  onSaveProduct,
  onNavigateToTab
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'zoya',
      text: "Salam beautiful! ✨ I am Zoya, your 24/7 AI Beauty Muse. I'm here to curate your dream makeup looks, design bespoke Mehndi patterns, analyze your eye shape for lashes, and troubleshoot any skin or hair concern. Ask me anything in English or Urdu!",
      urduText: "السلام علیکم پیاری بہن! ✨ میں ہوں زویا، آپ کی ذاتی بیوٹی مشیر۔ آپ کے سکن ٹون کے مطابق فاؤنڈیشن، برائیڈل میک اپ، عید مہندی کے نقش اور پلکوں کے انتخاب پر فوری رہنمائی حاضر ہے۔ اردو یا انگریزی میں جو چاہیں پوچھیں!",
      timestamp: 'Just now',
      category: 'bridal',
      suggestedActions: [
        'How to get dark mahogany henna stain? 🌿',
        'Foundation turns grey on my olive skin 💄',
        'Best false lashes for hooded eyes 👁️',
        'اردو میں برائیڈل سکن کیئر گائیڈ 🌸'
      ],
      productPicks: [
        {
          name: 'Rose Gold Hydration Mist',
          brand: 'Zoya Atelier',
          category: 'Prep & Set',
          shade: 'Rose Quartz Dew',
          priceEst: '₨ 1,200',
          whySuited: 'Zero alcohol, infused with Kashmiri rose water to lock foundation without melting in humidity.',
          undertoneMatch: 'Universal'
        }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeUrduView, setActiveUrduView] = useState(language === 'ur');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveUrduView(language === 'ur');
  }, [language]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const botResponse = await askZoyaAI(
        query,
        language,
        {
          skinType: userProfile.skinType,
          undertone: userProfile.undertone,
          eyeShape: userProfile.eyeShape
        }
      );

      const zoyaMsg: ChatMessage = {
        id: 'zoya-' + Date.now(),
        sender: 'zoya',
        text: botResponse.englishText,
        urduText: botResponse.urduText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: botResponse.category,
        suggestedActions: botResponse.suggestedActions,
        productPicks: botResponse.productPicks
      };

      setMessages(prev => [...prev, zoyaMsg]);

      // If speech mode is enabled, speak using Web Speech API
      if (speechActive && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
          activeUrduView && botResponse.urduText ? botResponse.urduText : botResponse.englishText.slice(0, 200)
        );
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] max-w-4xl mx-auto px-3 sm:px-4 py-2">
      {/* Bot Header Ribbon */}
      <div className="luxury-card rounded-2xl p-3 mb-2 flex items-center justify-between border-roseGold/20">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-plum-royal to-roseGold flex items-center justify-center text-neutral-950 font-serif font-bold text-base shadow-md">
              Z
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1A0A14] ring-1 ring-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-roseGold-light font-bold text-sm tracking-wide">
                Zoya Beauty Assistant
              </h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-roseGold/20 text-roseGold border border-roseGold/30">
                Active 24/7
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 flex items-center gap-1">
              <span>Profile:</span>
              <span className="text-roseGold-light font-medium">{userProfile.skinType}</span> •
              <span className="text-roseGold-light font-medium">{userProfile.undertone}</span> •
              <span className="text-roseGold-light font-medium">{userProfile.eyeShape} Eyes</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveUrduView(!activeUrduView)}
            className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1 border transition-all ${
              activeUrduView
                ? 'bg-roseGold/20 border-roseGold text-roseGold font-bold font-urdu'
                : 'border-white/10 text-neutral-400 hover:text-white'
            }`}
            title="Toggle Urdu Nastaliq view"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="font-urdu text-[11px]">اردو</span>
          </button>

          <button
            onClick={() => {
              if (speechActive && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              setSpeechActive(!speechActive);
            }}
            className={`p-1.5 rounded-full border transition-all ${
              speechActive
                ? 'bg-roseGold text-neutral-950 border-roseGold'
                : 'border-white/10 text-neutral-400 hover:text-white'
            }`}
            title={speechActive ? 'Voice narration active' : 'Turn voice narration on'}
          >
            {speechActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 pb-2">
        {messages.map((msg) => {
          const isZoya = msg.sender === 'zoya';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isZoya ? 'justify-start' : 'justify-end'}`}
            >
              {isZoya && (
                <div className="w-7 h-7 rounded-full bg-plum-royal border border-roseGold/40 flex-shrink-0 flex items-center justify-center mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4 text-roseGold" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 ${
                isZoya
                  ? 'luxury-card border-roseGold/25 text-neutral-100 shadow-lg'
                  : 'bg-gradient-to-r from-roseGold-dark to-zoya-600 text-white shadow-md'
              }`}>
                {/* Header row for Zoya */}
                {isZoya && (
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-roseGold/10">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-roseGold animate-pulse" />
                      <span className="text-[11px] font-serif tracking-wider text-roseGold font-semibold uppercase">
                        Zoya AI Advice
                      </span>
                      {msg.category && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-roseGold/15 text-roseGold-light capitalize">
                          {msg.category}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => copyToClipboard(activeUrduView && msg.urduText ? msg.urduText : msg.text, msg.id)}
                      className="text-neutral-400 hover:text-roseGold transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                {/* Body Text: Bilingual Support */}
                <div className="space-y-2">
                  {/* If user prefers Urdu or clicked toggle */}
                  {activeUrduView && msg.urduText ? (
                    <div className="font-urdu text-right text-roseGold-light text-sm leading-relaxed whitespace-pre-line dir-rtl">
                      {msg.urduText}
                    </div>
                  ) : (
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-neutral-100 font-sans">
                      {msg.text}
                    </div>
                  )}

                  {/* Secondary toggle inside message if Urdu is available */}
                  {isZoya && msg.urduText && (
                    <button
                      onClick={() => setActiveUrduView(!activeUrduView)}
                      className="text-[10px] text-roseGold/70 hover:text-roseGold underline flex items-center gap-1 pt-1"
                    >
                      <Languages className="w-2.5 h-2.5" />
                      <span>{activeUrduView ? 'Switch to English View' : 'اردو میں پڑھیں (Read in Urdu)'}</span>
                    </button>
                  )}
                </div>

                {/* Product Recommendation Cards inside AI Response */}
                {msg.productPicks && msg.productPicks.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-roseGold/15 space-y-2">
                    <div className="text-[11px] text-roseGold-light font-serif font-semibold flex items-center gap-1">
                      <Wand2 className="w-3 h-3 text-roseGold" />
                      <span>Curated Formula & Undertone Match:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.productPicks.map((prod, pidx) => (
                        <div
                          key={pidx}
                          className="bg-[#1C0916] rounded-xl p-2.5 border border-roseGold/20 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between">
                              <span className="text-xs font-semibold text-roseGold-light">
                                {prod.name}
                              </span>
                              <span className="text-[10px] text-neutral-400 font-mono">
                                {prod.priceEst}
                              </span>
                            </div>
                            <div className="text-[10px] text-roseGold/80 mt-0.5">
                              {prod.brand} • <span className="text-neutral-300">{prod.shade}</span>
                            </div>
                            <p className="text-[10px] text-neutral-300 mt-1 leading-snug">
                              {prod.whySuited}
                            </p>
                          </div>
                          <button
                            onClick={() => onSaveProduct(prod)}
                            className="mt-2 text-[10px] flex items-center justify-center gap-1 py-1 rounded bg-roseGold/15 hover:bg-roseGold/25 text-roseGold-light border border-roseGold/30 transition-all font-medium"
                          >
                            <Bookmark className="w-3 h-3" />
                            <span>Save to Vanity</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((action, aidx) => (
                      <button
                        key={aidx}
                        onClick={() => handleSendMessage(action)}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-roseGold/10 hover:bg-roseGold/20 border border-roseGold/25 text-roseGold-light transition-all flex items-center gap-1"
                      >
                        <span>{action}</span>
                        <ChevronRight className="w-2.5 h-2.5 text-roseGold/60" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-[9px] text-neutral-500 mt-1.5 text-right font-mono">
                  {msg.timestamp}
                </div>
              </div>

              {!isZoya && (
                <div className="w-7 h-7 rounded-full bg-roseGold-dark border border-white/20 flex-shrink-0 flex items-center justify-center mt-0.5 shadow-sm">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2.5 items-center text-neutral-400 text-xs py-2 pl-2">
            <div className="w-7 h-7 rounded-full bg-plum-royal border border-roseGold/40 flex items-center justify-center animate-spin">
              <Sparkles className="w-3.5 h-3.5 text-roseGold" />
            </div>
            <span className="text-roseGold-light font-serif tracking-wide">
              {activeUrduView ? 'زویا آپ کے لیے بیوٹی مشورہ تیار کر رہی ہیں...' : 'Zoya is consulting her beauty intelligence...'}
            </span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { label: '🌿 Dark Henna Secret', prompt: 'How do I make my mehndi stain dark mahogany red?' },
          { label: '💄 Fix Grey Foundation', prompt: 'Why does foundation turn grey or ashy on olive skin and how to fix it?' },
          { label: '👁️ Hooded Eyes Eyeliner', prompt: 'What is the best eyeliner and lash style for hooded eyes?' },
          { label: '✨ Glass Skin Routine', prompt: 'Recommend a morning and evening skincare routine for glowing skin.' },
          { label: '🌸 اردو میں برائیڈل ٹپس', prompt: 'براہ کرم مجھے برائیڈل میک اپ اور اسکن کیئر کی تفصیلی اردو رہنمائی دیں' }
        ].map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip.prompt)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] bg-[#230C1C] hover:bg-[#341229] border border-roseGold/20 text-roseGold-light/90 transition-all font-medium flex-shrink-0"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Field Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="luxury-card rounded-2xl p-1.5 sm:p-2 border-roseGold/30 flex items-center gap-2 shadow-2xl"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={
            activeUrduView
              ? 'زویا سے میک اپ، مہندی، پلکوں یا اسکن کیئر پر کوئی بھی سوال پوچھیں...'
              : 'Ask Zoya about makeup, mehndi, lashes, skin undertones, or bridal prep...'
          }
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-roseGold to-zoya-500 text-neutral-950 font-semibold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
