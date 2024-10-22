"use client"

import { StatusErrorIcon } from "@/components/icons/status-error-icon"
import { StatusInfoIcon } from "@/components/icons/status-info-icon"
import { StatusSuccessIcon } from "@/components/icons/status-success-icon"
import { StatusWarningIcon } from "@/components/icons/status-warning-icon"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/features/toasts/use-toast"

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
                <StatusInfoIcon className="size-6 shrink-0" />
              ) : null}
              {variant === "success" ? (
                <StatusSuccessIcon className="size-6 shrink-0" />
              ) : null}
              {variant === "warning" ? (
                <StatusWarningIcon className="size-6 shrink-0" />
              ) : null}
              {variant === "error" ? (
                <StatusErrorIcon className="size-6 shrink-0" />
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
