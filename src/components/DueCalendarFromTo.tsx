"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "./ui/button";
export function CalendarDemo({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: any;
}) {
  return (
    <Calendar
      dir="rtl"
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border-none shadow-none "
      captionLayout="dropdown"
    />
  );
}
export default function DueCalendarFromTo({
  title,
  from,
  to,
  setFrom,
  setTo,
}: {
  title: string;
  from: Date | undefined;
  to: Date | undefined;
  setFrom: any;
  setTo: any;
}) {
  const [open, setOpen] = React.useState(false);
  console.log(from, to, "from to");

  return (
    <div className="relative w-full ">
      <Button
        onClick={() => setOpen(!open)}
        className="w-full shadow-none border-none"
        variant={"outline"}
      >
        {title}
      </Button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className=" right-0 top-0 fixed w-full h-full "
        ></div>
      )}
      <div
        onBlur={(e) => console.log(e, "blursssss")}
        key={"DueCalendarFromTo"}
        style={{
          transform: "translateX(-50%)",
        }}
        className={` ${
          open ? "block" : "hidden"
        } w-[700px]  top-20 left-1/2 absolute z-10 flex justify-between p-4 rounded-3xl bg-white shadow-xl`}
      >
        <CalendarDemo setDate={setFrom} date={from} />
        <CalendarDemo setDate={setTo} date={to} />
      </div>
    </div>
  );
}
