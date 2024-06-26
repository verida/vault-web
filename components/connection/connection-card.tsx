import { Connection } from "@/features/connections";
import { cn } from "@/lib/utils";

import { Typography } from "../typography";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Switch, SwitchThumb } from "../ui/switch";

type Props = {
  onConnect: () => void;
  isConnected?: boolean;
} & Connection;

function ConnectionCard(props: Props) {
  const { id, item, description, onConnect, isConnected = false } = props;
  return (
    <div className="flex h-full flex-col">
      {!isConnected && (
        <div className="rounded-[16px_16px_0_0] bg-green-100 pb-6 pt-2 text-center text-xs font-semibold">
          Earn 100 VDA by connecting to the platform
        </div>
      )}
      <Card className={cn(!isConnected ? "-mt-4" : "", "flex-grow")}>
        <CardHeader className="flex flex-row justify-between pb-0">
          {props.icon && (
            <>
              <props.icon />
            </>
          )}
          {!isConnected ? (
            <Button
              size="lg"
              variant="secondary"
              className="!mt-0 px-4"
              onClick={onConnect}
            >
              Connect
            </Button>
          ) : (
            <Button
              size="lg"
              variant="secondary"
              className="!mt-0 px-4 text-[#FD4F64]"
            >
              Disconnect
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {id && (
            <Typography variant="heading-4" className="mt-6">
              {id}
            </Typography>
          )}
          {description && (
            <Typography variant="base-l" className="mt-2 text-gray-500">
              {description}
            </Typography>
          )}
        </CardContent>
        {isConnected && (
          <CardFooter>
            <div className="flex w-full items-end justify-between border-t border-border pt-4">
              <Typography variant="base-regular">
                Display on Verida One profile
              </Typography>
              <Switch defaultChecked className="h-6 w-10">
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
