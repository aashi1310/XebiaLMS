/**
 * MyLearningPage.jsx
 * Shows all enrolled courses with progress bars and filter tabs.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { getCourses } from '../../services/mockApi';
import CourseCard from '../../components/cards/CourseCard';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import Pagination from '../../components/pagination/Pagination';
import usePagination from '../../hooks/usePagination';
import { RiBookOpenLine } from 'react-icons/ri';

const FILTERS = ['All', 'In Progress', 'Completed', 'Not Started'];

const MyLearningPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    getCourses({ enrolledOnly: true }).then(({ data }) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  // Filter courses by progress status
  const filtered = useMemo(() => {
    if (activeFilter === 'In Progress') return courses.filter(c => c.progress > 0 && c.progress < 100);
    if (activeFilter === 'Completed') return courses.filter(c => c.progress === 100);
    if (activeFilter === 'Not Started') return courses.filter(c => c.progress === 0);
    return courses;
  }, [courses, activeFilter]);

  const pagination = usePagination(filtered, 6);

  if (loading) return <Loader message="Loading your courses..." />;

  return (
    <div className="space-y-5 max-w-[1200px]">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">My Learning</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Track your enrolled courses and progress.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => { setActiveFilter(f); pagination.resetPage(); }}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeFilter === f
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Course grid */}
      {pagination.currentItems.length === 0 ? (
        <EmptyState
          icon={RiBookOpenLine}
          title="No courses found"
          description="Enroll in courses from Browse Courses to see them here."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pagination.currentItems.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination {...pagination} />
    </div>
  );
};

export default MyLearningPage;
