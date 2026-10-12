import React, { useState } from 'react';
import {
  Trophy,
  Star,
  Award,
  Sparkles,
  ArrowRight,
  Printer,
  CheckCircle2,
  Lock,
  Edit2,
  Check,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { formatNum } from '../utils/arabicUtils';
import { sound } from '../utils/sound';

export const AchievementsView: React.FC = () => {
  const {
    grade,
    stats,
    badges,
    studentName,
    setStudentName,
    setActiveScreen,
    useEasternNumerals,
    triggerCelebration,
  } = useMathApp();

  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(studentName);

  const handleSaveName = () => {
    sound.playClick();
    if (tempName.trim()) {
      setStudentName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handlePrintCertificate = () => {
    sound.playClick();
    triggerCelebration();
    window.print();
  };

  // Progress Level calculation (every 30 stars = 1 level)
  const currentLevel = Math.max(1, Math.floor(stats.stars / 30) + 1);
  const progressInLevel = (stats.stars % 30) / 30; // 0 to 1

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between no-print">
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

        <div className="flex items-center gap-2 text-xs font-bold bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>سجل الشرف والبطولات 🏆</span>
        </div>
      </div>

      {/* Hero Stats Card */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 no-print">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-right">
            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl border border-white/30 shadow-md">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="px-2.5 py-1 text-sm bg-white text-slate-900 rounded-lg font-bold"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1.5 bg-emerald-500 text-white rounded-lg"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black font-cairo">{studentName}</h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                      title="تعديل الاسم للشهادة"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-pink-200" />
                    </button>
                  </>
                )}
              </div>
              <span className="text-xs text-pink-100 font-bold block mt-0.5">
                طالبة متميزة · الصف {grade === 7 ? 'السابع 🌸' : 'الثامن 🔮'} · سلطنة عُمان
              </span>
            </div>
          </div>

          <div className="text-center sm:text-left bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
            <span className="text-xs block text-pink-200 font-bold">المستوى الرياضي:</span>
            <span className="text-2xl font-black text-amber-300 font-cairo">
              المستوى {formatNum(currentLevel, useEasternNumerals)}
            </span>
          </div>
        </div>

        {/* Progress bar to next level */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-pink-100">
            <span>التقدم نحو المستوى التالي:</span>
            <span>{Math.round(progressInLevel * 100)}%</span>
          </div>
          <div className="w-full h-3.5 bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(progressInLevel * 100)}%` }}
            />
          </div>
        </div>

        {/* 3 Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-2 text-center">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <span className="text-[11px] text-pink-200 block font-bold">النجوم المكتسبة</span>
            <span className="text-xl font-black text-amber-300 font-cairo">
              {formatNum(stats.stars, useEasternNumerals)} ⭐
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <span className="text-[11px] text-pink-200 block font-bold">المسائل المحلولة</span>
            <span className="text-xl font-black text-white font-cairo">
              {formatNum(stats.questionsSolved, useEasternNumerals)}
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <span className="text-[11px] text-pink-200 block font-bold">الأوسمة المفتوحة</span>
            <span className="text-xl font-black text-emerald-300 font-cairo">
              {formatNum(badges.filter((b) => b.unlocked).length, useEasternNumerals)} 🎖️
            </span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <section className="space-y-4 no-print">
        <h3 className="text-xl font-black text-slate-900 font-cairo text-right">
          أوسمة الشرف والتفوق الرياضي 🎖️
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border-2 text-right transition-all flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-white border-amber-300 shadow-md ring-2 ring-amber-200/50'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{badge.icon}</span>
                  {badge.unlocked ? (
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg text-xs font-black">
                      مكتمل ✓
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs flex items-center gap-1 font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>قيد القفل</span>
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-slate-900 text-sm font-cairo">
                  {badge.name}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-purple-700">
                الفئة: {badge.category}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Printable Certificate of Excellence */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between no-print">
          <h3 className="text-xl font-black text-slate-900 font-cairo text-right">
            شهادة بطلة مملكة الرياضيات 📜
          </h3>
          <button
            onClick={handlePrintCertificate}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة أو حفظ الشهادة (PDF)</span>
          </button>
        </div>

        {/* The Printable Certificate Design */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-amber-50/60 via-white to-pink-50/60 border-8 border-double border-amber-300 shadow-2xl text-center space-y-6 relative overflow-hidden print:border-4 print:p-6 print:m-0">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 right-4 text-3xl text-amber-400 select-none">🎀</div>
          <div className="absolute top-4 left-4 text-3xl text-amber-400 select-none">⭐</div>
          <div className="absolute bottom-4 right-4 text-3xl text-amber-400 select-none">🇴🇲</div>
          <div className="absolute bottom-4 left-4 text-3xl text-amber-400 select-none">👑</div>

          <div className="space-y-2">
            <span className="text-xs font-black text-amber-700 tracking-widest uppercase">
              سلطنة عُمان · وزارة التربية والتعليم · منهج كامبردج
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-cairo">
              شهادة بطلة الرياضيات الذكية 🎀
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-bold">
              تُمنح هذه الشهادة تقديرًا للتفوق والنشاط المتميز في حصص الاحتياط
            </p>
          </div>

          <div className="py-4 border-y-2 border-amber-200/80 max-w-xl mx-auto space-y-3">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-tajawal">
              تشهد منصة «مملكة الرياضيات الذكية» بأن الطالبة البطلة:
            </p>
            <div className="text-2xl sm:text-3xl font-black text-purple-900 font-cairo bg-purple-50/70 py-2 rounded-2xl border border-purple-200">
              {studentName}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              من طالبات <strong className="text-slate-900">الصف {grade === 7 ? 'السابع الأساسي' : 'الثامن الأساسي'}</strong>، قد أتمت الأنشطة الرياضية بامتياز، وجمعت{' '}
              <strong className="text-amber-600 font-black">{formatNum(stats.stars, useEasternNumerals)} نجمة ذهبية</strong> ⭐
              وأظهرت مهارات عالية في التفكير المنطقي وحل المشكلات.
            </p>
          </div>

          <div className="flex items-center justify-between max-w-lg mx-auto pt-4 text-xs font-bold text-slate-600">
            <div className="space-y-1 text-right">
              <span className="block text-slate-400">إعداد وتصميم المنصة:</span>
              <span className="text-sm font-black text-purple-900 font-cairo">
                أ. أميمة الحكماني
              </span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block text-slate-400">الختم الملكي:</span>
              <span className="text-2xl">✨ 👑 ✨</span>
            </div>
            <div className="space-y-1 text-left">
              <span className="block text-slate-400">التاريخ:</span>
              <span className="text-xs font-mono font-bold text-slate-800">
                {new Date().toLocaleDateString('ar-OM')}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
