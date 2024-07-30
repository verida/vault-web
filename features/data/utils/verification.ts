import TransgateConnect from "@zkpass/transgate-js-sdk";

import { ZkPassAppId } from "../constants";
import { Credential } from "../types";

export const checkZkTransgateAvailable = async (
  credential: Credential
): Promise<boolean> => {
  if (!credential || credential.provider.name !== "zkPass") return false;
  const connector = new TransgateConnect(ZkPassAppId);
  // Check if the TransGate extension is installed
  // If it returns false, please prompt to install it from chrome web store
  const isAvailable = await connector.isTransgateAvailable();
  return isAvailable;
};
