import { z } from "zod";

import { isAdmin } from "./hasPermission";

export enum AllPermissionEnum {
  POST = "POST",
  GET = "GET",
  PATCH = "PATCH",
  DELETE = "DELETE",
  DATA = "DATA",
}
export const PermissionEnum = z.enum([
  AllPermissionEnum.POST,
  AllPermissionEnum.GET,
  AllPermissionEnum.PATCH,
  AllPermissionEnum.DELETE,
  AllPermissionEnum.DATA,
]);

export const permissionTypes = [
  AllPermissionEnum.POST,
  AllPermissionEnum.GET,
  AllPermissionEnum.PATCH,
  AllPermissionEnum.DELETE,
  AllPermissionEnum.DATA,
] as const;

export enum UserTypesEnum {
  USER = "user",
  SUBUSER = "subUser",
  ORGANIZATION = "organization",
  ADMIN = "admin",
}

export const methodPermissionOrder = [
  "POST",
  "GET",
  "PATCH",
  "DELETE",
  "DATA",
  "POST",
];

export const methodsOrder = ["POST", "GET", "PATCH", "DELETE", "DATA"];

export const toggleAndSortMethod = (method: string, methodArray: string[]) => {
  const index = methodArray.indexOf(method);
  if (index === -1) {
    methodArray.push(method);
    method !== "GET" && methodArray.push("GET");
  } else {
    methodArray.splice(index, 1);
    method === "GET" && methodArray.splice(0, methodArray.length);
  }
  methodArray.sort((a, b) => methodsOrder.indexOf(a) - methodsOrder.indexOf(b));
  return Array.from(new Set(methodArray));
};

interface Permission {
  [key: string]: string[];
}

// "group"
// "orgCategory"
// "orgRegion"
// "portalPermission"
// "setting"
// "user"

export const Permissionkeys: Record<string, string | string[]> = {
  "/": "cars",
  "/cars": "cars",
  "/settings/Models": "Models",
};
// portalPermission
const permissionChecksAdmin: string[] = ["/licenseLabels/default"];
// const allowedPathnames: string[] = ["/", "/profile"];

export const checkPermission = (
  permission: Permission,
  pathname: string
): boolean => {
  const purePathname = Object.keys(Permissionkeys)?.find((path) =>
    pathname.startsWith(path)
  );

  // if (allowedPathnames.includes(purePathname)) {
  //   return true;
  // }

  if (
    purePathname &&
    permissionChecksAdmin.includes(purePathname) &&
    isAdmin()
  ) {
    return true;
  }
  if (
    purePathname &&
    permissionChecksAdmin.includes(purePathname) &&
    !isAdmin()
  ) {
    return false;
  }

  const key = purePathname && Permissionkeys[purePathname];

  if (key && typeof key === "string") {
    return permission[key]?.includes("GET");
  } else if (key && Array.isArray(key)) {
    return key.some((k) => permission[k]?.includes("GET"));
  }

  if (pathname && !Object.keys(Permissionkeys).includes(pathname)) {
    return true;
  }

  return false;
};
