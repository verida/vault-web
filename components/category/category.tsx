import { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import Link from "next/link"

type CategoryProps = {
  icon?: ReactNode
  title?: string
  description: string
  href?: string
}

function Category({ icon, title, description, href }: CategoryProps) {
  return (
    <Link href={href || '#'}>
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          {icon && icon}
          {title && <h3 className="text-2xl mt-6">{title}</h3>}
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}

export { Category }