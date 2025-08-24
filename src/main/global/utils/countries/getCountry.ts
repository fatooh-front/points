// Import the moment-timezone library
import moment from 'moment-timezone';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCountryByTimeZone(userTimeZone: any) {
  // Get a list of countries from moment-timezone
  const countries = moment.tz.countries();

  // Iterate through the countries and check if the time zone is associated with any country
  for (const country of countries) {
    const timeZones = moment.tz.zonesForCountry(country);

    if (timeZones.includes(userTimeZone)) {
      // Use Intl.DisplayNames to get the full country name
      const countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(
        country
      );
      return countryName;
    }
  }

  // Return the original time zone if no matching country is found
  return userTimeZone;
}

export const getCountry = () => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userCountry = getCountryByTimeZone(userTimeZone);
  console.log("userCountry", userCountry);
  return userCountry || "";
};

export function extractLatLngFromGoogleMapLink(link: string):
  | {
      lat: number;
      lng: number;
    }
  | undefined {
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = link.match(regex);

  if (match) {
    const [, lat, lng] = match;
    return {
      lat: Number(lat),
      lng: Number(lng),
    };
  }
}

// // Example usage:
// const googleMapLink =
//   "https://www.google.com/maps/place/Some+Place/@37.7749,-122.4194,15z/";
// const location = extractLatLngFromGoogleMapLink(googleMapLink);
// console.log(location); // { lat: "37.7749", lng: "-122.4194" }
