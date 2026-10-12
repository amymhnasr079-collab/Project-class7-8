import React, { useState } from 'react';
import {
  KeyRound,
  DoorOpen,
  DoorClosed,
  Star,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  Shield,
  Crown,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { CASTLE_ROOMS } from '../data/curriculumData';
import { CHARACTERS, PLATFORM_INFO } from '../data/characters';
import { CastleRoom } from '../types';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

export const EscapeCastleGame: React.FC = () => {
  const {
    grade,
    stats,
    addStars,
    unlockCastleRoom,
    unlockBadge,
    triggerCelebration,
    setActiveScreen,
    useEasternNumerals,
  } = useMathApp();

  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const rooms = CASTLE_ROOMS;
  const currentRoom: CastleRoom = rooms[activeRoomIndex];
  const teacher = CHARACTERS.noura;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmDoor = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    const isCorrect = selectedOption === currentRoom.correctIndex;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      sound.playDoorUnlock();
      unlockCastleRoom(currentRoom.id);
      addStars(8, `فتح ${currentRoom.roomNameAr}`);

      if (activeRoomIndex === rooms.length - 1) {
        setHasWon(true);
        unlockBadge('castle_knight');
        sound.playFanfare();
        triggerCelebration();
      }
    } else {
      sound.playWrong();
    }
  };

  const handleRetryDoor = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const handleNextDoor = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    if (activeRoomIndex < rooms.length - 1) {
      setActiveRoomIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setActiveRoomIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setHasWon(false);
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

        <div className="flex items-center gap-2 text-xs font-bold bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200">
          <KeyRound className="w-4 h-4 text-amber-600" />
          <span>
            الأبواب المفتوحة: {formatNum(stats.castleUnlockedRooms.length, useEasternNumerals)} من {formatNum(rooms.length, useEasternNumerals)} 🏰
          </span>
        </div>
      </div>

      {/* Main Castle Stage Banner with Visual */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-purple-200 bg-slate-900 text-white">
        <div className="relative h-48 sm:h-64 w-full">
          <img
            src={PLATFORM_INFO.castleRoomsImage}
            alt="رواق قلعة الرياضيات والأبواب السحرية"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex items-end p-6">
            <div className="space-y-1 text-right">
              <span className="text-xs font-black text-amber-300 tracking-wider">
                مغامرة قصة تفاعلية مشوقة 🏰
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-cairo">
                الهروب من قلعة الرياضيات السحرية
              </h2>
              <p className="text-xs sm:text-sm text-slate-200">
                أربعة أبواب موصدة بأقفال رياضية ذكية. حلّي المسألة لفك الرتاج والعبور نحو الحرية!
              </p>
            </div>
          </div>
        </div>

        {/* 4 Door Navigation Steps */}
        <div className="bg-slate-950/90 backdrop-blur-md p-3 px-6 border-t border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
          {rooms.map((r, idx) => {
            const isUnlocked = stats.castleUnlockedRooms.includes(r.id);
            const isCurrent = activeRoomIndex === idx;

            return (
              <button
                key={r.id}
                onClick={() => {
                  sound.playClick();
                  setActiveRoomIndex(idx);
                  setSelectedOption(null);
                  setIsAnswerSubmitted(false);
                  setShowHint(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black scale-103'
                    : isUnlocked
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {isUnlocked ? (
                  <DoorOpen className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <DoorClosed className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>الباب {formatNum(idx + 1, useEasternNumerals)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* WIN STATE */}
      {hasWon ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-amber-200 shadow-xl space-y-6 max-w-2xl mx-auto">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center text-5xl shadow-xl shadow-amber-200 animate-bounce">
            👑
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black text-amber-600 uppercase tracking-widest">
              إنجاز ملكي عظيم!
            </span>
            <h3 className="text-3xl font-black text-slate-900 font-cairo">
              فتحتِ جميع أبواب القلعة بنجاح! 🏰
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              «ألف مبارك يا بطلة عُمان! لقد عبرتِ بوابات الأرقام والجبر والزوايا والمتتاليات ونلتِ وسام فارسة القلعة الذهبي!»
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveScreen('achievements')}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm font-cairo shadow-md transition-all"
            >
              عرض وسام فارسة القلعة 🏆
            </button>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
            >
              إعادة خوض المغامرة 🔄
            </button>
          </div>
        </div>
      ) : (
        /* CURRENT ROOM CHALLENGE */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-xl">
              {currentRoom.roomNameAr}
            </span>
            <span className="text-xs font-bold text-slate-400">
              الباب {formatNum(activeRoomIndex + 1, useEasternNumerals)} من {formatNum(rooms.length, useEasternNumerals)}
            </span>
          </div>

          {/* Story intro & Character speech */}
          <div className="space-y-3">
            <p className="text-sm text-slate-700 leading-relaxed text-right bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {currentRoom.description}
            </p>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-right">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-11 h-11 rounded-xl object-cover border border-amber-300 shrink-0"
              />
              <div>
                <span className="text-xs font-black text-amber-900 block">{teacher.name}:</span>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {currentRoom.storyIntro}
                </p>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="text-right pt-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-cairo leading-relaxed">
              {currentRoom.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentRoom.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let style = 'bg-slate-50 hover:bg-amber-50/70 border-slate-200 text-slate-800 cursor-pointer';

              if (isSelected && !isAnswerSubmitted) {
                style = 'bg-amber-100 border-amber-500 text-amber-950 font-black ring-2 ring-amber-300 shadow-sm scale-[1.01]';
              }

              if (isAnswerSubmitted) {
                if (idx === currentRoom.correctIndex) {
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
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 font-bold text-right transition-all flex items-center justify-between text-base select-none cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'border-amber-600 bg-amber-600' : 'border-slate-300 bg-white'
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
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setShowHint((p) => !p);
              }}
              className="text-xs font-bold text-amber-800 bg-amber-50 px-3.5 py-2.5 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>{showHint ? 'إخفاء التلميح' : 'تلميح المفتاح السري 🗝️'}</span>
            </button>

            {!isAnswerSubmitted ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleConfirmDoor}
                  className={`px-8 py-3.5 rounded-2xl font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 ${
                    selectedOption !== null
                      ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 cursor-pointer hover:scale-103 shadow-amber-200'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>تأكيد الإجابة وفتح الباب 🗝️</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRetryDoor}
                  className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>إعادة المحاولة</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextDoor}
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm rounded-2xl shadow-md hover:scale-103 transition-all flex items-center gap-2 font-cairo cursor-pointer"
                >
                  <span>العبور للباب التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {showHint && (
            <div className="p-4 rounded-2xl bg-amber-50 text-right text-xs sm:text-sm text-amber-900 border border-amber-200 animate-fadeIn">
              💡 {currentRoom.hint}
            </div>
          )}

          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-2xl text-right space-y-1.5 border ${
                selectedOption === currentRoom.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm">
                {selectedOption === currentRoom.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>انفتح قفل الباب بنجاح! (+٨ نجوم ذهبية ⭐)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>القفل لم يستجب، حاولي مراجعة الشفرة الحسابية:</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/50">
                {currentRoom.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
