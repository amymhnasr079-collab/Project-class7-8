import React from 'react';
import { Heart, Sparkles, BookOpen } from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { PLATFORM_INFO } from '../data/characters';
import { sound } from '../utils/sound';

export const Footer: React.FC = () => {
  const { setActiveScreen } = useMathApp();

  return (
    <footer className="bg-white border-t border-purple-100 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-3 no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Creator credits */}
        <div className="text-right space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 text-sm font-cairo">
              {PLATFORM_INFO.title} – {PLATFORM_INFO.subtitle}
            </span>
          </div>
          <p className="text-slate-500 font-medium">
            {PLATFORM_INFO.creator} · سلطنة عُمان 🇴🇲
          </p>
        </div>

        {/* Cambridge Note */}
        <div className="text-center sm:text-left text-slate-400 text-[11px] leading-relaxed">
          <span>مخصصة لتفعيل حصص الاحتياط لطالبات الصفين السابع والثامن</span>
          <br />
          <span>وفق منهج كامبردج المعتمد في سلطنة عُمان</span>
        </div>

        {/* Quick Footer Links */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
          <button
            onClick={() => {
              sound.playClick();
              setActiveScreen('home');
            }}
            className="hover:text-purple-600 transition-colors"
          >
            الرئيسية
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveScreen('substitute-mode');
            }}
            className="hover:text-purple-600 transition-colors"
          >
            حصة الاحتياط ⏱️
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveScreen('achievements');
            }}
            className="hover:text-purple-600 transition-colors"
          >
            إنجازاتي 🏆
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveScreen('teacher-dashboard');
            }}
            className="hover:text-purple-600 transition-colors"
          >
            لوحة المعلمة 👩‍🏫
          </button>
        </div>
      </div>
    </footer>
  );
};
