"use client"

import { type ReactNode, useCallback, useMemo, useState } from "react"

import { featureFlags } from "@/config/features"
import { ManageAiPromptConfigDialog } from "@/features/assistants/components/manage-ai-prompt-config-dialog"
import {
  AiPromptConfigDialogContext,
  type AiPromptConfigDialogContextType,
  type AiPromptConfigDialogState,
} from "@/features/assistants/contexts/ai-prompt-config-dialog-context"

export interface AiPromptConfigDialogProviderProps {
  children: ReactNode
}

export function AiPromptConfigDialogProvider(
  props: AiPromptConfigDialogProviderProps
) {
  const { children } = props

  const [dialogState, setDialogState] = useState<AiPromptConfigDialogState>({
    isOpen: false,
  })

  const openDialog = useCallback(() => {
    setDialogState((prev) => ({ ...prev, isOpen: true }))
  }, [])
  const closeDialog = useCallback(() => {
    setDialogState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const value: AiPromptConfigDialogContextType = useMemo(
    () => ({
      dialogState,
      openDialog,
      closeDialog,
    }),
    [dialogState, openDialog, closeDialog]
  )

  return (
    <AiPromptConfigDialogContext.Provider value={value}>
      {children}
      {featureFlags.assistant.config.enabled ? (
        <ManageAiPromptConfigDialog
          open={dialogState.isOpen}
          onOpenChange={(open) => !open && closeDialog()}
        />
      ) : null}
    </AiPromptConfigDialogContext.Provider>
  )
}
AiPromptConfigDialogProvider.displayName = "AiPromptConfigDialogProvider"
