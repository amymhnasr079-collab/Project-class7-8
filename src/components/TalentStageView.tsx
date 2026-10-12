import React, { useState, useEffect } from 'react';
import {
  Mic,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Star,
  CheckCircle2,
  Tv,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { TALENT_PROMPTS, TalentPrompt } from '../data/schoolActivitiesData';
import { sound } from '../utils/sound';
import { formatTime, formatNum } from '../utils/arabicUtils';

export const TalentStageView: React.FC = () => {
  const { setActiveScreen, addStars, triggerCelebration, useEasternNumerals } = useMathApp();

  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [completedPrompts, setCompletedPrompts] = useState<string[]>([]);

  const prompts = TALENT_PROMPTS;
  const currentPrompt: TalentPrompt = prompts[activePromptIndex];

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            sound.playFanfare();
            triggerCelebration();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleStartTimer = () => {
    sound.playClick();
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    sound.playClick();
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    sound.playClick();
    setIsTimerRunning(false);
    setTimeLeft(currentPrompt.durationSeconds);
  };

  const handlePickRandom = () => {
    sound.playSpin();
    const rand = Math.floor(Math.random() * prompts.length);
    setActivePromptIndex(rand);
    setTimeLeft(prompts[rand].durationSeconds);
    setIsTimerRunning(false);
  };

  const handleFinishSpeech = () => {
    sound.playCorrect();
    if (!completedPrompts.includes(currentPrompt.id)) {
      setCompletedPrompts((p) => [...p, currentPrompt.id]);
      addStars(10, `إلقاء ${currentPrompt.title}`);
    }
    triggerCelebration();
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

        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200">
          <Mic className="w-4 h-4 text-amber-600" />
          <span>مسرح المواهب والتقديم 🎭</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🎤
            </span>
            <h2 className="text-2xl font-black font-cairo">مسرح المواهب وتحديات الإلقاء</h2>
          </div>
          <p className="text-amber-100 text-xs sm:text-sm">
            فرصة لإبراز الثقة بالنفس، الفصاحة، الارتجال، وفنون الخطابة والتقديم الإعلامي!
          </p>
        </div>

        <button
          onClick={handlePickRandom}
          className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-black text-xs font-cairo transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>تحدٍ عشوائي جديد 🎲</span>
        </button>
      </div>

      {/* Stage Arena Visual Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md space-y-6 text-center">
        {/* Spotlight Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-4xl shadow-inner border border-amber-200">
          🎙️
        </div>

        {/* Prompt Title & Instructions */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl">
            {currentPrompt.type}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-cairo">
            {currentPrompt.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {currentPrompt.instructions}
          </p>
        </div>

        {/* Topic Card Display */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-pink-50 border-2 border-amber-200 text-right space-y-2">
          <span className="text-xs font-black text-amber-900 block">بطاقة الموضوع:</span>
          <p className="text-base sm:text-xl font-black text-slate-900 font-cairo leading-relaxed">
            {currentPrompt.topicCard}
          </p>
          <p className="text-xs text-amber-800 pt-1">
            💡 <strong>نصيحة المذيعة:</strong> {currentPrompt.tips}
          </p>
        </div>

        {/* Timer Control Arena */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <span className="text-xs text-slate-400 font-bold block mb-1">المؤقت التنازلي للإلقاء</span>
            <span className="text-4xl font-black font-cairo text-purple-700 tabular-nums">
              {formatTime(timeLeft, useEasternNumerals)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!isTimerRunning ? (
              <button
                onClick={handleStartTimer}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>بدء المؤقت ⏱️</span>
              </button>
            ) : (
              <button
                onClick={handlePauseTimer}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Pause className="w-4 h-4" />
                <span>إيقاف مؤقت</span>
              </button>
            )}

            <button
              onClick={handleResetTimer}
              className="p-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
              title="إعادة ضبط الوقت"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Optional Text Notes (if student prefers writing) */}
        <div className="text-right space-y-1.5 pt-2">
          <label className="text-xs font-bold text-slate-600 block">
            تدوين رؤوس أقلام أو مسودة الكلمة (اختياري):
          </label>
          <textarea
            rows={3}
            value={studentNotes}
            onChange={(e) => setStudentNotes(e.target.value)}
            placeholder="اكتبي النقاط الرئيسية التي ترغبين في الحديث عنها..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:border-amber-400 outline-hidden"
          />
        </div>

        {/* Finish button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleFinishSpeech}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm rounded-2xl shadow-md transition-all font-cairo flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>أنهيتُ إلقاء كلمتي أمام الصف (+١٠ نجوم ⭐)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
