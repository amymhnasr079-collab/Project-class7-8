import React, { useState, useEffect } from 'react';
import {
  Heart,
  Smile,
  Sparkles,
  ArrowRight,
  Wind,
  CheckCircle2,
  RefreshCw,
  Sun,
  Star,
  Quote,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { sound } from '../utils/sound';
import { formatTime, formatNum } from '../utils/arabicUtils';

export const WellnessCornerView: React.FC = () => {
  const { setActiveScreen, addStars, triggerCelebration, useEasternNumerals } = useMathApp();

  // Mood selection
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Breathing exercise (1 minute)
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathTimerSeconds, setBreathTimerSeconds] = useState<number>(60);

  // Random positive affirmation
  const affirmations = [
    '«أنتِ قادرة على فهم أصعب المسائل بفضل تركيزكِ وإصراركِ!»',
    '«ذكاؤكِ ينمو مع كل محاولة وكل خطأ تتعلمين منه!»',
    '«ابتسامتكِ اليوم تضيء يوم زميلاتكِ وتنشر المحبة في الصف.»',
    '«أنتِ فخر لوطنكِ عُمان 🇴🇲، ومستقبلكِ مشرق بالنجاح!»',
    '«الهدوء والسكينة هما مفتاح التفكير الصافي والإبداع.»',
  ];
  const [activeAffirmation, setActiveAffirmation] = useState<string>(affirmations[0]);

  // Gratitude choices
  const [gratitudeChoice, setGratitudeChoice] = useState<string | null>(null);

  // Breathing timer & phases
  useEffect(() => {
    let interval: any = null;
    if (isBreathing && breathTimerSeconds > 0) {
      interval = setInterval(() => {
        setBreathTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsBreathing(false);
            sound.playFanfare();
            triggerCelebration();
            addStars(10, 'دقيقة تنفس وهدوء');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathTimerSeconds]);

  // Phase cycle (inhale 4s, hold 4s, exhale 4s)
  useEffect(() => {
    let phaseTimer: any = null;
    if (isBreathing) {
      phaseTimer = setInterval(() => {
        setBreathPhase((current) => {
          if (current === 'inhale') return 'hold';
          if (current === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 4000);
    }
    return () => clearInterval(phaseTimer);
  }, [isBreathing]);

  const moods = [
    { id: 'happy', emoji: '😊', label: 'سعيدة ومتحمسة' },
    { id: 'calm', emoji: '🌿', label: 'هادئة ومسترخية' },
    { id: 'thoughtful', emoji: '💭', label: 'أفكر بتركيز' },
    { id: 'tired', emoji: '😴', label: 'أحتاج طاقة واستراحة' },
    { id: 'optimistic', emoji: '✨', label: 'متفائلة ومقبلة' },
  ];

  const gratitudeItems = [
    { id: 'family', label: 'دفء عائلتي ومحبتهم 🏡' },
    { id: 'friends', label: 'وفاء صديقاتي وضحكاتنا 👭' },
    { id: 'health', label: 'نعمة العافية والصحة النشطة 🌸' },
    { id: 'oman', label: 'أمن وأمان وطني الغالي عُمان 🇴🇲' },
    { id: 'teacher', label: 'عطاء معلماتنا المخلصات 📚' },
  ];

  const handleStartBreathing = () => {
    sound.playClick();
    setBreathTimerSeconds(60);
    setIsBreathing(true);
    setBreathPhase('inhale');
  };

  const handleNextAffirmation = () => {
    sound.playClick();
    const next = affirmations[Math.floor(Math.random() * affirmations.length)];
    setActiveAffirmation(next);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveScreen('school-world')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 text-sm shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لعالمي المدرسي</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-rose-800 bg-rose-50 px-3.5 py-1.5 rounded-xl border border-rose-200">
          <Heart className="w-4 h-4 text-rose-600" />
          <span>ركن السعادة والطاقة الإيجابية 🌸</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🌸
            </span>
            <h2 className="text-2xl font-black font-cairo">واحة السعادة والهدوء الصفي</h2>
          </div>
          <p className="text-pink-100 text-xs sm:text-sm">
            دقائق لتجديد النشاط، التنفس المنعش، استشعار الامتنان، وشحن الطاقة الإيجابية!
          </p>
        </div>

        <div className="text-xs bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center font-bold">
          <span>«ابتسامتكِ تصنع يومكِ» ✨</span>
        </div>
      </div>

      {/* 1. Mood Tracker Card */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm space-y-4 text-right">
        <h3 className="font-black text-slate-900 text-lg font-cairo">
          كيف هو مزاجكِ اليوم يا بطلة؟ 🌤️
        </h3>
        <p className="text-xs text-slate-500">
          اختاري مشاعركِ الحالية؛ كل المشاعر مقبولة ولها مساحة دافئة في مملكتنا:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                sound.playClick();
                setSelectedMood(m.id);
                addStars(3, 'تسجيل المزاج اليومي');
              }}
              className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                selectedMood === m.id
                  ? 'bg-pink-100 border-pink-500 text-pink-950 scale-105 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-pink-50/50'
              }`}
            >
              <span className="text-3xl block mb-1">{m.emoji}</span>
              <span className="text-xs font-bold block">{m.label}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="p-3 bg-pink-50 rounded-xl border border-pink-200 text-xs text-pink-900 font-bold animate-fadeIn">
            ✨ شكرًا لمشاركتكِ! تذكري أن كل يوم يحمل فرصة مشرقة للتألق والسعادة!
          </div>
        )}
      </div>

      {/* 2. 1-Minute Mindful Breathing Exercise */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md space-y-6 text-center">
        <div className="space-y-1">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl">
            تمرين صفاء الذهن
          </span>
          <h3 className="text-2xl font-black text-slate-900 font-cairo">
            دقيقة تنفس هادئة 🌬️
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            أغمضي عينيكِ قليلًا، واتبعي الدائرة الهادئة لتجديد الأكسجين وتصفية التفكير.
          </p>
        </div>

        {/* Breathing Animation Circle */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
          <div
            className={`w-full h-full rounded-full bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 transition-all duration-4000 flex items-center justify-center shadow-xl ${
              isBreathing && breathPhase === 'inhale'
                ? 'scale-120 opacity-90'
                : isBreathing && breathPhase === 'hold'
                ? 'scale-115 opacity-100 ring-8 ring-purple-200'
                : isBreathing && breathPhase === 'exhale'
                ? 'scale-85 opacity-70'
                : 'scale-100 opacity-80'
            }`}
          >
            <div className="w-32 h-32 rounded-full bg-white text-slate-900 flex flex-col items-center justify-center shadow-md p-2">
              <span className="text-xs font-black text-purple-700 font-cairo">
                {isBreathing
                  ? breathPhase === 'inhale'
                    ? 'شهيق عميق 🌸'
                    : breathPhase === 'hold'
                    ? 'حبس هادئ ⏸️'
                    : 'زفير بطيء 🍃'
                  : 'جاهزة؟'}
              </span>
              <span className="text-sm font-bold text-slate-400 font-mono mt-1">
                {formatTime(breathTimerSeconds, useEasternNumerals)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          {!isBreathing ? (
            <button
              onClick={handleStartBreathing}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs font-cairo rounded-2xl shadow-md transition-all cursor-pointer"
            >
              بدء دقيقة التنفس (٦٠ ثانية) 🌬️
            </button>
          ) : (
            <button
              onClick={() => setIsBreathing(false)}
              className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
            >
              إيقاف التمرين
            </button>
          )}
        </div>
      </div>

      {/* 3. Gratitude & Kindness Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Gratitude Choice */}
        <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm text-right space-y-3">
          <h4 className="font-black text-slate-900 text-base font-cairo">
            ما الذي تشعرين بالامتنان له اليوم؟ 💖
          </h4>
          <div className="space-y-2">
            {gratitudeItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setGratitudeChoice(item.id);
                  addStars(3, 'تسجيل الامتنان');
                }}
                className={`w-full p-3 rounded-xl border text-right font-bold text-xs transition-all cursor-pointer ${
                  gratitudeChoice === item.id
                    ? 'bg-amber-100 border-amber-400 text-amber-950 font-black'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Affirmation Card */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200 shadow-sm text-right space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-xl inline-block">
              رسالة اليوم الإيجابية 💌
            </span>
            <p className="text-base font-black text-purple-950 font-cairo leading-relaxed pt-2">
              {activeAffirmation}
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNextAffirmation}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>رسالة ملهمة أخرى ✨</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
