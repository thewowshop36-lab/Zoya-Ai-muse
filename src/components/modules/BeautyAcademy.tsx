import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Star, 
  Users, 
  BookOpen, 
  MessageSquareHeart, 
  ChevronRight, 
  ArrowLeft,
  Wand2,
  Bookmark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AcademyLesson, LanguageMode, ProductRecommendation } from '../../types';
import { ACADEMY_LESSONS } from '../../data/beautyKnowledge';

interface BeautyAcademyProps {
  language: LanguageMode;
  onAskZoyaAboutStep: (question: string) => void;
  onSaveProduct: (product: ProductRecommendation) => void;
  completedLessonIds: string[];
  onToggleLessonComplete: (lessonId: string) => void;
}

export const BeautyAcademy: React.FC<BeautyAcademyProps> = ({
  language,
  onAskZoyaAboutStep,
  onSaveProduct,
  completedLessonIds,
  onToggleLessonComplete
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [activeLesson, setActiveLesson] = useState<AcademyLesson | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [checkedSteps, setCheckedSteps] = useState<{ [key: number]: boolean }>({});

  const filteredLessons = ACADEMY_LESSONS.filter((lesson) => {
    const matchCat = selectedCategory === 'All' || lesson.category === selectedCategory;
    const matchLvl = selectedLevel === 'All' || lesson.level === selectedLevel;
    return matchCat && matchLvl;
  });

  const handleOpenLesson = (lesson: AcademyLesson) => {
    setActiveLesson(lesson);
    setCurrentStepIndex(0);
    setCheckedSteps({});
  };

  const handleToggleStep = (stepNumber: number) => {
    const updated = { ...checkedSteps, [stepNumber]: !checkedSteps[stepNumber] };
    setCheckedSteps(updated);

    if (activeLesson) {
      const allDone = activeLesson.steps.every(s => updated[s.stepNumber]);
      if (allDone) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E5A99B', '#D47E68', '#F7E7CE', '#7D325E']
        });
        if (!completedLessonIds.includes(activeLesson.id)) {
          onToggleLessonComplete(activeLesson.id);
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 pb-24 space-y-4">
      {/* Academy Header */}
      {!activeLesson ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-roseGold/20 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-roseGold-light">
                  {language === 'ur' ? 'پرسنلائزڈ بیوٹی اکیڈمی' : 'Personalized Beauty Academy'}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-roseGold/15 text-roseGold border border-roseGold/30 font-medium">
                  Curated Masterclasses
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {language === 'ur'
                  ? 'میک اپ، اسکن کیئر، ہیر اسٹائلنگ اور مہندی کے خصوصی کورسز اور مرحلہ وار گائیڈز'
                  : 'AI-curated video masterclasses and step-by-step guides tailored to your skill level'}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-roseGold">
              <BookOpen className="w-4 h-4" />
              <span>{completedLessonIds.length} Completed</span>
            </div>
          </div>

          {/* Filters: Category & Skill Level */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            {/* Category Tabs */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {['All', 'Makeup', 'Skincare', 'Mehndi'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-roseGold text-neutral-950 border-roseGold shadow-sm'
                      : 'bg-[#1C0916] text-neutral-400 border-roseGold/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Level Selector */}
            <div className="flex gap-1 bg-[#1C0916] p-1 rounded-xl border border-roseGold/20 text-[11px] self-start sm:self-auto">
              {['All', 'Beginner', 'Intermediate', 'Pro Bridal'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedLevel === lvl
                      ? 'bg-roseGold/20 text-roseGold font-bold border border-roseGold/40 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedLessonIds.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  onClick={() => handleOpenLesson(lesson)}
                  className="luxury-card rounded-2xl overflow-hidden border-roseGold/20 hover:border-roseGold/50 transition-all cursor-pointer group flex flex-col justify-between shadow-xl"
                >
                  {/* Lesson Banner / Visual */}
                  <div className={`h-28 bg-gradient-to-r ${lesson.thumbnailGradient} p-3.5 flex flex-col justify-between relative`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-roseGold-light border border-white/15 font-semibold">
                        {lesson.category} • {lesson.level}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/80 text-white font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-white/90 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Clock className="w-3 h-3 text-roseGold" /> {lesson.durationMinutes}m
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Star className="w-3 h-3 text-amber-300 fill-amber-300" /> {lesson.rating}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-3.5 h-3.5 text-roseGold ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 space-y-2">
                    <h3 className="font-serif font-bold text-sm text-roseGold-light group-hover:text-white transition-colors">
                      {language === 'ur' ? lesson.urduTitle : lesson.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {language === 'ur' ? lesson.urduDescription : lesson.description}
                    </p>

                    <div className="pt-2 border-t border-roseGold/10 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500">{lesson.steps.length} guided steps</span>
                      <span className="text-roseGold flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Start Lesson</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Lesson Detail & Interactive Step-by-Step Viewer */
        <div className="space-y-4">
          {/* Back button & Lesson header */}
          <div className="flex items-center justify-between pb-2 border-b border-roseGold/20">
            <button
              onClick={() => setActiveLesson(null)}
              className="flex items-center gap-1.5 text-xs text-roseGold hover:text-roseGold-light font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Academy Catalog</span>
            </button>
            <span className="text-xs text-neutral-400 font-mono">
              Step {currentStepIndex + 1} of {activeLesson.steps.length}
            </span>
          </div>

          <div className="luxury-card rounded-3xl p-4 sm:p-5 border-roseGold/25 shadow-2xl space-y-4">
            {/* Title & Badge */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-roseGold/20 text-roseGold border border-roseGold/30 font-semibold">
                  {activeLesson.category} • {activeLesson.level}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {activeLesson.durationMinutes} mins • {activeLesson.instructor}
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-roseGold-light">
                {language === 'ur' ? activeLesson.urduTitle : activeLesson.title}
              </h2>
            </div>

            {/* Step Progress Dots */}
            <div className="flex items-center gap-1.5">
              {activeLesson.steps.map((step, sIdx) => {
                const isChecked = checkedSteps[step.stepNumber];
                const isCurrent = currentStepIndex === sIdx;
                return (
                  <button
                    key={sIdx}
                    onClick={() => setCurrentStepIndex(sIdx)}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      isChecked
                        ? 'bg-emerald-500'
                        : isCurrent
                        ? 'bg-roseGold shadow-md ring-2 ring-roseGold/40'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    title={`Step ${step.stepNumber}: ${step.title}`}
                  />
                );
              })}
            </div>

            {/* Active Step Card */}
            {activeLesson.steps[currentStepIndex] && (() => {
              const step = activeLesson.steps[currentStepIndex];
              const isChecked = checkedSteps[step.stepNumber];
              return (
                <div className="bg-[#1C0916] rounded-2xl p-4 sm:p-5 border border-roseGold/25 space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-roseGold/20 border border-roseGold text-roseGold font-serif font-bold text-xs flex items-center justify-center">
                        {step.stepNumber}
                      </span>
                      <h3 className="font-serif font-bold text-base text-white">
                        {language === 'ur' ? step.urduTitle : step.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleToggleStep(step.stepNumber)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isChecked
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white/10 hover:bg-white/20 text-neutral-300'
                      }`}
                    >
                      {isChecked ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Circle className="w-4 h-4" />}
                      <span>{isChecked ? 'Step Completed' : 'Mark Done'}</span>
                    </button>
                  </div>

                  {/* Step Detailed Directions */}
                  <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                    {step.details}
                  </p>

                  {/* Pro Tip Callout */}
                  <div className="bg-[#290E20] border-l-4 border-roseGold p-3 rounded-r-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-roseGold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Zoya AI Pro Tip:</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-snug">
                      {step.proTip}
                    </p>
                  </div>

                  {/* Cultural Wisdom Note (if present) */}
                  {step.culturalNote && (
                    <div className="bg-[#24131B] border-l-4 border-amber-500/80 p-3 rounded-r-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-amber-300">
                        <span>Heritage & Cultural Wisdom:</span>
                      </div>
                      <p className="text-xs text-amber-100/90 leading-snug">
                        {step.culturalNote}
                      </p>
                    </div>
                  )}

                  {/* Action row: Step navigation & Ask Zoya AI */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-roseGold/15">
                    <button
                      onClick={() => onAskZoyaAboutStep(`Help me with step "${step.title}" from lesson "${activeLesson.title}". How can I perfect this technique?`)}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-roseGold/15 hover:bg-roseGold/25 text-roseGold-light border border-roseGold/30 text-xs font-semibold transition-all"
                    >
                      <MessageSquareHeart className="w-3.5 h-3.5 text-roseGold" />
                      <span>Ask Zoya AI about this step</span>
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        disabled={currentStepIndex === 0}
                        onClick={() => setCurrentStepIndex(i => i - 1)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl border border-white/10 text-xs text-neutral-300 hover:text-white disabled:opacity-30"
                      >
                        Previous
                      </button>
                      <button
                        disabled={currentStepIndex === activeLesson.steps.length - 1}
                        onClick={() => setCurrentStepIndex(i => i + 1)}
                        className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-roseGold text-neutral-950 text-xs font-bold hover:brightness-110 disabled:opacity-30"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Key Products Recommended in this Lesson */}
            <div className="pt-2">
              <span className="text-xs font-serif font-bold text-roseGold-light block mb-2">
                Masterclass Product Kit:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeLesson.keyProducts.map((prod, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-roseGold/10 border border-roseGold/25 text-roseGold-light"
                  >
                    ✦ {prod}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
