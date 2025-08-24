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
  acteveIcon?: LucideIcon | ReactElement | any;
  icon?: LucideIcon | ReactElement | any;
  allow?:
    | boolean
    | keyof GetPermissionByIdProps
    | Array<keyof GetPermissionByIdProps>;
  children?: PathsTitles | null;
}

export interface PathsTitles {
  [key: string]: PathInfo | null;
}
