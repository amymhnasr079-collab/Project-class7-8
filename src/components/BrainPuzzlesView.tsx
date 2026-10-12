import React, { useState } from 'react';
import {
  Brain,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Star,
  Lightbulb,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { BRAIN_PUZZLES, BrainPuzzle } from '../data/schoolActivitiesData';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

export const BrainPuzzlesView: React.FC = () => {
  const { setActiveScreen, addStars, triggerCelebration, useEasternNumerals } = useMathApp();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [showClue, setShowClue] = useState<boolean>(false);
  const [clueIndex, setClueIndex] = useState<number>(0);

  const puzzles = BRAIN_PUZZLES;
  const currentP: BrainPuzzle = puzzles[currentIndex];

  const handleChooseOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    const isCorrect = selectedOption === currentP.correctIndex;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      sound.playCorrect();
      addStars(5, `حل ${currentP.title}`);
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
    setShowClue(false);
    setClueIndex(0);
    setCurrentIndex((prev) => (prev + 1) % puzzles.length);
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

        <div className="flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-xl border border-purple-200">
          <Brain className="w-4 h-4 text-purple-600" />
          <span>تحديات الذكاء والألغاز 🧠</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🧩
            </span>
            <h2 className="text-2xl font-black font-cairo">تحديات الذكاء والألغاز العامة</h2>
          </div>
          <p className="text-purple-100 text-xs sm:text-sm">
            ألغاز منطقية ولفظية، شفرات إيموجي، ولعبة «من أنا؟» تحفز التفكير خارج الصندوق!
          </p>
        </div>

        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center">
          <span className="text-[11px] block text-purple-200">اللغز الحالي</span>
          <span className="text-sm font-black text-amber-300">
            {formatNum(currentIndex + 1, useEasternNumerals)} من {formatNum(puzzles.length, useEasternNumerals)}
          </span>
        </div>
      </div>

      {/* Main Puzzle Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl">
            {currentP.title}
          </span>
          <span className="text-xs text-slate-400 font-bold">
            جائزة اللغز: +٥ نجوم ⭐
          </span>
        </div>

        {/* Question Text */}
        <div className="text-right space-y-3">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-cairo leading-relaxed">
            {currentP.question}
          </h3>
        </div>

        {/* Options */}
        {currentP.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {currentP.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let style = 'bg-slate-50 hover:bg-purple-50/70 border-slate-200 text-slate-800 cursor-pointer';

              if (isSelected && !isAnswerSubmitted) {
                style = 'bg-purple-100 border-purple-500 text-purple-950 font-black ring-2 ring-purple-300 shadow-sm scale-[1.01]';
              }

              if (isAnswerSubmitted) {
                if (idx === currentP.correctIndex) {
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
                      isSelected ? 'border-purple-600 bg-purple-600' : 'border-slate-300 bg-white'
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
        )}

        {/* Clue button & Action row */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowClue(true);
              setClueIndex((p) => (p + 1) % currentP.clues.length);
            }}
            className="text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-3.5 py-2.5 rounded-xl border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>طلب تلميح ذكي 💡</span>
          </button>

          {!isAnswerSubmitted ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleConfirmAnswer}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 ${
                  selectedOption !== null
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white cursor-pointer hover:scale-103 shadow-purple-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>تأكيد الإجابة والحل ✨</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
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
                className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-103 transition-all flex items-center gap-2 font-cairo cursor-pointer"
              >
                <span>اللغز التالي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Revealed Clue */}
        {showClue && (
          <div className="p-4 rounded-2xl bg-amber-50 text-right text-xs sm:text-sm text-amber-950 border border-amber-200 animate-fadeIn">
            💡 <strong>تلميح المحققة:</strong> {currentP.clues[clueIndex]}
          </div>
        )}

        {/* Explanation upon answer */}
        {isAnswerSubmitted && (
          <div
            className={`p-4 rounded-2xl text-right space-y-1.5 border ${
              selectedOption === currentP.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-sm">
              {selectedOption === currentP.correctIndex ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>حل عبقري سليم 100%! (+٥ نجوم ⭐)</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <span>محاولة قريبة! الإجابة الصحيحة هي: {currentP.answer}</span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/50">
              {currentP.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
