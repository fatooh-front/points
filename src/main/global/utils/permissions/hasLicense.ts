import { convertObjectToArray } from "../objectUtils";
import { isAdmin } from "./hasPermission";

export type LicenseStatus = {
  status?: "active" | "expired" | "pending";
  forever?: boolean;
  startDate?: string | Date;
  endDate?: string | Date;
};

export type License = {
  donation?: LicenseStatus;
  chat?: LicenseStatus;
  financial?: LicenseStatus;
  hr?: LicenseStatus;
  workflow?: LicenseStatus;
  [key: string]: any;
};

export function hasLicense(
  licenses: License,
  keys: keyof License | Array<keyof License>
): boolean {
  if (isAdmin()) {
    return true;
  }
  const keysArray = Array.isArray(keys) ? keys : [keys];
  for (const key of keysArray) {
    if (licenses.hasOwnProperty(key) && licenses[key]?.status === "active") {
      return true;
    }
  }
  return false;
}

export function getActiveLicense(licenses: License) {
  const activedLicenses = convertObjectToArray(licenses)
    .filter((el) => el[Object.keys(el)[0]].status === "active")
    .map((el) => Object.keys(el)[0]);

  return activedLicenses;
}
