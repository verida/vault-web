import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { ComponentProps } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"
import { MarketplaceApp } from "@/features/apps-marketplace/types"
import { cn } from "@/styles/utils"

export interface AppCardProps extends ComponentProps<typeof Card> {
  app: MarketplaceApp
}

export function AppCard(props: AppCardProps) {
  const { app, className, ...cardProps } = props

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        className
      )}
      {...cardProps}
    >
      <CardHeader className="flex-row items-center justify-between gap-4">
        <Avatar className="border-0">
          <AvatarImage
            src={app.logoUrl}
            alt={`${app.label} logo`}
            className="object-cover"
          />
          <AvatarFallback className="bg-transparent" />
        </Avatar>
        {app.isFeatured ? (
          <Badge variant="primary-inverse">Featured</Badge>
        ) : null}
      </CardHeader>
      <CardBody className="flex flex-1 flex-col gap-2">
        <CardTitle component="p">{app.label}</CardTitle>
        <CardDescription wrapperClassName="flex-1" className="line-clamp-6">
          {app.description}
        </CardDescription>
        {app.categories && app.categories.length > 0 ? (
          <ul className="flex flex-row flex-wrap gap-2">
            {app.categories.map((category) => (
              <li key={category}>
                <Badge variant="secondary">
                  <Typography variant="base-s-regular">{category}</Typography>
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </CardBody>
      {app.url ? (
        <CardFooter>
          <Button variant="primary" asChild className="w-full">
            <Link
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center justify-center gap-2"
            >
              Visit Website
              <ExternalLink className="size-4" />
            </Link>
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}
AppCard.displayName = "AppCard"
