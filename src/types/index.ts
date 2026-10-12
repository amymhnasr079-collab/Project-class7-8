export type GradeLevel = 7 | 8;

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type MathTopic = 
  | 'operations' // العمليات وترتيبها
  | 'fractions_decimals' // الكسور والعشري والنسب المئوية
  | 'ratios' // النسبة والتناسب
  | 'algebra' // المقادير الجبرية والمعادلات
  | 'geometry' // الهندسة والزوايا
  | 'measurement' // المحيط والمساحة والحجم
  | 'statistics_probability' // الإحصاء والاحتمالات
  | 'powers_roots' // القوى والجذور (الصف الثامن)
  | 'sequences'; // الأنماط والحد النوني (الصف الثامن)

export interface MathQuestion {
  id: string;
  grade: GradeLevel;
  topic: MathTopic;
  topicTitle: string;
  difficulty: DifficultyLevel;
  question: string;
  questionImage?: string;
  visualHint?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  points: number;
}

export interface ErrorSpottingQuestion {
  id: string;
  grade: GradeLevel;
  topic: MathTopic;
  title: string;
  problem: string;
  steps: {
    stepNumber: number;
    text: string;
    isError: boolean;
  }[];
  options: string[];
  correctOptionIndex: number;
  errorExplanation: string;
  correctSolution: string;
  difficulty: DifficultyLevel;
}

export interface MysteryBox {
  id: number;
  title: string;
  color: string;
  icon: string;
  difficulty: DifficultyLevel;
  grade: GradeLevel;
  riddle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rewardStars: number;
  surpriseMsg: string;
}

export interface CastleRoom {
  id: number;
  name: string;
  roomNameAr: string;
  description: string;
  storyIntro: string;
  grade: GradeLevel;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  doorColor: string;
}

export interface DetectiveCase {
  id: string;
  grade: GradeLevel;
  title: string;
  location: string;
  brief: string;
  story: string;
  clues: string[];
  question: string;
  options: string[];
  correctIndex: number;
  detectiveTip: string;
  solutionBreakdown: string;
  badgeEarned: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category: string;
}

export interface StudentStats {
  stars: number;
  gems: number;
  questionsSolved: number;
  correctAnswers: number;
  gamesPlayed: number;
  castleUnlockedRooms: number[];
  unlockedBoxes: number[];
  solvedCases: string[];
  badges: string[];
  recentActivities: {
    gameName: string;
    score: number;
    timestamp: number;
  }[];
}

export interface SubstituteSessionConfig {
  grade: GradeLevel;
  durationMinutes: 10 | 20 | 30 | 40;
  mode: 'individual' | 'teams' | 'projector';
  gameId: string;
  teamCount?: number;
}

// ==========================================
// EXPANDED SCHOOL ACTIVITIES TYPES
// ==========================================

export type ScreenType =
  | 'home'
  | 'school-world'
  | 'substitute-mode'
  | 'substitute-planner'
  | 'speed-game'
  | 'spot-error'
  | 'mystery-boxes'
  | 'escape-castle'
  | 'lucky-wheel'
  | 'detective'
  | 'team-challenge'
  | 'art-studio'
  | 'brain-puzzles'
  | 'talent-stage'
  | 'classroom-games'
  | 'discover-world'
  | 'innovation-lab'
  | 'wellness-corner'
  | 'story-maker'
  | 'classroom-tournaments'
  | 'school-events'
  | 'achievements'
  | 'teacher-dashboard'
  | 'about-platform';

export interface SchoolActivityCard {
  id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  targetScreen: ScreenType;
  duration: string;
  badge: string;
}

export interface SubstitutePlan {
  id: string;
  grade: GradeLevel;
  durationMinutes: number;
  activityType: 'calm' | 'active' | 'team' | 'individual' | 'creative' | 'knowledge';
  title: string;
  introHook: string;
  mainActivity: string;
  rules: string[];
  stageTiming: { stage: string; minutes: number }[];
  bonusChallenge: string;
  celebrationWrapUp: string;
}
