"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

type Props = {
  currentPage?: number;
  totalPages?: number;
  limit?: number;
  onPageChange: (options: { page: number; limit: number }) => void;
};

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  limit = 10,
  onPageChange,
}: Props) => {
  const { i18n } = useTranslation();

  const handlePageChange = ({ selected }: { selected: number }) => {
    onPageChange({
      page: selected + 1,
      limit,
    });
  };

  const goToFirstPage = () => {
    if (currentPage > 1) {
      onPageChange({ page: 1, limit });
    }
  };

  const goToLastPage = () => {
    if (currentPage < totalPages) {
      onPageChange({ page: totalPages, limit });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* First Page Button */}
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
        className={`border bg-white rounded-md w-8 h-8 flex items-center justify-center  hover:bg-gray-200 ${
          currentPage === 1
            ? "opacity-50 !text-gray-600 cursor-not-allowed"
            : ""
        }`}
        aria-label="First Page"
      >
        <ChevronsLeft
          className={`w-4  h-4 ${
            i18n.dir(i18n.language) === "ltr" ? "" : "rotate-180"
          }`}
        />
      </button>
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1}
        containerClassName="flex items-center gap-2"
        pageClassName="w-8 h-8 flex justify-center  text-primary bg-white border  rounded-md  items-center rounded-md"
        pageLinkClassName="w-8 h-8 flex justify-center  items-center text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md"
        activeClassName="w-8  h-8 flex justify-center  items-center !bg-primary-second   rounded-md"
        activeLinkClassName="font-semibold !text-white "
        previousClassName=" w-8 h-8 flex items-center  justify-center  "
        nextClassName="w-8 h-8 flex items-center  justify-center"
        previousLabel={
          <div className="border  bg-white rounded-md w-8 h-8 flex  items-center justify-center  text-gray-600 hover:bg-gray-200 ">
            <ChevronLeft
              className={`w-4 h-4  ${
                currentPage === 1 ? " !text-gray-600 " : ""
              } ${i18n.dir(i18n.language) === "ltr" ? "" : "rotate-180"}`}
            />
          </div>
        }
        nextLabel={
          <div className="border text-primary-second rounded-md w-8 h-8 bg-white  flex items-center justify-center text-gray-600 hover:bg-gray-200">
            <ChevronRight
              className={`w-4 h-4   ${
                currentPage === totalPages ? " !text-gray-600 " : ""
              } ${i18n.dir(i18n.language) === "ltr" ? "" : "rotate-180"}`}
            />
          </div>
        }
        breakLabel="..."
        breakClassName="text-gray-400"
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        disabledClassName="opacity-50 cursor-not-allowed"
      />
      {/* Last Page Button */}
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        className={`border bg-white text-primary-second rounded-md w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Last Page"
      >
        <ChevronsRight
          className={`w-4 h-4   ${
            currentPage === totalPages ? " !text-gray-600 " : ""
          } ${i18n.dir(i18n.language) === "ltr" ? "" : "rotate-180"}`}
        />
      </button>
    </div>
  );
};

export default Pagination;
