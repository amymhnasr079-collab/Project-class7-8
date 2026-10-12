import React, { useRef, useState, useEffect } from 'react';
import {
  Palette,
  Eraser,
  RotateCcw,
  Download,
  Timer,
  Play,
  Pause,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { ART_CHALLENGES, DrawingChallenge } from '../data/schoolActivitiesData';
import { sound } from '../utils/sound';
import { formatTime, formatNum } from '../utils/arabicUtils';

export const ArtStudioView: React.FC = () => {
  const { setActiveScreen, addStars, triggerCelebration, useEasternNumerals } = useMathApp();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#EC4899'); // default pink
  const [brushSize, setBrushSize] = useState<number>(4);
  const [isEraser, setIsEraser] = useState<boolean>(false);

  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const challenges = ART_CHALLENGES;
  const currentChallenge: DrawingChallenge = challenges[activeChallengeIndex];

  const palette = [
    '#EC4899', // Pink
    '#8B5CF6', // Purple
    '#3B82F6', // Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#1E293B', // Slate dark
    '#FFFFFF', // White
  ];

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            sound.playFanfare();
            triggerCelebration();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `لوحتي_الفنية_${currentChallenge.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
    addStars(5, 'حفظ لوحة فنية');
    triggerCelebration();
  };

  const handleFinishArtwork = () => {
    sound.playCorrect();
    if (!completedChallenges.includes(currentChallenge.id)) {
      setCompletedChallenges((p) => [...p, currentChallenge.id]);
      addStars(10, `إنجاز ${currentChallenge.title}`);
    }
    triggerCelebration();
  };

  // Initialize canvas background white
  useEffect(() => {
    clearCanvas();
  }, [activeChallengeIndex]);

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

        <div className="flex items-center gap-2 text-xs font-bold text-pink-700 bg-pink-50 px-3.5 py-1.5 rounded-xl border border-pink-200">
          <Palette className="w-4 h-4 text-pink-600" />
          <span>مرسمي وإبداعي 🎨 · التعبير الحر</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🎨
            </span>
            <h2 className="text-2xl font-black font-cairo">مرسمي وإبداعي</h2>
          </div>
          <p className="text-pink-100 text-xs sm:text-sm">
            مساحة للرسم الحر والتحديات الفنية! التقييم هنا للفكرة والخيال والجمال.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
          <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
          <span className="text-xs font-bold text-amber-200">
            أكملتِ {formatNum(completedChallenges.length, useEasternNumerals)} من {formatNum(challenges.length, useEasternNumerals)} تحديات 🌸
          </span>
        </div>
      </div>

      {/* Challenge Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {challenges.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => {
              sound.playClick();
              setActiveChallengeIndex(idx);
              setTimeLeft(c.timeLimitSeconds);
              setIsTimerRunning(false);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeChallengeIndex === idx
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Active Challenge Prompt Card */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm space-y-3 text-right">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-xl">
            {currentChallenge.title}
          </span>

          {/* Optional Timer Control */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-mono font-bold text-xs">
              <Timer className="w-3.5 h-3.5 text-purple-600" />
              <span>{formatTime(timeLeft, useEasternNumerals)}</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setIsTimerRunning((p) => !p);
              }}
              className="p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold cursor-pointer"
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <p className="text-base font-black text-slate-900 font-cairo">
          {currentChallenge.description}
        </p>

        <div className="p-3 rounded-xl bg-pink-50/60 border border-pink-100 text-xs text-pink-900">
          💡 <strong>فكرة مساعدة:</strong> {currentChallenge.inspirationTip}
        </div>
      </div>

      {/* Interactive Drawing Canvas Arena */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-md space-y-4">
        {/* Toolbar: Colors, Brush, Eraser, Clear, Save */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          {/* Colors */}
          <div className="flex items-center gap-1.5">
            {palette.map((c) => (
              <button
                key={c}
                onClick={() => {
                  sound.playClick();
                  setColor(c);
                  setIsEraser(false);
                }}
                className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                  color === c && !isEraser ? 'scale-125 border-purple-600 shadow-xs' : 'border-slate-200'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setIsEraser((p) => !p);
              }}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                isEraser
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Eraser className="w-4 h-4" />
              <span>ممحاة</span>
            </button>

            <button
              onClick={clearCanvas}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="مسح اللوحة بالكامل"
            >
              <RotateCcw className="w-4 h-4" />
              <span>مسح</span>
            </button>

            <button
              onClick={downloadDrawing}
              className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>حفظ الرسمة 📥</span>
            </button>
          </div>
        </div>

        {/* Canvas element */}
        <div className="border-2 border-dashed border-purple-200 rounded-2xl overflow-hidden bg-white touch-none">
          <canvas
            ref={canvasRef}
            width={720}
            height={380}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-80 sm:h-96 cursor-crosshair block"
          />
        </div>

        {/* Action button */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-bold">
            ارسمي بأصبعكِ أو بالقلم مباشرة على الشاشة ✏️
          </span>

          <button
            onClick={handleFinishArtwork}
            className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 font-cairo cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>أنهيتُ إبداعي (+١٠ نجوم ⭐)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
