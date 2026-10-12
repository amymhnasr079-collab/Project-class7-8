import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Gift,
  KeyRound,
  RotateCw,
  Search,
  Users,
  Clock,
  Award,
  ChevronLeft,
  Flame,
  BookOpen,
  Compass,
  Heart,
  Smile,
  Palette,
  Brain,
  Drama,
  Globe,
  Lightbulb,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { CHARACTERS, PLATFORM_INFO } from '../data/characters';
import { SCHOOL_HUB_CARDS } from '../data/schoolActivitiesData';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

export const HomeView: React.FC = () => {
  const {
    grade,
    setGrade,
    setActiveScreen,
    stats,
    useEasternNumerals,
    setSubstituteConfig,
    triggerCelebration,
  } = useMathApp();

  const [surpriseModal, setSurpriseModal] = useState<any>(null);

  const handleStartSubstitute = (minutes: 10 | 20 | 30 | 40 = 20) => {
    sound.playClick();
    setSubstituteConfig({
      grade,
      durationMinutes: minutes,
      mode: 'individual',
      gameId: 'speed-game',
    });
    setActiveScreen('substitute-mode');
  };

  const navTo = (screen: any) => {
    sound.playClick();
    setActiveScreen(screen);
  };

  const handleSurpriseMe = () => {
    sound.playSpin();
    const available = SCHOOL_HUB_CARDS.filter((c) => c.targetScreen !== 'substitute-planner');
    const pick = available[Math.floor(Math.random() * available.length)];
    setSurpriseModal(pick);
    triggerCelebration();
  };

  const lulu = CHARACTERS.lulu;
  const meera = CHARACTERS.meera;
  const jood = CHARACTERS.jood;
  const noura = CHARACTERS.noura;

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white shadow-xl shadow-purple-200/50">
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <img
            src={PLATFORM_INFO.heroImage}
            alt="خلفية مدرسة الرياضيات الخيالية"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Right Column (Arabic RTL: Leading column) */}
            <div className="lg:col-span-7 space-y-6 text-right">
              {/* Credits & Official Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold text-pink-100">
                <span> سلطنة عُمان 🇴🇲 </span>
                <span>·</span>
                <span>منهج كامبردج</span>
                <span>·</span>
                <span>{PLATFORM_INFO.creator}</span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-cairo tracking-tight leading-tight">
                  مملكة الرياضيات <span className="text-pink-200">الذكية</span> 🎀
                </h1>
                <p className="text-lg sm:text-2xl font-bold text-pink-100 font-tajawal">
                  مغامرات الأرقام وتفعيل حصص الاحتياط الممتعة
                </p>
              </div>

              {/* Lulu's Welcome Bubble */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-xl">
                <img
                  src={lulu.avatar}
                  alt={lulu.name}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-pink-300 shadow-md shrink-0"
                />
                <div className="space-y-1 text-right">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-pink-200">{lulu.name}</span>
                    <span className="text-xs text-white/70">· مرشدتكِ المدرسية</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                    «أهلًا بكِ يا بطلة الرياضيات! هل أنتِ مستعدة لخوض التحدي؟ استمتعي بحصة احتياط مشوقة مليئة بالنجوم والألغاز!»
                  </p>
                </div>
              </div>

              {/* Grade Selector & Main Action Buttons */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-bold text-pink-100">اختاري صفكِ الدراسي:</span>
                  <div className="inline-flex p-1 bg-black/20 backdrop-blur-md rounded-2xl border border-white/20">
                    <button
                      onClick={() => setGrade(7)}
                      className={`px-4 py-2 rounded-xl text-sm font-extrabold transition-all ${
                        grade === 7
                          ? 'bg-white text-purple-900 shadow-md scale-102'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      🌸 الصف السابع
                    </button>
                    <button
                      onClick={() => setGrade(8)}
                      className={`px-4 py-2 rounded-xl text-sm font-extrabold transition-all ${
                        grade === 8
                          ? 'bg-white text-purple-900 shadow-md scale-102'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      🔮 الصف الثامن
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navTo('school-world')}
                    className="px-6 py-3.5 bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 hover:from-pink-300 hover:to-indigo-200 text-slate-950 font-black rounded-2xl shadow-lg shadow-purple-900/30 hover:scale-103 transition-all flex items-center gap-2 text-base font-cairo cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-purple-900" />
                    <span>عالمي المدرسي الممتع 🎀</span>
                  </button>

                  <button
                    onClick={handleSurpriseMe}
                    className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black rounded-2xl shadow-lg hover:scale-103 transition-all flex items-center gap-2 text-base font-cairo cursor-pointer"
                  >
                    <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
                    <span>فاجئيني بفعالية ممتعة ⚡</span>
                  </button>

                  <button
                    onClick={() => handleStartSubstitute(20)}
                    className="px-5 py-3.5 bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/40 text-white font-black rounded-2xl transition-all flex items-center gap-2 text-sm font-cairo cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-pink-200" />
                    <span>تفعيل حصة الاحتياط (٢٠ د)</span>
                  </button>

                  <button
                    onClick={() => navTo('escape-castle')}
                    className="px-5 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-bold rounded-2xl transition-all flex items-center gap-2 text-sm font-cairo cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-amber-300" />
                    <span>قلعة الرياضيات</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Left Column: Characters Collage Visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
                <div className="text-center pb-4 border-b border-white/15">
                  <span className="text-xs font-black text-amber-300 tracking-wider">
                    فريق بطلات مملكة الرياضيات
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    أربعة رفيقات يرافقنكِ في كل مسألة ولغز
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {/* Lulu */}
                  <div className="p-3 rounded-2xl bg-white/15 border border-white/20 flex flex-col items-center text-center">
                    <img
                      src={lulu.avatar}
                      alt={lulu.name}
                      className="w-16 h-16 rounded-2xl object-cover mb-2 border-2 border-pink-300 shadow-md"
                    />
                    <span className="font-bold text-sm text-pink-200">{lulu.name}</span>
                    <span className="text-[11px] text-white/80">{lulu.role}</span>
                  </div>

                  {/* Meera */}
                  <div className="p-3 rounded-2xl bg-white/15 border border-white/20 flex flex-col items-center text-center">
                    <img
                      src={meera.avatar}
                      alt={meera.name}
                      className="w-16 h-16 rounded-2xl object-cover mb-2 border-2 border-purple-300 shadow-md"
                    />
                    <span className="font-bold text-sm text-purple-200">{meera.name}</span>
                    <span className="text-[11px] text-white/80">{meera.role}</span>
                  </div>

                  {/* Jood */}
                  <div className="p-3 rounded-2xl bg-white/15 border border-white/20 flex flex-col items-center text-center">
                    <img
                      src={jood.avatar}
                      alt={jood.name}
                      className="w-16 h-16 rounded-2xl object-cover mb-2 border-2 border-teal-300 shadow-md"
                    />
                    <span className="font-bold text-sm text-teal-200">{jood.name}</span>
                    <span className="text-[11px] text-white/80">{jood.role}</span>
                  </div>

                  {/* Teacher Noura */}
                  <div className="p-3 rounded-2xl bg-white/15 border border-white/20 flex flex-col items-center text-center">
                    <img
                      src={noura.avatar}
                      alt={noura.name}
                      className="w-16 h-16 rounded-2xl object-cover mb-2 border-2 border-amber-300 shadow-md"
                    />
                    <span className="font-bold text-sm text-amber-200">{noura.name}</span>
                    <span className="text-[11px] text-white/80">{noura.role}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/15 text-center">
                  <span className="text-xs text-white/90 font-medium">
                    ✨ النجوم المجمعة: <strong className="text-amber-300 text-sm">{formatNum(stats.stars, useEasternNumerals)}</strong> ⭐
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Launch: Substitute Class Special Launcher */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-600 font-black text-sm">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>وضع حصة احتياط ممتعة (جاهز للتطبيق فورًا)</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-cairo">
              كيف ترغبين في تفعيل حصة الاحتياط اليوم؟
            </h2>
            <p className="text-slate-600 text-sm">
              أنشطة تعليمية ذاتية تهدف لاستثمار الحصة بالكامل وفق منهج كامبردج بدون الحاجة لشرح مطوّل.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">المدة المقترحة:</span>
            {[10, 20, 30, 40].map((mins) => (
              <button
                key={mins}
                onClick={() => handleStartSubstitute(mins as any)}
                className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-black rounded-xl border border-purple-200 transition-all hover:scale-105"
              >
                {formatNum(mins, useEasternNumerals)} دقيقة
              </button>
            ))}
          </div>
        </div>

        {/* 3 Main Experience Modes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div
            onClick={() => {
              setSubstituteConfig({
                grade,
                durationMinutes: 20,
                mode: 'individual',
                gameId: 'speed-game',
              });
              setActiveScreen('substitute-mode');
            }}
            className="p-5 rounded-2xl bg-pink-50/70 border border-pink-200 hover:border-pink-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
              👤
            </div>
            <h3 className="font-extrabold text-slate-900 text-base font-cairo mb-1">
              الوضع الفردي الذاتي
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-3">
              تخوض كل طالبة المغامرة على جهازها (آيباد أو هاتف أو حاسوب) وتجمع نجومها الخاصة.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-pink-700">
              <span>بدء النشاط الفردي</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => {
              setSubstituteConfig({
                grade,
                durationMinutes: 30,
                mode: 'teams',
                gameId: 'team-challenge',
                teamCount: 3,
              });
              setActiveScreen('team-challenge');
            }}
            className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
              👥
            </div>
            <h3 className="font-extrabold text-slate-900 text-base font-cairo mb-1">
              وضع تحدي المجموعات
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-3">
              تقسيم طالبات الصف إلى فرق تنافسية (فريق الزهور، فريق النجوم، فريق العباقرة) وتداول الإجابات.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-purple-700">
              <span>بدء التحدي الجماعي</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => {
              setSubstituteConfig({
                grade,
                durationMinutes: 40,
                mode: 'projector',
                gameId: 'speed-game',
              });
              setActiveScreen('substitute-mode');
            }}
            className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
              📽️
            </div>
            <h3 className="font-extrabold text-slate-900 text-base font-cairo mb-1">
              وضع شاشة العرض والسبورة الذكية
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-3">
              عرض بصرية واضحة للخط الكبير على جهاز العرض (البروجكتر) لمشاركة الصف بأكمله معًا.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-700">
              <span>عرض ملء الشاشة للصف</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Games Grid: 7 Educational Games */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-cairo">
              ألعاب وتحديات مملكة الرياضيات 🎀
            </h2>
            <p className="text-slate-600 text-sm">
              ألعاب مصممة خصيصًا لتنمية مهارات التفكير والاستدلال في منهج كامبردج للصف {grade === 7 ? 'السابع' : 'الثامن'}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
            <span>الصف الحالي: الصف {grade === 7 ? 'السابع 🌸' : 'الثامن 🔮'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {/* Game 1: Speed Challenge */}
          <div
            onClick={() => navTo('speed-game')}
            className="bg-white rounded-3xl p-5 border border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center text-2xl shadow-md shadow-pink-200 group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <div>
                <span className="text-[11px] font-bold text-pink-600 uppercase">سرعة ودقة الحساب</span>
                <h3 className="text-lg font-black text-slate-900 font-cairo">
                  لعبة «من الأسرع؟»
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                أسئلة اختيار من متعدد مع مؤقت اختياري ومستويات ثلاثية (نجمة البداية، التحدي، والعبقرية) مع نقاط فورية.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-pink-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                العب الآن ⚡
              </span>
              <span className="text-[11px] font-semibold text-slate-500">٣ مستويات صعوبة</span>
            </div>
          </div>

          {/* Game 2: Spot the Error */}
          <div
            onClick={() => navTo('spot-error')}
            className="bg-white rounded-3xl p-5 border border-teal-200 hover:border-teal-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white flex items-center justify-center text-2xl shadow-md shadow-teal-200 group-hover:scale-105 transition-transform">
                🎯
              </div>
              <div>
                <span className="text-[11px] font-bold text-teal-600 uppercase">برفقة المحققة جود</span>
                <h3 className="text-lg font-black text-slate-900 font-cairo">
                  لعبة «اكتشفي الخطأ»
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                حلول جاهزة تحتوي على أخطاء مقصودة شائعة! حددي موضع الخطأ واكتشفي طريقة التصحيح الرياضي السليم.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                صيدي الأخطاء 🎯
              </span>
              <span className="text-[11px] font-semibold text-slate-500">تفكير نقدي</span>
            </div>
          </div>

          {/* Game 3: Mystery Boxes */}
          <div
            onClick={() => navTo('mystery-boxes')}
            className="bg-white rounded-3xl p-5 border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center text-2xl shadow-md shadow-purple-200 group-hover:scale-105 transition-transform">
                🎁
              </div>
              <div>
                <span className="text-[11px] font-bold text-purple-600 uppercase">مفاجآت ونجوم براقة</span>
                <h3 className="text-lg font-black text-slate-900 font-cairo">
                  لعبة «صندوق المفاجآت»
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                ٦ صناديق سحرية ملونة تحتوي على مسائل غامضة وألغاز فريدة تمنح نجومًا وجواهر عند حلها.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                افتحي الصناديق 🎁
              </span>
              <span className="text-[11px] font-semibold text-slate-500">٦ صناديق</span>
            </div>
          </div>

          {/* Game 4: Escape the Castle */}
          <div
            onClick={() => navTo('escape-castle')}
            className="bg-white rounded-3xl p-5 border border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center text-2xl shadow-md shadow-amber-200 group-hover:scale-105 transition-transform">
                🏰
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-600 uppercase">قصة ومغامرة تشويقية</span>
                <h3 className="text-lg font-black text-slate-900 font-cairo">
                  الهروب من قلعة الرياضيات
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                أربعة أبواب سحرية مغلقة لا يُفتح كل باب إلا بحل مسألة تدرجًا من السهل للأصعب مع تلميحات أ. نورة!
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                افتحي الأبواب 🗝️
              </span>
              <span className="text-[11px] font-semibold text-slate-500">٤ أبواب سحرية</span>
            </div>
          </div>

          {/* Game 5: Lucky Wheel */}
          <div
            onClick={() => navTo('lucky-wheel')}
            className="bg-white rounded-3xl p-5 border border-fuchsia-200 hover:border-fuchsia-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-pink-500 text-white flex items-center justify-center text-2xl shadow-md shadow-fuchsia-200 group-hover:scale-105 transition-transform">
                🎡
              </div>
              <div>
                <span className="text-[11px] font-bold text-fuchsia-600 uppercase">تحديات عشوائية مرحة</span>
                <h3 className="text-lg font-black text-slate-900 font-cairo">
                  عجلة الحظ الرياضية
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                أديري العجلة لتختار لكِ تحديًا عشوائيًا: أسئلة سريعة، ألغاز ذهنية، تحديات هندسية ومضاعفة نقاط!
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-fuchsia-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                أديري العجلة 🎡
              </span>
              <span className="text-[11px] font-semibold text-slate-500">٨ تحديات</span>
            </div>
          </div>

          {/* Game 6: Math Detective */}
          <div
            onClick={() => navTo('detective')}
            className="bg-white rounded-3xl p-5 border border-sky-200 hover:border-sky-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-500 text-white flex items-center justify-center text-2xl shadow-md shadow-sky-200 group-hover:scale-105 transition-transform">
                🔍
              </div>
              <div>
                <span className="text-[11px] font-bold text-sky-600 uppercase">سياق عُماني واقعي 🇴🇲</span>
                <h3 className="text-lg font-black text-slate-900 font-cairo">
                  المحققة الرياضية
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                اجمعي الأدلة في مواقف حياتية عُمانية (سوق نزوى، فلج دارس، مهرجان مسقط، زخارف الخنجر الفضي).
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-sky-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                حلّي القضايا 🔍
              </span>
              <span className="text-[11px] font-semibold text-slate-500">٤ قضايا عُمانية</span>
            </div>
          </div>

          {/* Game 7: Team Challenge */}
          <div
            onClick={() => navTo('team-challenge')}
            className="bg-white rounded-3xl p-5 border border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center text-2xl shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
                👥
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase">تعاون وحماس جماعي</span>
                <h3 className="text-lg font-black text-slate-900 font-cairo">
                  لعبة «تحدي الفرق»
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                تقسيم الطالبات لفرق افتراضية، تداول الأدوار، احتساب النقاط، وتشجيع تبادل استراتيجيات الحل.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                انطلقي للتنافس 👥
              </span>
              <span className="text-[11px] font-semibold text-slate-500">٢ إلى ٤ فرق</span>
            </div>
          </div>

          {/* Special Hub Card: Teacher & Achievements */}
          <div
            onClick={() => navTo('achievements')}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-5 border border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-white flex items-center justify-center text-2xl shadow-md shadow-amber-200 group-hover:scale-105 transition-transform">
                🏆
              </div>
              <div>
                <span className="text-[11px] font-bold text-purple-700 uppercase">سجل الشرف والبطولات</span>
                <h3 className="text-lg font-black text-slate-900 font-cairo">
                  إنجازاتي وأوسمتي
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                تابعي تقدمكِ في المملكة، أوسمة التفوق، شهادة بطلة الرياضيات القابلة للطباعة باسمكِ!
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-bold text-purple-800 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                عرض سجل الشرف 🏆
              </span>
              <span className="text-[11px] font-semibold text-amber-700 font-bold">شهادة تقدير 📜</span>
            </div>
          </div>
        </div>
      </section>

      {/* NEW EXPANDED SECTION: «عالمي المدرسي الممتع» */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
          <div className="space-y-1 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
              <span>تطوير الأنشطة المدرسية وحصص الاحتياط 🇴🇲</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-cairo">
              عالمي المدرسي الممتع 🎀
            </h2>
            <p className="text-pink-100 text-xs sm:text-sm max-w-xl">
              ١٦ ركنًا تفاعليًا للرسم، الألغاز، مسرح المواهب، الإلقاء، المعرفة العامة، والأنشطة الإيجابية الصفية!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 font-cairo cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>فاجئيني بفعالية ممتعة ⚡</span>
            </button>
            <button
              type="button"
              onClick={() => navTo('school-world')}
              className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>فتح المركز بالكامل</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 16 Hub Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SCHOOL_HUB_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => navTo(card.targetScreen)}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group text-right"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-3xl group-hover:scale-120 transition-transform">
                    {card.icon}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700">
                    {card.duration}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">
                    {card.category}
                  </span>
                  <h3 className="font-black text-base text-slate-900 font-cairo group-hover:text-purple-700 transition-colors">
                    {card.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>ابدئي الآن</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {card.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Surprise Me Modal */}
      {surpriseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl border-4 border-amber-300 relative overflow-hidden">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-pink-500 text-white flex items-center justify-center text-4xl shadow-xl animate-bounce">
              {surpriseModal.icon}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest block">
                مفاجأة اليوم المختارة لكِ! ⚡
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-cairo">
                {surpriseModal.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {surpriseModal.description}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  const target = surpriseModal.targetScreen;
                  setSurpriseModal(null);
                  navTo(target);
                }}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm rounded-2xl shadow-lg hover:scale-105 transition-all font-cairo cursor-pointer"
              >
                انطلقي للفعالية الآن 🚀
              </button>
              <button
                type="button"
                onClick={() => setSurpriseModal(null)}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Units Overview Banner */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <span className="text-xs font-bold text-pink-300 tracking-wider">
              مواءمة منهج كامبردج المعتمد في سلطنة عُمان 🇴🇲
            </span>
            <h3 className="text-2xl font-black font-cairo">
              وحدات الصف {grade === 7 ? 'السابع الأساسي' : 'الثامن الأساسي'}
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {grade === 7
                ? 'العمليات الحسابية وترتيبها · الكسور والنسب المئوية · النسبة والتناسب · المقادير الجبرية · زوايا المضلعات والمثلثات · المساحة والمحيط · تمثيل البيانات.'
                : 'الأعداد الصحيحة والقوى والجذور · التغير المئوي والتخفيضات · المعادلات والمتباينات الخطية · الأنماط والحد النوني · زوايا المضلعات · الحجم ومساحة السطح · الإحصاء والاحتمالات.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navTo('teacher-dashboard')}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center gap-2"
            >
              <span>دخول لوحة المعلمة</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
