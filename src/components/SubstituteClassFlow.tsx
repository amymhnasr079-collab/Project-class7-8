import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Maximize2,
  Users,
  User,
  Monitor,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { CHARACTERS } from '../data/characters';
import { sound } from '../utils/sound';
import { formatTime, formatNum } from '../utils/arabicUtils';

export const SubstituteClassFlow: React.FC = () => {
  const {
    grade,
    setGrade,
    setActiveScreen,
    questions,
    addStars,
    triggerCelebration,
    useEasternNumerals,
    currentSubstituteConfig,
    setSubstituteConfig,
  } = useMathApp();

  // Setup state
  const [step, setStep] = useState<'config' | 'intro' | 'playing' | 'summary'>('config');
  const [selectedMinutes, setSelectedMinutes] = useState<number>(
    currentSubstituteConfig?.durationMinutes || 20
  );
  const [selectedMode, setSelectedMode] = useState<'individual' | 'teams' | 'projector'>(
    currentSubstituteConfig?.mode || 'individual'
  );
  const [selectedGameType, setSelectedGameType] = useState<string>('mixed'); // 'mixed' | 'speed' | 'error' | 'mystery'

  // Playing state
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(20 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Teams in team mode
  const [teams, setTeams] = useState([
    { name: 'فريق الخوارزمي 🌸', score: 0 },
    { name: 'فريق ابن الهيثم 🔮', score: 0 },
    { name: 'فريق البيروني 🌟', score: 0 },
  ]);
  const [activeTeamIndex, setActiveTeamIndex] = useState<number>(0);

  // Filter questions for the selected grade
  const gradeQuestions = questions.filter((q) => q.grade === grade);

  // Start the session
  const handleStartSession = () => {
    sound.playClick();
    setTimeLeftSeconds(selectedMinutes * 60);
    setIsTimerRunning(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setSolvedCount(0);
    setShowHint(false);
    setStep('playing');
  };

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (step === 'playing' && isTimerRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleTimeOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, isTimerRunning, timeLeftSeconds]);

  const handleTimeOver = () => {
    setIsTimerRunning(false);
    sound.playFanfare();
    triggerCelebration();
    setStep('summary');
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    const currentQ = gradeQuestions[currentQuestionIndex % gradeQuestions.length];
    if (!currentQ) return;
    const isCorrect = selectedOption === currentQ.correctIndex;

    setIsAnswerSubmitted(true);
    setSolvedCount((prev) => prev + 1);

    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + currentQ.points);
      addStars(Math.ceil(currentQ.points / 5), 'حصة احتياط ممتعة');

      if (selectedMode === 'teams') {
        setTeams((prev) =>
          prev.map((t, i) =>
            i === activeTeamIndex ? { ...t, score: t.score + currentQ.points } : t
          )
        );
      }
    } else {
      sound.playWrong();
    }
  };

  const handleRetryQuestion = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const handleNextQuestion = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);

    if (selectedMode === 'teams') {
      setActiveTeamIndex((prev) => (prev + 1) % teams.length);
    }

    if (currentQuestionIndex + 1 >= gradeQuestions.length) {
      // Loop or finish
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const currentQ = gradeQuestions[currentQuestionIndex % gradeQuestions.length];
  const teacher = CHARACTERS.noura;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top back bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            setActiveScreen('home');
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 text-sm shadow-2xs transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-purple-100 text-purple-900 border border-purple-200 text-xs font-black">
          <Clock className="w-4 h-4 text-purple-600" />
          <span>وضع حصة الاحتياط الممتعة · الصف {grade === 7 ? 'السابع 🌸' : 'الثامن 🔮'}</span>
        </div>
      </div>

      {/* STEP 1: CONFIGURATION */}
      {step === 'config' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-md space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-purple-600 uppercase tracking-widest">
              إعداد الحصة في دقيقة واحدة
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-cairo">
              جاهزون لتفعيل حصة الاحتياط؟ ⏱️
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              اختاري الصف والمدة وطريقة العرض، وابدئي التحدي فورًا بدون أي تعقيد!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* 1. Grade selection */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-black text-slate-500 block">١. الصف الدراسي:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGrade(7)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all ${
                    grade === 7
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  الصف السابع
                </button>
                <button
                  onClick={() => setGrade(8)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all ${
                    grade === 8
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  الصف الثامن
                </button>
              </div>
            </div>

            {/* 2. Duration selection */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-black text-slate-500 block">٢. مدة الحصة المتاحة:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {[10, 20, 30, 40].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      sound.playClick();
                      setSelectedMinutes(m);
                    }}
                    className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                      selectedMinutes === m
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {formatNum(m, useEasternNumerals)} د
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Mode selection */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-black text-slate-500 block">٣. طريقة التطبيق:</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedMode('individual');
                  }}
                  className={`py-2 px-1 rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    selectedMode === 'individual'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>فردي</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedMode('teams');
                  }}
                  className={`py-2 px-1 rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    selectedMode === 'teams'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>مجموعات</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedMode('projector');
                  }}
                  className={`py-2 px-1 rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    selectedMode === 'projector'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>بروجكتر</span>
                </button>
              </div>
            </div>
          </div>

          {/* Teacher Noura Briefing */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-4">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-300 shadow-sm shrink-0"
            />
            <div className="space-y-1 text-right">
              <span className="font-extrabold text-sm text-amber-900">{teacher.name}:</span>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                «في وضع الحصة الاحتياطية، تم إعداد بنك أسئلة متدرج وشامل يغطي وحدات منهج كامبردج بدون الحاجة لتحضير مسبق. اضغطي على زر البدء لتبدأ المتعة والتعلم الذاتي فورًا!»
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleStartSession}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-black text-lg rounded-2xl shadow-xl shadow-purple-200 hover:scale-103 transition-all flex items-center justify-center gap-2 font-cairo"
            >
              <Play className="w-6 h-6 fill-white" />
              <span>ابدئي الحصة الآن ({formatNum(selectedMinutes, useEasternNumerals)} دقيقة)</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ACTIVE PLAYING */}
      {step === 'playing' && currentQ && (
        <div className={`space-y-6 ${selectedMode === 'projector' ? 'text-lg' : ''}`}>
          {/* Header Bar with Countdown Timer and Score */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-purple-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
            {/* Timer */}
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-md ${
                  timeLeftSeconds < 120
                    ? 'bg-rose-500 animate-pulse'
                    : 'bg-gradient-to-tr from-purple-600 to-indigo-600'
                }`}
              >
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 block">الوقت المتبقي:</span>
                <span className="text-2xl font-black font-cairo text-slate-900 tabular-nums">
                  {formatTime(timeLeftSeconds, useEasternNumerals)}
                </span>
              </div>
            </div>

            {/* Team indicator if teams mode */}
            {selectedMode === 'teams' && (
              <div className="flex items-center gap-2">
                {teams.map((t, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      idx === activeTeamIndex
                        ? 'bg-purple-600 text-white border-purple-700 shadow-xs scale-105'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    <span>{t.name}: </span>
                    <strong className="text-amber-300">{formatNum(t.score, useEasternNumerals)}</strong>
                  </div>
                ))}
              </div>
            )}

            {/* Score & Progress */}
            <div className="flex items-center gap-4">
              <div className="text-left">
                <span className="text-xs font-bold text-slate-500 block">النقاط المحققة:</span>
                <span className="text-xl font-black text-purple-700 font-cairo tabular-nums">
                  {formatNum(score, useEasternNumerals)} نقطة
                </span>
              </div>
              <button
                onClick={() => handleTimeOver()}
                className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors"
              >
                إنهاء الحصة
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-md space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-pink-100 text-pink-700 font-bold text-xs">
                  {currentQ.topicTitle}
                </span>
                <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-700 font-bold text-xs">
                  {currentQ.difficulty === 'easy'
                    ? 'نجمة البداية ⭐'
                    : currentQ.difficulty === 'medium'
                    ? 'نجمة التحدي ⭐⭐'
                    : 'نجمة العبقرية ⭐⭐⭐'}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-500">
                السؤال رقم {formatNum(currentQuestionIndex + 1, useEasternNumerals)}
              </span>
            </div>

            {/* Question Text */}
            <div className="py-2">
              <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-relaxed font-cairo text-right">
                {currentQ.question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle =
                  'bg-slate-50 hover:bg-purple-50/80 text-slate-800 border-slate-200 hover:border-purple-300 cursor-pointer';

                if (isSelected && !isAnswerSubmitted) {
                  btnStyle = 'bg-purple-100 border-purple-600 text-purple-950 font-black ring-2 ring-purple-300 shadow-md scale-[1.01]';
                }

                if (isAnswerSubmitted) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
                  } else {
                    btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 text-right font-bold transition-all flex items-center justify-between text-base sm:text-lg select-none cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'border-purple-600 bg-purple-600' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                      <span>{opt}</span>
                    </div>
                    <span className="w-8 h-8 rounded-xl bg-white/80 shadow-2xs flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                      {['أ', 'ب', 'ج', 'د'][idx]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Actions: Submit or Next + Hint button */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowHint((prev) => !prev);
                }}
                className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1.5 px-3.5 py-2.5 bg-amber-50 rounded-xl border border-amber-200 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>{showHint ? 'إخفاء تلميح أ. نورة' : 'تلميح أ. نورة 💡'}</span>
              </button>

              {!isAnswerSubmitted ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={selectedOption === null}
                    onClick={handleConfirmAnswer}
                    className={`px-8 py-3.5 rounded-2xl font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 ${
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
                    onClick={handleNextQuestion}
                    className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-103 transition-all flex items-center gap-2 font-cairo cursor-pointer"
                  >
                    <span>السؤال التالي</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Hint Box */}
            {showHint && (
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-right space-y-1 text-sm text-amber-900 animate-fadeIn">
                <span className="font-bold flex items-center gap-1">
                  <span>💡 تلميح:</span>
                </span>
                <p>{currentQ.hint}</p>
              </div>
            )}

            {/* Post-Answer Explanation */}
            {isAnswerSubmitted && (
              <div
                className={`p-5 rounded-2xl border text-right space-y-2 animate-fadeIn ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-base">
                  {selectedOption === currentQ.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>إجابة صحيحة! أحسنتِ يا بطلة (+{formatNum(currentQ.points, useEasternNumerals)} نقطة)</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                      <span>إجابة غير صحيحة، لكن التعلم من الخطأ سر العبقرية!</span>
                    </>
                  )}
                </div>
                <div className="text-sm leading-relaxed text-slate-700 bg-white/70 p-3 rounded-xl border border-slate-200/50">
                  <strong className="block text-purple-900 mb-1">تفسير الحل الرياضي:</strong>
                  {currentQ.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: SESSION SUMMARY */}
      {step === 'summary' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-xl space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 text-white flex items-center justify-center text-4xl shadow-xl shadow-pink-200 animate-bounce">
            👑
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black text-purple-600 uppercase tracking-widest">
              اكتملت حصة الاحتياط بنجاح باهر!
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-cairo">
              مبارك يا بطلة الرياضيات! 🎀
            </h2>
            <p className="text-slate-600 text-sm">
              تم استثمار وقت حصة الاحتياط في تدريبات رياضية ذكية وفق منهج كامبردج بسلطنة عُمان.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
              <span className="text-xs font-bold text-slate-500 block">إجمالي النقاط</span>
              <span className="text-2xl font-black text-purple-700 font-cairo">
                {formatNum(score, useEasternNumerals)}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100">
              <span className="text-xs font-bold text-slate-500 block">المسائل المحلولة</span>
              <span className="text-2xl font-black text-pink-700 font-cairo">
                {formatNum(solvedCount, useEasternNumerals)}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 col-span-2 sm:col-span-1">
              <span className="text-xs font-bold text-slate-500 block">النجوم المكتسبة</span>
              <span className="text-2xl font-black text-amber-600 font-cairo">
                +{formatNum(Math.ceil(score / 5), useEasternNumerals)} ⭐
              </span>
            </div>
          </div>

          {/* Skills summary */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-right space-y-2">
            <span className="text-xs font-black text-slate-600 block">المهارات المكتسبة في الحصة:</span>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside">
              <li>الدقة في تطبيق قواعد ترتيب العمليات الحسابية والكسور.</li>
              <li>فهم العلاقات الرياضية والتمثيل الجبري السليم.</li>
              <li>التفكير التحليلي والاستنتاج السريع وحل المشكلات.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setStep('config');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm font-cairo transition-all shadow-md"
            >
              بدء حصة أخرى ⏱️
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveScreen('home');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
