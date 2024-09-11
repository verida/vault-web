"use client"

import { AlertErrorIcon } from "@/components/icons/alert-error-icon"
import { AlertInfoIcon } from "@/components/icons/alert-info-icon"
import { AlertSuccessIcon } from "@/components/icons/alert-success-icon"
import { AlertWarningIcon } from "@/components/icons/alert-warning-icon"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/features/toasts"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex flex-row items-center gap-3">
              {variant === "info" ? (
                <AlertInfoIcon className="size-6 shrink-0" />
              ) : null}
              {variant === "success" ? (
                <AlertSuccessIcon className="size-6 shrink-0" />
              ) : null}
              {variant === "warning" ? (
                <AlertWarningIcon className="size-6 shrink-0" />
              ) : null}
              {variant === "error" ? (
                <AlertErrorIcon className="size-6 shrink-0" />
              ) : null}
              <div className="flex flex-1 flex-col gap-1">
                {title ? <ToastTitle>{title}</ToastTitle> : null}
                {description ? (
                  <ToastDescription>{description}</ToastDescription>
                ) : null}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
