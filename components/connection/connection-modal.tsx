import { Connection, connections } from "@/features/connections";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { VLogo } from "../icons/logo";
import { Switch } from "../icons/switch";
import { useMemo } from "react";

type Props = {
  isOpen: boolean;
  connectLoading: boolean;
  onClose: () => void;
  onConnect: () => void;
  connectionId: string;
} & React.PropsWithChildren;

function ConnectionModal({
  connectLoading,
  connectionId,
  onConnect,
  ...props
}: Props) {
  const connection = useMemo(() => {
    return connections.find((c) => c.name === connectionId);
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
          When you connect {connection.name} and Verida, your {connection.name}{" "}
          activities will automatically show up on Verida for all your friends
          to see. Additionally, {connection.name} and content shared via{" "}
          {connection.name} will automatically contribute to your Verida all-day
          stats like mentions and engagement.
        </p>
      )}

      <Button
        variant='outline'
        className='w-full mt-8'
        onClick={onConnect}
        disabled={connectLoading}
      >
        {connectLoading ? "Connecting" : "Connect"}
      </Button>
    </Modal>
  );
}

export { ConnectionModal };
