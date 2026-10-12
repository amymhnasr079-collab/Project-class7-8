import React, { useState } from 'react';
import {
  Gift,
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lock,
  Unlock,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { MYSTERY_BOXES } from '../data/curriculumData';
import { MysteryBox } from '../types';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

export const MysteryBoxesGame: React.FC = () => {
  const {
    grade,
    stats,
    addStars,
    unlockMysteryBox,
    triggerCelebration,
    setActiveScreen,
    useEasternNumerals,
  } = useMathApp();

  const [activeBox, setActiveBox] = useState<MysteryBox | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const boxes = MYSTERY_BOXES;

  const handleOpenBox = (box: MysteryBox) => {
    sound.playClick();
    setActiveBox(box);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleChooseOption = (idx: number) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || !activeBox || isSubmitted) return;
    const isCorrect = selectedOption === activeBox.correctIndex;
    setIsSubmitted(true);

    if (isCorrect) {
      sound.playFanfare();
      addStars(activeBox.rewardStars, activeBox.title);
      unlockMysteryBox(activeBox.id);
      triggerCelebration();
    } else {
      sound.playWrong();
    }
  };

  const handleRetryBox = () => {
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

        <div className="flex items-center gap-2 text-xs font-bold bg-purple-50 text-purple-800 px-3 py-1.5 rounded-xl border border-purple-200">
          <Gift className="w-4 h-4 text-purple-600" />
          <span>الصناديق المفتوحة: {formatNum(stats.unlockedBoxes.length, useEasternNumerals)} من {formatNum(boxes.length, useEasternNumerals)} 🎁</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🎁
            </span>
            <h2 className="text-2xl font-black font-cairo">لعبة «صندوق المفاجآت»</h2>
          </div>
          <p className="text-pink-100 text-xs sm:text-sm">
            صناديق كرتونية ملونة تخبئ ألغازًا وجواهر ونجومًا براقة! اختاري صندوقكِ المفضل وافتحي بابه.
          </p>
        </div>

        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-center">
          <span className="text-[11px] block text-pink-200">مجموع الجوائز</span>
          <span className="text-lg font-black text-amber-300">نجوم ذهبية ⭐</span>
        </div>
      </div>

      {/* 6 Mystery Boxes Cards */}
      {!activeBox ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {boxes.map((box) => {
            const isUnlocked = stats.unlockedBoxes.includes(box.id);

            return (
              <div
                key={box.id}
                onClick={() => handleOpenBox(box)}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer group text-right flex flex-col justify-between h-56 bg-gradient-to-br ${
                  isUnlocked
                    ? 'border-emerald-300 bg-emerald-50/40 shadow-sm'
                    : 'border-purple-200 bg-white hover:border-pink-400 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl group-hover:scale-125 transition-transform">
                      {box.icon}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 ${
                        isUnlocked
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {isUnlocked ? (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>تم فتحه</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>مغلق</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-base font-cairo">
                      {box.title}
                    </h3>
                    <span className="text-xs text-slate-500 font-semibold block mt-0.5">
                      درجة الصعوبة: {box.difficulty === 'easy' ? 'سهل ⭐' : box.difficulty === 'medium' ? 'تحدي ⭐⭐' : 'عبقري ⭐⭐⭐'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-600 group-hover:translate-x-1 transition-transform">
                    {isUnlocked ? 'إعادة اللغز' : 'افتحي الصندوق 🗝️'}
                  </span>
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    +{formatNum(box.rewardStars, useEasternNumerals)} ⭐
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Box Question Opened Modal View */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeBox.icon}</span>
              <h3 className="text-xl font-black text-slate-900 font-cairo">
                {activeBox.title}
              </h3>
            </div>
            <button
              onClick={() => setActiveBox(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-xl bg-slate-100"
            >
              إغلاق الصندوق
            </button>
          </div>

          {/* Riddle Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 text-right space-y-2">
            <span className="text-xs font-black text-purple-800 block">لغز الصندوق السحري:</span>
            <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed font-tajawal">
              «{activeBox.riddle}»
            </p>
          </div>

          <div className="text-right">
            <h4 className="font-black text-slate-900 text-base sm:text-lg font-cairo">
              {activeBox.question}
            </h4>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {activeBox.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let style = 'bg-slate-50 hover:bg-pink-50/70 border-slate-200 text-slate-800 cursor-pointer';

              if (isSelected && !isSubmitted) {
                style = 'bg-purple-100 border-purple-500 text-purple-950 font-black ring-2 ring-purple-300 shadow-sm scale-[1.01]';
              }

              if (isSubmitted) {
                if (idx === activeBox.correctIndex) {
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
                      isSelected ? 'border-purple-600 bg-purple-600' : 'border-slate-300 bg-white'
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

          {/* Action */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveBox(null)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              ← اختيار صندوق آخر
            </button>

            {!isSubmitted ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleConfirmAnswer}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 ${
                  selectedOption !== null
                    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white cursor-pointer hover:scale-103 shadow-purple-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                <Gift className="w-4 h-4" />
                <span>تأكيد الإجابة وفتح الصندوق ✨</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRetryBox}
                  className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  إعادة المحاولة
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBox(null)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm rounded-2xl shadow-md transition-all font-cairo cursor-pointer"
                >
                  صندوق جديد 🎁
                </button>
              </div>
            )}
          </div>

          {/* Result */}
          {isSubmitted && (
            <div
              className={`p-5 rounded-2xl text-right space-y-2 border ${
                selectedOption === activeBox.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-base">
                {selectedOption === activeBox.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>{activeBox.surpriseMsg}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>محاولة قريبة! راجعي التفسير الرياضي:</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/50">
                {activeBox.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
