import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Heart,
  Award,
  Star,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { sound } from '../utils/sound';

interface SchoolEvent {
  id: string;
  title: string;
  icon: string;
  color: string;
  dateStr: string;
  badge: string;
  description: string;
  activities: string[];
  inspirationalQuote: string;
}

const EVENTS: SchoolEvent[] = [
  {
    id: 'national-day',
    title: 'العيد الوطني العماني المجيد 🇴🇲',
    icon: '🇴🇲',
    color: 'from-red-600 via-emerald-600 to-white',
    dateStr: '١٨ نوفمبر',
    badge: 'فخر واعتزاز وطني',
    description: 'احتفال بمسيرة النهضة العمانية المباركة وبانيها وتجدد العطاء بقيادة جلالة السلطان هيثم بن طارق المعظم حفظه الله.',
    activities: [
      'مسابقة معلومات وطنية عن محافظات وقلاع عُمان التاريخية.',
      'كتابة رسالة حب وولاء للوطن في لوحة شرف الصف.',
      'إنشاد السلام السلطاني وتكريم المواهب الوطنية.',
    ],
    inspirationalQuote: '«عُمان في قلوبنا، نبني مجدها بالعلم والإخلاص وحسن الخلق.»',
  },
  {
    id: 'women-day',
    title: 'يوم المرأة العمانية 🌸',
    icon: '🌸',
    color: 'from-pink-500 to-rose-400',
    dateStr: '١٧ أكتوبر',
    badge: 'شريكة البناء والتنمية',
    description: 'تقدير لمكانة المرأة العمانية وطالبات اليوم وبطلات المستقبل في ميادين العلم والعمل.',
    activities: [
      'استعراض سير رائدات عُمانيات في الطب والهندسة والآداب.',
      'بطاقة شكر وتقدير لأمهاتنا ومعلماتنا الفاضلات.',
      'تحدي: ماذا ستكونين بعد عشر سنوات لتخدمي عُمان؟',
    ],
    inspirationalQuote: '«المرأة العمانية صانعة أجيال وشريكة فاعلة في نهضة الوطن المتجددة.»',
  },
  {
    id: 'teachers-day',
    title: 'يوم المعلم العماني 👩‍🏫',
    icon: '📚',
    color: 'from-purple-600 to-indigo-600',
    dateStr: '٢٤ فبراير',
    badge: 'منارة العلم والوفاء',
    description: 'وقفة إجلال وشكر لمعلماتنا اللاتي يضئن دروب العلم ويبنين عقول المستقبل.',
    activities: [
      'صناعة بطاقة شكر إلكترونية لمعلمة الرياضيات وسائر المواد.',
      'إلقاء قصيدة شعرية أو كلمة وفاء قصيرة في دقيقة واحدة.',
      'مبادرة "صفنا هادئ ومنظم" تقديرًا لجهود المعلمات.',
    ],
    inspirationalQuote: '«قُم لِلمُعَلِّمِ وَفِّهِ التَبجيلا كادَ المُعَلِّمُ أَن يَكونَ رَسولا.»',
  },
  {
    id: 'friendship-day',
    title: 'يوم الصداقة والتعاون المدرسي 💖',
    icon: '🤝',
    color: 'from-teal-500 to-cyan-500',
    dateStr: 'فعالية دورية صفية',
    badge: 'تآلف وإيجابية',
    description: 'تعزيز أواصر المحبة والتعاون الصادق ونبذ الخلافات وبث الطاقة الإيجابية في المدرسة.',
    activities: [
      'لعبة "الرسالة السرية الطيبة" بين الصديقات.',
      'تحدي مساعدة زميلة في فهم مسألة رياضية صعبة.',
      'شجرة الصداقة الورقية في زاوية الفصل.',
    ],
    inspirationalQuote: '«الصداقة الصادقة كنز مدرسي يدوم مدى الحياة.»',
  },
];

export const SchoolEventsView: React.FC = () => {
  const { setActiveScreen, addStars, triggerCelebration } = useMathApp();

  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const activeEvent = EVENTS[activeEventIndex];

  const handleToggleActivity = (actText: string) => {
    sound.playClick();
    if (completedActivities.includes(actText)) {
      setCompletedActivities((p) => p.filter((x) => x !== actText));
    } else {
      setCompletedActivities((p) => [...p, actText]);
      addStars(3, 'إتمام فعالية مدرسية');
      triggerCelebration();
    }
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

        <div className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 px-3.5 py-1.5 rounded-xl border border-rose-200">
          <Calendar className="w-4 h-4 text-rose-600" />
          <span>فعاليات المناسبات المدرسية 🎉</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-red-500 to-emerald-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🎉
            </span>
            <h2 className="text-2xl font-black font-cairo">المناسبات والاحتفالات المدرسية</h2>
          </div>
          <p className="text-rose-100 text-xs sm:text-sm">
            أفكار وأنشطة جاهزة للاحتفاء بالمناسبات الوطنية والتربوية في سلطنة عُمان 🇴🇲
          </p>
        </div>

        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center font-bold text-xs text-amber-200">
          <span>روح وطنية وتربوية 🌟</span>
        </div>
      </div>

      {/* Events Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {EVENTS.map((ev, idx) => (
          <button
            key={ev.id}
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveEventIndex(idx);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeEventIndex === idx
                ? 'bg-rose-600 text-white shadow-md font-black scale-102'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <span>{ev.icon}</span>
            <span>{ev.title}</span>
          </button>
        ))}
      </div>

      {/* Event Details Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-md space-y-6 text-right">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-xl">
              {activeEvent.badge} · {activeEvent.dateStr}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-cairo mt-1">
              {activeEvent.title}
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-slate-700">
          {activeEvent.description}
        </p>

        {/* Suggested Activities Checklist */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-black text-slate-900 font-cairo">
            أنشطة تفاعلية مقترحة للحصة أو الإذاعة المدرسية:
          </h4>
          <div className="space-y-2">
            {activeEvent.activities.map((act, i) => {
              const isDone = completedActivities.includes(act);
              return (
                <div
                  key={i}
                  onClick={() => handleToggleActivity(act)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm">{act}</span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isDone ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-extrabold text-amber-950 leading-relaxed font-tajawal">
            {activeEvent.inspirationalQuote}
          </p>
        </div>
      </div>
    </div>
  );
};
