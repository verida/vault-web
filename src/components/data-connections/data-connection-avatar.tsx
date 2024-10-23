import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { DataConnection, DataProvider } from "@/features/data-connections/types"
import { cn } from "@/styles/utils"

export type DataConnectionAvatarProps = {
  connection?: DataConnection
  provider?: DataProvider
  connectionAvatarClassName?: React.ComponentProps<typeof Avatar>["className"]
  providerAvatarClassName?: React.ComponentProps<typeof Avatar>["className"]
} & React.ComponentProps<"div">

export function DataConnectionAvatar(props: DataConnectionAvatarProps) {
  const {
    connection,
    provider,
    className,
    connectionAvatarClassName,
    providerAvatarClassName,
    ...divProps
  } = props

  return (
    <div className={cn("relative w-fit shrink-0", className)} {...divProps}>
      {connection ? (
        <Avatar className={cn("size-12", connectionAvatarClassName)}>
          <AvatarImage
            src={connection.profile.avatar.uri}
            alt="Connection Avatar"
          />
          <AvatarFallback>
            {connection.profile.name[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div
          className={cn(
            "size-12 rounded-full bg-surface",
            connectionAvatarClassName
          )}
        >
          <Skeleton
            className={cn("size-12 rounded-full", connectionAvatarClassName)}
          />
        </div>
      )}
      {provider ? (
        <Avatar
          className={cn(
            "absolute -bottom-1 -right-1 size-5",
            providerAvatarClassName
          )}
        >
          <AvatarImage src={provider.icon} alt={provider.label} />
          <AvatarFallback>{provider.label?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      ) : (
        <div
          className={cn(
            "absolute -bottom-1 -right-1 size-5 rounded-full bg-surface",
            providerAvatarClassName
          )}
        >
          <Skeleton
            className={cn("size-5 rounded-full", providerAvatarClassName)}
          />
        </div>
      )}
    </div>
  )
}
DataConnectionAvatar.displayName = "DataConnectionAvatar"
