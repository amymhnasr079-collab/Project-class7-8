import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Clock,
  Compass,
  Zap,
  ArrowRight,
  ChevronLeft,
  Flame,
  Award,
  Heart,
  Smile,
  Gift,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { SCHOOL_HUB_CARDS } from '../data/schoolActivitiesData';
import { CHARACTERS } from '../data/characters';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

export const SchoolWorldHub: React.FC = () => {
  const {
    grade,
    setActiveScreen,
    useEasternNumerals,
    triggerCelebration,
  } = useMathApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [surpriseModalOpen, setSurpriseModalOpen] = useState<boolean>(false);
  const [randomPick, setRandomPick] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'جميع الأنشطة 🌟' },
    { id: 'فنون ورسم', label: 'مرسم وإبداع 🎨' },
    { id: 'تفكير وتركيز', label: 'ذكاء وألغاز 🧠' },
    { id: 'إلقاء وتعبير', label: 'مسرح ومواهب 🎭' },
    { id: 'تفاعل جماعي', label: 'ألعاب جماعية 🎲' },
    { id: 'ثقافة ومعرفة', label: 'اكتشفي العالم 🌍' },
    { id: 'صحة نفسية وهدوء', label: 'طاقة إيجابية 🌸' },
    { id: 'أداة للمعلمة', label: 'منظّم الاحتياط ⏰' },
  ];

  const filteredCards = SCHOOL_HUB_CARDS.filter((card) => {
    if (selectedCategory !== 'all' && card.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        card.title.toLowerCase().includes(q) ||
        card.description.toLowerCase().includes(q) ||
        card.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSurpriseMe = () => {
    sound.playSpin();
    const available = SCHOOL_HUB_CARDS.filter((c) => c.targetScreen !== 'substitute-planner');
    const pick = available[Math.floor(Math.random() * available.length)];
    setRandomPick(pick);
    setSurpriseModalOpen(true);
    triggerCelebration();
  };

  const lulu = CHARACTERS.lulu;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Breadcrumb & Grade Indicator */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveScreen('home')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 text-sm shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-xl border border-purple-200">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>عالمي المدرسي الممتع · الصف {grade === 7 ? 'السابع 🌸' : 'الثامن 🔮'}</span>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold text-pink-100">
              <span>أوقات الانتظار · حصص الاحتياط · الفعاليات المدرسية 🇴🇲</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-cairo leading-tight">
              عالمي المدرسي الممتع 🎀
            </h1>

            <p className="text-pink-100 text-sm sm:text-base leading-relaxed max-w-2xl font-tajawal">
              مساحة شاملة للتعلم والمرح والمواهب والإبداع لطالبات الصفين السابع والثامن، تجمع بين الفن والألغاز والمسرح والألعاب والابتكار!
            </p>

            {/* Quick Surprise Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleSurpriseMe}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center gap-2 font-cairo text-sm sm:text-base cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>فاجئيني بفعالية ممتعة الآن! 🎲</span>
              </button>

              <button
                onClick={() => setActiveScreen('substitute-planner')}
                className="px-5 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold rounded-2xl transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <Clock className="w-4 h-4 text-pink-200" />
                <span>منظّم حصص الاحتياط ⏰</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-3 max-w-xs w-full">
              <img
                src={lulu.avatar}
                alt={lulu.name}
                className="w-20 h-20 mx-auto rounded-2xl object-cover border-2 border-pink-300 shadow-md"
              />
              <div className="space-y-1">
                <span className="font-extrabold text-sm text-pink-200">{lulu.name}</span>
                <p className="text-xs text-white/90 leading-relaxed">
                  «كل دقيقة في المدرسة هي فرصة لصنع ذكرى جميلة واكتشاف موهبة جديدة!»
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحثي عن نشاط أو لعبة..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:border-purple-500 focus:bg-white outline-hidden text-right"
            />
          </div>

          <span className="text-xs font-bold text-slate-500">
            متاح {formatNum(filteredCards.length, useEasternNumerals)} قسم ونشاط تفاعلي
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 16 Hub Activity Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            onClick={() => {
              sound.playClick();
              setActiveScreen(card.targetScreen);
            }}
            className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between text-right"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {card.icon}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-100">
                  {card.badge}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                  {card.category}
                </span>
                <h3 className="font-black text-slate-900 text-base font-cairo">
                  {card.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-purple-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>انطلقي للتحدي</span>
                <ChevronLeft className="w-4 h-4" />
              </span>
              <span className="text-[11px] text-slate-400 font-bold">
                {card.duration}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Surprise Me Modal Popup */}
      {surpriseModalOpen && randomPick && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-purple-200 shadow-2xl text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-pink-400 to-purple-600 text-white flex items-center justify-center text-4xl shadow-lg shadow-pink-200 animate-bounce">
              {randomPick.icon}
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider">
                اختارت لكِ لولو هذا النشاط الممتع! 🎉
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-cairo">
                {randomPick.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {randomPick.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSurpriseModalOpen(false);
                  setActiveScreen(randomPick.targetScreen);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm font-cairo shadow-md transition-all cursor-pointer"
              >
                بدء النشاط فورًا 🚀
              </button>
              <button
                onClick={() => setSurpriseModalOpen(false)}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
