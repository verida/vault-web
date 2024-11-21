"use client"

import { useCallback } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { useToast } from "@/features/toasts/use-toast"

export type AssistantOutputCardMenuProps = {
  children: React.ReactNode
}

export function AssistantOutputCardMenu(props: AssistantOutputCardMenuProps) {
  const { children } = props

  const { toast } = useToast()

  const {
    aiAssistantOutput: assistantOutput,
    clearAiAssistantOutput: clearAssistantOutput,
  } = useAssistants()

  const handleCopyAssistantOutput = useCallback(async () => {
    if (assistantOutput?.result) {
      await window.navigator.clipboard.writeText(assistantOutput.result)
      toast({
        variant: "success",
        description: "Assistant response copied to clipboard",
      })
    }
  }, [assistantOutput, toast])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" collisionPadding={8}>
        <DropdownMenuItem
          onClick={handleCopyAssistantOutput}
          disabled={!assistantOutput?.result}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={clearAssistantOutput}
          className="text-destructive"
        >
          Clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
AssistantOutputCardMenu.displayName = "AssistantOutputCardMenu"
