import { Permissionkeys } from "@/main/global/utils/permissions/permissions";
import { PathsTitles, SidebarLink } from "../types/Sidebar";
import { hasPermission } from "@/main/global/utils/permissions/hasPermission";

export const convertToSidebarLinks = (
  paths: PathsTitles,
  parentPath = "",
  permissions: any
): (SidebarLink | null)[] => {
  return Object.entries(paths).map(([path, info]) => {
    const fullPath = `${parentPath}${path}`;

    console.log("fullPath", fullPath);
    const hasChildren =
      info?.children && Object.keys(info?.children)?.length > 0;

    const allowKeys =
      info?.children && hasChildren
        ? Object.keys(info.children).map(
            (childKey) => Permissionkeys[`${fullPath}${childKey}`]
          )
        : Permissionkeys[fullPath];

    const link: SidebarLink = {
      id: path,
      href: fullPath,
      icon: info?.icon,
      type: hasChildren ? "toggle" : "link",
      allow: !info?.allow
        ? hasPermission(permissions, allowKeys as any, "GET")
        : typeof info?.allow === "boolean"
        ? info?.allow
        : hasPermission(permissions, info?.allow, "GET"),
      ...(hasChildren && {
        children: convertToSidebarLinks(info?.children!, fullPath, permissions),
      }),
    };

    return link;
  });
};
