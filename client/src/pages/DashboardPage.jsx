import React from 'react';
import {
  DashboardGrid,
  DashboardHeader,
  DashboardStats,
  WelcomeBanner,
} from '../components/dashboard';

import { activity, recentProjects, recentVideos, stats } from '../data/dashboard';


/**
 * DashboardPage (Module 4 - Phase 4.1)
 * Presentation-only dashboard foundation using MOCK DATA.
 */
export function DashboardPage() {
  const now = new Date();

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
  });

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const dateText = dateFormatter.format(now);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div>
        <DashboardHeader greeting={`${greeting}!`} dateText={dateText} />
      </div>

      <WelcomeBanner />

      <DashboardStats stats={stats} />

      {/* Layout root as requested: RecentProjects + RecentVideos + ActivityTimeline + QuickActions */}
      <DashboardGrid
        projects={recentProjects}
        videos={recentVideos}
        activities={activity}
      />

    </div>

  );
}

export default DashboardPage;


