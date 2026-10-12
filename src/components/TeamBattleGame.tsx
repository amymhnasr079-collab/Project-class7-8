import React, { useState } from 'react';
import {
  Users,
  Trophy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  Flame,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

interface Team {
  id: number;
  name: string;
  color: string;
  bgLight: string;
  borderColor: string;
  score: number;
}

const DEFAULT_TEAMS: Team[] = [
  {
    id: 1,
    name: 'فريق الخوارزمي 🌸',
    color: 'text-pink-600',
    bgLight: 'bg-pink-50',
    borderColor: 'border-pink-300',
    score: 0,
  },
  {
    id: 2,
    name: 'فريق ابن الهيثم 🔮',
    color: 'text-purple-600',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-300',
    score: 0,
  },
  {
    id: 3,
    name: 'فريق البيروني 🌟',
    color: 'text-amber-600',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-300',
    score: 0,
  },
];

export const TeamBattleGame: React.FC = () => {
  const {
    grade,
    questions,
    addStars,
    unlockBadge,
    triggerCelebration,
    setActiveScreen,
    useEasternNumerals,
  } = useMathApp();

  const [teams, setTeams] = useState<Team[]>(DEFAULT_TEAMS);
  const [activeTeamIndex, setActiveTeamIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [roundNumber, setRoundNumber] = useState<number>(1);

  const gradeQuestions = questions.filter((q) => q.grade === grade);
  const currentQ = gradeQuestions[currentQuestionIndex % gradeQuestions.length];
  const activeTeam = teams[activeTeamIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted || !currentQ) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmTeamAnswer = () => {
    if (selectedOption === null || !currentQ || isAnswerSubmitted) return;
    const isCorrect = selectedOption === currentQ.correctIndex;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      sound.playCorrect();
      setTeams((prev) =>
        prev.map((t, i) =>
          i === activeTeamIndex ? { ...t, score: t.score + currentQ.points } : t
        )
      );
      addStars(5, 'تحدي الفرق');
      unlockBadge('team_leader');
      triggerCelebration();
    } else {
      sound.playWrong();
    }
  };

  const handleRetryRound = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const handleAddBonus = (bonusPoints: number, reason: string) => {
    sound.playCorrect();
    setTeams((prev) =>
      prev.map((t, i) =>
        i === activeTeamIndex ? { ...t, score: t.score + bonusPoints } : t
      )
    );
  };

  const handleNextRound = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    const nextTeam = (activeTeamIndex + 1) % teams.length;
    setActiveTeamIndex(nextTeam);
    if (nextTeam === 0) {
      setRoundNumber((r) => r + 1);
    }
    setCurrentQuestionIndex((q) => (q + 1) % gradeQuestions.length);
  };

  const handleResetScores = () => {
    sound.playClick();
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    setRoundNumber(1);
    setActiveTeamIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
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

        <button
          onClick={handleResetScores}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-3 py-1.5 bg-slate-100 rounded-xl"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>إعادة تصفير النقاط</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-teal-700 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              👥
            </span>
            <h2 className="text-2xl font-black font-cairo">لعبة «تحدي الفرق»</h2>
          </div>
          <p className="text-purple-100 text-xs sm:text-sm">
            نشاط تفاعلي مميز لحصص الاحتياط والعرض على شاشة الصف لتشجيع الحوار والتعلم التعاوني!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
          <span className="text-xs font-bold text-amber-300">الجولة رقم:</span>
          <span className="text-lg font-black font-cairo">{formatNum(roundNumber, useEasternNumerals)}</span>
        </div>
      </div>

      {/* Teams Scoreboard Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {teams.map((t, idx) => {
          const isTurn = idx === activeTeamIndex;

          return (
            <div
              key={t.id}
              className={`p-5 rounded-3xl border-2 transition-all text-right relative overflow-hidden ${
                isTurn
                  ? `${t.bgLight} ${t.borderColor} shadow-lg scale-102 ring-4 ring-purple-300/40`
                  : 'bg-white border-slate-200 opacity-80'
              }`}
            >
              {isTurn && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black animate-pulse">
                  دور الفريق الآن! 🎯
                </div>
              )}
              <span className={`text-base font-black ${t.color} font-cairo block`}>
                {t.name}
              </span>
              <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-200/50">
                <span className="text-xs text-slate-500 font-bold">مجموع النقاط:</span>
                <span className="text-3xl font-black font-cairo text-slate-900 tabular-nums">
                  {formatNum(t.score, useEasternNumerals)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Team Turn Card */}
      {currentQ && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-800 font-bold text-xs">
                السؤال الموجه لـ: {activeTeam.name}
              </span>
              <span className="px-3 py-1 rounded-xl bg-pink-100 text-pink-700 font-bold text-xs">
                {currentQ.topicTitle}
              </span>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
              قيمة السؤال: {formatNum(currentQ.points, useEasternNumerals)} نقطة
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 text-right font-cairo leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let style = 'bg-slate-50 hover:bg-purple-50/70 border-slate-200 text-slate-800 cursor-pointer';

              if (isSelected && !isAnswerSubmitted) {
                style = 'bg-purple-100 border-purple-600 text-purple-950 font-black ring-2 ring-purple-300 shadow-sm scale-[1.01]';
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
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 font-bold text-right transition-all flex items-center justify-between text-base sm:text-lg select-none cursor-pointer ${style}`}
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

          {/* Teacher / Facilitator Bonus Buttons for Teamwork & Innovative Method */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-black text-slate-600">
              مكافآت التعاون والشرح (خاص بالمعلمة أو قائدة الحصة):
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAddBonus(5, 'طريقة حل مبتكرة')}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
              >
                +٥ نقاط (طريقة حل وشرح مبهرة)
              </button>
              <button
                type="button"
                onClick={() => handleAddBonus(5, 'تعاون متميز')}
                className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold transition-all cursor-pointer"
              >
                +٥ نقاط (تعاون وهدوء الفريق)
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            {!isAnswerSubmitted ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-xl border border-purple-200">
                  👥 تشاور الفريق ثم اضغطوا تأكيد الإجابة
                </span>
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleConfirmTeamAnswer}
                  className={`px-8 py-3.5 rounded-2xl font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 ${
                    selectedOption !== null
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-600 hover:from-purple-500 hover:to-teal-500 text-white cursor-pointer hover:scale-103 shadow-purple-200'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد إجابة الفريق ✨</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mr-auto">
                <button
                  type="button"
                  onClick={handleRetryRound}
                  className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>إعادة المحاولة</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextRound}
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-103 transition-all flex items-center gap-2 font-cairo cursor-pointer"
                >
                  <span>دور الفريق التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Answer Breakdown */}
          {isAnswerSubmitted && (
            <div
              className={`p-5 rounded-2xl text-right space-y-2 border ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-base">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>إجابة صحيحة لفريق {activeTeam.name}!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>إجابة غير صحيحة، وتتاح فرصة مناقشة الحل مع الصف:</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/50">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
