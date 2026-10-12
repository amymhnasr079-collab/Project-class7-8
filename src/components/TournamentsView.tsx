import React, { useState } from 'react';
import {
  Trophy,
  Sparkles,
  ArrowRight,
  Plus,
  RefreshCw,
  Award,
  Users,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

interface Team {
  id: number;
  name: string;
  badge: string;
  score: number;
  wins: number;
}

export const TournamentsView: React.FC = () => {
  const { setActiveScreen, addStars, triggerCelebration, useEasternNumerals } = useMathApp();

  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'فريق الخوارزمي 🌸', badge: 'وردية التميز', score: 0, wins: 0 },
    { id: 2, name: 'فريق ابن الهيثم 🔮', badge: 'بنفسج العبقرية', score: 0, wins: 0 },
    { id: 3, name: 'فريق البيروني 🌟', badge: 'نجوم الإبداع', score: 0, wins: 0 },
    { id: 4, name: 'فريق الإدريسي 🌿', badge: 'فرسان المعرفة', score: 0, wins: 0 },
  ]);

  const [roundName, setRoundName] = useState<string>('جولة السرعة الأولى ⚡');
  const [tournamentFinished, setTournamentFinished] = useState<boolean>(false);

  const handleAddPoints = (teamId: number, pts: number) => {
    sound.playCorrect();
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, score: Math.max(0, t.score + pts) } : t))
    );
  };

  const handleFinishTournament = () => {
    sound.playFanfare();
    triggerCelebration();
    setTournamentFinished(true);
    addStars(10, 'بطولة الدوري الصفي الممتع');
  };

  const handleReset = () => {
    sound.playClick();
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0, wins: 0 })));
    setTournamentFinished(false);
  };

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

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

        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>البطولات والمسابقات الصفية 🏆</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🏆
            </span>
            <h2 className="text-2xl font-black font-cairo">دوري التحدي الصفي الودي</h2>
          </div>
          <p className="text-amber-100 text-xs sm:text-sm">
            لوحة تسجيل تفاعلية لإدارة مسابقات الفرق الصفية في حصص الاحتياط والأنشطة!
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl border border-white/30 text-xs font-bold text-white transition-colors flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>تصفير النقاط</span>
        </button>
      </div>

      {/* Round controller */}
      <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-sm flex flex-wrap items-center justify-between gap-3 text-right">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">الجولة النشطة:</span>
          <select
            value={roundName}
            onChange={(e) => setRoundName(e.target.value)}
            className="text-xs font-black text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 focus:outline-hidden cursor-pointer"
          >
            <option value="جولة السرعة الأولى ⚡">جولة السرعة الأولى ⚡</option>
            <option value="جولة الألغاز الذكية 🧠">جولة الألغاز الذكية 🧠</option>
            <option value="جولة التمثيل الصامت 🎭">جولة التمثيل الصامت 🎭</option>
            <option value="جولة الحسم الذهبية 👑">جولة الحسم الذهبية 👑</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleFinishTournament}
          className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>تتويج الفريق الفائز والاحتفال بالجميع 🎉</span>
        </button>
      </div>

      {/* Teams Scoreboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teams.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-3xl bg-white border-2 border-slate-100 hover:border-amber-300 shadow-sm transition-all space-y-4 text-right"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-xl">
                {t.badge}
              </span>
              <h3 className="text-base font-black text-slate-900 font-cairo">
                {t.name}
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-bold">مجموع النقاط:</span>
                <span className="text-3xl font-black text-amber-600 font-cairo tabular-nums">
                  {formatNum(t.score, useEasternNumerals)}
                </span>
              </div>

              {/* Point adjuster buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAddPoints(t.id, 1)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs rounded-xl transition-colors cursor-pointer"
                >
                  +١
                </button>
                <button
                  type="button"
                  onClick={() => handleAddPoints(t.id, 5)}
                  className="px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-xs rounded-xl transition-colors cursor-pointer"
                >
                  +٥ ⭐
                </button>
                <button
                  type="button"
                  onClick={() => handleAddPoints(t.id, 10)}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  +١٠ 🏆
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Podium if completed */}
      {tournamentFinished && (
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-4 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-3xl shadow-lg shadow-amber-200 animate-bounce">
            👑
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-cairo">
            مبارك لفريق {sortedTeams[0].name} المركز الأول!
          </h3>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            تحية إكبار لجميع الفرق المشاركة بروح رياضية وأخلاق مدرسية راقية ومتميزة 🌸
          </p>
        </div>
      )}
    </div>
  );
};
