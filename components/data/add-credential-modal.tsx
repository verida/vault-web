import React, { useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import { Credential } from "@/features/data";

import AddCredentialModalContent from "./add-credential-modal-content";
import AddCredentialModalVerificationContent from "./add-credential-modal-verification-content";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddCredentialModal = ({ open, setOpen }: Props) => {
  const [selectedCredential, setSelectedCredential] = useState<Credential>();

  const onSelectCredential = (credential: Credential) => {
    setSelectedCredential(credential);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onBack = () => {
    setSelectedCredential(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!selectedCredential ? (
        <AddCredentialModalContent
          onSelectCredential={onSelectCredential}
          onClose={onClose}
        />
      ) : (
        <AddCredentialModalVerificationContent
          credential={selectedCredential}
          onBack={onBack}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
};

export default AddCredentialModal;
