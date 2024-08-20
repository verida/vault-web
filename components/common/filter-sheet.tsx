import { CloseSideRight } from "../icons/close-side-right"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"

interface FilterSheetProps extends React.PropsWithChildren {
  open: boolean
  onClose: () => void
  className?: string
}

const FilterSheet: React.FC<FilterSheetProps> = (props) => {
  const { open, onClose, children, className } = props
  return (
    <Drawer direction="right" open={open} onClose={onClose}>
      <DrawerTrigger />
      <DrawerContent
        onClose={onClose}
        className="w-[356px] border-l border-border shadow-sm md:bottom-0 md:right-0 md:h-[calc(100%-72px)] md:rounded-none"
        overlayClassName="bg-transparent"
      >
        {children}
      </DrawerContent>
    </Drawer>
  )
}

interface FilterSheetHeaderProps {
  title: string
  onClose: () => void
}

const FilterSheetHeader: React.FC<FilterSheetHeaderProps> = (props) => {
  const { title, onClose } = props
  return (
    <DrawerHeader className="gap-4 px-6 py-4 text-left">
      <div className="flex w-full items-center justify-between">
        <DrawerTitle>{title}</DrawerTitle>
        <CloseSideRight className="cursor-pointer" onClick={onClose} />
      </div>
    </DrawerHeader>
  )
}

interface FilterSheetBodyProps extends React.PropsWithChildren {}

const FilterSheetBody: React.FC<FilterSheetBodyProps> = (props) => {
  return <DrawerBody className="p-4">{props.children}</DrawerBody>
}

interface FilterSheetFooterProps extends React.PropsWithChildren {}

const FilterSheetFooter: React.FC<FilterSheetFooterProps> = (props) => {
  return <DrawerFooter className="p-4">{props.children}</DrawerFooter>
}

export { FilterSheet, FilterSheetHeader, FilterSheetBody, FilterSheetFooter }
