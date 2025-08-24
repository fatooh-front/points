import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./blocks/sideBar/Sidebar";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-gray-400 hover:text-green-700 transition cursor-pointer block md:hidden" />
      </SheetTrigger>
      <SheetContent className="w-auto px-1 p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
