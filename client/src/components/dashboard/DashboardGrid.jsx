import React from 'react';
import { RecentProjects } from './RecentProjects';
import { RecentVideos } from './RecentVideos';
import { QuickActions } from './QuickActions';
import { ActivityTimeline } from './ActivityTimeline';

/**
 * DashboardGrid
 * Composes the dashboard modules grid.
 */
export function DashboardGrid({
  projects,
  videos,
  activities,
}) {
  return (
    <section className="mt-8" aria-label="Dashboard grid">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RecentProjects projects={projects} />
        </div>
        <div className="lg:col-span-1">
          <RecentVideos videos={videos} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
          <div className="mt-6">
            <ActivityTimeline items={activities} />
          </div>
        </div>
      </div>
    </section>
  );
}





export default DashboardGrid;



