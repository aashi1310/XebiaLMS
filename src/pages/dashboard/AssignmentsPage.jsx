/**
 * AssignmentsPage.jsx
 * Lists all assignments with tab filtering (All, Pending, Submitted, Graded).
 */

import React, { useEffect, useState } from 'react';
import { getAssignments } from '../../services/mockApi';
import AssignmentItem from '../../components/cards/AssignmentItem';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { RiFileTextLine } from 'react-icons/ri';

const FILTERS = ['all', 'pending', 'submitted', 'graded'];

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    getAssignments(activeFilter).then(({ data }) => {
      setAssignments(data);
      setLoading(false);
    });
  }, [activeFilter]);

  const handleFilterChange = (f) => {
    setLoading(true);
    setActiveFilter(f);
  };

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Assignments</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Track your submitted work and upcoming deadlines.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => handleFilterChange(f)}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${
              activeFilter === f
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Assignment list */}
      {loading ? (
        <Loader message="Loading assignments..." />
      ) : assignments.length === 0 ? (
        <EmptyState
          icon={RiFileTextLine}
          title="No assignments found"
          description="You're all caught up!"
        />
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
          {assignments.map(a => (
            <div key={a.id} className="px-2">
              <AssignmentItem assignment={a} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
