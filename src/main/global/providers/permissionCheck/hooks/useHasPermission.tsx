import useMyPermissionsStore from "@/main/global/store/permissions/useMyPermissionsStore";
import { Permissionkeys } from "@/main/global/utils/permissions/permissions";
import { GetPermissionByIdProps } from "@/main/global/utils/permissions/PermissionsTypes";
import { useLocation } from "react-router-dom";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type PermissionKey = keyof GetPermissionByIdProps;

type Props = { keys?: PermissionKey | PermissionKey[]; type?: string };

export default function useHasPermission({ keys, type }: Props = {}) {
  const permissions = useMyPermissionsStore((store) => store.permissions);
  const { pathname } = useLocation();
  const purePathname = Object.keys(Permissionkeys)?.find((path) =>
    pathname.startsWith(path)
  );

  const currentKeys = keys
    ? keys
    : purePathname
    ? Permissionkeys[purePathname]
    : [];
  const keysArray = Array.isArray(currentKeys) ? currentKeys : [currentKeys];

  const hasPermission = (method: HttpMethod) =>
    keysArray.some(
      (key) =>
        Array.isArray(permissions[key]) && permissions[key].includes(method)
    );

  const result = {
    hasGET: hasPermission("GET"),
    hasPOST: hasPermission("POST"),
    hasPUT: hasPermission("PUT"),
    hasPATCH: hasPermission("PATCH"),
    hasDELETE: hasPermission("DELETE"),
  };
  const isAllowMethod = () => {
    switch (type) {
      case "add":
        return result.hasPOST;
      case "edit":
        return result.hasPUT || result.hasPATCH;
      case "view":
        return result.hasGET;
      case "delete":
        return result.hasDELETE;
      default:
        return false;
    }
  };

  return { ...result, isAllowMethod };
}
