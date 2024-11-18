"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import { Logger } from "@/features/telemetry"

const logger = Logger.create("assistants")

const newPromptSchema = z.object({
  name: z.string().min(1, "Label is required"),
  prompt: z.string().min(1, "Prompt is required"),
})

export type PromptFormData = z.infer<typeof newPromptSchema>

export type AssistantManagePromptDialogProps = {
  children: React.ReactNode
  type: "save" | "edit"
  initialData: Partial<PromptFormData>
  onSubmit: (data: PromptFormData) => Promise<void>
  onDelete?: () => Promise<void>
}

export function AssistantManagePromptDialog(
  props: AssistantManagePromptDialogProps
) {
  const { type, initialData, onSubmit, onDelete, children } = props

  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PromptFormData>({
    resolver: zodResolver(newPromptSchema),
    defaultValues: {
      name: initialData.name ?? "",
      prompt: initialData.prompt ?? "",
    },
  })

  const handleSubmit = useCallback(
    async (data: PromptFormData) => {
      setIsSubmitting(true)
      try {
        await onSubmit(data)
        setModalOpen(false)
      } catch (error) {
        logger.error(error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSubmit]
  )

  const handleDelete = useCallback(async () => {
    setIsSubmitting(true)
    try {
      await onDelete?.()
      setModalOpen(false)
    } catch (error) {
      logger.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }, [onDelete])

  useEffect(() => {
    form.setValue("prompt", initialData?.prompt ?? "")
  }, [form, initialData.prompt])

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
              <DialogTitle>{type === "save" ? "Save" : "Edit"}</DialogTitle>
              <DialogDescription>
                {type === "save"
                  ? "Save your prompt to reuse it later"
                  : "Edit your prompt"}
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
            <DialogFooter className="sm:justify-between">
              {type === "edit" && onDelete ? (
                <DeletePromptDialog
                  onDelete={handleDelete}
                  isProcessing={isSubmitting}
                >
                  <Button variant="outline-destructive" disabled={isSubmitting}>
                    Delete
                  </Button>
                </DeletePromptDialog>
              ) : null}
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
AssistantManagePromptDialog.displayName = "AssistantManagePromptDialog"

type DeletePromptDialogProps = {
  children: React.ReactNode
  onDelete: () => Promise<void>
  isProcessing: boolean
}

function DeletePromptDialog(props: DeletePromptDialogProps) {
  const { children, onDelete, isProcessing } = props

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Prompt</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <AlertDialogDescription>
            Are you sure you want to delete this prompt?
          </AlertDialogDescription>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isProcessing}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
DeletePromptDialog.displayName = "DeletePromptDialog"
