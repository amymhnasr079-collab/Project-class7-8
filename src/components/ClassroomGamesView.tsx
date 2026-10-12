import React, { useState, useEffect } from 'react';
import {
  Users,
  Trophy,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronLeft,
  Timer,
  Plus,
  Minus,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { CLASSROOM_GAMES, GroupGame } from '../data/schoolActivitiesData';
import { sound } from '../utils/sound';
import { formatTime, formatNum } from '../utils/arabicUtils';

export const ClassroomGamesView: React.FC = () => {
  const { setActiveScreen, addStars, triggerCelebration, useEasternNumerals } = useMathApp();

  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [showSecretPrompt, setShowSecretPrompt] = useState<boolean>(false);

  // Teams score
  const [team1Score, setTeam1Score] = useState<number>(0);
  const [team2Score, setTeam2Score] = useState<number>(0);

  // 60-second round timer
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const games = CLASSROOM_GAMES;
  const currentGame: GroupGame = games[activeGameIndex];
  const currentRound = currentGame.sampleRounds[currentRoundIndex % currentGame.sampleRounds.length];

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
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
  }, [isTimerRunning, timerSeconds]);

  const handleNextRound = () => {
    sound.playClick();
    setShowSecretPrompt(false);
    setTimerSeconds(60);
    setIsTimerRunning(false);
    setCurrentRoundIndex((p) => (p + 1) % currentGame.sampleRounds.length);
  };

  const handleAddPoint = (team: 1 | 2) => {
    sound.playCorrect();
    if (team === 1) setTeam1Score((s) => s + 1);
    else setTeam2Score((s) => s + 1);
    addStars(5, 'نقطة لعبة جماعية');
    triggerCelebration();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveScreen('school-world')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 text-sm shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لعالمي المدرسي</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
          <Users className="w-4 h-4 text-emerald-600" />
          <span>الألعاب الصفية الجماعية 🎲</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🎲
            </span>
            <h2 className="text-2xl font-black font-cairo">الألعاب والأنشطة الصفية الجماعية</h2>
          </div>
          <p className="text-emerald-100 text-xs sm:text-sm">
            ألعاب ممتعة مصممة للشاشة والسبورة الذكية بدون حاجة لأجهزة شخصية لكل طالبة!
          </p>
        </div>

        <div className="text-xs bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center font-bold">
          <span>شاشة تفاعلية واحدة للصف 📽️</span>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {games.map((g, idx) => (
          <button
            key={g.id}
            onClick={() => {
              sound.playClick();
              setActiveGameIndex(idx);
              setCurrentRoundIndex(0);
              setShowSecretPrompt(false);
              setTimerSeconds(60);
              setIsTimerRunning(false);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeGameIndex === idx
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Classroom Scoreboard for Teams */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-3xl bg-pink-50 border-2 border-pink-200 flex items-center justify-between text-right">
          <div>
            <span className="font-extrabold text-sm text-pink-900 block font-cairo">
              فريق الورد والياسمين 🌸
            </span>
            <span className="text-xs text-slate-500 font-bold">النقاط:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black font-cairo text-pink-700 tabular-nums">
              {formatNum(team1Score, useEasternNumerals)}
            </span>
            <button
              onClick={() => handleAddPoint(1)}
              className="p-1.5 rounded-lg bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-purple-50 border-2 border-purple-200 flex items-center justify-between text-right">
          <div>
            <span className="font-extrabold text-sm text-purple-900 block font-cairo">
              فريق النجوم اللامعة 🔮
            </span>
            <span className="text-xs text-slate-500 font-bold">النقاط:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black font-cairo text-purple-700 tabular-nums">
              {formatNum(team2Score, useEasternNumerals)}
            </span>
            <button
              onClick={() => handleAddPoint(2)}
              className="p-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md space-y-6 text-center">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl">
            {currentGame.name}
          </span>

          {/* Timer Display */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-mono font-bold text-xs">
              <Timer className="w-3.5 h-3.5 text-emerald-600" />
              <span>{formatTime(timerSeconds, useEasternNumerals)}</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setIsTimerRunning((p) => !p);
              }}
              className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 cursor-pointer"
            >
              {isTimerRunning ? 'إيقاف' : 'بدء المؤقت ⏱️'}
            </button>
          </div>
        </div>

        {/* Game Rules */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-right space-y-1">
          <span className="text-xs font-black text-slate-700 block">طريقة اللعب وقواعد الجولة:</span>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            {currentGame.instructions.map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
          </ul>
        </div>

        {/* Secret Prompt Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-200 space-y-4">
          <span className="text-xs font-black text-emerald-900 block">
            البطاقة السرية للجولة رقم {formatNum(currentRoundIndex + 1, useEasternNumerals)}:
          </span>

          {showSecretPrompt ? (
            <div className="p-6 bg-white rounded-2xl border-2 border-emerald-300 shadow-sm animate-fadeIn">
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-cairo">
                {currentRound.prompt}
              </p>
            </div>
          ) : (
            <div className="p-6 bg-white/70 rounded-2xl border border-dashed border-emerald-300">
              <p className="text-base font-bold text-slate-400">
                «البطاقة مخفية حتى تصعد الطالبة الممثلة أو المسؤولة أمام الشاشة»
              </p>
            </div>
          )}

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setShowSecretPrompt((p) => !p);
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {showSecretPrompt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showSecretPrompt ? 'إخفاء البطاقة السرية' : 'كشف البطاقة السرية 👀'}</span>
            </button>

            <button
              onClick={handleNextRound}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>البطاقة التالية ➡️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
