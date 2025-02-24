import Link from "next/link"
import { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/styles/utils"

export interface OnboardingCardProps extends ComponentProps<typeof Card> {}

export function OnboardingCard(props: OnboardingCardProps) {
  const { children, ...cardProps } = props

  return <Card {...cardProps}>{children}</Card>
}
OnboardingCard.displayName = "OnboardingCard"

export interface OnboardingCardHeaderProps
  extends Omit<ComponentProps<typeof CardHeader>, "children"> {
  title: string
  description: string
}

export function OnboardingCardHeader(props: OnboardingCardHeaderProps) {
  const { title, description, ...cardHeaderProps } = props

  return (
    <CardHeader {...cardHeaderProps}>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  )
}
OnboardingCardHeader.displayName = "OnboardingCardHeader"

export interface OnboardingCardBodyProps
  extends ComponentProps<typeof CardBody> {}

export function OnboardingCardBody(props: OnboardingCardBodyProps) {
  const { children, ...cardBodyProps } = props

  return <CardBody {...cardBodyProps}>{children}</CardBody>
}
OnboardingCardBody.displayName = "OnboardingCardBody"

export interface OnboardingCardFooterProps
  extends Omit<ComponentProps<typeof CardFooter>, "children"> {
  nextStepPath?: string
  nextStepLabel?: string
  backStepPath?: string
  backStepLabel?: string
}

export function OnboardingCardFooter(props: OnboardingCardFooterProps) {
  const {
    nextStepPath,
    nextStepLabel,
    backStepPath,
    backStepLabel,
    className,
    ...cardFooterProps
  } = props

  return (
    <CardFooter
      className={cn("flex flex-row-reverse justify-between", className)}
      {...cardFooterProps}
    >
      {nextStepPath && (
        <Button asChild className="w-fit">
          <Link href={nextStepPath}>{nextStepLabel}</Link>
        </Button>
      )}
      {backStepPath && (
        <Button variant="outline" asChild className="w-fit">
          <Link href={backStepPath}>{backStepLabel}</Link>
        </Button>
      )}
    </CardFooter>
  )
}
OnboardingCardFooter.displayName = "OnboardingCardFooter"
