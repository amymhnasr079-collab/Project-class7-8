import React, { useState, useEffect } from 'react';
import {
  Zap,
  Timer,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Star,
  ChevronLeft,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { DifficultyLevel, MathQuestion } from '../types';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';
import { CHARACTERS } from '../data/characters';

export const SpeedGame: React.FC = () => {
  const {
    grade,
    questions,
    addStars,
    recordQuestionSolved,
    triggerCelebration,
    setActiveScreen,
    useEasternNumerals,
    unlockBadge,
  } = useMathApp();

  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [timerMode, setTimerMode] = useState<'off' | '15' | '30' | '60'>('off');
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Filter pool by grade and difficulty
  const filteredQuestions = questions.filter(
    (q) => q.grade === grade && q.difficulty === difficulty
  );

  const currentQ: MathQuestion | undefined =
    filteredQuestions.length > 0
      ? filteredQuestions[currentIndex % filteredQuestions.length]
      : questions.find((q) => q.grade === grade);

  // Per-question timer countdown
  useEffect(() => {
    let timer: any = null;
    if (
      isTimerActive &&
      timerMode !== 'off' &&
      !isSubmitted &&
      timerSeconds > 0
    ) {
      timer = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeExpiry();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive, timerMode, isSubmitted, timerSeconds]);

  const handleTimeExpiry = () => {
    sound.playWrong();
    setIsSubmitted(true);
    setStreak(0);
    recordQuestionSolved(false);
  };

  const handleChooseOption = (idx: number) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || !currentQ || isSubmitted) return;
    const isCorrect = selectedOption === currentQ.correctIndex;
    setIsSubmitted(true);
    recordQuestionSolved(isCorrect);

    if (isCorrect) {
      sound.playCorrect();
      const bonus = timerMode !== 'off' ? 5 : 0;
      const earned = currentQ.points + bonus;
      setScore((prev) => prev + earned);
      setStreak((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          unlockBadge('speed_queen');
        }
        return next;
      });
      addStars(Math.ceil(earned / 5), 'من الأسرع؟');
      if (streak >= 1) {
        triggerCelebration();
      }
    } else {
      sound.playWrong();
      setStreak(0);
    }
  };

  const handleRetryQuestion = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsSubmitted(false);
    if (timerMode !== 'off') {
      const initSec = timerMode === '15' ? 15 : timerMode === '30' ? 30 : 60;
      setTimerSeconds(initSec);
      setIsTimerActive(true);
    }
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    const initSec = timerMode === '15' ? 15 : timerMode === '30' ? 30 : 60;
    setTimerSeconds(initSec);
    if (filteredQuestions.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
    }
  };

  const meera = CHARACTERS.meera;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
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

        <div className="flex items-center gap-2">
          {/* Difficulty tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => {
                sound.playClick();
                setDifficulty('easy');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                difficulty === 'easy'
                  ? 'bg-emerald-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              نجمة البداية ⭐
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setDifficulty('medium');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                difficulty === 'medium'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              نجمة التحدي ⭐⭐
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setDifficulty('hard');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                difficulty === 'hard'
                  ? 'bg-rose-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              نجمة العبقرية ⭐⭐⭐
            </button>
          </div>
        </div>
      </div>

      {/* Hero Title & Meera Quote */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              ⚡
            </span>
            <h2 className="text-2xl font-black font-cairo">لعبة «من الأسرع؟»</h2>
          </div>
          <p className="text-pink-100 text-xs sm:text-sm">
            اختبري سرعتكِ الذهنية ودقتكِ الحسابية في مسائل منهج كامبردج للصف {grade === 7 ? 'السابع' : 'الثامن'}!
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
          <img
            src={meera.avatar}
            alt={meera.name}
            className="w-12 h-12 rounded-xl object-cover border border-white/40"
          />
          <div className="text-right">
            <span className="font-bold text-xs text-amber-200">{meera.name}:</span>
            <p className="text-xs text-white max-w-[200px]">
              «ركزي جيدًا، السرعة مع الدقة تصنع بطلات الرياضيات!»
            </p>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        {/* Timer */}
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white ${
              timerSeconds <= 5 && !isSubmitted
                ? 'bg-rose-500 animate-ping'
                : 'bg-purple-600'
            }`}
          >
            {formatNum(timerSeconds, useEasternNumerals)}
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 block">المؤقت</span>
            <span className="text-xs font-bold text-slate-700">ثانية متبقية</span>
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1.5 text-xs font-black text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span>تتابع الإجابات الصحيحة: {formatNum(streak, useEasternNumerals)} 🔥</span>
        </div>

        {/* Score */}
        <div className="text-left">
          <span className="text-[11px] font-bold text-slate-400 block">رصيد النقاط</span>
          <span className="text-base font-black text-purple-700 tabular-nums">
            {formatNum(score, useEasternNumerals)} نقطة
          </span>
        </div>
      </div>

      {/* Main Question Box */}
      {currentQ ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl">
              {currentQ.topicTitle}
            </span>
            <span className="text-xs font-bold text-slate-400">
              السؤال {formatNum(currentIndex + 1, useEasternNumerals)} من {formatNum(filteredQuestions.length, useEasternNumerals)}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 text-right font-cairo leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let style = 'bg-slate-50 hover:bg-pink-50/70 border-slate-200 text-slate-800 cursor-pointer hover:border-purple-300';

              if (isSelected && !isSubmitted) {
                style = 'bg-purple-100 border-purple-500 text-purple-950 shadow-md ring-2 ring-purple-300 font-black scale-[1.01]';
              }

              if (isSubmitted) {
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
                  disabled={isSubmitted}
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
                  <span className="w-8 h-8 rounded-xl bg-white/90 shadow-2xs flex items-center justify-center text-xs text-slate-600 font-black shrink-0">
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
                setShowHint((p) => !p);
              }}
              className="text-xs font-bold text-amber-800 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>{showHint ? 'إخفاء التلميح' : 'تلميح ذكي 💡'}</span>
            </button>

            {!isSubmitted ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleConfirmAnswer}
                  className={`px-7 py-3 rounded-2xl font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 ${
                    selectedOption !== null
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white cursor-pointer hover:scale-103 shadow-purple-200'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد الإجابة والتحقق ✨</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRetryQuestion}
                  className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة المحاولة</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-103 transition-all flex items-center gap-2 font-cairo cursor-pointer"
                >
                  <span>السؤال التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {showHint && (
            <div className="p-4 rounded-2xl bg-amber-50 text-right text-xs sm:text-sm text-amber-900 border border-amber-200">
              💡 {currentQ.hint}
            </div>
          )}

          {isSubmitted && (
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
                    <span>إجابة صحيحة رائعة! (+{formatNum(currentQ.points, useEasternNumerals)} نقطة)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>
                      {timerSeconds === 0 && selectedOption === null
                        ? 'انتهى الوقت المحدد للسؤال!'
                        : 'إجابة غير دقيقة! انظري التفسير بالأسفل:'}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/50">
                <strong className="block text-slate-900 mb-0.5">خطوات التفسير:</strong>
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
          <p className="text-slate-600 font-bold">لا توجد أسئلة متوفرة لهذا المستوى حاليًا.</p>
        </div>
      )}
    </div>
  );
};
