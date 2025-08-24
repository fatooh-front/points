import { Granularity } from "../../../../TDateTimePacker";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "date"
  | "textEditor"
  | "Select";
export type OptionFields = {
  value: any;
  label: any | any[];
};
export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: OptionFields[];
  granularity?: Granularity;
};

export type Item = Record<string, any>; // Define item as a key-value object
