"use client"

import { type ComponentProps } from "react"

import {
  DataConnectionHandlerCard,
  DataConnectionHandlerCardSkeleton,
} from "@/app/(connected)/connections/[connectionId]/_components/data-connection-handler-card"
import { useDataProvider } from "@/features/data-connections/hooks/use-data-provider"
import type { DataConnectionHandler } from "@/features/data-connections/types"
import { cn } from "@/styles/utils"

export interface DataConnectionsHandlersListProps
  extends Omit<ComponentProps<"div">, "children"> {
  connectionHandlers: DataConnectionHandler[]
  providerId: string
}

export function DataConnectionsHandlersList(
  props: DataConnectionsHandlersListProps
) {
  const { connectionHandlers, providerId, className, ...divProps } = props

  const { provider, isLoading } = useDataProvider(providerId)

  if (provider) {
    // TODO: Handle no handlers in provider

    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
          className
        )}
        {...divProps}
      >
        {provider.handlers?.map((handlerDefinition) => {
          const connectionHandler = connectionHandlers.find(
            (handler) => handler.id === handlerDefinition.id
          )
          return (
            <article key={handlerDefinition.id} className="h-full">
              <DataConnectionHandlerCard
                handlerDefinition={handlerDefinition}
                connectionHandler={connectionHandler}
                className="h-full"
              />
            </article>
          )
        })}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
          className
        )}
        {...divProps}
      >
        <DataConnectionHandlerCardSkeleton />
      </div>
    )
  }

  // TODO: Handler error state

  return null
}
DataConnectionsHandlersList.displayName = "DataConnectionsHandlersList"
