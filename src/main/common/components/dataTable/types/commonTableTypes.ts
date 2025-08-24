import { ColumnDef, Table } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export type status = {
  value: string;
  label: any;
  icon?: React.ComponentType<{ className?: string }>;
};

export type statuses = status[] | undefined;

export type columnsFilter = {
  [key: string]: statuses; // should name of key is the id of column which want filter its value
};

export type OptionsFilter = {
  nameInLocales?: string;
  columnsFilter?: columnsFilter;
  columnSearchID?: string;
};

export type OptionsServerFilter = {
  nameInLocales?: string;
  columnsFilter?: columnsFilter;
  columnSearchID?: string;
};

export type DataTableProps<TData, TValue> = {
  isLoading?: boolean;
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  paginationOptions?: PaginationOptions;
  optionsFilter?: OptionsFilter;
  optionsServerFilter?: OptionsServerFilter;
  BtnToolBar?: React.ReactNode;
  BtnToolServerBar?: React.ReactNode;
  isViewOptions?: boolean;
  isViewServerOptions?: boolean;
  layoutClassName?: string;
  isDataTableServer?: boolean;
  onSearchChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onSelectedServerValueChange?: (value: {
    [key: string]: string | null;
  }) => void;
  searchPlaceholder?: string;
  addIdtoSearchParams?: boolean;
  isSearchServer?: boolean;
  keyOfTableEditPage?: string;
};

export type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  optionsFilter?: OptionsFilter;
  BtnToolBar?: React.ReactNode;
  isViewOptions?: boolean;
  searchPlaceholder?: string;
};

export type DataTableServerToolbarProps<TData> = {
  table: Table<TData>;
  optionsFilter?: OptionsServerFilter;
  BtnToolBar?: React.ReactNode;
  isViewServerOptions?: boolean;
  onSearchChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onSelectedValueChange?: (value: { [key: string]: string | null }) => void;
  searchPlaceholder?: string;
  isSearchServer?: boolean;
};

export type ParamsQuery = {
  [key: string]: any;
};
export type PaginationOptions = {
  totalPages?: number;
  totalnums?: number;
  currentPage?: number;
  limit?: number;
  setPage?: Dispatch<SetStateAction<number | undefined>>;
  setLimit?: Dispatch<SetStateAction<number | undefined>>;
};
