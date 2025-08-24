// import i18n from "@/i18n";
import { StylesConfig } from "react-select";

type Option = {
  value: any;
  label: any;
};

type Props = (
  readOnly?: boolean,
  showChecked?: boolean
) => StylesConfig<Option, false>;
export const customStyles: Props = (readOnly = false, showChecked = true) => {
  const objNoCkecked = (isSelected: boolean) => {
    const objStyle =
      !showChecked || !isSelected
        ? {
            "&::after": {
              content: '""', // Prevent rendering checkmark
              display: "none",
            },
          }
        : {
            // "&::after": {
            //   content: '"✓"', // Prevent rendering checkmark
            //   display: "inline-block",
            //   position: "absolute" as any,
            //   left: i18n.language === "ar" ? "auto" : "15px",
            //   right: i18n.language === "en" ? "15px" : "auto",
            // },
          };
    return objStyle;
  };

  return {
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
      paddingBlock: "0.15rem",
    }),
    // "#F6CDD4"
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? `${!state.isFocused ? "transparent" : "#3b82f616"}`
        : state.isFocused || state.isSelected
        ? "#3b82f616"
        : "white",
      color: "black",
      width: "calc(100% - 8px)",
      margin: "0 auto",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      fontSize: "14px",
      fontFamily: "Cairo",
      ...objNoCkecked(state.isSelected),
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingInline: "11px",
      display: readOnly ? "none" : provided.display,
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({ ...base, zIndex: 9999 }),
    menuList: (base) => ({ ...base, zIndex: 9999, maxHeight: "200px" }),
  };
};
export const customSearchStyles: Props = (
  readOnly = true,
  showChecked = false
) => {
  const objNoCkecked = (isSelected: boolean) => {
    const objStyle =
      !showChecked || !isSelected
        ? {
            "&::after": {
              content: '""', // Prevent rendering checkmark
              display: "none",
            },
          }
        : {
            // "&::after": {
            //   content: '"✓"', // Prevent rendering checkmark
            //   display: "inline-block",
            //   position: "absolute" as any,
            //   left: i18n.language === "ar" ? "auto" : "15px",
            //   right: i18n.language === "en" ? "15px" : "auto",
            // },
          };
    return objStyle;
  };

  return {
    container: (provided) => ({
      ...provided,
      borderColor: "#dddddd !important",
    }),
    control: (provided, state) => ({
      ...provided,
      transition: "none",
      border: "none",
      borderColor: "#ededed !important",
      boxShadow: "none !important",
      outlineColor: state.menuIsOpen ? "Black" : "#dddddd",
      outlineOffset: state.isFocused ? "0px !important" : "",
      outlineWidth: state.isFocused ? "0px !important" : "",
      outlineStyle: state.isFocused ? "solid !important" : "",
      fontSize: "0.875rem",
      borderRadius: "calc(0.5rem - 2px)",
      paddingBlock: "0.15rem",
      height: "100%",
    }),
    // "#F6CDD4"
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? `${!state.isFocused ? "transparent" : "#3b82f616"}`
        : state.isFocused || state.isSelected
        ? "#3b82f616"
        : "white",
      color: "black",
      width: "calc(100% - 8px)",
      margin: "0 auto",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      fontSize: "14px",
      fontFamily: "Cairo",
      ...objNoCkecked(state.isSelected),
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingInline: "11px",
      display: readOnly ? "none" : provided.display,
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({ ...base, zIndex: 9999 }),
    menuList: (base) => ({ ...base, zIndex: 9999, maxHeight: "200px" }),
  };
};
