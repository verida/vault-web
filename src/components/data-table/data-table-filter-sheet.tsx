import {
  StandardSheet,
  StandardSheetBody,
  StandardSheetClose,
  StandardSheetContent,
  StandardSheetFooter,
  StandardSheetHeader,
  StandardSheetTitle,
  StandardSheetTrigger,
} from "@/components/standard-sheet"
import { Button } from "@/components/ui/button"

type DataTableFilterSheetProps = {
  children: React.ReactNode
}

// TODO: To implement
export function DataTableFilterSheet(props: DataTableFilterSheetProps) {
  const { children } = props

  return (
    <StandardSheet>
      <StandardSheetTrigger asChild>{children}</StandardSheetTrigger>
      <StandardSheetContent>
        <StandardSheetHeader>
          <StandardSheetTitle description="Filter your data">
            Filters
          </StandardSheetTitle>
        </StandardSheetHeader>
        <StandardSheetBody>
          <div>
            <p>Some data filters</p>
          </div>
        </StandardSheetBody>
        <StandardSheetFooter>
          <Button asChild className="w-full">
            <StandardSheetClose>Apply</StandardSheetClose>
          </Button>
        </StandardSheetFooter>
      </StandardSheetContent>
    </StandardSheet>
  )
}
DataTableFilterSheet.displayName = "DataTableFilterSheet"
