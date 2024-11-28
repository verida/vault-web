"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { commonConfig } from "@/config/common"
import { LLM_MODEL_DEFS } from "@/features/assistants/constants"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { PromptConfigFormDataSchema } from "@/features/assistants/schemas"
import { PromptConfigFormData } from "@/features/assistants/types"
import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("assistants")

export type ManageAiPromptConfigDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ManageAiPromptConfigDialog(
  props: ManageAiPromptConfigDialogProps
) {
  const { open, onOpenChange } = props

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { aiPromptInput, updateAiPromptInput } = useAssistants()

  const form = useForm<PromptConfigFormData>({
    resolver: zodResolver(PromptConfigFormDataSchema),
    defaultValues: {
      llmModel:
        aiPromptInput?.config?.llmModel ?? commonConfig.DEFAULT_AI_MODEL,
    },
  })

  const handleSubmit = useCallback(
    async (data: PromptConfigFormData) => {
      setIsSubmitting(true)
      try {
        updateAiPromptInput((prevInput) => ({
          ...prevInput,
          config: {
            ...prevInput?.config,
            llmModel: data.llmModel,
          },
        }))
        onOpenChange(false)

        // TODO: Display a toast notification
      } catch (error) {
        logger.error(error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [updateAiPromptInput, onOpenChange]
  )

  useEffect(() => {
    form.setValue(
      "llmModel",
      aiPromptInput?.config?.llmModel ?? commonConfig.DEFAULT_AI_MODEL
    )
  }, [form, aiPromptInput])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Configuration</DialogTitle>
              <DialogDescription>
                Fine-tune the configuration of your prompt
              </DialogDescription>
            </DialogHeader>
            <DialogBody className="flex flex-col gap-6 px-0.5">
              <FormField
                control={form.control}
                name="llmModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Model</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an AI model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(LLM_MODEL_DEFS).map((modelDef) => (
                          <SelectItem
                            key={modelDef.model}
                            value={modelDef.model}
                          >
                            {commonConfig.DEFAULT_AI_MODEL === modelDef.model
                              ? `${modelDef.label} (default)`
                              : modelDef.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The AI model to use</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="promptConfigString"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="true"
                        className="max-h-32 min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your message sent to the assistant
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </DialogBody>
            <DialogFooter>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
ManageAiPromptConfigDialog.displayName = "ManageAiPromptConfigDialog"
