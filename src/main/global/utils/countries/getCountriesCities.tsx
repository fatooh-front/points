import { Country, State } from 'country-state-city';
import _ from 'lodash';

import { getIsoCode, translateCountryName } from './getIsoCodeFromName';
import TLabelSelectCountry from './TLabelSelectCountry';

type Option = {
  value: any;
  label: any;
};

export const countryOptions = (lang: "ar" | "en") =>
  Country.getAllCountries().map((country) => ({
    value: translateCountryName(country.name, lang),
    label: (
      <TLabelSelectCountry
        code={country.isoCode}
        label={translateCountryName(country.name, lang)}
      />
    ),
  }));

export const getStateOptions = (selectedCountry: Option | string) => {
  return typeof selectedCountry === "string"
    ? State.getStatesOfCountry(
        getIsoCode(translateCountryName(selectedCountry, "en"))
      ).map((state) => ({
        value: _.capitalize(state.name),
        label: _.capitalize(state.name),
      }))
    : typeof selectedCountry === "object"
    ? State.getStatesOfCountry(
        getIsoCode(
          translateCountryName(String(selectedCountry?.value), "en")
        ) as string | undefined
      ).map((state) => ({
        value: _.capitalize(state.name),
        label: _.capitalize(state.name),
      }))
    : [];
};
