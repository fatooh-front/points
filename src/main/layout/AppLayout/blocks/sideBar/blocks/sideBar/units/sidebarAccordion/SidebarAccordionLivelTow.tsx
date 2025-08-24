import {
  Accordion,
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

export const SidebarAccordionLivelTow = ({ item }: SidebarAccordionProps) => {
  const { pathname } = useLocation();
  console.log("itssemhref", pathname);
  console.log("itssemhref", item);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={item?.id}
        className={`border-b-0 data-[state=open]:bg-[#FFFFFF0A] ps-10   ${
          pathname.includes(item.id) ? "bg-[#FFFFFF0A]  " : ""
        }`}
      >
        <AccordionTrigger
          appearIcon={false}
          className={`flex items-center h-[34px] py-0 ps-4 justify-between gap-2  capitalize truncate  hover:bg-primary-50/30 ${
            pathname.includes(item.id) ? "text-[#F2AE31]  " : ""
          }`}
        >
          <SidebarItem acteive={pathname.includes(item.id)} item={item} />
          <ChevronDown
            size={18}
            className={`shrink-0 text-primary mx-3    ${
              pathname.includes(item.id) ? "!text-[#F2AE31]" : "!text-[#B4B8BD]"
            }`}
          />
        </AccordionTrigger>
        <AccordionContent>
          {item?.children?.map((child) => (
            <div key={child?.id}>
              {child?.allow && child?.type === "link" && (
                <NavLink
                  className={`flex items-center gap-2 h-[34px] capitalize ps-12 ${
                    pathname.includes(child?.href)
                      ? " hover:bg-primary-50 text-[#D0DADE] "
                      : "hover:bg-primary-50/30"
                  }`}
                  to={child?.href}
                >
                  <SidebarItem
                    item={child}
                    acteive={pathname.includes(child?.href)}
                    isChild
                  />
                </NavLink>
              )}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
// ${pathname.startsWith(item.href)? "bg-primary-50 hover:bg-primary-50": "hover:bg-primary-50/30"}
