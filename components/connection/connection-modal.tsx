import { Connection, connections } from "@/features/connections";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { VLogo } from "../icons/logo";
import { Switch } from "../icons/switch";
import { useMemo } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  connectionId: string;
} & React.PropsWithChildren;

function ConnectionModal({ connectionId, ...props }: Props) {
  const connection = useMemo(() => {
    return connections.find((c) => c.id === connectionId);
  }, [connectionId]);

  return (
    <Modal {...props}>
      {connection && (
        <div className='flex space-x-6 mx-auto items-center'>
          {connection.icon && <connection.icon className='w-20 h-20' />}
          <Switch />
          <VLogo className='border border-[#e0e3ea] rounded-full' />
        </div>
      )}

      <h4 className='font-semibold text-sm mt-8'>What it will do</h4>

      {connection && (
        <p className='text-sm leading-5 mt-4'>
          When you connect {connection.id} and Verida, your {connection.id}{" "}
          activities will automatically show up on Verida for all your friends
          to see. Additionally, {connection.item} and content shared via{" "}
          {connection.id} will automatically contribute to your Verida all-day
          stats like mentions and engagement.
        </p>
      )}

      <Button variant='outline' className='w-full mt-8'>
        Connect
      </Button>
    </Modal>
  );
}

export { ConnectionModal };
