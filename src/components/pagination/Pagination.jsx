/**
 * Pagination.jsx
 * Reusable pagination component.
 * Renders page numbers, previous/next buttons, and item count summary.
 * Designed to work with the usePagination hook.
 */

import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const Pagination = ({
  currentPage,
  totalPages,
  pageNumbers,
  goToPage,
  goNext,
  goPrev,
  hasNext,
  hasPrev,
  startIndex,
  endIndex,
  totalItems,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
      {/* Item count summary */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Showing {startIndex}–{endIndex} of {totalItems} results
      </p>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <button
          onClick={goPrev}
          disabled={!hasPrev}
          className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <RiArrowLeftSLine className="text-lg" />
        </button>

        {/* Page number buttons */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-8 h-8 text-xs font-medium rounded-md transition-colors ${
              page === currentPage
                ? 'bg-[#6C1D5F] text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={goNext}
          disabled={!hasNext}
          className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <RiArrowRightSLine className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
