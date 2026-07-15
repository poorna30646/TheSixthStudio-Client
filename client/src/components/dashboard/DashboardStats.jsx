import React from 'react';
import { StatCard } from './StatCard';

/**
 * DashboardStats
 * Maps over the provided stats and renders StatCard.
 *
 * @param {Object} props
 * @param {Array<{title: string, value: string|number, description?: string}>} props.stats
 */
export function DashboardStats({ stats }) {
  return (
    <section className="mt-8" aria-label="Dashboard stats">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </div>
    </section>
  );
}

export default DashboardStats;

