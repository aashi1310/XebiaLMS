/**
 * OverviewPage.jsx
 *
 * Dashboard home page. Matches reference exactly:
 * - Top greeting banner with "Continue Learning" CTA + Weekly Streak Goal (circular)
 * - Featured course section (left image-like area, right course info + progress)
 * - Stats grid: Day Streak, Hours Completed, Courses Active, Certificates
 * - My Courses grid (enrolled courses with progress bars)
 * - Upcoming Assignments timeline (right sidebar-style column)
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiFireLine,
  RiTimeLine,
  RiBookOpenLine,
  RiAwardLine,
  RiArrowRightLine,
  RiAlarmLine,
} from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import { getDashboard } from '../../services/mockApi';
import { getGreeting } from '../../utils/formatters';
import Loader from '../../components/common/Loader';
import StatCard from '../../components/cards/StatCard';
import CourseCard from '../../components/cards/CourseCard';
import AssignmentItem from '../../components/cards/AssignmentItem';
import ProgressBar from '../../components/common/ProgressBar';
import { ROUTES } from '../../constants/routes';

// Circular progress ring for Weekly Streak Goal
const StreakRing = ({ value, label }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  // Show ring as partially filled based on value/7 (days per week)
  const progress = Math.min(value / 7, 1);
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="6" />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#6C1D5F"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-[#6C1D5F]">{value}</span>
          <span className="text-xs text-slate-400">DAYS</span>
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</p>
    </div>
  );
};

const OverviewPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard().then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader message="Loading your dashboard..." />;

  const { stats, featuredCourse, recentCourses, upcomingAssignments } = data;
  const greeting = getGreeting();

  return (
    <div className="space-y-6 max-w-[1200px]">

      {/* === Greeting Banner + Streak === */}
      <div className="bg-gradient-to-r from-violet-50 to-pink-50 dark:from-slate-800/60 dark:to-purple-900/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-violet-100 dark:border-purple-900/30">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
            {greeting}, {user?.name || 'Student'}.
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            You are making strong progress this week. Keep up the momentum.
          </p>
          <button
            onClick={() => navigate(ROUTES.MY_LEARNING)}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#01AC9F] text-white text-sm font-semibold rounded-full hover:bg-[#018076] transition-colors"
          >
            Continue Learning <RiArrowRightLine />
          </button>
        </div>
        <div className="shrink-0">
          <StreakRing value={stats.weeklyStreakGoal} label="Weekly Streak Goal" />
        </div>
      </div>

      {/* === Two-column layout: left (featured + my courses), right (stats + assignments) === */}
      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left column */}
        <div className="flex-1 space-y-6 min-w-0">

          {/* Featured course */}
          {featuredCourse && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row gap-0">
                {/* Image placeholder — dark decorative area */}
                <div className="sm:w-48 lg:w-56 bg-[#1C0B1B] flex-shrink-0 flex items-end p-3 min-h-[140px] relative overflow-hidden">
                  {/* Decorative neon oval */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-[#84117C]/40" aria-hidden="true" />
                  <span className="relative z-10 bg-black/40 text-white text-xs px-2 py-1 rounded-md">
                    {featuredCourse.track}
                  </span>
                </div>

                {/* Course info */}
                <div className="flex-1 p-5 flex flex-col gap-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">{featuredCourse.title}</h2>
                    <p className="text-sm text-[#6C1D5F] flex items-center gap-1 mt-0.5">
                      <RiAlarmLine className="text-xs" />
                      Up next: {featuredCourse.nextLesson}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide font-medium">
                      <span>Course Progress</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{featuredCourse.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#6C1D5F] transition-all duration-700"
                        style={{ width: `${featuredCourse.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button className="px-4 py-2 bg-[#01AC9F] text-white text-xs font-semibold rounded-full hover:bg-[#018076] transition-colors">
                      Resume Lesson
                    </button>
                    <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      View Curriculum
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* My Courses grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">My Courses</h2>
              <button
                onClick={() => navigate(ROUTES.MY_LEARNING)}
                className="text-sm text-[#6C1D5F] font-medium hover:underline"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentCourses.slice(0, 4).map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="xl:w-72 space-y-4 shrink-0">

          {/* Stats grid — 2x2 */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={RiFireLine}
              value={stats.dayStreak}
              label="Day Streak"
              iconBg="bg-orange-100"
              iconColor="text-orange-500"
            />
            <StatCard
              icon={RiTimeLine}
              value={stats.hoursCompleted}
              label="Hours Completed"
              iconBg="bg-purple-100"
              iconColor="text-purple-600"
            />
            <StatCard
              icon={RiBookOpenLine}
              value={stats.coursesActive}
              label="Courses Active"
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              icon={RiAwardLine}
              value={stats.certificates}
              label="Certificates"
              iconBg="bg-yellow-100"
              iconColor="text-yellow-600"
            />
          </div>

          {/* Upcoming Assignments timeline */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">
              Upcoming Assignments
            </h2>
            <div className="space-y-4">
              {upcomingAssignments.map(a => (
                <AssignmentItem key={a.id} assignment={a} timeline />
              ))}
            </div>
            <button
              onClick={() => navigate(ROUTES.ASSIGNMENTS)}
              className="mt-4 text-xs text-[#6C1D5F] font-medium hover:underline"
            >
              View all assignments →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
