import { useCallback, useEffect } from "react";

export default function useCapitalizeFields(form: any) {
  const capitalizeWords = (str: string) => {
    return str?.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const capitalizeField = useCallback(
    (name: "firstName" | "lastName", value: string) => {
      const capitalizedValue = capitalizeWords(value);
      if (capitalizedValue !== value) {
        form?.setValue(name, capitalizedValue);
      }
    },
    [form]
  );

  useEffect(() => {
    const subscription = form?.watch((value: any, { name, type }: any) => {
      if (type === "change") {
        if (name === "firstName") {
          value?.firstName && capitalizeField("firstName", value?.firstName);
        } else if (name === "lastName") {
          value?.lastName && capitalizeField("lastName", value?.lastName);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, capitalizeField]);
  return {};
}
