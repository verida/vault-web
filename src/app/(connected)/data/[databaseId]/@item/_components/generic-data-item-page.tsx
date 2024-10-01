import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { VeridaRecord } from "@/features/verida-database"

export type GenericDataItemPageTitleProps = {
  record: VeridaRecord
  // TODO: Add schema to the props to use it to render the title
}

export function GenericDataItemPageTitle(props: GenericDataItemPageTitleProps) {
  const { record } = props

  return <div>{record.name}</div>
}
GenericDataItemPageTitle.displayName = "GenericDataItemPageTitle"

export type GenericDataItemPageBodyProps = {
  record: VeridaRecord
  // TODO: Add schema to the props to use it to render the body
}

export function GenericDataItemPageBody(props: GenericDataItemPageBodyProps) {
  const { record } = props

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(record).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-1">
          <div className="text-muted-foreground">
            <Typography variant="base-semibold">{key}</Typography>
          </div>
          <Typography variant="base-regular">
            {JSON.stringify(value)}
          </Typography>
        </div>
      ))}
    </div>
  )
}
GenericDataItemPageBody.displayName = "GenericDataItemPageBody"

export type GenericDataItemPageFooterProps = {
  record: VeridaRecord
  // TODO: Add schema to the props to use it to render the footer
  onClose: () => void
}

export function GenericDataItemPageFooter(
  props: GenericDataItemPageFooterProps
) {
  const { onClose } = props

  return (
    <Button variant="outline" className="w-full" onClick={onClose}>
      Close
    </Button>
  )
}
GenericDataItemPageFooter.displayName = "GenericDataItemPageFooter"
