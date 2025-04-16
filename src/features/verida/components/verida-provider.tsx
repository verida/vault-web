"use client"

import { useQueryClient } from "@tanstack/react-query"
import type { Account } from "@verida/account"
import { VaultAccount, hasSession } from "@verida/account-web-vault"
import { Client, type Context } from "@verida/client-ts"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  useActiveAccount,
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useDisconnect,
} from "thirdweb/react"

import { commonConfig } from "@/config/common"
import { useOnboardingEntryQueryState } from "@/features/onboarding/hooks/use-onboarding-entry-query-state"
import { getOnboardingPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry/logger"
import { Sentry } from "@/features/telemetry/sentry"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import {
  VeridaContext,
  type VeridaContextType,
} from "@/features/verida/contexts/verida-context"
import { VeridaConnectionError } from "@/features/verida/errors/verida-connection-error"
import { VeridaDisconnectionError } from "@/features/verida/errors/verida-disconnection-error"
import { useVeridaAccountExists } from "@/features/verida/hooks/use-verida-account-exists"
import type { VeridaAccountType, VeridaStatus } from "@/features/verida/types"
import {
  buildSession,
  buildSessionToken,
  buildVeridaAccountFromThirdWeb,
} from "@/features/verida/utils"

const logger = Logger.create("verida")

export interface VeridaProviderProps {
  children?: ReactNode
}

export function VeridaProvider(props: VeridaProviderProps) {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { serializeOnboardingEntryPath } = useOnboardingEntryQueryState()

  const queryClient = useQueryClient()

  const thirdWebStatus = useActiveWalletConnectionStatus()
  const thirdWebWallet = useActiveWallet()
  const thirdWebSmartAccount = useActiveAccount()
  const { disconnect: disconnectThirdWeb } = useDisconnect()

  const thirdWebAdminAccount = useMemo(() => {
    if (!thirdWebWallet || !thirdWebSmartAccount) {
      return undefined
    }
    return thirdWebWallet.getAdminAccount?.()
  }, [thirdWebWallet, thirdWebSmartAccount])

  const accountTypeRef = useRef<VeridaAccountType | null>(null)
  const [accountTypeState, setAccountTypeState] =
    useState<VeridaAccountType | null>(null)
  const statusRef = useRef<VeridaStatus>("disconnected")
  const [statusState, setStatusState] = useState<VeridaStatus>("disconnected")

  const setStatus = useCallback((newStatus: VeridaStatus) => {
    statusRef.current = newStatus
    setStatusState(newStatus)
  }, [])

  const setAccountType = useCallback(
    (newAccountType: VeridaAccountType | null) => {
      accountTypeRef.current = newAccountType
      setAccountTypeState(newAccountType)
    },
    []
  )

  const [client, setClient] = useState<Client | null>(null)
  const [account, setAccount] = useState<Account | null>(null)
  const [did, setDid] = useState<string | null>(null)
  const [context, setContext] = useState<Context | null>(null)
  const [sessionToken, setSessionToken] = useState<string | null>(null)

  const { accountExists } = useVeridaAccountExists(did)

  useEffect(() => {
    if (!!client && !!account && !!context && !!did && !!sessionToken) {
      setStatus("connected")
    }
  }, [client, account, context, did, sessionToken, setStatus])

  const clearStates = useCallback(() => {
    logger.info("Clearing states")

    setClient(null)
    setAccount(null)
    setDid(null)
    setContext(null)
    setSessionToken(null)
    Sentry.setUser(null)
    setStatus("disconnected")
    setAccountType(null)
    if (thirdWebWallet) {
      disconnectThirdWeb(thirdWebWallet)
    }
  }, [disconnectThirdWeb, thirdWebWallet, setStatus, setAccountType])

  const connectAccount = useCallback(
    async (accountToConnect: Account) => {
      logger.info("Connecting user to Verida")

      if (statusRef.current === "connected") {
        logger.warn("User already connected to Verida. Aborting connection.")
        return
      }

      try {
        setStatus("connecting")

        const _client = new Client({
          network: commonConfig.VERIDA_NETWORK,
          didClientConfig: {
            network: commonConfig.VERIDA_NETWORK,
            rpcUrl: commonConfig.VERIDA_RPC_URL,
          },
        })

        await _client.connect(accountToConnect)

        let _context: Context | undefined
        try {
          _context = (await _client.openContext(
            VERIDA_VAULT_CONTEXT_NAME,
            true
          )) as Context | undefined
        } catch (error) {
          logger.warn(
            "Failed to open context. User may have cancelled the connection."
          )
        }

        if (!_context) {
          logger.warn("User did not connect to Verida")
          clearStates()
          return
        }

        const _did = await accountToConnect.did()

        const session =
          accountToConnect instanceof VaultAccount
            ? await accountToConnect.getContextSession(
                VERIDA_VAULT_CONTEXT_NAME
              )
            : await buildSession(_context)

        if (session) {
          const token = buildSessionToken(session)
          setSessionToken(token)
        }

        setClient(_client)
        setAccount(accountToConnect)
        setDid(_did)
        setContext(_context)
        Sentry.setUser({ id: _did })

        queryClient.invalidateQueries({
          queryKey: ["verida-account-exists", _did],
        })

        logger.info("Connection to Verida successful", {
          did: _did,
        })
      } catch (error) {
        logger.error(
          new VeridaConnectionError({
            cause: error,
          })
        )
        clearStates()
      }
    },
    [clearStates, queryClient, setStatus]
  )

  const connectLegacyAccount = useCallback(async () => {
    logger.info("Connecting legacy account")

    if (accountTypeRef.current === "thirdweb") {
      logger.info("Already setup with thirdweb account. Aborting.")
      return
    }

    if (statusRef.current !== "disconnected") {
      return
    }

    setAccountType("legacy")

    logger.info("Setting up legacy account")

    return connectAccount(
      new VaultAccount({
        request: {
          logoUrl: `${commonConfig.BASE_URL}/images/verida_vault_logo_for_connect.png`,
        },
        network: commonConfig.VERIDA_NETWORK,
      })
    )
  }, [connectAccount, setAccountType])

  const autoConnect = useCallback(async () => {
    if (
      accountTypeRef.current !== null ||
      statusRef.current !== "disconnected"
    ) {
      return
    }

    logger.info("Checking for existing Verida session")

    if (hasSession(VERIDA_VAULT_CONTEXT_NAME)) {
      logger.info("Existing Verida session found, connecting automatically...")
      return connectLegacyAccount()
    }

    logger.info("No existing Verida session found, skipping connection")
  }, [connectLegacyAccount])

  const disconnect = useCallback(async () => {
    logger.info("Disconnecting user from Verida")

    if (statusRef.current === "disconnected") {
      logger.warn("User already disconnected from Verida. Aborting disconnect.")
      clearStates()
      return
    }

    if (statusRef.current === "connecting") {
      logger.warn("User currently connecting to Verida. Aborting disconnect.")
      return
    }

    if (statusRef.current === "disconnecting") {
      logger.warn(
        "User already disconnecting from Verida. Aborting disconnect."
      )
      return
    }

    setStatus("disconnecting")

    try {
      if (context) {
        await context.disconnect()
      }

      if (thirdWebWallet) {
        disconnectThirdWeb(thirdWebWallet)
      }

      logger.info("User successfully disconnected from Verida")
    } catch (error) {
      logger.error(
        new VeridaDisconnectionError({
          cause: error,
        })
      )
    } finally {
      clearStates()
    }
  }, [context, clearStates, setStatus, disconnectThirdWeb, thirdWebWallet])

  const getAccountSessionToken = useCallback(async () => {
    if (!sessionToken) {
      return Promise.reject(new Error("User not connected to Verida"))
    }
    return Promise.resolve(sessionToken)
  }, [sessionToken])

  useEffect(() => {
    void autoConnect()
  }, [autoConnect])

  const requestThirdWebConsentSignature = useCallback(async () => {
    if (!thirdWebAdminAccount || !thirdWebSmartAccount) {
      return
    }

    setAccountType("thirdweb")

    const _account = await buildVeridaAccountFromThirdWeb(
      thirdWebAdminAccount,
      thirdWebSmartAccount
    )
    const _did = await _account.did()

    setAccount(_account)
    setDid(_did)
  }, [thirdWebAdminAccount, thirdWebSmartAccount, setAccountType])

  useEffect(() => {
    if (accountTypeRef.current === "legacy") {
      return
    }

    if (thirdWebStatus === "disconnected" || thirdWebStatus === "unknown") {
      clearStates()
      return
    }

    if (statusRef.current !== "disconnected") {
      return
    }

    logger.info("Setting up thirdweb account")

    requestThirdWebConsentSignature().catch((error) => {
      logger.error(error)
    })
  }, [thirdWebStatus, clearStates, requestThirdWebConsentSignature])

  const onboardingUrl = useMemo(() => {
    return serializeOnboardingEntryPath(
      `${getOnboardingPageRoute()}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
      {
        onboardingEntryPath: pathName,
      }
    )
  }, [pathName, searchParams, serializeOnboardingEntryPath])

  useEffect(() => {
    if (
      accountTypeRef.current !== "thirdweb" ||
      !account ||
      accountExists === null ||
      statusRef.current !== "disconnected"
    ) {
      return
    }

    if (!accountExists) {
      logger.debug("Account does not exist yet. Redirecting to onboarding.")

      setStatus("creating")
      router.push(onboardingUrl)
      return
    }

    logger.debug("Account exists. Connecting thirdweb account")

    connectAccount(account).catch((error) => {
      logger.error(error)
    })
  }, [router, accountExists, account, setStatus, connectAccount, onboardingUrl])

  const contextValue: VeridaContextType = useMemo(
    () => ({
      client,
      account,
      did,
      context,
      sessionToken,
      status: statusState,
      accountType: accountTypeState,
      connectAccount,
      requestThirdWebConsentSignature,
      connectLegacyAccount,
      disconnect,
      getAccountSessionToken,
    }),
    [
      client,
      account,
      did,
      context,
      sessionToken,
      statusState,
      accountTypeState,
      connectAccount,
      requestThirdWebConsentSignature,
      connectLegacyAccount,
      disconnect,
      getAccountSessionToken,
    ]
  )

  return (
    <VeridaContext.Provider value={contextValue}>
      {props.children}
    </VeridaContext.Provider>
  )
}
VeridaProvider.displayName = "VeridaProvider"
