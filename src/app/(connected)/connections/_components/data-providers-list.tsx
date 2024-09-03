import { DataProviderCard } from "@/app/(connected)/connections/_components/data-provider-card"
import { MOCK_DATA_PROVIDERS } from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type DataProvidersListProps = React.ComponentProps<"div">

export function DataProvidersList(props: DataProvidersListProps) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
        className
      )}
      {...divProps}
    >
      {MOCK_DATA_PROVIDERS.map((provider) => (
        <DataProviderCard key={provider.name} provider={provider} />
      ))}
    </div>
  )
}
DataProvidersList.displayName = "DataProvidersList"
