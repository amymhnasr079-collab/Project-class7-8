import React, { useState } from 'react';
import {
  RotateCw,
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Trophy,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

interface WheelSector {
  label: string;
  category: 'calc' | 'puzzle' | 'logic' | 'geometry' | 'bonus' | 'double';
  color: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rewardStars: number;
}

const SECTORS: WheelSector[] = [
  {
    label: 'تحدي الحساب السريع ⚡',
    category: 'calc',
    color: '#EC4899', // Pink
    question: 'ما ناتج: (١٥ - ٥) × (٢ + ٣) ؟',
    options: ['٥٠', '٢٥', '٣٠', '٤٥'],
    correctIndex: 0, // 10 * 5 = 50
    explanation: '(١٥ - ٥) = ١٠، و (٢ + ٣) = ٥. حاصل ضرب ١٠ × ٥ = ٥٠.',
    rewardStars: 4,
  },
  {
    label: 'لغز الأرقام الذهني 🧩',
    category: 'puzzle',
    color: '#8B5CF6', // Purple
    question: 'عدد إذا قسمته على ٤ ثم أضفت إليه ٧ كان الناتج ١٢. فما هو العدد؟',
    options: ['٢٠', '١٦', '٢٤', '١٠'],
    correctIndex: 0, // x/4 + 7 = 12 -> x/4 = 5 -> x = 20
    explanation: 'نطرح ٧: ١٢ - ٧ = ٥. نضرب في ٤: ٥ × ٤ = ٢٠. بالتحقق: (٢٠ ÷ ٤) + ٧ = ٥ + ٧ = ١٢.',
    rewardStars: 5,
  },
  {
    label: 'تحدي التفكير المنطقي 💡',
    category: 'logic',
    color: '#06B6D4', // Cyan
    question: 'إذا كان نصف قطر دائرة يساوي ٧ سم، فما طول قطرها؟',
    options: ['١٤ سم', '٢١ سم', '٧ سم', '٤٩ سم'],
    correctIndex: 0,
    explanation: 'طول قطر الدائرة = ٢ × نصف القطر = ٢ × ٧ = ١٤ سم.',
    rewardStars: 3,
  },
  {
    label: 'مفاجأة مضاعفة النقاط 🌟',
    category: 'double',
    color: '#F59E0B', // Amber
    question: 'سؤال مضاعف: ما قيمة ٢⁵ (٢ أس ٥)؟',
    options: ['٣٢', '١٠', '٢٥', '٦٤'],
    correctIndex: 0, // 2^5 = 32
    explanation: '٢ × ٢ × ٢ × ٢ × ٢ = ٤ × ٤ × ٢ = ١٦ × ٢ = ٣٢.',
    rewardStars: 8,
  },
  {
    label: 'تحدي الهندسة والزوايا 📐',
    category: 'geometry',
    color: '#10B981', // Emerald
    question: 'ما قياس الزاوية المكملة لزاوية قياسها ٦٥°؟',
    options: ['١١٥°', '٢٥°', '٩٠°', '١٢٥°'],
    correctIndex: 0, // 180 - 65 = 115
    explanation: 'الزاويتان المتكاملتان مجموعهما ١٨٠°. إذن: ١٨٠ - ٦٥ = ١١٥°.',
    rewardStars: 4,
  },
  {
    label: 'شفرة الأنماط السريعة 🔮',
    category: 'puzzle',
    color: '#6366F1', // Indigo
    question: 'ما العدد المفقود في النمط: ١، ٤، ٩، ١٦، ٢٥، [؟] ؟',
    options: ['٣٦', '٣٠', '٤٩', '٣٢'],
    correctIndex: 0, // squares: 1^2, 2^2, 3^2, 4^2, 5^2, 6^2 = 36
    explanation: 'هذه متتالية الأعداد المربعة (ن²): ١²=١، ٢²=٤، ٣²=٩، ٤²=١٦، ٥²=٢٥، والحد السادس هو ٦² = ٣٦.',
    rewardStars: 5,
  },
];

export const LuckyWheelGame: React.FC = () => {
  const {
    grade,
    addStars,
    triggerCelebration,
    setActiveScreen,
    useEasternNumerals,
  } = useMathApp();

  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationDegrees, setRotationDegrees] = useState<number>(0);
  const [selectedSector, setSelectedSector] = useState<WheelSector | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const numSectors = SECTORS.length;
  const sectorAngle = 360 / numSectors;

  const handleSpin = () => {
    if (isSpinning) return;
    sound.playSpin();
    setIsSpinning(true);
    setSelectedSector(null);
    setSelectedOption(null);
    setIsSubmitted(false);

    // Pick random sector
    const randomIndex = Math.floor(Math.random() * numSectors);
    const extraSpins = 5 + Math.floor(Math.random() * 3); // 5 to 7 full circles
    // Calculate final angle pointing to top (270 degrees)
    const targetAngle = extraSpins * 360 + (360 - randomIndex * sectorAngle - sectorAngle / 2);

    setRotationDegrees((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedSector(SECTORS[randomIndex]);
      sound.playFanfare();
    }, 3800);
  };

  const handleChooseOption = (idx: number) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || !selectedSector || isSubmitted) return;
    const isCorrect = selectedOption === selectedSector.correctIndex;
    setIsSubmitted(true);

    if (isCorrect) {
      sound.playCorrect();
      addStars(selectedSector.rewardStars, selectedSector.label);
      triggerCelebration();
    } else {
      sound.playWrong();
    }
  };

  const handleRetrySector = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
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

        <div className="flex items-center gap-2 text-xs font-bold bg-fuchsia-50 text-fuchsia-800 px-3 py-1.5 rounded-xl border border-fuchsia-200">
          <RotateCw className="w-4 h-4 text-fuchsia-600" />
          <span>عجلة الحظ الرياضية 🎡</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🎡
            </span>
            <h2 className="text-2xl font-black font-cairo">عجلة الحظ الرياضية</h2>
          </div>
          <p className="text-pink-100 text-xs sm:text-sm">
            أديري العجلة لتكتشفي تحديكِ المفاجئ وتضاعفي رصيدكِ من النجوم!
          </p>
        </div>

        <button
          disabled={isSpinning}
          onClick={handleSpin}
          className={`px-6 py-3 rounded-2xl font-black text-sm font-cairo shadow-lg transition-all ${
            isSpinning
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:scale-105'
          }`}
        >
          {isSpinning ? 'العجلة تدور... 🌀' : 'أديري العجلة الآن 🎡'}
        </button>
      </div>

      {/* Wheel Visual Arena */}
      <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-md flex flex-col items-center justify-center relative overflow-hidden">
        {/* Pointer Arrow */}
        <div className="z-20 -mb-5 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-rose-600 drop-shadow-md" />
        </div>

        {/* Circular Wheel */}
        <div className="relative w-72 h-72 sm:w-84 sm:h-84 my-4 flex items-center justify-center">
          <div
            className="w-full h-full rounded-full border-8 border-white shadow-2xl overflow-hidden relative transition-transform duration-[3800ms] ease-[cubic-bezier(0.15,0.9,0.2,1)]"
            style={{ transform: `rotate(${rotationDegrees}deg)` }}
          >
            {/* SVG sectors */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {SECTORS.map((sec, idx) => {
                const angle = 360 / numSectors;
                const startAngle = (idx * angle * Math.PI) / 180;
                const endAngle = (((idx + 1) * angle) * Math.PI) / 180;
                const x1 = 50 + 50 * Math.cos(startAngle);
                const y1 = 50 + 50 * Math.sin(startAngle);
                const x2 = 50 + 50 * Math.cos(endAngle);
                const y2 = 50 + 50 * Math.sin(endAngle);
                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                return (
                  <path
                    key={idx}
                    d={pathData}
                    fill={sec.color}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>

            {/* Sector Labels */}
            {SECTORS.map((sec, idx) => {
              const rot = idx * sectorAngle + sectorAngle / 2;
              return (
                <div
                  key={idx}
                  className="absolute inset-0 flex items-start justify-center pt-5 pointer-events-none"
                  style={{ transform: `rotate(${rot}deg)` }}
                >
                  <span
                    className="text-[10px] sm:text-xs font-black text-white drop-shadow-md select-none transform rotate-90 origin-center text-center max-w-[70px] leading-tight"
                  >
                    {sec.label.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Wheel Center Button */}
          <button
            disabled={isSpinning}
            onClick={handleSpin}
            className="absolute z-10 w-16 h-16 rounded-full bg-white text-slate-900 border-4 border-amber-300 shadow-xl flex items-center justify-center font-black text-xs hover:scale-110 transition-transform font-cairo"
          >
            {isSpinning ? '🌀' : 'دوران!'}
          </button>
        </div>

        {!selectedSector && !isSpinning && (
          <p className="text-slate-500 text-xs font-bold mt-2">
            اضغطي على الزر بوسط العجلة لبدء الدوران! ✨
          </p>
        )}
      </div>

      {/* Selected Challenge Question Card */}
      {selectedSector && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span
              className="text-xs font-black px-3.5 py-1.5 rounded-xl text-white shadow-2xs"
              style={{ backgroundColor: selectedSector.color }}
            >
              {selectedSector.label}
            </span>
            <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
              جائزة السؤال: +{formatNum(selectedSector.rewardStars, useEasternNumerals)} ⭐
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 text-right font-cairo leading-relaxed">
            {selectedSector.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {selectedSector.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let style = 'bg-slate-50 hover:bg-pink-50/70 border-slate-200 text-slate-800 cursor-pointer';

              if (isSelected && !isSubmitted) {
                style = 'bg-fuchsia-100 border-fuchsia-500 text-fuchsia-950 font-black ring-2 ring-fuchsia-300 shadow-sm scale-[1.01]';
              }

              if (isSubmitted) {
                if (idx === selectedSector.correctIndex) {
                  style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300';
                } else if (isSelected) {
                  style = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
                } else {
                  style = 'bg-slate-50 text-slate-400 opacity-60 border-slate-200';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleChooseOption(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 font-bold text-right transition-all flex items-center justify-between text-base select-none cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'border-fuchsia-600 bg-fuchsia-600' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <span>{opt}</span>
                  </div>
                  <span className="w-8 h-8 rounded-xl bg-white/80 shadow-2xs flex items-center justify-center text-xs text-slate-600 font-black shrink-0">
                    {['أ', 'ب', 'ج', 'د'][idx]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            {!isSubmitted ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-fuchsia-800 bg-fuchsia-50 px-3.5 py-1.5 rounded-xl border border-fuchsia-200">
                  🎡 حددي إجابتكِ ثم انقري تأكيد الإجابة
                </span>
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleConfirmAnswer}
                  className={`px-8 py-3.5 rounded-2xl font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 ${
                    selectedOption !== null
                      ? 'bg-gradient-to-r from-fuchsia-500 via-pink-600 to-rose-500 hover:from-fuchsia-400 hover:to-pink-500 text-white cursor-pointer hover:scale-103 shadow-fuchsia-200'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد الإجابة والتحقق ✨</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mr-auto">
                <button
                  type="button"
                  onClick={handleRetrySector}
                  className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>إعادة المحاولة</span>
                </button>
                <button
                  type="button"
                  onClick={handleSpin}
                  className="px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-400 hover:to-pink-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-103 transition-all flex items-center gap-1.5 font-cairo cursor-pointer"
                >
                  <span>دوران جديد للعجلة 🎡</span>
                </button>
              </div>
            )}
          </div>

          {/* Feedback */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-2xl text-right space-y-1.5 border ${
                selectedOption === selectedSector.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm">
                {selectedOption === selectedSector.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>إجابة عبقرية! كسبتِ النجوم المضاعفة!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>حاولي في الدورة القادمة! راجعي التفسير:</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/50">
                {selectedSector.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
