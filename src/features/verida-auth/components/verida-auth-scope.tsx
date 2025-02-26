import { Fragment } from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { VeridaAuthScope as VeridaAuthScopeType } from "@/features/verida-auth/types"
import { cn } from "@/styles/utils"

export interface VeridaAuthScopeProps {
  scope: VeridaAuthScopeType
}

export function VeridaAuthScope(props: VeridaAuthScopeProps) {
  const { scope } = props

  switch (scope.type) {
    case "data":
      return <VeridaAuthDataScope scope={scope} />
    case "api":
      return <VeridaAuthApiScope scope={scope} />
    default:
      return <VeridaAuthUnknownScope scope={scope} />
  }
}
VeridaAuthScope.displayName = "VeridaAuthScope"

interface VeridaAuthDataScopeProps {
  scope: VeridaAuthScopeType
}

function VeridaAuthDataScope(props: VeridaAuthDataScopeProps) {
  const { scope } = props

  return (
    <>
      {scope.permissions?.map((permission, index, array) => {
        const separator =
          array.length <= 1
            ? ""
            : index === array.length - 1
              ? ""
              : index === array.length - 2
                ? " and "
                : ", "

        return (
          <Fragment key={index}>
            <span
              className={cn("font-semibold", index === 0 ? "capitalize" : "")}
            >
              {permission}
            </span>
            {separator}
          </Fragment>
        )
      })}{" "}
      in your{" "}
      {scope.description ? (
        <Tooltip>
          <TooltipTrigger>
            <span className="font-semibold lowercase">
              {scope.namePlural || scope.name || ""}
            </span>
          </TooltipTrigger>
          <TooltipContent>{scope.description}</TooltipContent>
        </Tooltip>
      ) : (
        <span className="font-semibold lowercase">
          {scope.namePlural || scope.name || ""}
        </span>
      )}{" "}
      database
    </>
  )
}
VeridaAuthDataScope.displayName = "VeridaAuthDataScope"

interface VeridaAuthApiScopeProps {
  scope: VeridaAuthScopeType
}

function VeridaAuthApiScope(props: VeridaAuthApiScopeProps) {
  const { scope } = props

  return <>{scope.description}</>
}
VeridaAuthApiScope.displayName = "VeridaAuthApiScope"

interface VeridaAuthUnknownScopeProps {
  scope: VeridaAuthScopeType
}

function VeridaAuthUnknownScope(props: VeridaAuthUnknownScopeProps) {
  const { scope } = props

  return (
    <>
      <span className="font-semibold">{scope.permissions?.join(", ")}</span>{" "}
      your <span className="font-semibold">{scope.name}</span>(
      {scope.description})
    </>
  )
}
VeridaAuthUnknownScope.displayName = "VeridaAuthUnknownScope"
