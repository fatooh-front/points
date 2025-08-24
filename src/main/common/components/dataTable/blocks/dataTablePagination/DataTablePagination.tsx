import { Table } from "@tanstack/react-table";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PaginationOptions } from "../../types/commonTableTypes";
import Pagination from "../../../reactPagenate/ReactPagenate";
// import { DataTableViewOptions } from "../dataTableToolbar/units/DataTableViewOptions";
import CustomNumberInput from "@/components/ui/NumberInputWithUpDwenIcon";
// import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginationOptions?: PaginationOptions;
}

export function DataTablePagination<TData>({
  table,
  paginationOptions,
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation("sharedTable");
  console.log("table", table);
  console.log("paginationOptions", paginationOptions);

  useEffect(() => {
    paginationOptions?.limit && table.setPageSize(paginationOptions.limit);
  }, [paginationOptions && paginationOptions.limit]);

  const handlePageChange = ({
    page,
    limit: _limit,
  }: {
    page: number;
    limit: number;
  }) => {
    console.log("pageee", page);
    paginationOptions?.setPage?.(page);
  };

  return (
    <div className="flex w-full items-center justify-between px-2 max-sm:flex-col max-sm:items-center max-sm:gap-3 max-sm:px-0 gap-5">
      <div className="flex justify-between flex-1 text-sm text-muted-foreground w-full gap-5">
        <div className="hidden sm:flex items-center gap-2">
          <CustomNumberInput
            value={Number(paginationOptions && paginationOptions?.limit)}
            onChange={(e) => paginationOptions?.setLimit?.(e)}
          ></CustomNumberInput>
          {/* <Select
            value={`${paginationOptions && paginationOptions?.limit}`}
            onValueChange={(value) => {
              paginationOptions?.setLimit &&
                paginationOptions?.setLimit(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {itemsLimitsValues?.map((limit) => (
                <SelectItem key={limit} value={`${limit}`}>
                  {limit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>{" "} */}
          <p className="text-sm font-medium">
            {t("table.pagination.rowsPerPage")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 gap-6 lg:gap-8 max-sm:flex-col max-sm:items-end max-sm:gap-2">
        <div className="flex items-center gap-6 lg:gap-8 max-sm:flex-col max-sm:items-end max-sm:gap-2">
          <div className="flex items-center gap-2">
            <Pagination
              currentPage={paginationOptions?.currentPage ?? 5}
              totalPages={paginationOptions?.totalPages ?? 5}
              limit={paginationOptions?.limit ?? 10}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <div className="flex-1  flex justify-end">
        <div>
          <Link to={`/cars/edit-table`}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className=" gap-[8px] text-[#7E858E] h-8 bg-transparent border-0 shadow-none lg:flex order-2 sm:order-none w-[115px] flex-shrink-0"
            >
              <BenEditIcon></BenEditIcon>
              {t("table.viewOption.columns")}
            </Button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
