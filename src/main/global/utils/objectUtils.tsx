import { isArray, isDate, isEqual, isObject, omit } from "lodash";

export const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function removeEmptyFields<T extends Record<string, any>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        value !== 0 &&
        value?.length !== 0 &&
        value !== null &&
        value !== undefined
    )
  ) as Partial<T>;
}

type WithId = {
  _id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export function removeIdFromObjects<T extends WithId>(
  objects: T[]
): Omit<T, "_id">[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return objects.map(({ _id, ...rest }) => rest);
}

export function removeItemsWithIds(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array: any[],
  idsToRemove: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any[] {
  return array.filter((item) => !item?._id || !idsToRemove.includes(item?._id));
}

export function createOptionsArray<T>(
  data: T[],
  valueField: keyof T,
  ...labelFields: (keyof T)[]
) {
  return data?.map((item) => ({
    value: item[valueField] as string | number,
    label: labelFields.map((field) => item[field]).join(" "),
  }));
}

export function createOptionsUsersArray<T>(
  data: T[],
  valueField: keyof T | "_id" = "_id"
) {
  return data?.map((item: any) => ({
    value: item[valueField] as string | number,
    label: (
      <div className="flex flex-col md:flex-row gap-1 md:gap-3 items-center justify-between w-full border !rounded-md !p-2 flex-wrap">
        <span>
          {item?.["firstName"]} {item?.["lastName"]}
        </span>
        <span className="text-sm text-gray-500">{item?.email}</span>
      </div>
    ),
  }));
}

export function filterUsersOption(option: any, inputValue: string) {
  console.log("option111", option);
  console.log("inputValue111", inputValue);

  const fullNameLabel = `${option?.label?.props?.children?.[0]?.props?.children?.[0]} ${option?.label?.props?.children?.[0]?.props?.children?.[2]}`;
  const emailLabel = option?.label?.props?.children?.[1]?.props?.children;

  return (
    fullNameLabel?.toLowerCase()?.includes(inputValue?.toLowerCase()) ||
    emailLabel?.toLowerCase()?.includes(inputValue?.toLowerCase())
  );
}

export function removeKeys(obj: any, keys: string[]): any {
  const clonedObj = { ...obj };

  for (const key of keys) {
    delete clonedObj[key];
  }

  return clonedObj;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function getArrayKeysOnly(obj: any) {
  const result = [];
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      result.push({ [key]: obj[key] });
    }
  }
  return result;
}

export function getArrayKeys(obj: any) {
  const result = [];
  for (const key in obj) {
    if (Array.isArray(obj[key]?.actions)) {
      result.push({ [key]: obj[key] });
    }
  }
  return result;
}

export function convertObjectToArray(obj: any): any[] {
  if (!obj) return [];
  return Object.entries(obj).map(([key, value]) => ({
    [key]: value,
  }));
}

type Permission = {
  [key: string]: string[];
};

export function comparePermissionLists(
  list1: Permission[],
  list2: Permission[]
): boolean {
  if (list1.length !== list2.length) {
    return false;
  }

  for (let i = 0; i < list1.length; i++) {
    const keys1 = Object.keys(list1[i]);
    const keys2 = Object.keys(list2[i]);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key)) {
        return false;
      }

      const values1 = list1[i][key];
      const values2 = list2[i][key];

      if (values1.length !== values2.length) {
        return false;
      }

      for (const value of values1) {
        if (!values2.includes(value)) {
          return false;
        }
      }
    }
  }

  return true;
}

// export function objectToFormData(
//   obj: Record<string, any>,
//   formData: FormData = new FormData(),
//   namespace: string = ""
// ): FormData {
//   for (let key in obj) {
//     if (!obj.hasOwnProperty(key)) continue;

//     const formKey = namespace ? `${namespace}[${key}]` : key;

//     if (typeof obj[key] === "object" && !(obj[key] instanceof File)) {
//       // If it's an array or object, call the function recursively
//       objectToFormData(obj[key], formData, formKey);
//     } else {
//       // Otherwise append the value
//       formData.append(formKey, obj[key]);
//     }
//   }

//   return formData;
// }

export function objectToFormData(
  obj: Record<string, any>,
  includeIndexForFiles: boolean = true,
  formData: FormData = new FormData(),
  namespace: string = ""
): FormData {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const formKey = namespace ? `${namespace}[${key}]` : key;
    const value = obj[key];

    if (Array.isArray(value) && value.every((item) => item instanceof File)) {
      if (includeIndexForFiles) {
        // Use indexed keys for files
        value.forEach((file) => {
          formData.append(`${formKey}`, file);
        });
      } else {
        // Use a single key for all files
        value.forEach((file) => {
          formData.append(formKey, file);
        });
      }
    } else if (typeof value === "object" && !(value instanceof File)) {
      // Recursively handle nested objects
      objectToFormData(value, includeIndexForFiles, formData, formKey);
    } else {
      // Handle other values (e.g., strings, numbers, single files)
      formData.append(formKey, value);
    }
  }

  return formData;
}

/**
 * Compares two objects and returns true if they are equivalent.
 * Ignores specified keys if provided.
 *
 * @param {any} original - The original object.
 * @param {any} updated - The updated object to compare with.
 * @param {string[]} [keysToIgnore=[]] - Optional keys to ignore during comparison.
 * @returns {boolean} - True if objects are equivalent, otherwise false.
 */
