import React from "react";

import { Close } from "@/components/icons/close";
import { Typography } from "@/components/typography";
import { DialogContent } from "@/components/ui/dialog";
import { Credential } from "@/features/data";
import { credentials } from "@/features/data/constants";

import ArrowRightGray from "../icons/arrow-right-gray";
import { SearchInput } from "../search-input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

type Props = {
  onSelectCredential: (credential: Credential) => void;
  onClose: () => void;
};

const AddCredentialModalContent = ({ onSelectCredential, onClose }: Props) => {
  return (
    <DialogContent className="max-w-[480px] rounded-2xl">
      <div className="mb-8 flex items-center justify-between">
        <Typography variant={"heading-4"} className="text-black">
          Add Credential
        </Typography>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="pb-6">
        <SearchInput placeholder="Search" />
      </div>
      <div className="max-h-[500px] w-[calc(100%+20px)] space-y-3 overflow-auto pr-1">
        {credentials.map((credential, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4"
            onClick={() => onSelectCredential(credential)}
          >
            <div className="relative">
              <Avatar>
                <AvatarImage
                  alt={credential.title}
                  src={credential.icon}
                  width={48}
                  height={48}
                />
                <AvatarFallback>
                  <Skeleton className="h-5 w-5 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <Avatar className="absolute bottom-0 right-0 h-5 w-5">
                <AvatarImage
                  alt={"provider"}
                  src={credential.provider.image.src}
                  width={20}
                  height={20}
                />
                <AvatarFallback>
                  <Skeleton className="h-5 w-5 rounded-full" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="w-0 grow">
              <Typography variant={"heading-5"}>{credential.title}</Typography>
              <Typography variant={"base-regular"}>
                {credential.description}
              </Typography>
            </div>
            <div>
              <ArrowRightGray />
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  );
};

export default AddCredentialModalContent;
