import { SetURLSearchParams } from "react-router-dom";

export const addSearchParam = (
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  key: string,
  value: string
) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(key, value);
  setSearchParams(newSearchParams);
};

/**
 * Recursively searches across all fields of objects and their [`${childrenField}`].
 * @param data - The array of objects to search.
 * @param query - The search query string.
 * @returns An array of objects that match the search query.
 */
export function searchInObjectsWithParents(
  data: any[] = [],
  query: string = "",
  childrenField: string = "children",
  fieldsToSearch?: string[] // Optional: Array of specific fields to search
): any[] {
  if (!data) return [];
  if (!query) return data;

  const lowerQuery = query.trim().toLowerCase();

  // Helper function to check if the object matches the query within the specified fields.
  const matchesQuery = (obj: any): boolean => {
    const valuesToSearch = fieldsToSearch
      ? fieldsToSearch.map((field) => obj[field]).filter(Boolean) // Filter out invalid fields
      : Object.values(obj); // Default to all values

    return valuesToSearch.some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(lowerQuery)
    );
  };

  // Recursive function to search objects and retain matching parents and children.
  const search = (data: any[]): any[] => {
    return data
      .map((item) => {
        const childResults = item[childrenField]
          ? search(item[childrenField])
          : [];

        // If the item matches the query or any child matches, include it in the results.
        if (matchesQuery(item) || childResults.length > 0) {
          return {
            ...item,
            [childrenField]: childResults.length > 0 ? childResults : undefined, // Keep only matching children.
          };
        }
        return null; // Exclude non-matching items.
      })
      .filter((item) => item !== null); // Remove null values from the result.
  };

  return search(data);
}

export function searchInObjects(
  data: any[] = [],
  query: string = "",
  childrenField: string = "children",
  fieldsToSearch?: string[] // Optional array of fields to search on
): any[] {
  if (!data) return [];
  if (!query) return data;
  const lowerQuery = query.trim().toLowerCase();

  // Helper function to check if the specified field or all fields match the query.
  const matchesQuery = (obj: any): boolean => {
    const valuesToSearch = fieldsToSearch
      ? fieldsToSearch.map((field) => obj[field]).filter(Boolean) // Only valid fields
      : Object.values(obj); // Default to all fields

    return valuesToSearch.some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(lowerQuery)
    );
  };

  // Recursive function to search objects and extract matching ones.
  const search = (data: any[]): any[] => {
    let results: any[] = [];

    data.forEach((item) => {
      // If the current item matches, add it to the results.
      if (matchesQuery(item)) {
        results.push(item);
      }

      // Recursively search the children and add their matches.
      if (item[childrenField]) {
        results = results.concat(search(item[childrenField]));
      }
    });

    return results;
  };

  return search(data);
}
