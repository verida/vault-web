import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function AppsListSkeleton() {
  const placeholders = Array.from({ length: 8 }, (_, i) => i)

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {placeholders.map((index) => (
        <li key={index}>
          <Card>
            <CardHeader>
              <Skeleton className="h-12 w-12 rounded-full" />
            </CardHeader>
            <CardBody className="flex flex-col gap-2">
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </CardBody>
            <CardFooter>
              <Skeleton className="h-12 w-full rounded-md" />
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  )
}
AppsListSkeleton.displayName = "AppsListSkeleton"
