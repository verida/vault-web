"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { useCreateAssistantPrompt } from "@/features/assistants/hooks/use-create-assistant-prompt"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("assistants")

const newPromptSchema = z.object({
  name: z.string().min(1, "Label is required"),
  prompt: z.string().min(1, "Prompt is required"),
})

export type AssistantSavePromptDialogProps = {
  children: React.ReactNode
}

export function AssistantSavePromptDialog(
  props: AssistantSavePromptDialogProps
) {
  const { children } = props

  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { userInput } = useAssistants()
  const { createAssistantPrompt } = useCreateAssistantPrompt()

  const form = useForm<z.infer<typeof newPromptSchema>>({
    resolver: zodResolver(newPromptSchema),
    defaultValues: {
      name: "",
      prompt: userInput?.prompt ?? "",
    },
  })

  const handleSubmit = useCallback(
    async (data: z.infer<typeof newPromptSchema>) => {
      setIsSubmitting(true)
      try {
        await createAssistantPrompt({
          name: data.name,
          data: {
            prompt: data.prompt,
          },
        })
        setModalOpen(false)
      } catch (error) {
        logger.error(error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [createAssistantPrompt]
  )

  useEffect(() => {
    form.setValue("prompt", userInput?.prompt ?? "")
  }, [form, userInput])

  useEffect(() => {
    if (!modalOpen) {
      form.clearErrors()
      form.resetField("name")
    }
  }, [form, modalOpen])

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild onClick={() => setModalOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Save</DialogTitle>
              <DialogDescription>
                Save your prompt to reuse it later
              </DialogDescription>
            </DialogHeader>
            <DialogBody className="flex flex-col gap-6 px-0.5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      A short label describing this prompt
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prompt"
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
              />
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
AssistantSavePromptDialog.displayName = "AssistantSavePromptDialog"
