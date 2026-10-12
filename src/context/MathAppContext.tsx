import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  GradeLevel,
  MathQuestion,
  StudentStats,
  Badge,
  SubstituteSessionConfig,
  ScreenType,
} from '../types';
import { INITIAL_QUESTIONS, SYSTEM_BADGES } from '../data/curriculumData';
import { sound } from '../utils/sound';

export type ActiveScreen = ScreenType;

interface MathAppContextType {
  grade: GradeLevel;
  setGrade: (grade: GradeLevel) => void;
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  useEasternNumerals: boolean;
  toggleNumerals: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  testAudio: () => void;
  stats: StudentStats;
  addStars: (amount: number, reason?: string) => void;
  addGems: (amount: number) => void;
  recordQuestionSolved: (isCorrect: boolean) => void;
  unlockCastleRoom: (roomId: number) => void;
  unlockMysteryBox: (boxId: number) => void;
  solveDetectiveCase: (caseId: string) => void;
  unlockBadge: (badgeId: string) => void;
  questions: MathQuestion[];
  addQuestion: (q: MathQuestion) => void;
  updateQuestion: (q: MathQuestion) => void;
  deleteQuestion: (id: string) => void;
  resetQuestionsToDefault: () => void;
  triggerCelebration: () => void;
  currentSubstituteConfig: SubstituteSessionConfig | null;
  setSubstituteConfig: (cfg: SubstituteSessionConfig | null) => void;
  badges: Badge[];
  studentName: string;
  setStudentName: (name: string) => void;
}

const defaultStats: StudentStats = {
  stars: 35,
  gems: 5,
  questionsSolved: 0,
  correctAnswers: 0,
  gamesPlayed: 0,
  castleUnlockedRooms: [],
  unlockedBoxes: [],
  solvedCases: [],
  badges: ['star_starter'],
  recentActivities: [
    {
      gameName: 'الترحيب في عالم المدرسة والمملكة',
      score: 35,
      timestamp: Date.now() - 3600000,
    },
  ],
};

const MathAppContext = createContext<MathAppContextType | undefined>(undefined);

export const MathAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [grade, setGradeState] = useState<GradeLevel>(() => {
    const saved = localStorage.getItem('math_grade');
    return saved === '8' ? 8 : 7;
  });

  const [activeScreen, setActiveScreenState] = useState<ActiveScreen>('home');
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const [useEasternNumerals, setUseEasternNumerals] = useState<boolean>(() => {
    return localStorage.getItem('math_eastern_nums') === 'true';
  });

  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('math_student_name') || 'بطلة الرياضيات والمدرسة';
  });

  const [questions, setQuestions] = useState<MathQuestion[]>(() => {
    const saved = localStorage.getItem('math_questions_bank');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return INITIAL_QUESTIONS;
  });

  const [stats, setStats] = useState<StudentStats>(() => {
    const saved = localStorage.getItem('math_student_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return defaultStats;
  });

  const [currentSubstituteConfig, setSubstituteConfig] = useState<SubstituteSessionConfig | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('math_grade', String(grade));
  }, [grade]);

  useEffect(() => {
    localStorage.setItem('math_student_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('math_questions_bank', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('math_eastern_nums', String(useEasternNumerals));
  }, [useEasternNumerals]);

  useEffect(() => {
    localStorage.setItem('math_student_name', studentName);
  }, [studentName]);

  const setGrade = (newGrade: GradeLevel) => {
    setGradeState(newGrade);
    sound.playClick();
  };

  const setActiveScreen = (screen: ActiveScreen) => {
    sound.playClick();
    setActiveScreenState(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  const testAudio = () => {
    if (isMuted) {
      sound.setMuted(false);
      setIsMuted(false);
    }
    sound.testSound();
  };

  const toggleNumerals = () => {
    sound.playClick();
    setUseEasternNumerals((prev) => !prev);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#A855F7', '#38BDF8', '#FBBF24', '#34D399'],
      });
    } catch {
      // Ignore
    }
  };

  const addStars = (amount: number, reason?: string) => {
    setStats((prev) => {
      const newStars = prev.stars + amount;
      const recent = reason
        ? [{ gameName: reason, score: amount, timestamp: Date.now() }, ...prev.recentActivities.slice(0, 9)]
        : prev.recentActivities;
      return {
        ...prev,
        stars: newStars,
        recentActivities: recent,
      };
    });
  };

  const addGems = (amount: number) => {
    setStats((prev) => ({
      ...prev,
      gems: prev.gems + amount,
    }));
  };

  const recordQuestionSolved = (isCorrect: boolean) => {
    setStats((prev) => ({
      ...prev,
      questionsSolved: prev.questionsSolved + 1,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
    }));
  };

  const unlockCastleRoom = (roomId: number) => {
    setStats((prev) => {
      if (prev.castleUnlockedRooms.includes(roomId)) return prev;
      const updated = [...prev.castleUnlockedRooms, roomId];
      return {
        ...prev,
        castleUnlockedRooms: updated,
      };
    });
  };

  const unlockMysteryBox = (boxId: number) => {
    setStats((prev) => {
      if (prev.unlockedBoxes.includes(boxId)) return prev;
      return {
        ...prev,
        unlockedBoxes: [...prev.unlockedBoxes, boxId],
      };
    });
  };

  const solveDetectiveCase = (caseId: string) => {
    setStats((prev) => {
      if (prev.solvedCases.includes(caseId)) return prev;
      return {
        ...prev,
        solvedCases: [...prev.solvedCases, caseId],
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setStats((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
      };
    });
  };

  const addQuestion = (q: MathQuestion) => {
    setQuestions((prev) => [q, ...prev]);
  };

  const updateQuestion = (updated: MathQuestion) => {
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const resetQuestionsToDefault = () => {
    setQuestions(INITIAL_QUESTIONS);
    localStorage.removeItem('math_questions_bank');
  };

  const badges = SYSTEM_BADGES.map((b) => ({
    ...b,
    unlocked: stats.badges.includes(b.id) || (b.id === 'cambridge_crown' && stats.stars >= 100),
  }));

  return (
    <MathAppContext.Provider
      value={{
        grade,
        setGrade,
        activeScreen,
        setActiveScreen,
        useEasternNumerals,
        toggleNumerals,
        isMuted,
        toggleMute,
        testAudio,
        stats,
        addStars,
        addGems,
        recordQuestionSolved,
        unlockCastleRoom,
        unlockMysteryBox,
        solveDetectiveCase,
        unlockBadge,
        questions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        resetQuestionsToDefault,
        triggerCelebration,
        currentSubstituteConfig,
        setSubstituteConfig,
        badges,
        studentName,
        setStudentName,
      }}
    >
      {children}
    </MathAppContext.Provider>
  );
};

export const useMathApp = (): MathAppContextType => {
  const context = useContext(MathAppContext);
  if (!context) {
    throw new Error('useMathApp must be used within a MathAppProvider');
  }
  return context;
};
