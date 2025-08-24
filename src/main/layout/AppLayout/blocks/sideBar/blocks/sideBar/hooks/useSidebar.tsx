import { PathsTitles } from "../types/Sidebar";
import useMyPermissionsStore from "@/main/global/store/permissions/useMyPermissionsStore";
import { convertToSidebarLinks } from "@/main/global/utils/convertToSidebarLinks";

import ChartSVG from "@/main/global/assets/svg/ChartSVG";

export const useSidebar = () => {
  const links: PathsTitles = {
    "/": {
      icon: ChartSVG,
      allow: true,
    },
  };

  const permissions = useMyPermissionsStore((store) => store.permissions);
  const sidebarLinks = convertToSidebarLinks(links, "", permissions);
  return { sidebarLinks };
};
