"use client"

import { useQueryClient } from "@tanstack/react-query"
import type { IMessaging } from "@verida/types"
import { usePathname, useRouter } from "next/navigation"
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useDebouncedCallback } from "use-debounce"

import { ToastAction } from "@/components/ui/toast"
import {
  getInboxItemPageRoute,
  getInboxPageRoute,
} from "@/features/routes/utils"
import { Logger } from "@/features/telemetry/logger"
import { useToast } from "@/features/toasts/use-toast"
import {
  VeridaInboxContext,
  type VeridaInboxContextType,
} from "@/features/verida-inbox/contexts/verida-inbox-context"
import { useInboxMessageItemIdState } from "@/features/verida-inbox/hooks/use-inbox-message-item-id-state"
import { VeridaInboxQueryKeys } from "@/features/verida-inbox/queries"
import { VeridaInboxMessageRecordSchema } from "@/features/verida-inbox/schemas"
import type { VeridaMessagingEngineStatus } from "@/features/verida-inbox/types"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-inbox")

export interface VeridaInboxProviderProps {
  children: ReactNode
}

export function VeridaInboxProvider(props: VeridaInboxProviderProps) {
  const { children } = props

  const { toast } = useToast()

  const { context } = useVerida()

  const queryClient = useQueryClient()

  const [messagingEngineStatus, setMessagingEngineStatus] =
    useState<VeridaMessagingEngineStatus>("idle")
  const [messagingEngine, setMessagingEngine] = useState<IMessaging | null>(
    null
  )

  const newMessageHandler = useDebouncedCallback(
    async (rawNewMessage: unknown) => {
      const validatedNewMessage =
        VeridaInboxMessageRecordSchema.safeParse(rawNewMessage)

      if (!validatedNewMessage.success) {
        logger.warn("Invalid new message received")
        return
      }

      queryClient.invalidateQueries({
        queryKey: VeridaInboxQueryKeys.invalidateInbox(),
      })

      toast({
        variant: "info",
        title: "New message",
        description:
          validatedNewMessage.data.message || "You have a new message",
        action: (
          <NewMessageToastAction messageId={validatedNewMessage.data._id} />
        ),
      })
    },
    1000 // 1 second
  )

  useEffect(() => {
    const init = async () => {
      if (!context) {
        setMessagingEngineStatus("idle")
        setMessagingEngine(null)
        return
      }
      setMessagingEngineStatus("loading")

      try {
        const _messagingEngine = await context.getMessaging()

        setMessagingEngine(_messagingEngine)
        setMessagingEngineStatus("ready")

        _messagingEngine.onMessage(newMessageHandler)
      } catch (error) {
        setMessagingEngineStatus("error")
        setMessagingEngine(null)
        logger.error(error)
      }
    }

    init().catch(logger.error)

    return () => {
      messagingEngine?.offMessage(newMessageHandler)
    }
  }, [context, newMessageHandler, messagingEngine])

  const contextValue: VeridaInboxContextType = useMemo(
    () => ({
      messagingEngineStatus,
      messagingEngine,
    }),
    [messagingEngineStatus, messagingEngine]
  )

  return (
    <VeridaInboxContext.Provider value={contextValue}>
      {children}
    </VeridaInboxContext.Provider>
  )
}
VeridaInboxProvider.displayName = "VeridaInboxProvider"

interface NewMessageToastActionProps {
  messageId: string
}

function NewMessageToastAction(props: NewMessageToastActionProps) {
  const { messageId } = props

  const router = useRouter()
  const pathname = usePathname()
  const { setItemId } = useInboxMessageItemIdState()

  const handleClick = useCallback(() => {
    if (pathname === getInboxPageRoute()) {
      setItemId(messageId)
    } else {
      router.push(getInboxItemPageRoute({ messageId }))
    }
  }, [messageId, router, setItemId, pathname])

  return (
    <ToastAction altText="Open" onClick={handleClick}>
      Open
    </ToastAction>
  )
}
NewMessageToastAction.displayName = "NewMessageToastAction"
