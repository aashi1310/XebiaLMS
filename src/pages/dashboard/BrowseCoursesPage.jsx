/**
 * BrowseCoursesPage.jsx
 *
 * Course catalog with search + category filter + paginated course grid.
 * Implements debounced search and mock API filtering.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { getCourses } from '../../services/mockApi';
import CourseCard from '../../components/cards/CourseCard';
import SearchBar from '../../components/search/SearchBar';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import Pagination from '../../components/pagination/Pagination';
import usePagination from '../../hooks/usePagination';
import useDebounce from '../../hooks/useDebounce';
import { RiCompassLine } from 'react-icons/ri';

const CATEGORIES = ['All', 'AI/ML', 'Cloud', 'Frontend', 'Data', 'DevOps'];

const BrowseCoursesPage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Debounced search — only filter after 300ms of no typing
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    getCourses().then(({ data }) => {
      setAllCourses(data);
      setLoading(false);
    });
  }, []);

  // Apply search + category filters client-side
  const filtered = useMemo(() => {
    let result = allCourses;

    if (activeCategory !== 'All') {
      result = result.filter(c => c.category === activeCategory);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allCourses, activeCategory, debouncedSearch]);

  const pagination = usePagination(filtered, 6);

  // Reset page when category changes — resetPage is stable across renders
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    pagination.resetPage();
  };

  if (loading) return <Loader message="Loading courses..." />;

  return (
    <div className="space-y-5 max-w-[1200px]">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Browse Courses</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Explore {allCourses.length} expert-led courses across multiple tracks.
        </p>
      </div>

      {/* Search + filter row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search courses, skills, or instructors..."
          className="sm:max-w-xs"
        />

        {/* Category filter pills */}
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                activeCategory === cat
                  ? 'bg-[#6C1D5F] text-white border-[#6C1D5F]'
                  : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-[#6C1D5F] hover:text-[#6C1D5F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Course grid */}
      {pagination.currentItems.length === 0 ? (
        <EmptyState
          icon={RiCompassLine}
          title="No courses found"
          description="Try adjusting your search or selecting a different category."
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

export default BrowseCoursesPage;
