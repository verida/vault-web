import { EnvironmentType } from "@verida/types"

import { LogLevel } from "@/features/logger"

import { version } from "./version"

const devMode = process.env.REACT_APP_DEV_MODE === "true" ? true : false

// TODO: Use Zod to validate the log level value
const logLevel: LogLevel =
  process.env.REACT_APP_LOG_LEVEL === "error"
    ? "error"
    : process.env.REACT_APP_LOG_LEVEL === "warn"
      ? "warn"
      : process.env.REACT_APP_LOG_LEVEL === "debug"
        ? "debug"
        : "info"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

// Verida variables
const veridaContextName = "Verida: "

const veridaConnectLogoUrl = `/images/logo_for_verida_connect.png`

const veridaEnvironment: EnvironmentType =
  process.env.REACT_APP_VERIDA_ENV === "local"
    ? EnvironmentType.LOCAL
    : process.env.REACT_APP_VERIDA_ENV === "mainnet"
      ? EnvironmentType.MAINNET
      : EnvironmentType.TESTNET

const veridaRpcUrl =
  "https://polygon-mumbai.g.alchemy.com/v2/Q4NRuRlwTNyI90dDCgiX_KT_vS_2gpbN"

/**
 * @deprecated as we have to be careful between server and client side env vars
 */
export const config = {
  appVersion: version,
  devMode,
  logLevel,
  baseUrl,
  verida: {
    environment: veridaEnvironment,
    contextName: veridaContextName,
    connectLogoUrl: veridaConnectLogoUrl,
    rpcUrl: veridaRpcUrl,
  },
}

// Basic feature flags for now
// But likely to stay as a separate global variable like this
// TODO: To integrate with the env vars processing and validation
export const featureFlags = {
  assistant: {
    enabled:
      process.env.NEXT_PUBLIC_FEATURE_FLAG_AI_ASSISTANT_ENABLED === "true",
  },
}
