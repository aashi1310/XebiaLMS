/**
 * LearningPathCard.jsx
 * Displays a learning path with course count, progress, and enrollment info.
 */

import React from 'react';
import { RiBookOpenLine, RiGroupLine, RiTimeLine } from 'react-icons/ri';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

const LearningPathCard = ({ path }) => {
  const { title, description, category, level, totalCourses, completedCourses, totalHours, enrolledCount } = path;
  const progress = Math.round((completedCourses / totalCourses) * 100);

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge label={category} />
            <Badge label={level} />
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug">{title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed truncate-2">{description}</p>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1">
          <RiBookOpenLine /> {totalCourses} courses
        </span>
        <span className="flex items-center gap-1">
          <RiTimeLine /> {totalHours}
        </span>
        <span className="flex items-center gap-1">
          <RiGroupLine /> {enrolledCount.toLocaleString()} enrolled
        </span>
      </div>

      {/* Progress */}
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          {completedCourses} of {totalCourses} courses completed
        </p>
        <ProgressBar progress={progress} showLabel={false} />
      </div>
    </article>
  );
};

export default React.memo(LearningPathCard);
