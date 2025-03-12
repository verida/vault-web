import type { ICountryData, TCountryCode } from "countries-list"

export interface CountryData extends ICountryData {
  code: TCountryCode
}
