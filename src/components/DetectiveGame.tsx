import React, { useState } from 'react';
import {
  Search,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Shield,
  Award,
  ChevronLeft,
  Compass,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { DETECTIVE_CASES } from '../data/curriculumData';
import { DetectiveCase } from '../types';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';
import { CHARACTERS } from '../data/characters';

export const DetectiveGame: React.FC = () => {
  const {
    grade,
    stats,
    addStars,
    solveDetectiveCase,
    unlockBadge,
    triggerCelebration,
    setActiveScreen,
    useEasternNumerals,
  } = useMathApp();

  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [showTip, setShowTip] = useState<boolean>(false);

  const cases = DETECTIVE_CASES;
  const currentCase: DetectiveCase = cases[activeCaseIndex];
  const jood = CHARACTERS.jood;

  const handleChooseOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || !currentCase || isAnswerSubmitted) return;
    const isCorrect = selectedOption === currentCase.correctIndex;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      sound.playFanfare();
      solveDetectiveCase(currentCase.id);
      addStars(10, currentCase.title);
      unlockBadge('detective_super');
      triggerCelebration();
    } else {
      sound.playWrong();
    }
  };

  const handleRetryCase = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const handleNextCase = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowTip(false);
    setActiveCaseIndex((prev) => (prev + 1) % cases.length);
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

        <div className="flex items-center gap-2 text-xs font-bold bg-sky-50 text-sky-800 px-3 py-1.5 rounded-xl border border-sky-200">
          <Search className="w-4 h-4 text-sky-600" />
          <span>
            القضايا المحلولة: {formatNum(stats.solvedCases.length, useEasternNumerals)} من {formatNum(cases.length, useEasternNumerals)} 🔍
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-indigo-700 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🔍
            </span>
            <h2 className="text-2xl font-black font-cairo">لعبة «المحققة الرياضية»</h2>
          </div>
          <p className="text-sky-100 text-xs sm:text-sm">
            مواقف حياتية من تراث وبيئة سلطنة عُمان 🇴🇲. اجمعي الأدلة وحلّي القضايا بذكاء الرياضيات!
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
              «الرياضيات حاضرة في كل زاوية من أسواقنا وقلاعنا وأفلاجنا!»
            </p>
          </div>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {cases.map((c, idx) => {
          const isSolved = stats.solvedCases.includes(c.id);
          const isCurrent = activeCaseIndex === idx;

          return (
            <button
              key={c.id}
              onClick={() => {
                sound.playClick();
                setActiveCaseIndex(idx);
                setSelectedOption(null);
                setIsAnswerSubmitted(false);
                setShowTip(false);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-sky-600 text-white shadow-md font-black scale-102'
                  : isSolved
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span>{c.title}</span>
              {isSolved && <span className="text-emerald-500 font-black">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Case Investigation Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sky-800 font-bold text-xs">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>الموقع: {currentCase.location}</span>
          </div>
          <span className="text-xs font-bold text-slate-400">
            القضية {formatNum(activeCaseIndex + 1, useEasternNumerals)} من {formatNum(cases.length, useEasternNumerals)}
          </span>
        </div>

        {/* Story Narrative */}
        <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 text-right space-y-2">
          <span className="text-xs font-black text-sky-900 block">ملف القضية:</span>
          <p className="text-base text-slate-800 leading-relaxed font-tajawal">
            {currentCase.story}
          </p>
        </div>

        {/* Clues board */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-right space-y-2">
          <span className="text-xs font-black text-amber-900 block">
            📋 الأدلة التي جمعتها المحققة:
          </span>
          <ul className="text-xs sm:text-sm text-amber-950 space-y-1.5 list-disc list-inside">
            {currentCase.clues.map((clue, idx) => (
              <li key={idx} className="font-semibold">{clue}</li>
            ))}
          </ul>
        </div>

        {/* Case Question */}
        <div className="text-right">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-cairo leading-relaxed">
            {currentCase.question}
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {currentCase.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let style = 'bg-slate-50 hover:bg-sky-50/70 border-slate-200 text-slate-800 cursor-pointer';

            if (isSelected && !isAnswerSubmitted) {
              style = 'bg-sky-100 border-sky-500 text-sky-950 font-black ring-2 ring-sky-300 shadow-sm scale-[1.01]';
            }

            if (isAnswerSubmitted) {
              if (idx === currentCase.correctIndex) {
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
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowTip((p) => !p);
            }}
            className="text-xs font-bold text-amber-800 bg-amber-50 px-3.5 py-2.5 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{showTip ? 'إخفاء التلميح' : 'تلميح المحققة 💡'}</span>
          </button>

          {!isAnswerSubmitted ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleConfirmAnswer}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 ${
                  selectedOption !== null
                    ? 'bg-gradient-to-r from-sky-600 via-teal-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white cursor-pointer hover:scale-103 shadow-sky-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>تأكيد الاستنتاج وحل القضية ✨</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRetryCase}
                className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>إعادة المحاولة</span>
              </button>
              <button
                type="button"
                onClick={handleNextCase}
                className="px-8 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-103 transition-all flex items-center gap-1.5 font-cairo cursor-pointer"
              >
                <span>القضية التالية</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {showTip && (
          <div className="p-4 rounded-2xl bg-amber-50 text-right text-xs sm:text-sm text-amber-900 border border-amber-200 animate-fadeIn">
            💡 {currentCase.detectiveTip}
          </div>
        )}

        {isAnswerSubmitted && (
          <div
            className={`p-5 rounded-2xl text-right space-y-2 border ${
              selectedOption === currentCase.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-base">
              {selectedOption === currentCase.correctIndex ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>حللتِ القضية ببراعة! وحصلتِ على {currentCase.badgeEarned} (+١٠ نجوم ⭐)</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <span>الاستنتاج لم يطابق جميع الأدلة، انظري تفصيل الحل:</span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/50">
              {currentCase.solutionBreakdown}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
