import isoCountries from 'i18n-iso-countries';
import arLangJson from 'i18n-iso-countries/langs/ar.json';
import enLangJson from 'i18n-iso-countries/langs/en.json';

// Load country names data
isoCountries.registerLocale(enLangJson);
isoCountries.registerLocale(arLangJson);

// Function to get ISO code from country name in English or Arabic
export function getIsoCode(countryName: string) {
  let isoCode = isoCountries.getAlpha2Code(countryName, "en");
  if (!isoCode) {
    isoCode = isoCountries.getAlpha2Code(countryName, "ar");
  }
  return isoCode;
}
// // Example usage
// const countryNameEn = "United States";
// const countryNameAr = "الولايات المتحدة";
// console.log(`ISO code for ${countryNameEn}: ${getIsoCode(countryNameEn)}`);
// console.log(`ISO code for ${countryNameAr}: ${getIsoCode(countryNameAr)}`);

export function translateCountryName(
  countryName: string,
  lang: "en" | "ar"
): string {
  let isoCode = isoCountries.getAlpha2Code(countryName, "en");
  if (!isoCode) {
    isoCode = isoCountries.getAlpha2Code(countryName, "ar");
  }
  if (isoCode) {
    const translatedName = isoCountries.getName(isoCode, lang);
    return translatedName || countryName;
  }
  return countryName;
}

// // Example usage
// const countryNameEn = "United States";
// const countryNameAr = "الولايات المتحدة";
// console.log(`Translated name: ${translateCountryName(countryNameEn, "ar")}`); // "الولايات المتحدة"
// console.log(`Translated name: ${translateCountryName(countryNameAr, "en")}`); // "United States"
