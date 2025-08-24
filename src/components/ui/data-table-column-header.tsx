import {
  ArrowDownIcon,
  ArrowUpDown,
  ArrowUpIcon,
  EyeOff,
  Filter,
} from "lucide-react";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  isDropdown?: boolean;
  FilterValue?: string[] | { label: string; key: string }[];
  onItemSelect?: (value: string) => void;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  FilterValue,
  onItemSelect,
  isDropdown = false,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className, "text-lg")}>{title}</div>;
  }

  return (
    <div
      className={cn("flex items-center  justify-center space-x-2", className)}
    >
      {isDropdown || FilterValue ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 text-lg data-[state=open]:bg-accent"
            >
              <span>{title}</span>
              {column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 mx-3 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
            {FilterValue
              ? FilterValue.map((item) => (
                  <DropdownMenuItem
                    onClick={() => {
                      console.log(item, column);
                      typeof item === "string"
                        ? column.setFilterValue(item === "All" ? "" : item)
                        : column.setFilterValue(
                            item.key === "All" ? "" : item.key
                          );
                      if (typeof item === "string" && onItemSelect) {
                        item === "All" ? null : onItemSelect(item);
                      } else {
                        if (typeof item !== "string" && onItemSelect) {
                          item.key === "All" ? null : onItemSelect(item.key);
                        }
                      }
                    }}
                  >
                    <Filter className="mr-2 h-3.5 w-3.5  text-muted-foreground/70" />
                    {typeof item === "string" ? item : item.label}
                  </DropdownMenuItem>
                ))
              : null}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3  h-8 text-lg data-[state=open]:bg-accent"
        >
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon
              onClick={() => column.toggleSorting(false)}
              className="ml-2 h-4 w-4"
            />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon
              onClick={() => column.toggleSorting(true)}
              className="ml-2 h-4 w-4"
            />
          ) : (
            <ArrowUpDown
              onClick={() => column.toggleSorting(undefined)}
              className="ml-2 mx-3 h-4 w-4"
            />
          )}
        </Button>
      )}
    </div>
  );
}
