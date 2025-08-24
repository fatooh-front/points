"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useTranslation } from "react-i18next";
import { DataTableFacetedFilter } from "./units/DataTableFacetedFilter";
// import { DataTableAdvancedFilter } from "./units/DataTableAdvancedFilter";
import { DataTableViewOptions } from "./units/DataTableViewOptions";
import { DataTableToolbarProps } from "../../types/commonTableTypes";

export function DataTableToolbar<TData>({
  table,
  optionsFilter,
  BtnToolBar,
  isViewOptions = true,
  searchPlaceholder,
}: DataTableToolbarProps<TData>) {
  const { t } = useTranslation(optionsFilter?.nameInLocales ?? "requests");
  const { t: tTable } = useTranslation("sharedTable");

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex w-full items-start justify-between max-lg:justify-start gap-4 flex-wrap">
      <div className="flex flex-1 w-full sm:w-fit sm:items-center sm:flex-wrap gap-4">
        {optionsFilter?.columnSearchID && (
          <Input
            placeholder={searchPlaceholder || tTable(`searchTable.placeholder`)}
            value={
              (table
                .getColumn(optionsFilter?.columnSearchID || "")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event: any) =>
              table
                .getColumn(optionsFilter?.columnSearchID || "")
                ?.setFilterValue(event?.target?.value)
            }
            className="h-8 w-full sm:min-w-[150px] md:min-w-[250px] sm:max-w-[300px] block"
          />
        )}
        {optionsFilter?.columnsFilter &&
          Object.keys(optionsFilter.columnsFilter).length > 0 &&
          Object.keys(optionsFilter.columnsFilter).map((el) => (
            <div key={el}>
              {optionsFilter.columnsFilter && table.getColumn(el || "") && (
                <DataTableFacetedFilter
                  column={table.getColumn(el || "")}
                  title={t(
                    `${optionsFilter?.nameInLocales}.table.header.${el}`
                  )}
                  options={optionsFilter.columnsFilter[`${el}`]}
                />
              )}
            </div>
          ))}

        {/* add datafilter here */}
        {isFiltered && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            {tTable("reset")}
            <Cross2Icon className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex justify-between gap-4 gap-y-4 w-full sm:w-fit sm:flex-wrap">
        {/* <DataTableAdvancedFilter table={table} /> */}
        {isViewOptions && <DataTableViewOptions table={table} />}
        {BtnToolBar}
      </div>
    </div>
  );
}

// const [filteredData, setFilteredData] = useState(originalData);

// const handleFilterChange = (newFilteredData) => {
//   setFilteredData(newFilteredData);
// };

// return (
//   <DataFilter
//     title="Status"
//     options={[
//       { value: "active", label: "Active" },
//       { value: "inactive", label: "Inactive" },
//       // ... other options
//     ]}
//     data={originalData}
//     onFilterChange={handleFilterChange}
//   />
// );