export function compareObjects(
  original: any,
  updated: any,
  keysToIgnore: string[] = []
): boolean {
  console.log("original111", original);
  console.log("updated111", updated);

  const normalizedOriginal = omit(original, keysToIgnore);
  const normalizedUpdated = omit(updated, keysToIgnore);

  return isEqual(normalizedOriginal, normalizedUpdated);
}

export function getChangedFields(original: any, updated: any): any {
  console.log("original222", original);
  console.log("updated222", updated);

  const changedFields: any = {};

  Object.keys(updated).forEach((key) => {
    const originalValue = original[key];
    const updatedValue = updated[key];

    if (isDate(updatedValue) && isDate(originalValue)) {
      // Handle Date objects
      if (originalValue?.getTime() !== updatedValue?.getTime()) {
        changedFields[key] = updatedValue;
      }
    } else if (
      isObject(updatedValue) &&
      !isArray(updatedValue) &&
      isObject(originalValue) &&
      !isArray(originalValue)
    ) {
      // Handle nested objects
      const nestedChanges = getChangedFields(originalValue, updatedValue);
      if (Object.keys(nestedChanges).length > 0) {
        changedFields[key] = nestedChanges;
      }
    } else if (isArray(updatedValue) && isArray(originalValue)) {
      // Handle arrays
      if (!isEqual(originalValue, updatedValue)) {
        changedFields[key] = updatedValue;
      }
    } else if (!isEqual(originalValue, updatedValue)) {
      // Handle primitive types (string, number, boolean, etc.)
      changedFields[key] = updatedValue;
    }
  });

  return changedFields;
}

export function sortObjectByKeys<T extends Record<string, any>>(obj: T): T {
  const sortedEntries = Object.entries(obj).sort((a, b) => {
    return a[0].localeCompare(b[0]);
  });

  return Object.fromEntries(sortedEntries) as T;
}

export function sortObjectByValues<T extends Record<string, any>>(obj: T): T {
  const sortedEntries = Object.entries(obj).sort((a, b) => {
    if (typeof a[1] === "number" && typeof b[1] === "number") {
      return a[1] - b[1];
    }
    return 0;
  });

  return Object.fromEntries(sortedEntries) as T;
}

// Example usage
// const data = {
//   name: { ar: "اختبار333333333", "en-US": "test333333333" },
//   description: { ar: "اختبار33333", "en-US": "test33333" },
//   location: { lat: 12345, lng: 12345 },
//   status: { ar: "test", "en-US": "test" },
//   features: ["66a92a500075488d302b2184", "66a92aab0075488d302b2190"],
//   price: 5000,
//   // attachments: [ videoFile, pictureFile]
// };

// const formData = objectToFormData(data);

// // Log the FormData keys and values for verification
// for (let pair of formData.entries()) {
//   console.log(pair[0] + ", " + pair[1]);
// }

// const methodsOrder = ["POST", "GET", "PATCH", "DELETE", "DATA"];

// export const toggleAndSortMethod = (method: string, methodArray: string[]) => {
//   const index = methodArray.indexOf(method);
//   if (index === -1) {
//     // Method not found, add it
//     methodArray.push(method);
//   } else {
//     // Method found, remove it
//     methodArray.splice(index, 1);
//   }
//   // Sort the array based on the defined order
//   methodArray.sort((a, b) => methodsOrder.indexOf(a) - methodsOrder.indexOf(b));
//   return methodArray;
// };

type AnyObject = { [key: string]: any };

export function removeFields(
  obj: AnyObject,
  fieldsToRemove: string[]
): AnyObject {
  if (Array.isArray(obj)) {
    // Recursively process each item in the array
    return obj.map((item) => removeFields(item, fieldsToRemove));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: AnyObject = {};

    // Iterate over each key-value pair in the object
    for (const key in obj) {
      if (!fieldsToRemove.includes(key)) {
        // Only add the key if it's not in fieldsToRemove, and process its value recursively
        newObj[key] = removeFields(obj[key], fieldsToRemove);
      }
    }

    return newObj;
  }

  // Return primitive types (strings, numbers, etc.) as is
  return obj;
}

export function removeFieldsTopLevel(
  obj: AnyObject | AnyObject[] | null | undefined,
  fieldsToRemove?: string[]
): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Array.isArray(obj)) {
    // If it's an array, process each item in the array
    return obj.map((item) => {
      if (typeof item === "object" && item !== null) {
        return removeFieldsFromObject(item, fieldsToRemove);
      }
      return item; // Return non-object items as is
    });
  } else if (typeof obj === "object" && obj !== null) {
    // If it's a single object, remove fields at the top level
    return removeFieldsFromObject(obj, fieldsToRemove);
  }

  // If it's neither an object nor an array, return it as is
  return obj;
}

// Helper function to remove fields from a single object at the top level
export function removeFieldsFromObject(
  obj: AnyObject,
  fieldsToRemove?: string[]
): AnyObject {
  const newObj: AnyObject = { ...obj };

  // Remove specified fields from the object
  for (const field of fieldsToRemove || []) {
    delete newObj[field];
  }

  return newObj;
}
export const getLabelByItemsAndOptions = (
  id?: string | number,
  items?: any[]
) => {
  if (!items || !id) return undefined;
  const item = items?.find((item) => item.value === id);
  if (item) {
    return item.label;
  }
  return "";
};
// ex    {getLabelByItemsAndOptions(row.getValue("name"), usersOptions)}
