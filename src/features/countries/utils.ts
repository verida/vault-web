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
