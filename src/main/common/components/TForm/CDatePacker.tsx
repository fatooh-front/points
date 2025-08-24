"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CDatePacker({
  label,
  labelClassName,
  placeholder,
  date,
  setDate,
  fromDate,
}: {
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  date: Date | undefined;
  setDate: any;
  fromDate?: Date;
}) {
  return (
    <div
      className={cn(
        `flex flex-col text-base font-semibold text-start w-full text-neutral-600`
      )}
    >
      {label && (
        <p
          className={cn(
            `block text-sm font-medium leading-none text-gray-600`,
            labelClassName
          )}
        >
          {label}
        </p>
      )}
      <Popover>
        <PopoverTrigger className="mt-2 !w-full" asChild>
          <Button
            variant={"outline"}
            className={cn(
              "flex w-[280px] justify-start text-left font-normal gap-2",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "d/M/yyyy") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            fromDate={fromDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
