"use client"

import { useQueryClient } from "@tanstack/react-query"
import type { Account } from "@verida/account"
import { Client, type Context } from "@verida/client-ts"
import { WebUser } from "@verida/web-helpers"
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import { Sentry } from "@/features/telemetry/sentry"
import { invalidateVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import {
  VeridaContext,
  type VeridaContextType,
} from "@/features/verida/contexts/verida-context"
import { VeridaConnectionError } from "@/features/verida/errors/verida-connection-error"
import { VeridaDisconnectionError } from "@/features/verida/errors/verida-disconnection-error"

const logger = Logger.create("verida")

// Move client in a state because it mutates with the account
const client = new Client({
  network: commonConfig.VERIDA_NETWORK,
  didClientConfig: {
    network: commonConfig.VERIDA_NETWORK,
    rpcUrl: commonConfig.VERIDA_RPC_URL,
  },
})

const webUserInstance = new WebUser({
  debug: commonConfig.DEV_MODE,
  clientConfig: {
    network: commonConfig.VERIDA_NETWORK,
    didClientConfig: {
      network: commonConfig.VERIDA_NETWORK,
      rpcUrl: commonConfig.VERIDA_RPC_URL,
    },
  },
  contextConfig: {
    name: VERIDA_VAULT_CONTEXT_NAME,
  },
  accountConfig: {
    request: {
      logoUrl: `${commonConfig.BASE_URL}/images/verida_vault_logo_for_connect.png`,
    },
    network: commonConfig.VERIDA_NETWORK,
  },
})

export interface VeridaProviderProps {
  children?: ReactNode
}

export function VeridaProvider(props: VeridaProviderProps) {
  const webUserInstanceRef = useRef(webUserInstance)

  const [account, setAccount] = useState<Account | null>(null)
  const [context, setContext] = useState<Context | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const [did, setDid] = useState<string | null>(null)

  const updateStates = useCallback(async () => {
    const newIsConnected = webUserInstance.isConnected()
    setIsConnected(newIsConnected)
    setIsConnecting(false)
    setIsDisconnecting(false)

    if (!newIsConnected) {
      // If not connected, no need to continue, just clear everything
      setDid(null)
      Sentry.setUser(null)
      return
    }

    try {
      const newDid = webUserInstance.getDid()
      setDid(newDid)
      Sentry.setUser({ id: newDid })
    } catch (_error) {
      // Only error is if user not connected which is prevented by above check
      Sentry.setUser(null)
      setDid(null)
    }
  }, [])

  const connect = useCallback(async () => {
    logger.info("User connecting to Verida")

    try {
      setIsConnecting(true)

      const connected = await webUserInstanceRef.current.connect()

      if (connected) {
        setAccount(webUserInstanceRef.current.getAccount())
        setContext(webUserInstanceRef.current.getContext())
      }

      logger.info(
        connected
          ? "Connection to Verida successful"
          : "User did not connect to Verida"
      )
    } catch (error) {
      throw new VeridaConnectionError({
        cause: error,
      })
    } finally {
      setIsConnecting(false)
    }
  }, [webUserInstanceRef])

  const autoConnect = useCallback(async () => {
    logger.info("Checking for existing Verida session")

    if (webUserInstance.hasSession()) {
      logger.info("Existing Verida session found, connecting automatically...")
      connect()
    }

    logger.info("No existing Verida session found, skipping connection")
  }, [connect])

  const connectionEventListener = useCallback(() => {
    void updateStates()
  }, [updateStates])

  const queryClient = useQueryClient()

  const profileChangedEventListener = useCallback(() => {
    if (!did) {
      return
    }
    invalidateVeridaProfile(queryClient, did)
  }, [queryClient, did])

  useEffect(() => {
    logger.info("Initialising the Verida client")
    webUserInstance.addListener("connected", connectionEventListener)
    webUserInstance.addListener("profileChanged", profileChangedEventListener)
    webUserInstance.addListener("disconnected", connectionEventListener)

    void autoConnect()

    return () => {
      logger.info("Cleaning the Verida client")
      webUserInstance.removeAllListeners()
    }
  }, [connectionEventListener, profileChangedEventListener, autoConnect])

  const disconnect = useCallback(async () => {
    logger.info("User disconnecting from Verida")

    setIsDisconnecting(true)
    try {
      await webUserInstanceRef.current.disconnect()
      setAccount(null)
      setDid(null)
      setContext(null)
    } catch (error) {
      throw new VeridaDisconnectionError({
        cause: error,
      })
    } finally {
      setIsDisconnecting(false)
    }

    logger.info("User successfully disconnected from Verida")
  }, [webUserInstanceRef])

  const getAccountSessionToken = useCallback(async () => {
    if (!account) {
      throw new Error("User not connected to Verida")
    }

    // TODO: Use account instead of webUserInstanceRef
    // Have to cast it as only VaultAccount implements getContextSession
    // If Account instance of AutoAccount, we need to build the session manually

    const _account = webUserInstanceRef.current.getAccount()
    const contextSession = await _account.getContextSession(
      VERIDA_VAULT_CONTEXT_NAME
    )

    if (!contextSession) {
      throw new Error("No context session found")
    }

    const stringifiedSession = JSON.stringify(contextSession)
    const sessionToken = Buffer.from(stringifiedSession).toString("base64")
    return sessionToken
  }, [account, webUserInstanceRef])

  const contextValue: VeridaContextType = useMemo(
    () => ({
      client,
      account,
      context,
      isConnected,
      isConnecting,
      isDisconnecting,
      did,
      connect,
      disconnect,
      getAccountSessionToken,
    }),
    [
      context,
      account,
      isConnected,
      isConnecting,
      isDisconnecting,
      did,
      connect,
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
