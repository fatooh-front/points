export default function CustomChechBox({
  form,
  label,
  name,
  onChange,
  value,
}: {
  form: any;
  label: string;
  name: string;
  onChange?: (value: any) => void;
  value?: { checked: boolean };
}) {
  console.log(
    "CustomChechBox",
    form.getValues(name),
    label,
    name,
    onChange,
    value
  );

  return (
    <div
      onClick={
        onChange ? onChange : () => form.setValue(name, !form.watch(name))
      }
      className="flex flex-1 border px-4 h-[48px] rounded-[9px] items-center gap-2 cursor-pointer select-none"
      style={{ overflow: "hidden" }}
    >
      <div
        onClick={() => form.setValue(name, !form.watch(name))}
        className="w-5 h-5 flex items-center justify-center rounded-sm overflow-hidden"
      >
        <input
          type="checkbox"
          id={name}
          className="form-checkbox accent-[darkgoldenrod] rounded-sm w-5 h-5"
          checked={value ? value.checked : form.watch(name)}
          onChange={
            onChange ? onChange : () => form.setValue(name, !form.watch(name))
          }
        />
      </div>
      <label htmlFor={name} className="font-medium cursor-pointer">
        {label}
      </label>
    </div>
  );
}
