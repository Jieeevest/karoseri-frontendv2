import React from "react";

// Type for the filter state
interface FilterState {
  currentPage: number;
  pageSize: number;
}

// Props type for the Pagination component
interface PaginationProps {
  totalItems: number; // Total number of items
  pageSize: number; // Current page size
  currentPage: number; // Current page
  setFilter: (filter: any) => void;
  pageSizeOptions: number[]; // List of options for page size (e.g. 5, 10, 20)
}

const PaginationData: React.FC<PaginationProps> = ({
  totalItems,
  pageSize,
  currentPage,
  setFilter,
  pageSizeOptions,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  // Create an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setFilter((prev: any) => ({ ...prev, page: page }));
    }
  };

  // Handle page size change
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value, 10);
    setFilter((prev: any) => ({
      ...prev,
      pageSize: newPageSize,
      currentPage: 1,
    })); // Reset to the first page
  };

  return (
    <div className="flex items-center gap-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-sm btn-outline"
      >
        Previous
      </button>

      {/* Page Number Links */}
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`btn btn-sm ${
              page === currentPage ? "btn-primary" : "btn-outline"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-sm btn-outline"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationData;
