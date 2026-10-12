/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MathAppProvider, useMathApp } from './context/MathAppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { SchoolWorldHub } from './components/SchoolWorldHub';
import { SubstituteClassFlow } from './components/SubstituteClassFlow';
import { SpeedGame } from './components/SpeedGame';
import { SpotErrorGame } from './components/SpotErrorGame';
import { MysteryBoxesGame } from './components/MysteryBoxesGame';
import { EscapeCastleGame } from './components/EscapeCastleGame';
import { LuckyWheelGame } from './components/LuckyWheelGame';
import { DetectiveGame } from './components/DetectiveGame';
import { TeamBattleGame } from './components/TeamBattleGame';
import { ArtStudioView } from './components/ArtStudioView';
import { BrainPuzzlesView } from './components/BrainPuzzlesView';
import { TalentStageView } from './components/TalentStageView';
import { ClassroomGamesView } from './components/ClassroomGamesView';
import { DiscoverWorldView } from './components/DiscoverWorldView';
import { InnovationLabView } from './components/InnovationLabView';
import { WellnessCornerView } from './components/WellnessCornerView';
import { StoryMakerView } from './components/StoryMakerView';
import { TournamentsView } from './components/TournamentsView';
import { SchoolEventsView } from './components/SchoolEventsView';
import { SubstitutePlannerView } from './components/SubstitutePlannerView';
import { AchievementsView } from './components/AchievementsView';
import { TeacherDashboard } from './components/TeacherDashboard';
import { Footer } from './components/Footer';

function MainRouter() {
  const { activeScreen } = useMathApp();

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {activeScreen === 'home' && <HomeView />}
      {activeScreen === 'school-world' && <SchoolWorldHub />}
      {activeScreen === 'substitute-mode' && <SubstituteClassFlow />}
      {activeScreen === 'substitute-planner' && <SubstitutePlannerView />}
      {activeScreen === 'speed-game' && <SpeedGame />}
      {activeScreen === 'spot-error' && <SpotErrorGame />}
      {activeScreen === 'mystery-boxes' && <MysteryBoxesGame />}
      {activeScreen === 'escape-castle' && <EscapeCastleGame />}
      {activeScreen === 'lucky-wheel' && <LuckyWheelGame />}
      {activeScreen === 'detective' && <DetectiveGame />}
      {activeScreen === 'team-challenge' && <TeamBattleGame />}
      {activeScreen === 'art-studio' && <ArtStudioView />}
      {activeScreen === 'brain-puzzles' && <BrainPuzzlesView />}
      {activeScreen === 'talent-stage' && <TalentStageView />}
      {activeScreen === 'classroom-games' && <ClassroomGamesView />}
      {activeScreen === 'discover-world' && <DiscoverWorldView />}
      {activeScreen === 'innovation-lab' && <InnovationLabView />}
      {activeScreen === 'wellness-corner' && <WellnessCornerView />}
      {activeScreen === 'story-maker' && <StoryMakerView />}
      {activeScreen === 'classroom-tournaments' && <TournamentsView />}
      {activeScreen === 'school-events' && <SchoolEventsView />}
      {activeScreen === 'achievements' && <AchievementsView />}
      {activeScreen === 'teacher-dashboard' && <TeacherDashboard />}
    </main>
  );
}

export default function App() {
  return (
    <MathAppProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF5FF] font-tajawal antialiased selection:bg-pink-200 selection:text-pink-900">
        <Navbar />
        <MainRouter />
        <Footer />
      </div>
    </MathAppProvider>
  );
}
