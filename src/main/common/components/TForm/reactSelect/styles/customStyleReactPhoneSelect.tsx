import { StylesConfig } from "react-select";

type Option = {
  value: any;
  label: any;
};
export const customStyleReactPhoneSelect: StylesConfig<Option, false> = {
  container: (provided) => ({
    ...provided,
    borderColor: "#dddddd !important",
  }),
  control: (provided, state) => ({
    ...provided,
    transition: "none",
    borderColor: "#ededed !important",
    boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.15) !important",
    outlineColor: state.menuIsOpen ? "Black" : "#dddddd",
    outlineOffset: state.isFocused ? "2px !important" : "",
    outlineWidth: state.isFocused ? "2px !important" : "",
    outlineStyle: state.isFocused ? "solid !important" : "",
    fontSize: "0.875rem",
    borderRadius: "calc(0.5rem - 2px)",
    paddingBlock: "0.09rem",
    paddingInline: "1px",
    direction: "rtl",
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingInline: "1px",
  }),
  // "#F6CDD4"
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? `${!state.isFocused ? "transparent" : "#3b82f616"}` : state.isFocused || state.isSelected ? "#3b82f616" : "white",
    color: "black",
    width: "calc(100% - 8px)",
    margin: "0 auto",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    fontSize: "14px",
    fontFamily: "Cairo",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    paddingInline: "1px",
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontSize: "14px",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    width: 200,
    left: 0,
    right: "auto",
  }),
};
