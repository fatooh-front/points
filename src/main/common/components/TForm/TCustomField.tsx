type TCustomField = {
  name: string;
  label?: string;
  labelInput?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  fromItemClassName?: string;
  defaultValue?: string | undefined;
  handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

function TCustomField({
  name,
  label,
  labelInput,
  placeholder = "",
  description = "",
  disabled = false,
  fromItemClassName = "",
  defaultValue = undefined,
  value = "",
  handleOnChange,
  ...props
}: TCustomField) {
  const { className, ...propsField } = props;
  return (
    <div className={`flex flex-col gap-3 ${fromItemClassName}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        id={name}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
        placeholder={placeholder}
        aria-label={label}
        name={name}
        value={value}
        // defaultValue={defaultValue || value}
        onChange={handleOnChange}
        aria-labelledby={labelInput || label}
        {...propsField}
        disabled={disabled}
      />
      {description && <p>{description}</p>}
    </div>
  );
}

export default TCustomField;
