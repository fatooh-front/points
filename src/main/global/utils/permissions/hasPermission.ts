import { GetPermissionByIdProps } from "./PermissionsTypes";

export function isAdmin() {
  if (
    localStorage.getItem("useAuthStorage") &&
    JSON.parse(localStorage.getItem("useAuthStorage") as string)?.state?.user
      ?.type === "admin"
  ) {
    return true;
  }
  return false;
}

export function getPurePermissions(data: any) {
  const { id, __v, _id, updated_at, serial, created_at, ...purePermissions } =
    data;
  return purePermissions;
}
export function hasPermission(
  permissions: GetPermissionByIdProps,
  keys:
    | keyof GetPermissionByIdProps
    | Array<keyof GetPermissionByIdProps | Array<keyof GetPermissionByIdProps>>,
  method: string
): boolean {
  // Normalize the keys to always be an array
  const keysArray = Array.isArray(keys) ? keys : [keys];

  // Helper function to check if a single key or nested array has the required permission
  const checkKey = (
    key: keyof GetPermissionByIdProps | Array<keyof GetPermissionByIdProps>
  ): boolean => {
    if (Array.isArray(key)) {
      return key.some(
        (nestedKey) =>
          Array.isArray(permissions[nestedKey]) &&
          permissions[nestedKey].includes(method)
      );
    }
    return Array.isArray(permissions[key]) && permissions[key].includes(method);
  };

  // Check if any key or nested key array has the required permission
  return keysArray.some(checkKey);
}

// Example usage
// const keys = "agreement"; // or ["agreement", "contract"];
// const method = "POST";
// const result = hasPermission(permissions, keys, method);

// console.log(result);
