import { NavLink, useLocation } from "react-router-dom";
import { useSidebar } from "./hooks/useSidebar";
import Logo from "./units/logo/Logo";
import { SidebarItem } from "./units/sidebarItem/SidebarItem";
import { SidebarAccordion } from "./units/sidebarAccordion/SidebarAccordion";
import { Accordion } from "@radix-ui/react-accordion";
import { useEffect, useState } from "react";

import Search from "./units/Search";
import { useTranslation } from "react-i18next";

export const Sidebar = () => {
  const { sidebarLinks } = useSidebar();
  const { pathname } = useLocation();
  const [search, setSearch] = useState("");
  const { t } = useTranslation("navbar");

  const [openAccordion, setOpenAccordion] = useState<string | undefined>();

  useEffect(() => {
    if (pathname) {
      setOpenAccordion(`/${pathname.split("/").filter(Boolean)[0]}`);
    }
  }, [pathname, setOpenAccordion]);
  console.log(sidebarLinks, "sidebarLinks");

  return (
    <div className="no-scrollbar md:h-[100dvh] overflow-y-auto transition-width duration-300 ease-in-out  overflow-x-hidden w-maxsidebar bg-primary md:w-maxsidebar">
      <div className=" mx-auto">
        <Logo />
      </div>
      <Search search={search} setSearch={(e) => setSearch(e)}></Search>
      <div className="pb-7">
        <Accordion
          type="single"
          className="w-full"
          value={openAccordion}
          onValueChange={(value) => setOpenAccordion(value || undefined)}
          collapsible
        >
          {sidebarLinks
            .filter(
              (item) =>
                !search || t(item?.href || "").includes(search.toLowerCase())
            )
            .map((item) => (
              <>
                {!!item && (
                  <div key={item?.id} className="flex flex-col  text-[#B4B8BD]">
                    {item?.allow && item?.type === "link" && (
                      <NavLink
                        className={`flex items-center mt-4 gap-2 capitalize ${
                          pathname === item?.href
                            ? "bg-primary hover:bg-primary-50"
                            : "hover:bg-primary-50/30"
                        }`}
                        to={item?.href}
                      >
                        <SidebarItem
                          acteive={pathname.includes(item.id)}
                          item={item}
                        />
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

export default Sidebar;
