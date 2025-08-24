import { Permissionkeys } from "@/main/global/utils/permissions/permissions";
import { hasPermission } from "@/main/global/utils/permissions/hasPermission";

import { LucideIcon } from "lucide-react";
import { GetPermissionByIdProps } from "@/main/global/utils/permissions/PermissionsTypes";
import { ReactElement } from "react";

export interface SidebarLink {
  id: string;
  href: string;
  acteveIcon?: LucideIcon | ReactElement | any;
  icon?: LucideIcon | ReactElement | any;
  type: "link" | "toggle";
  allow?:
    | boolean
    | keyof GetPermissionByIdProps
    | Array<keyof GetPermissionByIdProps>;
  children?: (SidebarLink | null)[];
}

export interface PathInfo {
  icon?: LucideIcon | ReactElement | any;
  acteveIcon?: LucideIcon | ReactElement | any;
  allow?:
    | boolean
    | keyof GetPermissionByIdProps
    | Array<keyof GetPermissionByIdProps>;
  children?: PathsTitles | null;
}

export interface PathsTitles {
  [key: string]: PathInfo | null;
}

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

    console.log("allow1Keys", allowKeys);
    const link: SidebarLink = {
      id: path,
      href: fullPath,
      acteveIcon: info?.acteveIcon,
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
