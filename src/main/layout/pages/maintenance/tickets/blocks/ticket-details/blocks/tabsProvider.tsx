import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

type Tab = {
  id: string | number;
  label: string;
  component: React.ReactNode;
};

interface TabsProviderProps {
  ticketDetailsTabs: Tab[];
}

export default function TabsProvider({ ticketDetailsTabs }: TabsProviderProps) {
  return (
    <Tabs dir="rtl" defaultValue="10" className="w-full ">
      <TabsList className=" overflow-x-auto border-b flex flex-nowrap ">
        {ticketDetailsTabs.map((tab) => (
          <TabsTrigger
            className="text-[#7E858E] font-normal text-base px-[30px] py-2  data-[state=active]:bg-[#C9972B] rounded-t-[8px] data-[state=active]:text-white"
            value={`${tab.id}`}
            key={tab.id}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {ticketDetailsTabs.map((tab) => (
        <TabsContent value={`${tab.id}`}>{tab.component}</TabsContent>
      ))}
    </Tabs>
  );
}
