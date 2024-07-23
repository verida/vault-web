import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { DataFolderDefinition, DataSchema } from "@/features/data";

import {
  ModalSheet,
  ModalSheetBody,
  ModalSheetHeader,
} from "../common/modal-sheet";
import { Copy } from "../icons/copy";
import { Delete } from "../icons/delete";
import { Pin } from "../icons/pin";
import { Typography } from "../typography";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  open: boolean;
  data?: any;
  schema?: DataSchema;
  folder?: DataFolderDefinition;
};

const DataItemDetailsSheet = ({ open, data, folder, schema }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const onClose = () => {
    router.push(pathName);
  };
  return (
    <ModalSheet open={open} onClose={onClose}>
      <ModalSheetHeader
        actions={
          <div className="flex gap-3 pl-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={"icon"} variant={"secondary"}>
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy Address</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={"icon"} variant={"secondary"}>
                  <Pin />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pin</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={"icon"} variant={"secondary"}>
                  <Delete className="[&_*]:stroke-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        }
        onClose={onClose}
        title={
          !data ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-7 w-32" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src={data.icon}
                width={40}
                height={40}
                alt="data icon"
                className="h-10 w-10"
              />
              <Typography variant={"heading-4"} className="truncate">
                {data?.name}
              </Typography>
            </div>
          )
        }
      />
      <ModalSheetBody>
        {!data || !schema ? (
          <div className="space-y-6">
            {[...new Array(5)].map((_, i) => (
              <Skeleton className="h-10 w-full" key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-border pb-4">
              <Typography
                variant={"base-regular"}
                className="text-secondary-foreground"
              >
                Display on Verida One profile
              </Typography>
              <Switch />
            </div>
            <div className="mt-8 space-y-6">
              <Typography variant={"heading-4"}>
                {folder?.title} Data
              </Typography>
              {schema?.layouts.view.map((key) => (
                <div key={key} className="flex items-center justify-between">
                  <Typography
                    variant={"heading-5"}
                    className="text-secondary-foreground"
                  >
                    {schema.properties[key].title}
                  </Typography>
                  <Typography variant={"heading-5"}>{data[key]}</Typography>
                </div>
              ))}
            </div>
          </>
        )}
      </ModalSheetBody>
    </ModalSheet>
  );
};

export default DataItemDetailsSheet;
