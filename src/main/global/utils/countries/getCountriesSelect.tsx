import CountryList from 'country-list-with-dial-code-and-flag';
import React from 'react';

import { translateCountryName } from './getIsoCodeFromName';
import TLabelSelectCountry from './TLabelSelectCountry';

export const getCountriesOptions = (lang: "ar" | "en" = "en") => {
  const countriesData: { value: string; label: React.ReactNode }[] = [];
  for (let country of CountryList.getAll()) {
    if (country?.code !== "IL") {
      countriesData.push({
        value: translateCountryName(country?.name, lang),
        label: (
          <TLabelSelectCountry
            code={country?.code}
            label={translateCountryName(country?.name, lang)}
          />
        ),
      });
    }
  }
  return countriesData;
};

export const getPhoneOptions = (lang: "ar" | "en" = "en") => {
  const countriesData: {
    value: string;
    label: React.ReactNode;
    code: string;
    dialCode: string;
  }[] = [];
  for (let country of CountryList.getAll()) {
    if (country?.code !== "IL") {
      countriesData.push({
        value: country?.dialCode,
        label: (
          <div className="flex justify-between items-center w-full cursor-pointer">
            <div className="flex justify-between items-center gap-2">
              <span className={`fi fi-${country?.code?.toLowerCase()}`}></span>
              <span
                title={translateCountryName(country?.name, lang)}
                className="text-[12px] truncate text-nowrap max-w-[100px]"
              >
                {translateCountryName(country?.name, lang)}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="text-gray-500 text-[12px]">
                ({country?.dialCode})
              </span>
            </div>
          </div>
        ),

        code: country?.code,
        dialCode: country?.dialCode,
      });
    }
  }
  return countriesData;
};

export const getCountryNameFromCode = (lang = "en", code: string) => {
  return new Intl.DisplayNames([lang], { type: "region" }).of(code);
};
