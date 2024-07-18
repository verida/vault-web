import { cn } from "@/lib/utils";

import { CloseSideRight } from "../icons/close-side-right";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

interface ModalSheetProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

const ModalSheet: React.FC<ModalSheetProps> = (props) => {
  const { open, onClose, children } = props;

  return (
    <Drawer direction="right" open={open} onClose={onClose}>
      <DrawerTrigger />
      <DrawerContent onClose={onClose}>{children}</DrawerContent>
    </Drawer>
  );
};

interface ModalSheetHeaderProps {
  title: string;
  actions: React.ReactNode;
  onClose: () => void;
}

const ModalSheetHeader: React.FC<ModalSheetHeaderProps> = (props) => {
  const { title, actions, onClose } = props;
  return (
    <DrawerHeader className="gap-4 px-6 py-4 text-left">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-3">
          <CloseSideRight className="cursor-pointer" onClick={onClose} />
          <DrawerTitle className="hidden md:block">{title}</DrawerTitle>
        </div>
        {actions}
      </div>
      <DrawerTitle className="block md:hidden">{title}</DrawerTitle>
    </DrawerHeader>
  );
};

interface ModalSheetBodyProps extends React.PropsWithChildren {
  className?: string;
}

const ModalSheetBody: React.FC<ModalSheetBodyProps> = ({
  className,
  children,
}) => {
  return (
    <DrawerBody className={cn("flex flex-grow flex-col p-6", className)}>
      {children}
    </DrawerBody>
  );
};

interface ModalSheetFooterProps extends React.PropsWithChildren {}

const ModalSheetFooter: React.FC<ModalSheetFooterProps> = (props) => {
  return <DrawerFooter className="p-6">{props.children}</DrawerFooter>;
};

export { ModalSheet, ModalSheetHeader, ModalSheetBody, ModalSheetFooter };
