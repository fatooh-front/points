import { useEffect, useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

type Props = {
  form: any;
  name: string;
  type?: string;
  itemData?: any;
  defaultValue: any;
};
export default function useArrayFieldWithTableDialog({
  form,
  name,
  type,
  itemData,
  defaultValue,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(type === "add" ? 0 : 1);
  const [indexEditOrView, setIndexEditOrView] = useState<number | undefined>(
    undefined
  );
  console.log("indexEditOrView", indexEditOrView);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");

  const FieldArray = useFieldArray({
    control: form.control,
    name: `${name}`,
  });

  const derivedUnitsValues = useWatch({
    control: form.control,
    name: `${name}`,
  });

  // const defaultValue = {
  //   name_ar: "",
  //   name_en: "",
  //   short_name_ar: "",
  //   short_name_en: "",
  //   description: "",
  //   expression: "",
  //   active: true,
  // };

  useEffect(() => {
    if (itemData) {
      setActiveIndex(itemData?.[name]?.length);
    }
  }, [itemData]);

  useEffect(() => {
    console.log(
      "derivedUnitsValues[activeIndex]",
      derivedUnitsValues?.[activeIndex]
    );
    console.log("derivedUnitsValues", derivedUnitsValues);
    console.log("activeIndex", activeIndex);
  }, [derivedUnitsValues, activeIndex]);

  const handleAddArrayField = async () => {
    console.log("add-derivedUnitsValues", derivedUnitsValues);
    console.log("add-activeIndex", activeIndex);
    console.log(
      "derivedUnitsValues[activeIndex]",
      derivedUnitsValues?.[activeIndex]
    );
    console.log("FieldArray.fields", derivedUnitsValues);
    const isFormValid = await form.trigger(`${name}[${activeIndex}]`);
    if (mode === "add" && isFormValid) {
      FieldArray.append(defaultValue);
      setActiveIndex(derivedUnitsValues.length);
    }
  };

  const handleEditArrayField = async () => {
    const activeForm = await form.getValues()[name][activeIndex];
    // const isFormValid = await form.trigger(`${name}[${activeIndex}]`);
    // console.log("isFormValid", isFormValid);
    if (
      mode === "edit" &&
      indexEditOrView !== undefined
      // && isFormValid
    ) {
      form.setValue(`${name}[${indexEditOrView}]`, activeForm);
      FieldArray.update(indexEditOrView, activeForm);
      form.setValue(`${name}[${activeIndex}]`, defaultValue);
      FieldArray.update(activeIndex, defaultValue);
      setMode("add");
      setIndexEditOrView(undefined);
    }
  };

  const handleTriggerEditArrayField = (field: any, index: number) => {
    setIndexEditOrView(index);
    form.setValue(`${name}[${activeIndex}]`, field);
    FieldArray.update(activeIndex, field);
    setMode("edit");
  };

  const handleTriggerViewArrayField = (field: any) => {
    setMode("view");
    form.setValue(`${name}[${activeIndex}]`, field);
  };

  const handleDeleteArrayField = (_field: any, index: number) => {
    console.log("delete-index", index);
    const currentValues = [...form.getValues(`${name}`)];
    currentValues.splice(index, 1);
    form.setValue(`${name}`, currentValues);
    setActiveIndex(currentValues.length - 1);
    // remove(index);
  };

  const handleCancelMode = () => {
    setMode("add");
    form.setValue(`${name}[${activeIndex}]`, defaultValue);
  };
  return {
    mode,
    activeIndex,
    indexEditOrView,
    handleAddArrayField,
    handleEditArrayField,
    handleTriggerEditArrayField,
    handleTriggerViewArrayField,
    handleDeleteArrayField,
    handleCancelMode,
    derivedUnitsValues,
    FieldArray,
  };
}
