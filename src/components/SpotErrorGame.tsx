import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ChevronLeft,
  Star,
  Sparkles,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { ERROR_SPOTTING_QUESTIONS } from '../data/curriculumData';
import { CHARACTERS } from '../data/characters';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

export const SpotErrorGame: React.FC = () => {
  const {
    grade,
    addStars,
    recordQuestionSolved,
    triggerCelebration,
    setActiveScreen,
    useEasternNumerals,
    unlockBadge,
  } = useMathApp();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [solvedCount, setSolvedCount] = useState<number>(0);

  // Filter errors by grade or show all if needed
  const availableQuestions = ERROR_SPOTTING_QUESTIONS.filter(
    (q) => q.grade === grade
  );

  const currentQ = availableQuestions[currentIndex % availableQuestions.length];
  const jood = CHARACTERS.jood;

  const handleChooseOption = (idx: number) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || !currentQ || isSubmitted) return;
    const isCorrect = selectedOption === currentQ.correctOptionIndex;
    setIsSubmitted(true);
    recordQuestionSolved(isCorrect);

    if (isCorrect) {
      sound.playCorrect();
      setSolvedCount((p) => p + 1);
      addStars(5, 'اكتشفي الخطأ');
      unlockBadge('error_hunter');
      triggerCelebration();
    } else {
      sound.playWrong();
    }
  };

  const handleRetry = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsSubmitted(false);
    setCurrentIndex((prev) => (prev + 1) % availableQuestions.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            setActiveScreen('home');
          }}
          className="inline-flex items-center gap-1 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 text-sm shadow-2xs transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold bg-teal-50 text-teal-800 px-3 py-1.5 rounded-xl border border-teal-200">
          <Search className="w-4 h-4 text-teal-600" />
          <span>برفقة المحققة جود · صائدة الأخطاء 🔍</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🎯
            </span>
            <h2 className="text-2xl font-black font-cairo">لعبة «اكتشفي الخطأ»</h2>
          </div>
          <p className="text-teal-100 text-xs sm:text-sm">
            تفحصي خطوات الحل الرياضي بعين المحققة الذكية، وحددي موضع الخطأ والتصحيح السليم!
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
          <img
            src={jood.avatar}
            alt={jood.name}
            className="w-12 h-12 rounded-xl object-cover border border-white/40"
          />
          <div className="text-right">
            <span className="font-bold text-xs text-amber-200">{jood.name}:</span>
            <p className="text-xs text-white max-w-[200px]">
              «الخطأ ليس عيبًا، بل هو فرصة ذهبية لترسيخ الفهم العميق!»
            </p>
          </div>
        </div>
      </div>

      {/* Main Investigation Board */}
      {currentQ ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-xl">
              {currentQ.title}
            </span>
            <span className="text-xs font-bold text-slate-400">
              التحدي {formatNum(currentIndex + 1, useEasternNumerals)} من {formatNum(availableQuestions.length, useEasternNumerals)}
            </span>
          </div>

          {/* Original Problem & Worked Steps */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-right">
              <span className="text-xs font-bold text-slate-500 block mb-1">المسألة المطروحة:</span>
              <p className="text-lg font-black text-slate-900 font-cairo">{currentQ.problem}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-right space-y-2">
              <span className="text-xs font-black text-amber-900 block">خطوات حل الطالب المعروضة (يوجد بها فخ!):</span>
              <div className="space-y-2 font-mono text-slate-800">
                {currentQ.steps.map((st, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white border border-amber-200 font-bold text-sm sm:text-base flex items-center justify-between"
                  >
                    <span>{st.text}</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-sans font-bold">
                      خطوة {formatNum(st.stepNumber, useEasternNumerals)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question: Where is the error? */}
          <div className="space-y-3 pt-2 text-right">
            <h4 className="font-black text-slate-900 text-base font-cairo">
              أين يكمن الخطأ في هذا الحل؟
            </h4>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let style = 'bg-slate-50 hover:bg-teal-50/80 border-slate-200 text-slate-800 cursor-pointer';

                if (isSelected && !isSubmitted) {
                  style = 'bg-teal-100 border-teal-500 text-teal-950 ring-2 ring-teal-300 font-black shadow-sm scale-[1.01]';
                }

                if (isSubmitted) {
                  if (idx === currentQ.correctOptionIndex) {
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
                    disabled={isSubmitted}
                    onClick={() => handleChooseOption(idx)}
                    className={`w-full p-4 sm:p-4.5 rounded-2xl border-2 font-bold text-right transition-all flex items-center justify-between text-sm sm:text-base select-none cursor-pointer ${style}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'border-teal-600 bg-teal-600' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                      <span>{opt}</span>
                    </div>
                    <span className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center text-xs text-slate-600 shrink-0 font-black shadow-2xs">
                      {['أ', 'ب', 'ج'][idx]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            {!isSubmitted ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                  🎯 حددي موضع الخطأ ثم اضغطي تأكيد
                </span>
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleConfirmAnswer}
                  className={`px-7 py-3 rounded-2xl font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 ${
                    selectedOption !== null
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white cursor-pointer hover:scale-103'
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
                  className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-103 transition-all flex items-center gap-1.5 font-cairo cursor-pointer"
                >
                  <span>المسألة التالية</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Explanation & Correct Steps */}
          {isSubmitted && (
            <div
              className={`p-5 rounded-2xl text-right space-y-3 border ${
                selectedOption === currentQ.correctOptionIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-base">
                {selectedOption === currentQ.correctOptionIndex ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>ملاحظة عبقرية! كشفتِ الفخ بدقة (+٥ نجوم ⭐)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>فخ دقيق! إليكِ سر الخطأ بالأسفل:</span>
                  </>
                )}
              </div>

              <div className="bg-white/80 p-4 rounded-xl border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-800">
                <p>
                  <strong className="text-teal-900 block mb-0.5">لماذا وقع الخطأ؟</strong>
                  {currentQ.errorExplanation}
                </p>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 font-bold text-emerald-900">
                  <span>الحل الصحيح النموذجي: </span>
                  <span className="font-mono text-emerald-800">{currentQ.correctSolution}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
          <p className="text-slate-600 font-bold">لا توجد مسائل متوفرة لهذا الصف حاليًا.</p>
        </div>
      )}
    </div>
  );
};
