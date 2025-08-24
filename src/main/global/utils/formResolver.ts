import { zodResolver } from "@hookform/resolvers/zod";
import { removeFieldsTopLevel } from "./objectUtils";

export const resolversWithArrayFields = async (
  args: any,
  formSchema: any,
  fields: string | string[],
  fieldsRemoved?: string[]
) => {
  const fieldsArray = Array.isArray(fields) ? fields : [fields];
  // values = args[0], context = args[1], options = args[2]

  const submitValues = {
    ...args[0],
    ...Object.fromEntries(
      fieldsArray.map((field) => [
        field,
        removeFieldsTopLevel(args[0]?.[field]?.slice(0, -1), fieldsRemoved),
      ])
    ),
  };

  return zodResolver(formSchema)(submitValues, args[1], args[2]);
};
