"use client";

import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { UseFormReturn } from "react-hook-form";
import MiniCalendarSVG from "@/main/global/assets/svg/MiniCalendarSVG";
import { FormDescription, FormLabel, FormMessage } from "./form";
import React from "react";
import { Matcher } from "react-day-picker";

interface DatePickerProps {
  name: string;
  placeholder?: string;
  form:
    | UseFormReturn<any>
    | {
        watch: (name: string) => any;
        setValue: (name: string, value: any, options?: any) => void;
        control: {
          _formState: {
            errors: Record<string, any>;
          };
        };
      };
  className?: string;
  Icon?: React.ReactNode;
  errorMessageClaasName?: string;
  disabled?: Matcher;
  FormDescriptionClaasName?: string;
  label?: string;
}

export function DatePicker({
  name,
  placeholder,
  form,
  Icon,
  className,
  errorMessageClaasName,
  FormDescriptionClaasName,
  disabled,
  label = "تاريخ",
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const toArabicDigits = (str: string) =>
    str.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);

  return (
    <div
      onClick={() => {
        console.log("easdasdsadasdasd", form.watch(name as any));
        const date = new Date(form.watch(name) as any);
        console.log("easdasdsadasdasd", date.toLocaleString("sv-SE"));
      }}
      className="w-full"
    >
      <FormLabel className="text-[#8E8E8E] p-0 font-normal text-lg">
        {label}
      </FormLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              " w-full justify-start mt-4 text-left font-normal",
              !form.watch(name) && "text-muted-foreground",
              className
            )}
          >
            <div className=" w-full flex items-center justify-between">
              {form.watch(name) ? (
                toArabicDigits(
                  format(new Date(form.watch(name)), "yyyy/MM/dd", {
                    locale: arSA,
                  })
                )
              ) : (
                <span>{placeholder}</span>
              )}{" "}
              {Icon || <MiniCalendarSVG />}
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            dir=""
            disabled={disabled}
            mode="single"
            selected={form.watch(name)}
            onSelect={(e) => {
              console.log("easdasdsadasdasd", e);
              console.log(
                "easdasdsadasdasd",
                format(new Date(e as any), "yyyy/MM/dd", {
                  locale: arSA,
                })
              );

              form.setValue(name, e, { shouldValidate: true });
              setOpen(false); // ← يقفل البوب أوفر بعد الاختيار
            }}
            {...props}
            initialFocus
          />
        </PopoverContent>

        <FormMessage className={errorMessageClaasName} />
        {form.control._formState.errors[name] && (
          <FormDescription
            className={`text-red-500 ${FormDescriptionClaasName}`}
          >
            {form.control._formState.errors[name]?.message}
          </FormDescription>
        )}
      </Popover>
    </div>
  );
}
