import React, { useState } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Send,
  HelpCircle,
  Star,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { INNOVATION_SCENARIOS, InnovationScenario } from '../data/schoolActivitiesData';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

export const InnovationLabView: React.FC = () => {
  const { setActiveScreen, addStars, triggerCelebration, useEasternNumerals } = useMathApp();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [studentIdea, setStudentIdea] = useState<string>('');
  const [submittedIdeas, setSubmittedIdeas] = useState<Record<string, string>>({});

  const scenarios = INNOVATION_SCENARIOS;
  const currentScen: InnovationScenario = scenarios[activeIndex];

  const handleSubmitIdea = () => {
    if (!studentIdea.trim()) return;
    sound.playCorrect();
    setSubmittedIdeas((prev) => ({ ...prev, [currentScen.id]: studentIdea.trim() }));
    addStars(10, `ابتكار حل لـ ${currentScen.title}`);
    triggerCelebration();
    setStudentIdea('');
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

        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>مختبر الابتكار والتفكير الإبداعي 💡</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              💡
            </span>
            <h2 className="text-2xl font-black font-cairo">مختبر الابتكار وحل المشكلات</h2>
          </div>
          <p className="text-amber-100 text-xs sm:text-sm">
            سيناريوهات واقعية وتحديات تصميمية تشجع التفكير المرن وحلول المستقبل!
          </p>
        </div>

        <div className="text-xs bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center font-bold">
          <span>عقول تصنع الغد 🚀</span>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {scenarios.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => {
              sound.playClick();
              setActiveIndex(idx);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeIndex === idx
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Scenario Workbench Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-md space-y-6 text-right">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-xl">
            {currentScen.title}
          </span>
          <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>الوقت المقترح: {formatNum(currentScen.timeMinutes, useEasternNumerals)} دقيقة</span>
          </span>
        </div>

        {/* Problem Description */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
          <span className="text-xs font-black text-amber-900 block">المشكلة والتحدي:</span>
          <p className="text-base font-bold text-slate-900 font-cairo leading-relaxed">
            {currentScen.problem}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          <span className="text-xs font-black text-slate-700 block">خطوات التنفيذ المقترحة:</span>
          <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
            {currentScen.steps.map((st, i) => (
              <li key={i}>{st}</li>
            ))}
          </ul>
        </div>

        {/* Deliverable info */}
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 font-bold">
          🎯 <strong>المخرج المطلوب:</strong> {currentScen.deliverable}
        </div>

        {/* Input for student's innovative idea */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 block">
            اكتبي فكرتكِ الابتكارية أو وصفتكِ للحل:
          </label>
          <textarea
            rows={4}
            value={studentIdea}
            onChange={(e) => setStudentIdea(e.target.value)}
            placeholder="صفي فكرتكِ، اسم الأداة أو الحل، وكيف يحل المشكلة..."
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:border-amber-500 outline-hidden leading-relaxed"
          />

          <div className="flex justify-end pt-1">
            <button
              disabled={!studentIdea.trim()}
              onClick={handleSubmitIdea}
              className={`px-6 py-2.5 rounded-xl font-black text-xs font-cairo flex items-center gap-1.5 transition-all cursor-pointer ${
                studentIdea.trim()
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال الفكرة للمختبر (+١٠ نجوم ⭐)</span>
            </button>
          </div>
        </div>

        {/* Submitted Idea Preview */}
        {submittedIdeas[currentScen.id] && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 animate-fadeIn">
            <span className="text-xs font-black text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>فكرتكِ المسجلة بنجاح:</span>
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              «{submittedIdeas[currentScen.id]}»
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
