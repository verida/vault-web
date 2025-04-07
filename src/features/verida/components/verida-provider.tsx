"use client"

import type { Account } from "@verida/account"
import { VaultAccount, hasSession } from "@verida/account-web-vault"
import {
  Client,
  type Context,
  Network as NetworkClient,
} from "@verida/client-ts"
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
  useDisconnect,
} from "thirdweb/react"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import { Sentry } from "@/features/telemetry/sentry"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import {
  VeridaContext,
  type VeridaContextType,
} from "@/features/verida/contexts/verida-context"
import { VeridaAlreadyConnectedError } from "@/features/verida/errors/verida-already-connected-error"
import { VeridaConnectionAbortedError } from "@/features/verida/errors/verida-connection-aborted-error"
import { VeridaConnectionError } from "@/features/verida/errors/verida-connection-error"
import { VeridaDisconnectionError } from "@/features/verida/errors/verida-disconnection-error"
import { VeridaNotConnectedError } from "@/features/verida/errors/verida-not-connected-error"
import {
  buildSession,
  buildSessionToken,
  buildVeridaAccountFromThirdWeb,
  checkAccountExists,
} from "@/features/verida/utils"

const logger = Logger.create("verida")

export interface VeridaProviderProps {
  children?: ReactNode
}

export function VeridaProvider(props: VeridaProviderProps) {
  const thirdWebWallet = useActiveWallet()
  const thirdWebSmartAccount = useActiveAccount()
  const { disconnect: disconnectThirdWeb } = useDisconnect()

  const thirdWebAdminAccount = useMemo(() => {
    if (!thirdWebWallet || !thirdWebSmartAccount) {
      return undefined
    }
    return thirdWebWallet.getAdminAccount?.()
  }, [thirdWebWallet, thirdWebSmartAccount])

  const accountTypeRef = useRef<"legacy" | "thirdweb" | null>(null)
  const statusRef = useRef<
    "connected" | "disconnected" | "connecting" | "disconnecting"
  >("disconnected")

  const [client, setClient] = useState<Client | null>(null)
  const [account, setAccount] = useState<Account | null>(null)
  const [did, setDid] = useState<string | null>(null)
  const [context, setContext] = useState<Context | null>(null)
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)

  const isConnected = useMemo(() => {
    return !!client && !!account && !!context && !!did
  }, [client, account, context, did])

  const clearStates = useCallback(() => {
    logger.debug("Clearing states")

    setClient(null)
    setAccount(null)
    setDid(null)
    setContext(null)
    setSessionToken(null)
    Sentry.setUser(null)
    statusRef.current = "disconnected"
    accountTypeRef.current = null
  }, [])

  const connectAccount = useCallback(
    async (accountToConnect: Account) => {
      if (statusRef.current === "connected") {
        throw new VeridaAlreadyConnectedError()
      }

      logger.info("Connecting user to Verida")

      try {
        statusRef.current = "connecting"
        setIsConnecting(true)

        const _context = await NetworkClient.connect({
          client: {
            network: commonConfig.VERIDA_NETWORK,
            didClientConfig: {
              network: commonConfig.VERIDA_NETWORK,
              rpcUrl: commonConfig.VERIDA_RPC_URL,
            },
          },
          account: accountToConnect,
          context: {
            name: VERIDA_VAULT_CONTEXT_NAME,
          },
        })

        if (!_context) {
          statusRef.current = "disconnected"
          setIsConnecting(false)
          logger.warn("User did not connect to Verida")
          throw new VeridaConnectionAbortedError()
        }

        const _did = await accountToConnect.did()
        const _client = _context.getClient()

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

        statusRef.current = "connected"
        setIsConnecting(false)

        logger.info("Connection to Verida successful", {
          did: _did,
        })
      } catch (error) {
        clearStates()
        setIsConnecting(false)

        if (error instanceof VeridaConnectionAbortedError) {
          throw error
        }

        throw new VeridaConnectionError({
          cause: error,
        })
      }
    },
    [clearStates]
  )

  const connectLegacyAccount = useCallback(async () => {
    logger.debug("Connecting legacy account")

    if (accountTypeRef.current === "thirdweb") {
      logger.debug("Already connected with thirdweb account. Aborting.")
      return
    }

    if (
      statusRef.current === "connected" ||
      statusRef.current === "connecting" ||
      statusRef.current === "disconnecting"
    ) {
      return
    }

    accountTypeRef.current = "legacy"
    statusRef.current = "connecting"
    setIsConnecting(true)

    return connectAccount(
      new VaultAccount({
        request: {
          logoUrl: `${commonConfig.BASE_URL}/images/verida_vault_logo_for_connect.png`,
        },
        network: commonConfig.VERIDA_NETWORK,
      })
    )
  }, [connectAccount])

  const autoConnect = useCallback(async () => {
    if (
      accountTypeRef.current === "thirdweb" ||
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

    if (!context) {
      logger.warn("User already disconnected from Verida. Aborting disconnect.")
      throw new VeridaNotConnectedError()
    }

    logger.info("Disconnecting user from Verida")

    statusRef.current = "disconnecting"
    setIsDisconnecting(true)

    try {
      await context.disconnect()

      if (thirdWebWallet) {
        disconnectThirdWeb(thirdWebWallet)
      }

      logger.info("User successfully disconnected from Verida")
    } catch (error) {
      throw new VeridaDisconnectionError({
        cause: error,
      })
    } finally {
      clearStates()
      setIsDisconnecting(false)
    }
  }, [context, clearStates, disconnectThirdWeb, thirdWebWallet])

  const getAccountSessionToken = useCallback(async () => {
    if (!sessionToken) {
      return Promise.reject(new Error("User not connected to Verida"))
    }
    return Promise.resolve(sessionToken)
  }, [sessionToken])

  useEffect(() => {
    if (statusRef.current !== "disconnected") {
      return
    }

    void autoConnect()
  }, [autoConnect])

  useEffect(() => {
    if (accountTypeRef.current === "legacy") {
      return
    }

    if (
      statusRef.current === "connected" ||
      statusRef.current === "connecting" ||
      statusRef.current === "disconnecting"
    ) {
      return
    }

    if (!thirdWebAdminAccount || !thirdWebSmartAccount) {
      clearStates()
      return
    }

    const execute = async () => {
      accountTypeRef.current = "thirdweb"
      statusRef.current = "connecting"
      setIsConnecting(true)

      try {
        const _account = await buildVeridaAccountFromThirdWeb(
          thirdWebAdminAccount,
          thirdWebSmartAccount
        )

        const accountExists = await checkAccountExists(_account)

        if (!accountExists) {
          logger.debug("Account does not exist yet")
          // Guide user to fill profile before connecting
        }

        logger.debug("Connecting thirdweb account")
        await connectAccount(_account)
      } catch (error) {
        logger.error(error)
      }
    }

    execute().catch((error) => {
      logger.error(error)
      clearStates()
    })
  }, [thirdWebAdminAccount, thirdWebSmartAccount, clearStates, connectAccount])

  const contextValue: VeridaContextType = useMemo(
    () => ({
      client,
      account,
      did,
      context,
      sessionToken,
      isConnected,
      isConnecting,
      isDisconnecting,
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
      isConnected,
      isConnecting,
      isDisconnecting,
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
