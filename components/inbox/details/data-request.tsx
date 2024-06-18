import { isEmpty } from "lodash";
import { InboxDetailsProps } from "../inbox-details";
import { useVerida } from "@/features/verida";
import { useEffect, useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { CloseSideRight } from "@/components/icons/close-side-right";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Success } from "@/components/icons/success";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { Checkbox } from "@/components/ui/checkbox";
import Alert from "@/components/alert";

export const DataRequestDetails: React.FC<InboxDetailsProps> = ({ message }) => {
  const { message: title, data } = message;
  const { openDatastore } = useVerida();

  const [availableData, setAvailableData] = useState<any>();
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const { requestSchema, filter } = data;

      const requestFilter = filter && typeof filter === "object" ? filter : {};

      const searchFilter = {};

      const query = {
        $and: [requestFilter, searchFilter],
      };

      const datastore = await openDatastore(requestSchema, undefined);

      const result = await datastore?.getMany(query, undefined);

      console.log(result);

      if (result) {
        setAvailableData(result);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (!!openDatastore) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDatastore]);

  if (isSelecting) {
    return (
      <>
        <DrawerHeader className='flex flex-col space-y-3'>
          <div className='flex items-center space-x-3'>
            <ArrowLeft onClick={() => setIsSelecting(false)} />
            <DrawerTitle>Select an Item</DrawerTitle>
          </div>
          <div className='flex items-center space-x-3'>
            <SearchInput />
          </div>
        </DrawerHeader>

        <div className='p-6'>
          {(availableData || []).map((item: any) => (
            <Card key={`card-${item._id}`} className='px-4 py-3'>
              <Checkbox
                label={
                  <div>
                    <h6 className='font-bold'>{item.name}</h6>
                    <p>Government of Western...</p>
                    <p className='text-xs text-gray-500'>01/05/22 11:00</p>
                  </div>
                }
              />
            </Card>
          ))}
        </div>

        <DrawerFooter>
          <Alert text='Carefully review your seletion' />
          <Button className='bg-purple-500 hover:bg-purple-700'>Confirm Selection</Button>
        </DrawerFooter>
      </>
    );
  }

  return (
    <>
      <DrawerHeader className='flex items-center justify-between space-x-3'>
        <div className='flex items-center space-x-3'>
          <CloseSideRight />
          <DrawerTitle>Data Request</DrawerTitle>
        </div>
      </DrawerHeader>

      <div className='p-6'>
        <div className='flex items-center space-x-2'>
          <div className='relative'>
            <Avatar className='shadow'>
              {message.sentBy?.avatar?.uri && (
                <AvatarImage src={message.sentBy?.avatar?.uri} asChild>
                  <Image src={message.sentBy?.avatar?.uri} width={48} height={48} alt='' />
                </AvatarImage>
              )}
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
            <Success className='absolute border border-white right-0 bottom-0 rounded-full size-4' />
          </div>
          <div>
            <p className='text-[#041133] font-medium'>{message.sentBy?.name}</p>
            <p className='text-xs text-neutral-500'>Today at 5:40 pm</p>
          </div>
        </div>

        <div className='rounded-lg bg-[#f5f4ff] p-4 mt-6'>
          <h5 className='text-[#041133] text-sm'>{title}</h5>
        </div>

        <div className='mt-8'>
          <p className='text-sm text-neutral-500'>The following data is being requested</p>

          <Card className='mt-4 p-4 border border-border bg-neutral-50 flex flex-col gap-6'>
            <div>
              <h6 className='font-bold'>Employment contract</h6>
              <p className='text-sm'>Name, employer, start and end date, attachments</p>
            </div>

            <Button variant='outline' className='w-full' onClick={() => setIsSelecting(true)}>
              Add
            </Button>
          </Card>
        </div>
      </div>

      <DrawerFooter>
        <Alert text='Ignore if you don’t recognize this request' />
        <div className='grid grid-cols-2 gap-4'>
          <Button variant='outline'>Decline</Button>
          <Button className='bg-purple-500 hover:bg-purple-700'>Share</Button>
        </div>
      </DrawerFooter>
    </>
  );
};
