import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

type Setting = {
  // settingId: number;
  setKey: string;
  setType: number | null;
  setValue: string | number;
};

type Props = {
  data: Setting[];
  onSave: (settings: Setting[]) => void;
};

const settingsSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.any()])
);
export function useSettingsForm({ data, onSave }: Props) {
  // Convert array to object: { setKey: setValue }
  console.log(data, "data in useSettingsForm");

  const defaultValues = data.reduce<Record<string, string>>((acc, cur) => {
    acc[cur.setKey] =
      String(cur.setValue) &&
      String(cur.setValue) != "null" &&
      String(cur.setValue) != "undefined"
        ? String(cur.setValue)
        : "0";
    return acc;
  }, {});

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [data]);

  function onSubmit(values: Record<string, string | number>) {
    if (Object.values(values).some((v) => v === null || v === undefined)) {
      // Replace with your toast implementation
      toast({
        title: "يجب ملء جميع الحقول قبل الحفظ",
      });
      return;
    }
    console.log(form.control._formState.errors, "fhghfghgfhfghfghfghfghfg");
    // Convert back to array format
    const updatedSettings: Setting[] = data.map((item) => ({
      ...item,
      setValue: values[item.setKey],
    }));
    onSave(updatedSettings);
  }
  return {
    form,
    onSubmit,
  };
}
