"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import columnTitleArray from "../../../../column_data";
import { useState } from "react";

export function AdvancedFilterPyColumn() {
  // const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const { i18n, t } = useTranslation("cars");
  const direction = i18n.dir ? i18n.dir() : "ltr";
  return (
    <DropdownMenu
    // open={open}
    >
      <DropdownMenuTrigger asChild>
        <Button
          // onClick={() => setOpen(!open)}
          type="button"
          variant="outline"
          size="sm"
          className="h-[38px] my-auto w-[40px] border "
        >
          <Plus></Plus>{" "}
        </Button>
      </DropdownMenuTrigger>
      <div>
        <DropdownMenuContent
          align="end"
          className="min-w-[340px] mt-5 text-start "
        >
          <DropdownMenuLabel>
            {!filterKey ? (
              <Input
                dir={direction}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                className={cn(
                  // disabled ? "!cursor-default pointer-events-none" : "",
                  "pe-10",
                  `border h-[42px] rounded-[4px]  border-[#D0DADE] focus-visible:placeholder:border-none p-[16px]  `
                )}
              ></Input>
            ) : (
              <div
                dir={direction}
                className={cn(
                  // disabled ? "!cursor-default pointer-events-none" : "",
                  "pe-10",
                  `border flex items-center font-medium text-base h-[42px] rounded-[4px] border-[#D0DADE] focus-visible:placeholder:border-none p-[16px]  `
                )}
              >
                <p className=" ">{t(`cars.table.header.${filterKey}`)} : </p>
                <Input
                  dir={direction}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  className={cn(
                    // disabled ? "!cursor-default pointer-events-none" : "",
                    "",
                    ` w-auto ps-1 font-normal text-[#3A4855CC]  h-[42px] rounded-[4px]  border-[#D0DADE] focus-visible:ring-0  border-none  `
                  )}
                ></Input>
              </div>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columnTitleArray
            .filter(
              (column) =>
                value === "" ||
                t(`cars.table.header.${column.title}`).includes(value)
            )
            .map((column) => (
              <DropdownMenuCheckboxItem
                dir={direction}
                key={column.key}
                className="capitalize"
                checked={false}
                onCheckedChange={() => setFilterKey(column.key)}
              >
                <div
                  className={`w-full cursor-pointer ${
                    filterKey === column.key
                      ? "bg-primary text-white"
                      : "hover:bg-[#ECF3F3] "
                  } rounded-md px-[16px] h-[44px] flex items-center`}
                >
                  {t(`cars.table.header.${column.title}`)}
                </div>
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
