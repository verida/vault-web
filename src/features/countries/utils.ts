import { countries, getCountryDataList } from "countries-list"
import type { TCountryCode } from "countries-list"

import type { CountryData } from "@/features/countries/types"

/**
 * Get a sorted list of countries with their codes
 * This function can be called on the server side to pre-fetch the country data
 */
export function getCountries(): CountryData[] {
  // Convert the countries object to an array of country data with code
  const countryList = getCountryDataList().map((country, index) => {
    const code = Object.keys(countries)[index] as TCountryCode
    return { ...country, code } as CountryData
  })

  // Sort the countries by name
  return countryList.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Find the country code from a country name
 *
 * @param name The country name to look up
 * @returns The country code or an empty string if not found
 */
export function getCountryCodeFromName(name: string | undefined): string {
  if (!name) {
    return ""
  }

  // Find the country code by name
  const countryEntry = Object.entries(countries).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, country]) => country.name === name
  )

  return countryEntry ? countryEntry[0] : ""
}

/**
 * Get the country name from a country code
 *
 * @param code The country code to look up
 * @returns The country name or an empty string if not found
 */
export function getCountryNameFromCode(code: TCountryCode | string): string {
  if (!code) {
    return ""
  }

  const countryCode = code as TCountryCode
  const country = countries[countryCode]

  return country ? country.name : ""
}
