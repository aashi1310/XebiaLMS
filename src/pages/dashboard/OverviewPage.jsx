/**
 * OverviewPage.jsx
 *
 * Dashboard home page redesigned to match the new reference layout:
 * - Hero Banner with dark purple background.
 * - Stats grid (Modules enrolled, Completed, In review, Pass rate).
 * - 3-Column Layout for content (Left, Middle, Right).
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDashboard } from '../../services/mockApi';
import Loader from '../../components/common/Loader';
import { ROUTES } from '../../constants/routes';

const OverviewPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We still fetch mock data, but we'll adapt it to the new layout
    getDashboard().then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader message="Loading your dashboard..." />;

  const { featuredCourse } = data;

  // Dummy data for the new sections to match the image
  const skills = [
    { name: 'Cloud Architecture', progress: 78 },
    { name: 'Kubernetes', progress: 64 },
    { name: 'Python / Scripting', progress: 83 },
    { name: 'Security Practices', progress: 51 },
    { name: 'CI/CD Pipelines', progress: 69 },
  ];

  const team = [
    { id: 1, name: 'Rohan M.', initials: 'RM', color: 'bg-purple-700' },
    { id: 2, name: 'Priya S.', initials: 'PS', color: 'bg-teal-500' },
    { id: 3, name: 'Aashika J.', initials: 'AJ', color: 'bg-pink-800', isYou: true },
    { id: 4, name: 'Aryan K.', initials: 'AK', color: 'bg-slate-600' },
    { id: 5, name: 'Neha R.', initials: 'NR', color: 'bg-blue-400' },
  ];

  const recommendations = [
    { title: 'Terraform & IaC Fundamentals', level: 'Intermediate' },
    { title: 'Observability with Grafana', level: 'Advanced' },
  ];

  const chartData = [3, 5, 5, 2, 6, 2, 0]; // Mon-Sun dummy heights

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10 mt-[-10px]">

      {/* === Hero Banner === */}
      <div className="bg-[#4A1E47] rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between p-6 md:p-8 relative">
        <div className="flex-1 text-white z-10 max-w-2xl">
          <h1 className="text-2xl md:text-[28px] font-bold mb-3 tracking-tight">
            Ready to level up, {user?.name?.split(' ')[0] || 'Khushpreet'}?
          </h1>
          <p className="text-[#D3C4D1] text-sm md:text-base leading-relaxed mb-6">
            You're making great progress this week. Your learning pace is at 88% of your weekly target. Complete your upcoming AWS Architect module to stay on track!
          </p>
          <button
            onClick={() => navigate(ROUTES.LEARNING_PATHS)}
            className="text-white text-sm font-semibold hover:text-[#01AC9F] transition-colors"
          >
            Explore Learning Path
          </button>
        </div>
        {/* Right side illustration / graphic */}
        <div className="mt-6 md:mt-0 md:ml-8 shrink-0 relative z-10">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-lg p-2 shadow-lg rotate-2 hover:rotate-0 transition-transform">
            {/* Placeholder for illustration */}
            <div className="w-full h-full bg-slate-100 rounded border border-slate-200 flex items-center justify-center overflow-hidden">
              <img
                src="https://api.dicebear.com/9.x/shapes/svg?seed=learn&backgroundColor=F7F8FC,4A1E47&shape1Color=01AC9F"
                alt="Illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      </div>

      {/* === Stats Row === */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { value: '31', label: 'Modules enrolled' },
          { value: '9', label: 'Completed' },
          { value: '5', label: 'In review' },
          { value: '91%', label: 'Pass rate', valueColor: 'text-[#01AC9F]' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
            <div className={`text-3xl font-bold ${stat.valueColor || 'text-slate-900 dark:text-white'}`}>
              {stat.value}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wide font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* === 3-Column Content Area === */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Column 1 (Left): Pick up where you left off & Skills */}
        <div className="lg:col-span-5 space-y-6">

          {/* Pick up where you left off */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Pick up where you left off
              </h2>
              <span className="text-xs bg-purple-50 dark:bg-purple-900/30 text-[#6C1D5F] dark:text-purple-300 font-semibold px-2 py-1 rounded-md">
                Module 4 of 9
              </span>
            </div>

            <div className="flex gap-4 mb-5">
              <div className="w-14 h-14 bg-[#4A1E47] rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  Cloud Architecture on AWS
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Chapter 4 • Kubernetes Orchestration Patterns
                </p>
                <div className="flex gap-2 text-[10px] font-semibold">
                  <span className="text-[#01AC9F] bg-teal-50 dark:bg-teal-900/20 px-2 py-0.5 rounded">DevOps</span>
                  <span className="text-[#01AC9F] bg-teal-50 dark:bg-teal-900/20 px-2 py-0.5 rounded">Kubernetes</span>
                  <span className="text-[#01AC9F] bg-teal-50 dark:bg-teal-900/20 px-2 py-0.5 rounded">AWS EKS</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-end text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                64%
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#6C1D5F] rounded-full" style={{ width: '64%' }} />
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-[#6C1D5F] text-white text-xs font-semibold py-2.5 rounded hover:bg-[#4A1E47] transition-colors">
                Resume Module
              </button>
              <button className="flex-1 bg-white dark:bg-slate-800 text-[#6C1D5F] dark:text-purple-300 text-xs font-semibold py-2.5 rounded border border-[#6C1D5F]/20 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                View Syllabus
              </button>
            </div>
          </div>

          {/* Your skill progress */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Your skill progress</h2>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Last 30 Days</span>
            </div>
            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-700 dark:text-slate-200">{skill.name}</span>
                    <span className="text-slate-900 dark:text-white">{skill.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${skill.progress > 80 ? 'bg-[#01AC9F]' : 'bg-[#6C1D5F]'}`}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Column 2 (Middle): Learning pace & Certifications */}
        <div className="lg:col-span-4 space-y-6">

          {/* Learning Pace */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Learning pace</h2>
              <div className="flex bg-slate-100 dark:bg-slate-700 rounded-full p-0.5">
                <button className="px-3 py-1 bg-[#4A1E47] text-white text-[10px] font-bold rounded-full">This week</button>
                <button className="px-3 py-1 text-slate-500 dark:text-slate-300 text-[10px] font-bold rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Month</button>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic mb-6">
              Hours logged per day — slightly below your 3hr goal on Wed
            </p>

            <div className="flex justify-end gap-3 text-[10px] text-slate-500 font-medium mb-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#6C1D5F]"></span> Logged
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-100 dark:bg-teal-900/50"></span> Daily goal
              </span>
            </div>

            {/* Custom CSS Bar Chart */}
            <div className="relative h-32 flex items-end justify-between border-l border-b border-slate-100 dark:border-slate-700 pt-2 pb-1 pr-2">
              <div className="absolute left-[-15px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-400 py-1">
                <span>5</span>
                <span>4</span>
                <span>3</span>
                <span>2</span>
                <span>1</span>
                <span>0</span>
              </div>

              {/* Bars */}
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className="flex flex-col items-center gap-2 w-full">
                  <div className="relative w-full h-[100px] flex justify-center items-end group">
                    {/* Background target bar */}
                    <div className="absolute bottom-0 w-3 md:w-4 bg-teal-50 dark:bg-teal-900/20 rounded-sm" style={{ height: '70%' }} />
                    {/* Actual progress bar */}
                    <div className="absolute bottom-0 w-3 md:w-4 bg-[#6C1D5F] rounded-sm transition-all duration-500 group-hover:bg-[#4A1E47]" style={{ height: `${(chartData[idx] / 6) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certification goals */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-5">Certification goals</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between bg-slate-50/50 dark:bg-slate-800/50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#01AC9F]"></span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">AWS Solutions Architect</span>
                </div>
                <span className="text-[10px] font-bold text-[#01AC9F] bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">
                  Scheduled · July 12, 2026
                </span>
              </div>
              <div className="flex items-start justify-between bg-slate-50/50 dark:bg-slate-800/50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Kubernetes Administrator (CKA)</span>
                </div>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">
                  In Prep · Target: Aug 5
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Column 3 (Right): Team & Recommendations */}
        <div className="lg:col-span-3 space-y-6">

          {/* Team this month */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Team this month</h2>
              <span className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold">Your Team · 6 People</span>
            </div>

            <div className="space-y-4">
              {team.map((member, idx) => (
                <div key={member.id} className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold w-4 ${idx < 3 ? 'text-orange-500' : 'text-slate-400'}`}>
                    {idx + 1}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] text-white font-bold ${member.color}`}>
                    {member.initials}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {member.name}
                    {member.isYou && <span className="text-slate-400 font-normal ml-1">(you)</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended for you */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Recommended for you</h2>
            <ul className="space-y-4">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6C1D5F] mt-1.5 shrink-0"></span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight mb-1">
                      {rec.title}
                    </h3>
                    <span className="text-[10px] text-slate-500">{rec.level}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OverviewPage;
