import { countryOptions, getStateOptions } from "@/main/global/utils/countries/getCountriesCities";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select, { SingleValue } from "react-select";
import { customStyles } from "./styles/customStyleReactSelect";

interface FormValues {
  country: SingleValue<{ value: string; label: string }>;
  state: SingleValue<{ value: string; label: string }>;
}

const TCountryStateSelect = () => {
  const { control, watch, setValue, handleSubmit } = useForm<FormValues>();

  const { i18n } = useTranslation();
  const selectedCountry = watch("country") || { value: "", label: "" };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const stateOptions = getStateOptions(selectedCountry);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={countryOptions(i18n.language as "ar" | "en")}
              onChange={(value) => {
                field.onChange(value);
                setValue("state", null); // إعادة تعيين الولاية عند تغيير الدولة
              }}
              isRtl={i18n.language === "ar"}
              styles={customStyles(false)}
            />
          )}
        />
        <Controller name="state" control={control} render={({ field }) => <Select {...field} options={stateOptions} isRtl={i18n.language === "ar"} isDisabled={!selectedCountry} styles={customStyles(false)} />} />
      </form>
    </div>
  );
};

export default TCountryStateSelect;

// export const getStateOptions = (selectedCountry: Option | string) => {
//   return typeof selectedCountry === "string"
//     ? State.getStatesOfCountry(selectedCountry).map((state) => ({
//         value: state.isoCode,
//         label: state.name,
//       }))
//     : typeof selectedCountry === "object"
//     ? State.getStatesOfCountry(
//         selectedCountry?.value as string | undefined
//       ).map((state) => ({
//         value: state.isoCode,
//         label: state.name,
//       }))
//     : [];
// };
