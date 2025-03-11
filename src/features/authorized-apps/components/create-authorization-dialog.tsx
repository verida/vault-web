"use client"

import { type ReactNode, useCallback, useMemo, useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { Label } from "@/components/ui/label"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import {
  MessageBlock,
  MessageBlockBody,
  MessageBlockTitle,
} from "@/components/ui/message-block"
import { Typography } from "@/components/ui/typography"
import { useToast } from "@/features/toasts/use-toast"
import { useCreateVeridaAuthToken } from "@/features/verida-auth/hooks/use-create-verida-auth-token"
import { useVeridaAuthScopeDefinitions } from "@/features/verida-auth/hooks/use-verida-auth-scope-definitions"
import type { VeridaAuthScope } from "@/features/verida-auth/types"

export interface CreateAuthorizationDialogProps {
  children?: ReactNode
  onSuccess?: () => void
}

type DialogState = "select-scopes" | "display-token"

export function CreateAuthorizationDialog(
  props: CreateAuthorizationDialogProps
) {
  const { children, onSuccess } = props
  const [open, setOpen] = useState(false)
  const [dialogState, setDialogState] = useState<DialogState>("select-scopes")
  const [selectedScopes, setSelectedScopes] = useState<string[]>([])
  const [createdToken, setCreatedToken] = useState<string>("")
  const { toast } = useToast()

  const { scopeDefinitions, isLoading: isLoadingScopes } =
    useVeridaAuthScopeDefinitions()

  const { createAuthToken, isPending: isCreating } = useCreateVeridaAuthToken()

  const apiScopes = useMemo(() => {
    return scopeDefinitions?.filter((scope) => scope.type === "api") ?? []
  }, [scopeDefinitions])

  const dataScopes = useMemo(() => {
    return scopeDefinitions?.filter((scope) => scope.type === "data") ?? []
  }, [scopeDefinitions])

  const handleToggleScope = useCallback((scopeId: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scopeId)
        ? prev.filter((id) => id !== scopeId)
        : [...prev, scopeId]
    )
  }, [])

  const handleCreateToken = useCallback(() => {
    if (selectedScopes.length === 0) {
      toast({
        title: "No scopes selected",
        description:
          "Please select at least one scope to create an authorization token.",
        variant: "error",
      })
      return
    }

    createAuthToken(
      { scopes: selectedScopes },
      {
        onSuccess: (result) => {
          toast({
            title: "Authorization created",
            description:
              "The authorization token has been successfully created.",
            variant: "success",
          })

          // Store the token and change dialog state
          setCreatedToken(result.tokenString)
          setDialogState("display-token")

          if (onSuccess) {
            onSuccess()
          }
        },
        onError: (err) => {
          toast({
            title: "Failed to create authorization",
            description:
              err.message ||
              "An error occurred while creating the authorization token.",
            variant: "error",
          })
        },
      }
    )
  }, [createAuthToken, onSuccess, selectedScopes, toast])

  const handleCopyToken = useCallback(() => {
    navigator.clipboard.writeText(createdToken)
    toast({
      title: "Token copied",
      description: "The authorization token has been copied to your clipboard.",
      variant: "success",
    })
  }, [createdToken, toast])

  const handleClose = useCallback(() => {
    setOpen(false)
    // Reset state after dialog is closed
    setTimeout(() => {
      setDialogState("select-scopes")
      setSelectedScopes([])
      setCreatedToken("")
    }, 300) // Wait for dialog close animation
  }, [])

  // Custom handler for dialog open change to prevent closing in token display state
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      // If trying to close the dialog and we're in the token display state, prevent closing
      if (!newOpen && dialogState === "display-token") {
        // Optionally show a toast to inform the user they need to use the Done button
        toast({
          title: "Important",
          description:
            "Please copy your token and click 'Done' to close this dialog.",
          variant: "warning",
        })
        return
      }

      // Otherwise, allow the dialog to open/close normally
      setOpen(newOpen)
    },
    [dialogState, toast]
  )

  const isCreateButtonDisabled = useMemo(
    () => isCreating || selectedScopes.length === 0,
    [isCreating, selectedScopes.length]
  )

  const renderScopeItem = useCallback(
    (scope: VeridaAuthScope) => (
      <div className="flex flex-row items-start gap-2">
        <Checkbox
          id={`scope-${scope.id}`}
          checked={selectedScopes.includes(scope.id || "")}
          onCheckedChange={() => handleToggleScope(scope.id || "")}
          disabled={isCreating}
        />
        <Label htmlFor={`scope-${scope.id}`}>
          <Typography variant="base-regular" component="span">
            {scope.description || scope.id}
          </Typography>
        </Label>
      </div>
    ),
    [handleToggleScope, isCreating, selectedScopes]
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children}
      <DialogContent
        onEscapeKeyDown={(e) =>
          dialogState === "display-token" && e.preventDefault()
        }
      >
        <DialogHeader>
          <DialogTitle>
            {dialogState === "select-scopes"
              ? "Create Authorization"
              : "Authorization Token Created"}
          </DialogTitle>
          <DialogDescription>
            {dialogState === "select-scopes"
              ? "Generate a new authorization token to access your data."
              : "This is your new authorization token. Save it securely."}
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          {dialogState === "select-scopes" ? (
            <div className="flex flex-col gap-4">
              <Typography variant="base-regular">
                Select the permissions you want to authorize for this new
                application
              </Typography>
              {scopeDefinitions ? (
                <>
                  {apiScopes.length === 0 && dataScopes.length === 0 ? (
                    <ErrorBlock>
                      <ErrorBlockImage />
                      <ErrorBlockTitle>Error</ErrorBlockTitle>
                      <ErrorBlockDescription>
                        There is no available permissions at the moment. Please
                        check back later.
                      </ErrorBlockDescription>
                    </ErrorBlock>
                  ) : (
                    <Accordion
                      type="multiple"
                      defaultValue={["data-scopes", "api-scopes"]}
                      className="w-full"
                    >
                      {apiScopes.length > 0 ? (
                        <AccordionItem value="api-scopes">
                          <AccordionTrigger>
                            <Typography variant="base-semibold">
                              Operations
                            </Typography>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-3 pt-2">
                            <ul className="flex flex-col gap-3">
                              {apiScopes.map((scope) => (
                                <li key={scope.id}>{renderScopeItem(scope)}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ) : null}
                      {dataScopes.length > 0 ? (
                        <AccordionItem value="data-scopes">
                          <AccordionTrigger>
                            <Typography variant="base-semibold">
                              Data
                            </Typography>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-3 pt-2">
                            <ul className="flex flex-col gap-3">
                              {dataScopes.map((scope) => (
                                <li key={scope.id}>{renderScopeItem(scope)}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ) : null}
                    </Accordion>
                  )}
                </>
              ) : isLoadingScopes ? (
                <LoadingBlock>
                  <LoadingBlockSpinner />
                  <LoadingBlockTitle>Loading</LoadingBlockTitle>
                  <LoadingBlockDescription>
                    Loading available permissions...
                  </LoadingBlockDescription>
                </LoadingBlock>
              ) : (
                <ErrorBlock>
                  <ErrorBlockImage />
                  <ErrorBlockTitle>Error</ErrorBlockTitle>
                  <ErrorBlockDescription>
                    There was an error loading the available permissions. Please
                    try again later.
                  </ErrorBlockDescription>
                </ErrorBlock>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Typography variant="base-regular">
                Use this token to authenticate API requests or applications that
                need to access your data. The token has been granted the
                permissions you selected.
              </Typography>
              <MessageBlock>
                <MessageBlockTitle>Authorization Token</MessageBlockTitle>
                <MessageBlockBody>
                  <Typography
                    variant="base-regular"
                    component="span"
                    className="break-words"
                  >
                    {createdToken}
                  </Typography>
                </MessageBlockBody>
                <Button
                  variant="outline"
                  onClick={handleCopyToken}
                  title="Copy to clipboard"
                >
                  <Typography variant="base-regular" component="span">
                    Copy
                  </Typography>
                </Button>
              </MessageBlock>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="flex flex-col gap-4 sm:flex-col">
          {dialogState === "display-token" ? (
            <Alert variant="warning">
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                This is the only time you will see this token. Please copy it
                and store it securely. You won&apos;t be able to retrieve it
                later.
              </AlertDescription>
            </Alert>
          ) : null}
          <div className="flex flex-row items-center justify-end gap-2">
            {dialogState === "select-scopes" ? (
              <>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isCreating}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleCreateToken}
                  disabled={isCreateButtonDisabled}
                >
                  {isCreating ? "Creating..." : "Create Authorization"}
                </Button>
              </>
            ) : (
              <Button onClick={handleClose}>Done</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
CreateAuthorizationDialog.displayName = "CreateAuthorizationDialog"

export const CreateAuthorizationDialogTrigger = DialogTrigger
