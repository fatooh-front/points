"use client";

import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { DataTableViewOptions } from "./units/DataTableViewOptions";
import { DataServerFilter } from "./units/DataServerFilter";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DataTableServerToolbarProps } from "../../types/commonTableTypes";

export function DataTableServerToolbar<TData>({
  table,
  optionsFilter,
  BtnToolBar,
  isViewServerOptions = false,
  onSelectedValueChange,
  onSearchChange,
  onSearch,
  searchPlaceholder,
  isSearchServer = true,
}: DataTableServerToolbarProps<TData>) {
  const { t } = useTranslation(optionsFilter?.nameInLocales ?? "requests");
  const { t: tTable } = useTranslation("sharedTable");
  const [searchParams, setSearchParams] = useSearchParams();

  const isFiltered = table.getState().columnFilters.length > 0;
  const [isSelectValue, setIsSelectedValue] = useState<any>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  // Initialize searchValue from URL on component mount
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    setSearchValue(searchFromUrl);
    if (searchFromUrl && onSearch) {
      onSearch(searchFromUrl);
    }
  }, [searchParams, onSearch]);

  // Update URL search params
  const updateSearchParams = (field: string, newSearchValue: string) => {
    if (newSearchValue) {
      searchParams.set(field, newSearchValue);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(field);
      setSearchParams(searchParams);
    }
  };

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    if (onSearchChange) {
      onSearchChange(newValue);
    }
  };

  // Handle search action
  const handleSearch = () => {
    updateSearchParams("search", searchValue);
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  // Handle key press in search input
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Handle reset search
  const handleReset = () => {
    setSearchValue("");
    updateSearchParams("search", "");
    updateSearchParams("filter", "");

    if (onSearchChange) {
      onSearchChange("");
    }
    if (onSearch) {
      onSearch("");
    }
  };
  console.log("optionsFilter.columnsFilter", optionsFilter?.columnsFilter);
  return (
    <div className="flex items-start justify-between max-lg:justify-start gap-4 flex-wrap">
      <div className="flex flex-1 w-full sm:w-fit sm:items-center sm:flex-wrap gap-4">
        {isSearchServer && (
          <div className="flex w-full relative md:w-auto rounded-md border border-input">
            <Input
              placeholder={
                searchPlaceholder || tTable(`searchTable.placeholder`)
              }
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="h-8 w-full sm:min-w-[150px] md:min-w-[250px] block"
            />
            {/* {searchValue && (
            <Button
              type="button"
              onClick={handleReset}
              className="h-8 w-8 p-0 absolute right-[36px] top-0"
              variant="ghost"
            >
              <Cross2Icon className="h-4 w-4" />
            </Button>
          )} */}
            <Button
              type="button"
              onClick={handleSearch}
              className="h-8 w-8 p-0"
              variant="secondary"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
        {optionsFilter?.columnsFilter &&
          Object.keys(optionsFilter.columnsFilter).length > 0 &&
          Object.keys(optionsFilter.columnsFilter).map((el) => (
            <div key={el}>
              {optionsFilter.columnsFilter && (
                <DataServerFilter
                  title={t(
                    `${optionsFilter?.nameInLocales}.table.header.${el}`
                  )}
                  name={el}
                  options={optionsFilter.columnsFilter[`${el}`]}
                  onSelectedValueChange={onSelectedValueChange}
                  setIsSelectedValue={setIsSelectedValue}
                  // isSelectValue={isSelectValue}
                />
              )}
            </div>
          ))}

        {(isFiltered || isSelectValue || searchValue) && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setIsSelectedValue(false);
              handleReset();
            }}
            className="h-8 px-2 lg:px-3"
          >
            {tTable("reset")}
            <Cross2Icon className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex justify-between gap-4 gap-y-4 w-full sm:w-fit sm:flex-wrap">
        {isViewServerOptions && <DataTableViewOptions table={table} />}
        {BtnToolBar}
      </div>
    </div>
  );
}
