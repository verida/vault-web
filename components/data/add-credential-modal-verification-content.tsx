import { AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

import { AddCredentialStatus, Credential } from "@/features/data";
import { checkZkTransgateAvailable } from "@/features/data/utils";

import { Close } from "../icons/close";
import { Spinner } from "../spinner";
import { Typography } from "../typography";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";

type Props = {
  credential: Credential;
  onClose: () => void;
  onBack: () => void;
};

const AddCredentialModalVerificationContent = ({
  credential,
  onClose,
  onBack,
}: Props) => {
  const [verificationStatus, setVerificationStatus] =
    useState<AddCredentialStatus>(AddCredentialStatus.Start);

  const onStartVerification = async () => {
    setVerificationStatus(AddCredentialStatus.Loading);

    if (
      credential.provider.name === "zkPass" &&
      !(await checkZkTransgateAvailable(credential))
    ) {
      console.log("TransGate extension is not installed");
      return;
    }
  };

  return (
    <DialogContent>
      <DialogHeader className="mb-8 flex items-center justify-between">
        <button onClick={onBack}>
          <ArrowLeft />
        </button>
        <button onClick={onClose}>
          <Close />
        </button>
      </DialogHeader>
      <div className="space-y-8">
        <div className="flex items-center justify-center">
          <Avatar className="h-14 w-14 border-2 border-white">
            <AvatarImage
              alt={"provider"}
              src={credential.provider.image.src}
              width={52}
              height={52}
            />
            <AvatarFallback>
              <Skeleton className="h-[52px] w-[52px] rounded-full" />
            </AvatarFallback>
          </Avatar>
          <Avatar className="-ml-5 h-14 w-14 border-2 border-white">
            <AvatarImage
              alt={credential.name}
              src={credential.icon}
              width={52}
              height={52}
            />
            <AvatarFallback>
              <Skeleton className="h-[52px] w-[52px] rounded-full" />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Typography variant={"heading-3"}>{credential.name}</Typography>
          <Typography
            variant={"heading-4"}
            className="text-center text-secondary-foreground"
          >
            Verify your {credential.name} account is KYC'd
          </Typography>
        </div>
        {verificationStatus === AddCredentialStatus.Start ? (
          <Button className="w-full" onClick={onStartVerification}>
            Start Verification
          </Button>
        ) : verificationStatus === AddCredentialStatus.Loading ? (
          <div className="flex flex-col items-center">
            <Spinner />
            <Typography
              variant={"heading-5"}
              className="mt-8 text-center text-secondary-foreground"
            >
              Please complete verification and return to this page.
            </Typography>
          </div>
        ) : (
          ""
        )}
      </div>
    </DialogContent>
  );
};

export default AddCredentialModalVerificationContent;
