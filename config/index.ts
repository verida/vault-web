import { EnvironmentType } from "@verida/types";

import { version } from "./version";
import { LogLevel } from "@/features/logger";

const devMode = process.env.REACT_APP_DEV_MODE === "true" ? true : false;

// TODO: Use Zod to validate the log level value
const logLevel: LogLevel =
  process.env.REACT_APP_LOG_LEVEL === "error"
    ? "error"
    : process.env.REACT_APP_LOG_LEVEL === "warn"
      ? "warn"
      : process.env.REACT_APP_LOG_LEVEL === "debug"
        ? "debug"
        : "info";

// Verida variables
const veridaContextName = 'Verida: ';

const veridaConnectLogoUrl = `/images/logo_for_verida_connect.png`;

const veridaEnvironment: EnvironmentType =
  process.env.REACT_APP_VERIDA_ENV === "local"
    ? EnvironmentType.LOCAL
    : process.env.REACT_APP_VERIDA_ENV === "mainnet"
      ? EnvironmentType.MAINNET
      : EnvironmentType.TESTNET;

const veridaRpcUrl = 'https://polygon-mumbai.g.alchemy.com/v2/Q4NRuRlwTNyI90dDCgiX_KT_vS_2gpbN'

export const config = {
  appVersion: version,
  devMode,
  logLevel,
  verida: {
    environment: veridaEnvironment,
    contextName: veridaContextName,
    connectLogoUrl: veridaConnectLogoUrl,
    rpcUrl: veridaRpcUrl,
  },
};
