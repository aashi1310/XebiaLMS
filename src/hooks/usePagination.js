/**
 * usePagination.js
 *
 * Reusable pagination logic hook.
 * Handles current page, items per page, page numbers, and navigation.
 *
 * @param {Array} items - Full array of items to paginate
 * @param {number} itemsPerPage - Number of items per page (default: 6)
 * @returns Pagination state and controls
 */

import { useState, useMemo } from 'react';

const usePagination = (items = [], itemsPerPage = 6) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(itemsPerPage);

  // Calculate total pages
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / perPage)),
    [items.length, perPage]
  );

  // Slice items for current page
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, currentPage, perPage]);

  // Generate page numbers array (e.g., [1, 2, 3, 4, 5])
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const goNext = () => goToPage(currentPage + 1);
  const goPrev = () => goToPage(currentPage - 1);

  // Reset to first page when items change (e.g., after filtering)
  const resetPage = () => setCurrentPage(1);

  return {
    currentPage,
    currentItems,
    totalPages,
    pageNumbers,
    perPage,
    setPerPage: (val) => { setPerPage(val); setCurrentPage(1); },
    goToPage,
    goNext,
    goPrev,
    resetPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    totalItems: items.length,
    startIndex: (currentPage - 1) * perPage + 1,
    endIndex: Math.min(currentPage * perPage, items.length),
  };
};

export default usePagination;
