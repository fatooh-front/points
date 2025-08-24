import { NavLink, useLocation } from "react-router-dom";
import { SidebarItem } from "./units/sidebarItem/SidebarItem";
import { SidebarAccordion } from "./units/sidebarAccordion/SidebarAccordion";
import { Accordion } from "@radix-ui/react-accordion";
import { useEffect, useState } from "react";
import useMyPermissionsStore from "@/main/global/store/permissions/useMyPermissionsStore";
import { convertToSidebarLinks } from "./utils/convertToSidebarLinks";
type Props = {
  links: any;
  layoutURL?: string;
};
export const LayoutSideBar = ({ links, layoutURL }: Props) => {
  const permissions = useMyPermissionsStore((store) => store.permissions);
  const sidebarLinks = convertToSidebarLinks(
    links,
    layoutURL || "",
    permissions
  );

  const { pathname } = useLocation();

  const [openAccordion, setOpenAccordion] = useState<string | undefined>();

  useEffect(() => {
    if (pathname) {
      setOpenAccordion(`/${pathname.split("/").filter(Boolean)[0]}`);
    }
  }, [pathname, setOpenAccordion]);
  // md:w-sidebar md:hover:w-maxsidebar
  return (
    <div className="bg-pr max-h-[100dvh] overflow-y-auto transition-width duration-300 ease-in-out bg-primary-800/5 border-green-700/10 rounded-lg overflow-x-hidden w-full md:w-maxsidebar">
      <div className="pb-7">
        <Accordion
          type="single"
          className="w-full"
          value={openAccordion}
          onValueChange={(value) => setOpenAccordion(value || undefined)}
          collapsible
        >
          {sidebarLinks?.map((item: any) => (
            <>
              {!!item && (
                <div key={item?.id} className="flex flex-col">
                  {item?.allow && item?.type === "link" && (
                    <NavLink
                      className={`flex items-center gap-2 capitalize ${
                        pathname === item?.href
                          ? "bg-primary-50 hover:bg-primary-50"
                          : "hover:bg-primary-50/30"
                      }`}
                      to={item?.href}
                    >
                      <SidebarItem item={item} />
                    </NavLink>
                  )}
                  {item?.type === "toggle" && item?.allow && (
                    <SidebarAccordion item={item} />
                  )}
                </div>
              )}
            </>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default LayoutSideBar;
