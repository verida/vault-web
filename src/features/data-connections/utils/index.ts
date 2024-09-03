import { DEFAULT_DATA_PROVIDER_DESCRIPTION } from "@/features/data-connections/constants"
import { MOCK_DATA_PROVIDERS } from "@/features/data-connections/mock"
import { DataProvider } from "@/features/data-connections/types"
import { wait } from "@/utils/misc"

export async function getDataProviders(): Promise<DataProvider[]> {
  // TODO: Implement fetching the providers from the endpoint

  await wait(5000)

  const providers = MOCK_DATA_PROVIDERS.map((provider) => {
    return {
      ...provider,
      description: provider.description || DEFAULT_DATA_PROVIDER_DESCRIPTION,
    }
  })

  return Promise.resolve(providers)
}
