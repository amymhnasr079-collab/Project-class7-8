import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Filter,
  BarChart3,
  Sparkles,
  Play,
  Key,
} from 'lucide-react';
import { useMathApp } from '../context/MathAppContext';
import { DifficultyLevel, GradeLevel, MathQuestion, MathTopic } from '../types';
import { sound } from '../utils/sound';
import { formatNum } from '../utils/arabicUtils';

export const TeacherDashboard: React.FC = () => {
  const {
    grade,
    setGrade,
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    resetQuestionsToDefault,
    stats,
    setActiveScreen,
    useEasternNumerals,
    setSubstituteConfig,
  } = useMathApp();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('math_teacher_auth') === 'true';
  });
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Filtering questions
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // New question form state
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  const [formGrade, setFormGrade] = useState<GradeLevel>(grade);
  const [formTopic, setFormTopic] = useState<MathTopic>('operations');
  const [formDifficulty, setFormDifficulty] = useState<DifficultyLevel>('medium');
  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formOptions, setFormOptions] = useState<string[]>(['', '', '', '']);
  const [formCorrectIndex, setFormCorrectIndex] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState<string>('');
  const [formHint, setFormHint] = useState<string>('');
  const [formPoints, setFormPoints] = useState<number>(20);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === '1234' || enteredPin === 'omaima') {
      sound.playCorrect();
      setIsAuthenticated(true);
      sessionStorage.setItem('math_teacher_auth', 'true');
      setPinError('');
    } else {
      sound.playWrong();
      setPinError('رمز المرور غير صحيح! الرمز الافتراضي للمعلمة هو: 1234');
    }
  };

  const handleLogout = () => {
    sound.playClick();
    setIsAuthenticated(false);
    sessionStorage.removeItem('math_teacher_auth');
    setEnteredPin('');
  };

  const handleSaveQuestion = () => {
    if (!formQuestion.trim() || formOptions.some((o) => !o.trim())) {
      sound.playWrong();
      alert('يرجى ملء نص السؤال وجميع الخيارات الأربعة.');
      return;
    }

    const topicTitles: Record<MathTopic, string> = {
      operations: 'العمليات الحسابية وترتيبها',
      fractions_decimals: 'الكسور والنسب المئوية',
      ratios: 'النسبة والتناسب',
      algebra: 'المقادير الجبرية والمعادلات',
      geometry: 'الهندسة والزوايا والمضلعات',
      measurement: 'المحيط والمساحة والحجم',
      statistics_probability: 'الإحصاء والاحتمالات',
      powers_roots: 'الأعداد الصحيحة والقوى والجذور',
      sequences: 'الأنماط والمتتاليات والحد النوني',
    };

    const newQ: MathQuestion = {
      id: editingQuestionId || `custom-${Date.now()}`,
      grade: formGrade,
      topic: formTopic,
      topicTitle: topicTitles[formTopic] || 'رياضيات عامة',
      difficulty: formDifficulty,
      question: formQuestion.trim(),
      options: formOptions.map((o) => o.trim()),
      correctIndex: formCorrectIndex,
      explanation: formExplanation.trim() || 'إجابة رياضية صحيحة ومحققة.',
      hint: formHint.trim() || 'راجعي القوانين الرياضية بعناية.',
      points: Number(formPoints) || 20,
    };

    if (editingQuestionId) {
      updateQuestion(newQ);
    } else {
      addQuestion(newQ);
    }

    sound.playCorrect();
    setIsAddingNew(false);
    setEditingQuestionId(null);
    resetForm();
  };

  const handleEditClick = (q: MathQuestion) => {
    sound.playClick();
    setEditingQuestionId(q.id);
    setFormGrade(q.grade);
    setFormTopic(q.topic);
    setFormDifficulty(q.difficulty);
    setFormQuestion(q.question);
    setFormOptions([...q.options]);
    setFormCorrectIndex(q.correctIndex);
    setFormExplanation(q.explanation);
    setFormHint(q.hint);
    setFormPoints(q.points);
    setIsAddingNew(true);
  };

  const resetForm = () => {
    setFormQuestion('');
    setFormOptions(['', '', '', '']);
    setFormCorrectIndex(0);
    setFormExplanation('');
    setFormHint('');
    setFormPoints(20);
  };

  const filteredQuestions = questions.filter((q) => {
    if (q.grade !== grade) return false;
    if (filterTopic !== 'all' && q.topic !== filterTopic) return false;
    if (filterDifficulty !== 'all' && q.difficulty !== filterDifficulty) return false;
    return true;
  });

  // If not authenticated, show passcode screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl border border-purple-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-3xl shadow-xs">
          <Key className="w-8 h-8 text-purple-700" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 font-cairo">
            تسجيل دخول المعلمة 👩‍🏫
          </h2>
          <p className="text-xs text-slate-500">
            يرجى إدخال رمز المرور للوصول إلى لوحة إدارة بنك الأسئلة وحصص الاحتياط.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1 text-right">
            <label className="text-xs font-bold text-slate-700 block">
              رمز المرور السري (الرمز الافتراضي: 1234)
            </label>
            <input
              type="password"
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="أدخلي الرمز هنا..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden font-bold text-center tracking-widest text-lg"
              autoFocus
            />
          </div>

          {pinError && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200 font-bold">
              {pinError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl shadow-md transition-all font-cairo text-base"
          >
            دخول لوحة التحكم ✓
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={() => setActiveScreen('home')}
            className="text-slate-500 hover:text-slate-800 font-bold"
          >
            ← العودة للرئيسية
          </button>
          <span className="text-slate-400">إعداد أ. أميمة الحكماني</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
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

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
            <Unlock className="w-3.5 h-3.5" />
            <span>جلسة المعلمة نشطة</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <span className="text-xs font-bold text-pink-300 tracking-wider">
            لوحة الإشراف التربوي والتحكم الكامل
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-cairo">
            لوحة المعلمة – بنك أسئلة منهج كامبردج 🇴🇲
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            أضيفي، عدّلي، وخصّصي بنك الأسئلة والأنشطة المناسبة لحصص الاحتياط بكل سهولة وأمان.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => {
              sound.playClick();
              setIsAddingNew(true);
              setEditingQuestionId(null);
              resetForm();
            }}
            className="px-4 py-2.5 bg-pink-500 hover:bg-pink-400 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 font-cairo"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة سؤال جديد</span>
          </button>
          <button
            onClick={() => {
              if (confirm('هل ترغبين باستعادة بنك الأسئلة الأساسي الافتراضي؟')) {
                resetQuestionsToDefault();
                sound.playCorrect();
              }
            }}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>استعادة الأسئلة الافتراضية</span>
          </button>
        </div>
      </div>

      {/* Overview Analytics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-right">
          <span className="text-xs text-slate-500 font-bold block">إجمالي أسئلة الصف {grade === 7 ? 'السابع' : 'الثامن'}</span>
          <span className="text-2xl font-black text-purple-700 font-cairo">
            {formatNum(questions.filter((q) => q.grade === grade).length, useEasternNumerals)}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-right">
          <span className="text-xs text-slate-500 font-bold block">محاولات الحل المكتملة</span>
          <span className="text-2xl font-black text-emerald-700 font-cairo">
            {formatNum(stats.questionsSolved, useEasternNumerals)}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-right">
          <span className="text-xs text-slate-500 font-bold block">الإجابات الصحيحة</span>
          <span className="text-2xl font-black text-pink-600 font-cairo">
            {formatNum(stats.correctAnswers, useEasternNumerals)}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-right">
          <span className="text-xs text-slate-500 font-bold block">نسبة دقة الطالبات</span>
          <span className="text-2xl font-black text-amber-600 font-cairo">
            {stats.questionsSolved > 0
              ? `${Math.round((stats.correctAnswers / stats.questionsSolved) * 100)}%`
              : '١٠٠%'}
          </span>
        </div>
      </div>

      {/* ADD / EDIT QUESTION MODAL FORM */}
      {isAddingNew && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-300 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900 font-cairo">
              {editingQuestionId ? 'تعديل السؤال الرياضي ✏️' : 'إضافة سؤال جديد لبنك الأسئلة ➕'}
            </h3>
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingQuestionId(null);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1 bg-slate-100 rounded-lg"
            >
              إلغاء
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Grade */}
            <div className="space-y-1 text-right">
              <label className="text-xs font-bold text-slate-700 block">الصف الدراسي:</label>
              <select
                value={formGrade}
                onChange={(e) => setFormGrade(Number(e.target.value) as GradeLevel)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold"
              >
                <option value={7}>الصف السابع</option>
                <option value={8}>الصف الثامن</option>
              </select>
            </div>

            {/* Topic */}
            <div className="space-y-1 text-right">
              <label className="text-xs font-bold text-slate-700 block">الموضوع / الوحدة:</label>
              <select
                value={formTopic}
                onChange={(e) => setFormTopic(e.target.value as MathTopic)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold"
              >
                <option value="operations">العمليات وترتيبها</option>
                <option value="fractions_decimals">الكسور والنسب المئوية</option>
                <option value="ratios">النسبة والتناسب</option>
                <option value="algebra">المقادير والمعادلات الجبرية</option>
                <option value="geometry">الهندسة والزوايا</option>
                <option value="measurement">المحيط والمساحة والحجم</option>
                <option value="statistics_probability">الإحصاء والاحتمالات</option>
                <option value="powers_roots">القوى والجذور (الصف ٨)</option>
                <option value="sequences">الأنماط والحد النوني (الصف ٨)</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-1 text-right">
              <label className="text-xs font-bold text-slate-700 block">مستوى الصعوبة:</label>
              <select
                value={formDifficulty}
                onChange={(e) => setFormDifficulty(e.target.value as DifficultyLevel)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold"
              >
                <option value="easy">نجمة البداية (سهل ⭐)</option>
                <option value="medium">نجمة التحدي (متوسط ⭐⭐)</option>
                <option value="hard">نجمة العبقرية (متقدم ⭐⭐⭐)</option>
              </select>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-1 text-right">
            <label className="text-xs font-bold text-slate-700 block">نص السؤال:</label>
            <textarea
              rows={3}
              value={formQuestion}
              onChange={(e) => setFormQuestion(e.target.value)}
              placeholder="اكتبي نص المسألة الرياضية هنا..."
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-base font-bold text-slate-900 focus:border-purple-500 outline-hidden"
            />
          </div>

          {/* 4 Options */}
          <div className="space-y-2 text-right">
            <label className="text-xs font-bold text-slate-700 block">
              الخيارات الأربعة (حددي الإجابة الصحيحة بالدائرة):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formOptions.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <input
                    type="radio"
                    name="correctIndex"
                    checked={formCorrectIndex === idx}
                    onChange={() => setFormCorrectIndex(idx)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...formOptions];
                      updated[idx] = e.target.value;
                      setFormOptions(updated);
                    }}
                    placeholder={`الخيار ${['أ', 'ب', 'ج', 'د'][idx]}`}
                    className="w-full p-2 text-sm bg-white border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Explanation & Hint */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 text-right">
              <label className="text-xs font-bold text-slate-700 block">تفسير الحل التربوي (يظهر بعد الإجابة):</label>
              <textarea
                rows={2}
                value={formExplanation}
                onChange={(e) => setFormExplanation(e.target.value)}
                placeholder="تفسير الخطوات الرياضية..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              />
            </div>

            <div className="space-y-1 text-right">
              <label className="text-xs font-bold text-slate-700 block">تلميح أ. نورة (يظهر عند طلب المساعدة):</label>
              <textarea
                rows={2}
                value={formHint}
                onChange={(e) => setFormHint(e.target.value)}
                placeholder="تلميح مختصر ذكي..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={handleSaveQuestion}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-black text-sm rounded-xl shadow-md transition-all font-cairo flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>حفظ السؤال في المنصة ✓</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter and Question Bank Management Table */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1 text-right">
            <h3 className="text-lg font-black text-slate-900 font-cairo">
              بنك الأسئلة الحالي (الصف {grade === 7 ? 'السابع 🌸' : 'الثامن 🔮'})
            </h3>
            <p className="text-xs text-slate-500">
              إجمالي {formatNum(filteredQuestions.length, useEasternNumerals)} سؤال متاح حاليًا
            </p>
          </div>

          {/* Quick grade switch */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGrade(7)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                grade === 7
                  ? 'bg-pink-500 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              الصف السابع
            </button>
            <button
              onClick={() => setGrade(8)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                grade === 8
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              الصف الثامن
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-3">
          {filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-all text-right space-y-2 bg-slate-50/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-lg">
                    {q.topicTitle}
                  </span>
                  <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-lg">
                    {q.difficulty === 'easy' ? 'سهل ⭐' : q.difficulty === 'medium' ? 'تحدي ⭐⭐' : 'عبقري ⭐⭐⭐'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(q)}
                    className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="تعديل السؤال"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('هل أنتِ متأكدة من حذف هذا السؤال؟')) {
                        deleteQuestion(q.id);
                        sound.playClick();
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="حذف السؤال"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="font-extrabold text-slate-900 text-sm sm:text-base font-cairo">
                {q.question}
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pt-1">
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  الإجابة الصحيحة: {q.options[q.correctIndex]}
                </span>
                <span className="text-slate-400">·</span>
                <span>النقاط: {formatNum(q.points, useEasternNumerals)}</span>
              </div>
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm font-bold">
              لا توجد أسئلة مطابقة للفلتر المحدد.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
