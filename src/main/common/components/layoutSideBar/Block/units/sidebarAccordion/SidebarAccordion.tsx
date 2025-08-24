import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavLink, useLocation } from "react-router-dom";
import { SidebarLink } from "../../types/Sidebar";
import { SidebarItem } from "../sidebarItem/SidebarItem";
import { ChevronDown } from "lucide-react";

interface SidebarAccordionProps {
  item: SidebarLink;
}

export const SidebarAccordion = ({ item }: SidebarAccordionProps) => {
  const { pathname } = useLocation();
  console.log("itssemhref", item.href);
  console.log("itssemid", item.id);
  return (
    <AccordionItem value={item?.id} className="border-b-0">
      <AccordionTrigger
        appearIcon={false}
        className={`flex items-center py-0 justify-between gap-2 capitalize truncate hover:bg-primary-50/30`}
      >
        <SidebarItem item={item} />
        <ChevronDown size={18} className="shrink-0 text-primary mx-3" />
      </AccordionTrigger>
      <AccordionContent>
        {item?.children?.map(
          (child) =>
            child?.allow && (
              <NavLink
                key={child.id}
                className={`flex items-center gap-2 capitalize ps-20 ${
                  pathname === child?.href
                    ? "bg-primary-50 hover:bg-primary-50"
                    : "hover:bg-primary-50/30"
                }`}
                to={child?.href}
              >
                <SidebarItem item={child} isChild />
              </NavLink>
            )
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
// ${pathname.startsWith(item.href)? "bg-primary-50 hover:bg-primary-50": "hover:bg-primary-50/30"}
