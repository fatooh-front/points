import { removeEmptyFields } from "./objectUtils";

export function toQueryString(params?: any): string {
  if (params)
    return Object.entries(removeEmptyFields(params))
      .filter(([, value]) => value !== undefined)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join("&");
  return "";
}

export function pureURLS3(url: string | undefined): string | undefined {
  if (url?.startsWith("http")) {
    return url.split(".com/")[1].split("?")[0];
  }
  return url;
}

export const createSearchQuery = (
  params: Record<
    string,
    string | number | boolean | undefined | string[] | number[]
  >
) => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        query.append(key, v.toString());
      }
    } else if (value !== undefined) {
      query.append(key, value.toString());
    }
  }
  console.log(query.toString());
  return query.toString();
};

export const serializeFormQuery = (
  params: Record<
    string,
    string | number | boolean | undefined | string[] | number[]
  >
) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 0) return "";
        return `${key}=${value.join(",")}`;
      }
      if (value === undefined || value === "") return "";
      return `${key}=${value}`;
    })
    .filter((val) => val !== "")
    .join("&");
};

export const arrFromQuery = (query: string | null) =>
  !query || query === null || query === ""
    ? []
    : query.split(",").map((val) => parseInt(val));
