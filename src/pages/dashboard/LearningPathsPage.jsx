/**
 * LearningPathsPage.jsx
 * Displays all learning paths with category filter and search.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { getLearningPaths } from '../../services/mockApi';
import LearningPathCard from '../../components/cards/LearningPathCard';
import SearchBar from '../../components/search/SearchBar';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import useDebounce from '../../hooks/useDebounce';
import { RiMapLine } from 'react-icons/ri';

const LearningPathsPage = () => {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    getLearningPaths().then(({ data }) => {
      setPaths(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return paths;
    const q = debouncedSearch.toLowerCase();
    return paths.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [paths, debouncedSearch]);

  if (loading) return <Loader message="Loading learning paths..." />;

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Learning Paths</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Structured paths to guide your professional growth.
        </p>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
        placeholder="Search learning paths..."
        className="max-w-xs"
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={RiMapLine}
          title="No paths found"
          description="Try a different search term."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(path => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPathsPage;
