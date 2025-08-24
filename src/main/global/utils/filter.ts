// type FilterInObjects<T> = {
//   field: keyof T;
//   values: T[keyof T][];
//   data: T[];
// };

export function filterInArray<T>(
  field: keyof T,
  values: T[keyof T][],
  data: T[]
): T[] {
  if (values.length === 0) return data;
  return data.filter((item) => values.includes(item[field]));
}

export function filterInObjects(
  data: any[] = [],
  query: string[],
  childrenField: string = "children",
  fieldsToFilter?: string[] // Optional array of fields to filter on
): any[] {
  if (!data) return [];
  if (!query || query?.length === 0) return data;

  // Helper function to check if the specified field or all fields match the query.
  const matchesQuery = (obj: any): boolean => {
    const valuesToFilter = fieldsToFilter
      ? fieldsToFilter.map((field) => obj[field]).filter(Boolean) // Only valid fields
      : Object.values(obj); // Default to all fields

    return valuesToFilter.some(
      (value) =>
        typeof value === "string" && query.some((q) => value.includes(q))
    );
  };

  // Recursive function to filter objects and extract matching ones.
  const filter = (data: any[]): any[] => {
    let results: any[] = [];

    data.forEach((item) => {
      // If the current item matches, add it to the results.
      if (matchesQuery(item)) {
        results.push(item);
      }

      // Recursively filter the children and add their matches.
      if (item[childrenField]) {
        results = results.concat(filter(item[childrenField]));
      }
    });

    return results;
  };

  return filter(data);
}
