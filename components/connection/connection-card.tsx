import { Connection } from "@/features/connections";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Switch, SwitchThumb } from "../ui/switch";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onConnect: () => void;
  isConnected?: boolean;
} & Connection;

function ConnectionCard(props: Props) {
  const { id, item, onConnect, isConnected = false } = props;
  return (
    <div className='h-full flex flex-col'>
      {!isConnected && (
        <div className='bg-green-100 pt-2 pb-6 text-center font-semibold text-xs rounded-[16px_16px_0_0]'>
          Earn 100 VDA by connecting to the platform
        </div>
      )}
      <Card className={cn(!isConnected ? "-mt-4" : "", "flex-grow")}>
        <CardHeader className='pb-0 flex flex-row justify-between'>
          {props.icon && (
            <>
              <props.icon />
            </>
          )}
          {!isConnected ? (
            <Button
              size='lg'
              variant='outline'
              className='px-4 !mt-0'
              onClick={onConnect}
            >
              Connect
            </Button>
          ) : (
            <Button
              size='lg'
              variant='outline'
              className='px-4 !mt-0 text-[#FD4F64]'
            >
              Disconnect
            </Button>
          )}
        </CardHeader>
        <CardContent className='p-6 pt-0'>
          {id && <h3 className='text-xl font-semibold mt-6'>{id}</h3>}
          {item && id && (
            <p className='text-gray-500 mt-2'>{`Connect your ${id} Account to share your ${item} with us.`}</p>
          )}
        </CardContent>
        {isConnected && (
          <CardFooter>
            <div className='pt-4 w-full border-t border-border flex justify-between items-end'>
              <p className='text-sm'>Display on Verida One profile</p>
              <Switch defaultChecked className='w-10 h-6'>
                <SwitchThumb />
              </Switch>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export { ConnectionCard };
