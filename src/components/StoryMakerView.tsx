import React, { useState } from 'react';
import {
  Film,
  Sparkles,
  BookOpen,
  ArrowRight,
  Heart,
  Share2,
  CheckCircle2,
  Printer,
  ChevronLeft,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { STORY_TEMPLATES, StoryTemplate } from '../data/schoolActivitiesData';
import { sound } from '../utils/sound';

export const StoryMakerView: React.FC = () => {
  const { setActiveScreen, addStars, triggerCelebration } = useMathApp();

  const [selectedHeroine, setSelectedHeroine] = useState<string>('مريم، طالبة ذكية ومحبة للقراءة 🌸');
  const [selectedPlace, setSelectedPlace] = useState<string>('المكتبة المدرسية التاريخية 📚');
  const [selectedAdventure, setSelectedAdventure] = useState<string>('العثور على خريطة أو لغز قديم 🗺️');
  const [activeStory, setActiveStory] = useState<StoryTemplate | null>(STORY_TEMPLATES[0]);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const heroines = [
    'مريم، طالبة ذكية ومحبة للقراءة 🌸',
    'فاطمة، مهندسة المستقبل وعاشقة الروبوتات 🤖',
    'أسماء، فنانة مبدعة ترسم بروح عمانية 🎨',
    'نور، لاعبة شطرنج بارعة وصائدة أسرار ♟️',
  ];

  const places = [
    'المكتبة المدرسية التاريخية 📚',
    'مختبر العلوم والابتكار الحديث 🔬',
    'حديقة المدرسة البيئية بصلالة 🌴',
    'فناء قلعة بهلاء في رحلة مدرسية 🏰',
  ];

  const adventures = [
    'العثور على خريطة أو لغز قديم 🗺️',
    'إنقاذ مشروع الفريق قبل ثوانٍ من المعرض ⏱️',
    'فك شفرة كتاب غامض يحمل نصيحة تاريخية 🗝️',
    'مساعدة زميلة جديدة وتشجيعها على التميز 💖',
  ];

  const handleGenerateStory = () => {
    sound.playFanfare();
    // Match or create custom story
    const found = STORY_TEMPLATES.find((s) => s.character.includes(selectedHeroine.slice(0, 4)));
    if (found) {
      setActiveStory(found);
    } else {
      setActiveStory({
        title: `مغامرة ${selectedHeroine.split('،')[0]} في ${selectedPlace.split(' ')[0]} 🌟`,
        character: selectedHeroine,
        location: selectedPlace,
        adventureType: selectedAdventure,
        conflict: 'تحدٍ غير متوقع يتطلب الشجاعة والذكاء والعمل بروح الفريق الواحد.',
        fullStory: `في صباح يوم دراسي مشرق ومفعم بالنشاط، انطلقت ${selectedHeroine.split('،')[0]} نحو ${selectedPlace}. كان الهدف هو خوض تحدي "${selectedAdventure}". أثناء البحث والتجربة، واجهت الصديقات عقبة مفاجئة كادت تعطل العمل، ولكن بفضل هدوء التفكير وحسن التعاون، استطاعت البطلة مع زميلاتها الوصول لحل مبتكر أدهش الجميع!`,
        moralLesson: 'المثابرة والثقة بالنفس والتعاون الصادق هي المفاتيح الحقيقية لكل إنجاز عظيم.',
      });
    }
    addStars(5, 'تأليف قصة مدرسية ملهمة');
    triggerCelebration();
  };

  const handleShare = () => {
    sound.playClick();
    if (activeStory) {
      navigator.clipboard?.writeText(`${activeStory.title}\n\n${activeStory.fullStory}\n\nالعبرة المستفادة: ${activeStory.moralLesson}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
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

        <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-700 bg-fuchsia-50 px-3.5 py-1.5 rounded-xl border border-fuchsia-200">
          <Film className="w-4 h-4 text-fuchsia-600" />
          <span>اصنعي قصتكِ المشوقة 🎬</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🎬
            </span>
            <h2 className="text-2xl font-black font-cairo">استوديو تأليف القصص المدرسية</h2>
          </div>
          <p className="text-fuchsia-100 text-xs sm:text-sm">
            اختاري بطلتكِ ومكان المغامرة والهدف، وشاهدي قصة ملهمة بعبر تربوية راقية!
          </p>
        </div>

        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center font-bold text-xs text-amber-200">
          <span>خيال وإبداع أدبي ✍️</span>
        </div>
      </div>

      {/* Creator Workshop Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-fuchsia-100 shadow-md space-y-6 text-right">
        <h3 className="text-lg font-black text-slate-900 font-cairo">
          حددي عناصر قصتكِ الممتعة:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Heroine */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-fuchsia-800 block">١. بطلة القصة:</span>
            <div className="space-y-1.5">
              {heroines.map((h, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedHeroine(h)}
                  className={`w-full text-right p-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    selectedHeroine === h
                      ? 'bg-fuchsia-100 border-fuchsia-500 text-fuchsia-950 font-black shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Place */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-purple-800 block">٢. مكان الأحداث:</span>
            <div className="space-y-1.5">
              {places.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedPlace(p)}
                  className={`w-full text-right p-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    selectedPlace === p
                      ? 'bg-purple-100 border-purple-500 text-purple-950 font-black shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Adventure */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-pink-800 block">٣. نوع المغامرة:</span>
            <div className="space-y-1.5">
              {adventures.map((a, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedAdventure(a)}
                  className={`w-full text-right p-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    selectedAdventure === a
                      ? 'bg-pink-100 border-pink-500 text-pink-950 font-black shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={handleGenerateStory}
            className="px-8 py-3.5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-black text-base rounded-2xl shadow-lg hover:scale-103 transition-all flex items-center gap-2 font-cairo cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>تأليف القصة الآن ✨</span>
          </button>
        </div>
      </div>

      {/* Story Result Showcase */}
      {activeStory && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-fuchsia-200 shadow-xl space-y-6 text-right relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500" />

          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-fuchsia-700 bg-fuchsia-50 px-3 py-1 rounded-xl">
                📖 قصة ملهمة مكتملة
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-cairo mt-1">
                {activeStory.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="px-3.5 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isCopied ? 'تم نسخ القصة! ✅' : 'نسخ القصة'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة</span>
              </button>
            </div>
          </div>

          <div className="text-base sm:text-lg leading-relaxed text-slate-800 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 font-tajawal">
            {activeStory.fullStory}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <Heart className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-sm font-extrabold text-amber-950 block">العبرة التربوية المستفادة:</strong>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                {activeStory.moralLesson}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
