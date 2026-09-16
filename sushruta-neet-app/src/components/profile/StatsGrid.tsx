import React from 'react';
import {
  FileText,
  Clock,
  Target,
  ClipboardList,
  Trophy,
  BarChart2,
} from 'lucide-react';
import { StatCard } from './StatCard';
import { ProfileStats, formatStudyTime } from '@/types/stats';

interface StatsGridProps {
  stats: ProfileStats;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const statItems = [
    {
      title: 'Topics Completed',
      value: stats.topicsCompleted,
      icon: <FileText size={18} color="#10b981" />,
      iconBg: '#d1fae5',
      valueColor: '#1a2332',
    },
    {
      title: 'Total Study Time',
      value: formatStudyTime(stats.totalStudyMinutes),
      icon: <Clock size={18} color="#3b82f6" />,
      iconBg: '#dbeafe',
      valueColor: '#1a2332',
    },
    {
      title: 'Average Accuracy',
      value: `${stats.averageAccuracy}%`,
      icon: <Target size={18} color="#ef4444" />,
      iconBg: '#fee2e2',
      valueColor: '#1a2332',
    },
    {
      title: 'Mock Tests Taken',
      value: stats.mockTestsTaken,
      icon: <ClipboardList size={18} color="#8b5cf6" />,
      iconBg: '#ede9fe',
      valueColor: '#1a2332',
    },
    {
      title: 'Achievements',
      value: stats.achievements,
      icon: <Trophy size={18} color="#f59e0b" />,
      iconBg: '#fef3c7',
      valueColor: '#1a2332',
    },
    {
      title: 'Syllabus Covered',
      value: `${stats.syllabusCovered}%`,
      icon: <BarChart2 size={18} color="#10b981" />,
      iconBg: '#d1fae5',
      valueColor: '#1a2332',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {statItems.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          iconBg={item.iconBg}
          valueColor={item.valueColor}
        />
      ))}
    </div>
  );
};
