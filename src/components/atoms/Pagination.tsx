import React from "react";

interface PaginationProps {
  totalPage?: number;
  setCurrentPage: (page: string | number) => void;
  currentPage?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPage = 5,
  setCurrentPage,
  currentPage = 1,
  size = "md",
  className = "",
}) => {
  const paginationSize = {
    sm: "pagination-sm",
    md: "",
    lg: "pagination-lg",
  };
  const handlePageClick = (page: string | number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    if (totalPage <= 5) {
      // If total pages are 5 or less, show all pages
      return Array.from({ length: totalPage }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`btn font-semibold ${
              page == currentPage
                ? "bg-gray-200 text-gray-800"
                : "text-gray-600"
            } hover:bg-slate-100`}
            onClick={() => handlePageClick(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      );
    }

    // Show 5 items with ellipsis logic
    const pages = [];
    if (currentPage <= 3) {
      // Show first 4 pages and ellipsis
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPage);
    } else if (currentPage > totalPage - 3) {
      // Show ellipsis and last 4 pages
      pages.push(1);
      pages.push("...");
      for (let i = totalPage - 3; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      // Show ellipsis, current page in the middle, and surrounding pages
      pages.push(1);
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPage);
    }

    return pages.map((page, index) => (
      <button
        key={index}
        className={`btn  ${
          page == currentPage
            ? "bg-gray-200 text-gray-800 font-semibold"
            : "text-gray-600"
        } hover:bg-slate-100`}
        onClick={() => handlePageClick(page)}
        aria-current={page === currentPage ? "page" : undefined}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className={`pagination ${paginationSize[size]} gap-2 ${className}`}>
      {/* Previous Arrow */}
      <button
        className={`btn  ${
          currentPage === 1 ? "btn-disabled" : ""
        } hover:bg-slate-100`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
      >
        ←
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Arrow */}
      <button
        className={`btn ${
          currentPage === totalPage ? "btn-disabled" : ""
        } hover:bg-slate-100`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPage}
        aria-label="Next"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
