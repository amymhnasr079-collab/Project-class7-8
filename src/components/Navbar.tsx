import React from 'react';
import { Volume2, VolumeX, Star, Sparkles, Hash } from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { formatNum } from '../utils/arabicUtils';
import { sound } from '../utils/sound';

export const Navbar: React.FC = () => {
  const {
    grade,
    setGrade,
    activeScreen,
    setActiveScreen,
    isMuted,
    toggleMute,
    stats,
    useEasternNumerals,
    toggleNumerals,
  } = useMathApp();

  const handleNav = (screen: any) => {
    sound.playClick();
    setActiveScreen(screen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 lg:gap-8">
          {/* Zone 1: Brand Title */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-right focus:outline-hidden group shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-pink-200 group-hover:scale-105 transition-transform">
              <span className="text-xl">🎀</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight block font-cairo">
                مملكة الرياضيات الذكية
              </span>
              <span className="text-xs font-semibold text-pink-600 tracking-wide block">
                مغامرات الأرقام · منهج كامبردج 🇴🇲
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activeScreen === 'home'
                  ? 'bg-pink-50 text-pink-700 shadow-xs'
                  : 'text-slate-600 hover:text-pink-600 hover:bg-slate-50'
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => handleNav('school-world')}
              className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeScreen === 'school-world'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs font-black'
                  : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
              }`}
            >
              <span>عالمي المدرسي 🎀</span>
            </button>
            <button
              onClick={() => handleNav('substitute-mode')}
              className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeScreen === 'substitute-mode'
                  ? 'bg-purple-100 text-purple-800 shadow-xs'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-slate-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              حصة الاحتياط ⏱️
            </button>
            <button
              onClick={() => handleNav('escape-castle')}
              className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activeScreen === 'escape-castle'
                  ? 'bg-pink-50 text-pink-700 shadow-xs'
                  : 'text-slate-600 hover:text-pink-600 hover:bg-slate-50'
              }`}
            >
              قلعة الرياضيات 🏰
            </button>
            <button
              onClick={() => handleNav('achievements')}
              className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activeScreen === 'achievements'
                  ? 'bg-pink-50 text-pink-700 shadow-xs'
                  : 'text-slate-600 hover:text-pink-600 hover:bg-slate-50'
              }`}
            >
              إنجازاتي ونجومي 🏆
            </button>
            <button
              onClick={() => handleNav('teacher-dashboard')}
              className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activeScreen === 'teacher-dashboard'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              لوحة المعلمة 👩‍🏫
            </button>
          </nav>

          {/* Zone 3: Interactive Controls (Grade, Stars, Sound, Numerals) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Grade Switcher */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setGrade(7)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  grade === 7
                    ? 'bg-pink-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الصف السابع
              </button>
              <button
                onClick={() => setGrade(8)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  grade === 8
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الصف الثامن
              </button>
            </div>

            {/* Stars Counter */}
            <button
              onClick={() => handleNav('achievements')}
              title="رصيد النجوم الذهبية"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl transition-all shadow-xs"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="text-sm font-black font-cairo tabular-nums">
                {formatNum(stats.stars, useEasternNumerals)}
              </span>
            </button>

            {/* Numeral Toggle: Eastern vs Western numerals */}
            <button
              onClick={toggleNumerals}
              title={useEasternNumerals ? 'التبديل إلى الأرقام 1 2 3' : 'التبديل إلى الأرقام الشرقية ١ ٢ ٣'}
              className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors border border-slate-200 hidden sm:flex items-center gap-1 text-xs font-bold"
            >
              <Hash className="w-3.5 h-3.5 text-purple-500" />
              <span>{useEasternNumerals ? '٣' : '3'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم الصوت'}
              className="p-2 text-slate-500 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors border border-slate-200"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-pink-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
