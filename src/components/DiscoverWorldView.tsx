import React, { useState } from 'react';
import {
  Globe,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  MapPin,
  Compass,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { DISCOVER_WORLD_TRIVIA, WorldTrivia } from '../data/schoolActivitiesData';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

export const DiscoverWorldView: React.FC = () => {
  const { setActiveScreen, addStars, triggerCelebration, useEasternNumerals } = useMathApp();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const allTrivia = DISCOVER_WORLD_TRIVIA;
  const filteredTrivia = allTrivia.filter((t) => {
    if (filterCategory === 'all') return true;
    return t.category === filterCategory;
  });

  const currentQ: WorldTrivia = filteredTrivia[currentIndex % filteredTrivia.length];

  const handleChooseOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted || !currentQ) return;
    const isCorrect = selectedOption === currentQ.correctIndex;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      sound.playCorrect();
      addStars(5, 'سؤال ثقافة العالم وعُمان');
      triggerCelebration();
    } else {
      sound.playWrong();
    }
  };

  const handleRetry = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentIndex((p) => (p + 1) % filteredTrivia.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveScreen('school-world')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 text-sm shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لعالمي المدرسي</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-sky-800 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-200">
          <Globe className="w-4 h-4 text-sky-600" />
          <span>اكتشفي العالم ومعالم عُمان 🌍</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🇴🇲
            </span>
            <h2 className="text-2xl font-black font-cairo">اكتشفي العالم ومعالم عُمان</h2>
          </div>
          <p className="text-sky-100 text-xs sm:text-sm">
            رحلة معرفية شيقة في تاريخ وتراث سلطنة عُمان، عجائب الطبيعة، الفضاء واللغة العربية!
          </p>
        </div>

        <div className="text-xs bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center font-bold">
          <span>سفيرة المعرفة والثقافة 🌟</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: 'جميع الأسئلة 🌐' },
          { id: 'oman', label: 'معالم وتراث عُمان 🇴🇲' },
          { id: 'science', label: 'العلوم والفضاء 🚀' },
          { id: 'arabic', label: 'روائع لغتنا العربية 📖' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sound.playClick();
              setFilterCategory(cat.id);
              setCurrentIndex(0);
              setSelectedOption(null);
              setIsAnswerSubmitted(false);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterCategory === cat.id
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Question Card */}
      {currentQ && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-md space-y-6 text-right">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-xl">
              {currentQ.category === 'oman' ? 'سلطنة عُمان 🇴🇲' : currentQ.category === 'science' ? 'علوم وفضاء 🚀' : 'لغة عربية 📖'}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              السؤال {formatNum((currentIndex % filteredTrivia.length) + 1, useEasternNumerals)} من {formatNum(filteredTrivia.length, useEasternNumerals)}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-cairo leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let style = 'bg-slate-50 hover:bg-sky-50/70 border-slate-200 text-slate-800 cursor-pointer';

              if (isSelected && !isAnswerSubmitted) {
                style = 'bg-sky-100 border-sky-500 text-sky-950 font-black ring-2 ring-sky-300 shadow-sm scale-[1.01]';
              }

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctIndex) {
                  style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300';
                } else if (isSelected) {
                  style = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
                } else {
                  style = 'bg-slate-50 text-slate-400 opacity-60 border-slate-200';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswerSubmitted}
                  onClick={() => handleChooseOption(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 font-bold text-right transition-all flex items-center justify-between text-base select-none cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'border-sky-600 bg-sky-600' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <span>{opt}</span>
                  </div>
                  <span className="w-8 h-8 rounded-xl bg-white/80 shadow-2xs flex items-center justify-center text-xs text-slate-600 font-black shrink-0">
                    {['أ', 'ب', 'ج', 'د'][idx]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            {!isAnswerSubmitted ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-200">
                  🌍 حددي إجابتكِ ثم انقري تأكيد الإجابة
                </span>
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleConfirmAnswer}
                  className={`px-8 py-3.5 rounded-2xl font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 ${
                    selectedOption !== null
                      ? 'bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white cursor-pointer hover:scale-103 shadow-sky-200'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد الإجابة والتحقق ✨</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mr-auto">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>إعادة المحاولة</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-103 transition-all flex items-center gap-2 font-cairo cursor-pointer"
                >
                  <span>السؤال التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Explanation */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-2xl text-right space-y-1.5 border ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>إجابة صحيحة ممتازة! (+٥ نجوم ⭐)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>معلومة ثرية وجديدة! طالعي الشرح بالأسفل:</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/50">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
