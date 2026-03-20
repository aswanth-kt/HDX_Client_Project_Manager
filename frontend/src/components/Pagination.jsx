const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  // console.log(`current page: ${currentPage}, total page: ${totalPages}, onPageChange${onPageChange}`);

  const generatePages = () => {

    const pages = [];

    if (totalPages <= 7) {

      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

    } else {

      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);

    }

    return pages;
  };

  const pages = generatePages();

  return (

    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Prev
      </button>

      {pages.map((page, index) =>

        page === "..." ? (

          <span key={index} className="px-2">
            ...
          </span>

        ) : (

          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded
              ${currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100"
              }`}
          >
            {page}
          </button>

        )

      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;