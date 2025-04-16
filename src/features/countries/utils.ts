import { getCountryDataList } from "countries-list"

import type { CountryData } from "@/features/countries/types"

/**
 * Get a sorted list of countries.
 *
 * This function can be called on the server side to pre-fetch the country data
 */
export function getCountries(): CountryData[] {
  const countries = getCountryDataList()
  return countries.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Get the ISO 3166-1 alpha-2 country code for a given country name.
 *
 * @param countryName - The full name of the country to look up
 * @returns The two-letter ISO country code (e.g. "US" for United States), or undefined if not found
 */
export function getCountryCode(countryName: string) {
  const countries = getCountries()
  const country = countries.find((country) => country.name === countryName)
  return country?.iso2
}
