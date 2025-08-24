import { Field, Item } from "./fieldsTypes";

/**
 * Create defaultValues dynamically based on fields and type.
 */
export const createDefaultValues = (
  fields: Field[],
  item: Item | undefined,
  type: "add" | "update"
) => {
  const defaultValues: Record<string, any> = {};

  fields.forEach((field) => {
    if (type === "add") {
      field.type === "Select"
        ? (defaultValues[field.name] = [])
        : (defaultValues[field.name] = ""); // Set default to empty string or appropriate value
    } else {
      field.type === "Select"
        ? (defaultValues[field.name] = item?.[field.name]._id || "")
        : (defaultValues[field.name] = item?.[field.name] ?? ""); // Use item value if available
    }
  });

  return defaultValues;
};

// // Example usage:
// const fields: Field[] = [
//   { name: "name_en", label: "English Name", type: "text", required: true },
//   { name: "name_ar", label: "Arabic Name", type: "text", required: true },
//   { name: "age", label: "Age", type: "number", required: false },
// ];

// const item = { name_en: "John", name_ar: "جون", age: 30 };

// const defaultValuesAdd = createDefaultValues(fields, undefined, "add");
// console.log(defaultValuesAdd);
// // Output: { name_en: "", name_ar: "", age: "" }

// const defaultValuesUpdate = createDefaultValues(fields, item, "update");
// console.log(defaultValuesUpdate);
// // Output: { name_en: "John", name_ar: "جون", age: 30 }
