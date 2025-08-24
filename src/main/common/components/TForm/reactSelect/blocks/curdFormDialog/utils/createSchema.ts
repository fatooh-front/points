import { z, ZodTypeAny } from "zod";
import { Field } from "./fieldsTypes";

/**
 * Create a Zod schema dynamically from fields array.
 */
export const createSchema = (fields: Field[]) => {
  const schema: Record<string, ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: ZodTypeAny;

    switch (field.type) {
      case "text":
      case "textarea":
        fieldSchema = z.string().nullable();
        break;
      case "number":
        fieldSchema = z.number().nullable();
        break;
      case "email":
        fieldSchema = z.string().email().nullable();
        break;
      case "date":
        fieldSchema = z.string().datetime().nullable();
        break;
      case "textEditor":
        fieldSchema = z.string().nullable();
        break;
      case "Select":
        fieldSchema = z.string().nullable();
        break;
      default:
        throw new Error(`Unsupported field type: ${field.type}`);
    }

    // Narrow down the type to call `.min()` or `.optional().nullable()`
    if (field.required) {
      if (fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.min(1, {
          message: `${field.label} is required`,
        });
      }
    } else {
      fieldSchema = fieldSchema.optional().nullable();
    }

    schema[field.name] = fieldSchema;
  });

  return z.object(schema);
};

// // Example usage:
// const fields: Field[] = [
//   {
//     name: "name_en",
//     label: "English Name",
//     type: "text",
//     required: true,
//   },
//   {
//     name: "name_ar",
//     label: "Arabic Name",
//     type: "text",
//     required: true,
//   },
//   {
//     name: "age",
//     label: "Age",
//     type: "number",
//     required: false,
//   },
// ];

// const formSchema = createSchema(fields);
// console.log(formSchema.parse({ name_en: "John", name_ar: "جون", age: 30 })); // Passes validation
