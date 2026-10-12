import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  ArrowRight,
  Printer,
  Copy,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronLeft,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { generateSubstitutePlan } from '../data/schoolActivitiesData';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

export const SubstitutePlannerView: React.FC = () => {
  const { grade, setGrade, setActiveScreen, useEasternNumerals } = useMathApp();

  const [duration, setDuration] = useState<number>(20);
  const [activityType, setActivityType] = useState<'calm' | 'active' | 'creative'>('calm');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const plan = generateSubstitutePlan(grade, duration, activityType);

  const handleCopyPlan = () => {
    sound.playClick();
    const text = `خطة حصة احتياط جاهزة (${plan.durationMinutes} دقيقة) - الصف ${plan.grade}\n\nالعنوان: ${plan.title}\n\nالتهيئة: ${plan.introHook}\n\nالنشاط الرئيسي: ${plan.mainActivity}\n\nتوزيع الوقت:\n${plan.stageTiming.map((s) => `- ${s.stage}: ${s.minutes} دقيقة`).join('\n')}\n\nتحدي إضافي: ${plan.bonusChallenge}\n\nالختام: ${plan.celebrationWrapUp}`;
    navigator.clipboard?.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
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

        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-xl border border-indigo-200">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>منظّم حصص الاحتياط الشامل ⏰</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              ⏱️
            </span>
            <h2 className="text-2xl font-black font-cairo">منظّم حصة الاحتياط الذكي</h2>
          </div>
          <p className="text-indigo-100 text-xs sm:text-sm">
            توليد خطة صفية تربوية متكاملة بضغطة زر تناسب الوقت والصف ونوع النشاط المطلوب!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyPlan}
            className="px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-2xl border border-white/25 text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{isCopied ? 'تم النسخ بنجاح! ✅' : 'نسخ الخطة'}</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-2xl border border-white/25 text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة</span>
          </button>
        </div>
      </div>

      {/* Configuration Selectors */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-md space-y-6 text-right">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Grade */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-600 block">١. الصف الدراسي:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGrade(7)}
                className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  grade === 7
                    ? 'bg-pink-500 text-white shadow-xs font-black'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                الصف السابع 🌸
              </button>
              <button
                type="button"
                onClick={() => setGrade(8)}
                className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  grade === 8
                    ? 'bg-purple-600 text-white shadow-xs font-black'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                الصف الثامن 🔮
              </button>
            </div>
          </div>

          {/* Duration */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-600 block">٢. وقت الحصة المتاح:</span>
            <div className="grid grid-cols-4 gap-1.5">
              {[10, 20, 30, 40].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setDuration(m)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    duration === m
                      ? 'bg-indigo-600 text-white shadow-xs font-black'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {formatNum(m, useEasternNumerals)} د
                </button>
              ))}
            </div>
          </div>

          {/* Activity Nature */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-600 block">٣. طابع الحصة المرغوب:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'calm', label: 'هدوء وتركيز 🌸' },
                { id: 'active', label: 'حماس ومنافسة ⚡' },
                { id: 'creative', label: 'مرسم وإبداع 🎨' },
              ].map((act) => (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => setActivityType(act.id as any)}
                  className={`py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    activityType === act.id
                      ? 'bg-indigo-600 text-white shadow-xs font-black'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Lesson Plan Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-indigo-200 shadow-xl space-y-6 text-right">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
              خطة جاهزة للتنفيذ الفوري ({formatNum(plan.durationMinutes, useEasternNumerals)} دقيقة)
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-cairo mt-1">
              {plan.title}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-bold">
            الصف {plan.grade === 7 ? 'السابع' : 'الثامن'} · سلطنة عُمان 🇴🇲
          </span>
        </div>

        {/* Stages Timeline */}
        <div className="space-y-3">
          <h4 className="text-sm font-black text-slate-900 font-cairo flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>المراحل الزمنية المقترحة للحصة:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {plan.stageTiming.map((stg, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                    {formatNum(i + 1, useEasternNumerals)}
                  </span>
                  <span className="text-xs font-black text-indigo-700">
                    {formatNum(stg.minutes, useEasternNumerals)} دقيقة
                  </span>
                </div>
                <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 pt-1">
                  {stg.stage}
                </h5>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Plan Breakdown */}
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-xs font-black text-slate-600 block">التهيئة الجاذبة والترحيب:</strong>
            <p className="text-sm text-slate-800 leading-relaxed">{plan.introHook}</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
            <strong className="text-xs font-black text-purple-900 block">النشاط التعليمي الرئيسي:</strong>
            <p className="text-sm text-purple-950 leading-relaxed font-bold">{plan.mainActivity}</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
            <strong className="text-xs font-black text-amber-900 block">تحدي إضافي للمتميزات:</strong>
            <p className="text-sm text-amber-950 leading-relaxed">{plan.bonusChallenge}</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <strong className="text-xs font-black text-emerald-900 block">الختام والتعزيز الصفي:</strong>
            <p className="text-sm text-emerald-950 leading-relaxed">{plan.celebrationWrapUp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
