/**
 * CourseCard.jsx
 * Displays a course with its category badge, title, description,
 * instructor, progress bar (if enrolled), and action buttons.
 */

import React from 'react';
import { RiTimeLine, RiBookOpenLine } from 'react-icons/ri';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

// Category icon background colors
const CATEGORY_BG = {
  'AI/ML': 'bg-purple-100',
  'Cloud': 'bg-blue-100',
  'Frontend': 'bg-orange-100',
  'Data': 'bg-cyan-100',
  'DevOps': 'bg-green-100',
};

// Category icons (text-based)
const CATEGORY_ICONS = {
  'AI/ML': '🤖',
  'Cloud': '☁️',
  'Frontend': '</>',
  'Data': '🗄',
  'DevOps': '⚙️',
};

const CourseCard = ({ course, onClick }) => {
  const { title, category, description, instructor, progress, duration, lessons, level, enrolled } = course;
  const bgClass = CATEGORY_BG[category] || 'bg-gray-100';
  const icon = CATEGORY_ICONS[category] || '📚';

  return (
    <article
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col gap-3"
      onClick={() => onClick?.(course)}
    >
      {/* Category icon + badge row */}
      <div className="flex items-start justify-between">
        <span className={`w-10 h-10 rounded-xl ${bgClass} flex items-center justify-center text-lg`}>
          {icon}
        </span>
        <Badge label={category} />
      </div>

      {/* Title & description */}
      <div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug mb-1">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1">
          <RiTimeLine /> {duration}
        </span>
        <span className="flex items-center gap-1">
          <RiBookOpenLine /> {lessons} lessons
        </span>
        <Badge label={level} />
      </div>

      {/* Progress bar (only for enrolled courses) */}
      {enrolled && typeof progress === 'number' && (
        <ProgressBar progress={progress} />
      )}

      {/* Instructor */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-auto pt-1 border-t border-slate-100 dark:border-slate-700">
        {instructor}
      </p>
    </article>
  );
};

export default React.memo(CourseCard);
