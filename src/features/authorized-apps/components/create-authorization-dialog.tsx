"use client"

import { ReactNode, useCallback, useMemo, useState } from "react"

import { Typography } from "@/components/typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import { useToast } from "@/features/toasts/use-toast"
import { useCreateVeridaAuthToken } from "@/features/verida-auth/hooks/use-create-verida-auth-token"
import { useVeridaAuthScopeDefinitions } from "@/features/verida-auth/hooks/use-verida-auth-scope-definitions"
import { VeridaAuthScope } from "@/features/verida-auth/types"

export interface CreateAuthorizationDialogProps {
  children?: ReactNode
  onSuccess?: () => void
}

export function CreateAuthorizationDialog(
  props: CreateAuthorizationDialogProps
) {
  const { children, onSuccess } = props
  const [open, setOpen] = useState(false)
  const [selectedScopes, setSelectedScopes] = useState<string[]>([])
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
        onSuccess: () => {
          toast({
            title: "Authorization created",
            description:
              "The authorization token has been successfully created.",
            variant: "success",
          })
          setSelectedScopes([])
          setOpen(false)
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
  }, [createAuthToken, onSuccess, selectedScopes, setOpen, toast])

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
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Authorization</DialogTitle>
          <DialogDescription>
            Generate a new authorization token to access your data.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Typography variant="base-regular">
            Select the permissions you want to authorize for this new
            application
          </Typography>
          {scopeDefinitions ? (
            <>
              {apiScopes.length === 0 && dataScopes.length === 0 ? (
                <Typography variant="base-regular">
                  No permissions available.
                </Typography>
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
                        <Typography variant="base-semibold">Data</Typography>
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
                There was an error loading the available permissions. Please try
                again later.
              </ErrorBlockDescription>
            </ErrorBlock>
          )}
        </DialogBody>
        <DialogFooter className="flex flex-row items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isCreating}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleCreateToken} disabled={isCreateButtonDisabled}>
            {isCreating ? "Creating..." : "Create Authorization"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
CreateAuthorizationDialog.displayName = "CreateAuthorizationDialog"

export const CreateAuthorizationDialogTrigger = DialogTrigger
