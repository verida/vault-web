import { MOCK_DATA_PROVIDERS } from "@/features/data-connections/mock"
import { DataProvider } from "@/features/data-connections/types"
import { wait } from "@/utils/misc"

export async function getDataProviders(): Promise<DataProvider[]> {
  // TODO: Implement fetching the providers from the endpoint

  await wait(5000)

  return Promise.resolve(MOCK_DATA_PROVIDERS)
}
