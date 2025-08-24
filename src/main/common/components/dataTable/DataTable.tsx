import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./blocks/dataTableToolbar/DataTableToolbar";
import { DataTablePagination } from "./blocks/dataTablePagination/DataTablePagination";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { DataTableServerToolbar } from "./blocks/dataTableToolbar/DataTableServerToolbar";
import { addSearchParam } from "@/main/global/utils/search";
import { DataTableProps } from "./types/commonTableTypes";
import { useDataTable } from "./hooks/useDataTable";
import TableSkeleton from "./blocks/tableskeleton/TableSkeleton";
import { useEffect } from "react";

interface DataWithId {
  _id?: string;
  id?: number | string;
}

export function DataTable<TData extends DataWithId, TValue>({
  data,
  isLoading = false,
  columns,
  paginationOptions,
  optionsFilter,
  BtnToolBar,
  isViewOptions,
  isDataTableServer,
  optionsServerFilter,
  BtnToolServerBar,
  isViewServerOptions,
  onSelectedServerValueChange,
  onSearchChange,
  onSearch,
  searchPlaceholder,
  addIdtoSearchParams = false,
  isSearchServer = true,
  keyOfTableEditPage,
  layoutClassName,
}: DataTableProps<TData, TValue>) {
  const { table } = useDataTable<TData, TValue>({ columns, data });
  const { t } = useTranslation("sharedTable");
  // Set visible columns from localStorage if available

  useEffect(() => {
    if (keyOfTableEditPage) {
      const stored =
        sessionStorage.getItem(keyOfTableEditPage) ||
        localStorage.getItem(keyOfTableEditPage);
      if (stored) {
        try {
          const visibleColumns: string[] = JSON.parse(stored);
          // Hide all columns first
          table.getAllLeafColumns().forEach((col) => {
            col.toggleVisibility(visibleColumns.includes(col.id));
          });
          table.setColumnOrder(visibleColumns);
        } catch (e) {
          // Invalid JSON, ignore
        }
      }
    }
  }, [table]);
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        optionsFilter={optionsFilter}
        BtnToolBar={BtnToolBar}
        isViewOptions={isViewOptions}
        searchPlaceholder={searchPlaceholder}
      />
      {isLoading && (
        <div className="p-10 mt-30">
          <TableSkeleton />
        </div>
      )}

      {isDataTableServer && !isLoading && (
        <DataTableServerToolbar
          table={table}
          optionsFilter={optionsServerFilter}
          BtnToolBar={BtnToolServerBar}
          isViewServerOptions={isViewServerOptions}
          onSelectedValueChange={onSelectedServerValueChange}
          onSearchChange={onSearchChange}
          onSearch={onSearch}
          searchPlaceholder={searchPlaceholder}
          isSearchServer={isSearchServer}
        />
      )}
      <div
        style={{
          boxShadow: "0px 2px 32px 0px #2F2B3D1F",
        }}
        className={`  bg-white border py-4 px-3 rounded-[8px] ${layoutClassName}`}
      >
        {" "}
        <div className=" rounded-[8px] overflow-hidden">
          <Table>
            {" "}
            <TableHeader
              style={{
                background:
                  "linear-gradient(90deg, rgba(74, 142, 145, 0.11) 12.94%, rgba(237, 230, 218, 0.11) 84.06%, rgba(22, 42, 43, 0.11) 99.9%)",
              }}
              className=" hover:bg-secondry-50 h-14   "
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="!border-0" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="text-center ps-1 !pe-9 !text-lg"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="!border-t-0">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer text-center !border-t-0"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={`text-lg font-normal !pe-9${
                          index === 0 ? " text-primary " : " !text-[#8E8E8E] "
                        }`}
                        onClick={() => {
                          if (
                            cell.column.id !== "actions" &&
                            addIdtoSearchParams &&
                            (row.original as any)?._id
                          ) {
                            addSearchParam(
                              searchParams,
                              setSearchParams,
                              "id",
                              (row.original as any)?._id
                            );
                            // navigate(`?id=${row.original._id}`); //destracture navigate from useDataTable
                          }
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {t("table.noResults")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>{" "}
        </div>
      </div>

      {paginationOptions && (
        <div className="p-2 pt-4">
          <DataTablePagination
            table={table}
            paginationOptions={paginationOptions}
          />
        </div>
      )}
    </div>
  );
}
