"use client"

import { useQueryClient } from "@tanstack/react-query"
import { type DatastoreOpenConfig } from "@verida/types"
import { WebUser } from "@verida/web-helpers"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import { Sentry } from "@/features/telemetry/sentry"
import { invalidateVeridaProfile } from "@/features/verida-profile/hooks/use-verida-profile"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import {
  VeridaContext,
  VeridaContextType,
} from "@/features/verida/contexts/verida-context"

const logger = Logger.create("verida")

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

export type VeridaProviderProps = {
  children?: React.ReactNode
}

export function VeridaProvider(props: VeridaProviderProps) {
  const webUserInstanceRef = useRef(webUserInstance)

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

  const autoConnect = useCallback(async () => {
    logger.info("Checking for existing Verida session")

    if (!webUserInstance.hasSession()) {
      logger.info("No existing Verida session found, skipping connection")
      return
    }

    logger.info("Existing Verida session found, connecting automatically...")

    setIsConnecting(true)
    try {
      const connected = await webUserInstanceRef.current.connect()
      // Will trigger a 'connected' event if already connected and therefore update the states
      logger.info(
        connected
          ? "Connection to Verida successful"
          : "Connection to Verida failed"
      )
    } catch (error) {
      logger.warn("Connection to Verida with existing session failed")
      logger.error(error)
    } finally {
      setIsConnecting(false)
    }
  }, [])

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

  const connect = useCallback(async () => {
    logger.info("User connecting to Verida")

    setIsConnecting(true)
    const connected = await webUserInstanceRef.current.connect()
    setIsConnecting(false)

    logger.info(
      connected
        ? "Connection to Verida successful"
        : "User did not connect to Verida"
    )
  }, [webUserInstanceRef])

  const disconnect = useCallback(async () => {
    logger.info("User disconnecting from Verida")

    setIsDisconnecting(true)
    await webUserInstanceRef.current.disconnect()
    setIsDisconnecting(false)

    logger.info("User successfully disconnected from Verida")
  }, [webUserInstanceRef])

  const getAccountSessionToken = useCallback(async () => {
    const account = webUserInstanceRef.current.getAccount()
    const contextSession = await account.getContextSession(
      VERIDA_VAULT_CONTEXT_NAME
    )

    if (!contextSession) {
      throw new Error("No context session found")
    }

    const stringifiedSession = JSON.stringify(contextSession)
    const sessionToken = Buffer.from(stringifiedSession).toString("base64")
    return sessionToken
  }, [webUserInstanceRef])

  const openDatastore = useCallback(
    async (schemaUrl: string, config?: DatastoreOpenConfig) => {
      logger.info("Opening Verida datastore", {
        schemaUrl,
        config,
      })

      const datastore = await webUserInstanceRef.current.openDatastore(
        schemaUrl,
        config
      )

      logger.info("Verida datastore succesfully opened", {
        schemaUrl,
        config,
      })
      return datastore
    },
    [webUserInstanceRef]
  )

  const contextValue: VeridaContextType = useMemo(
    () => ({
      isReady: isConnected && !!did,
      isConnected,
      isConnecting,
      isDisconnecting,
      did,
      connect,
      disconnect,
      getAccountSessionToken,
      openDatastore,
      webUserInstanceRef,
    }),
    [
      isConnected,
      isConnecting,
      isDisconnecting,
      did,
      connect,
      disconnect,
      getAccountSessionToken,
      openDatastore,
      webUserInstanceRef,
    ]
  )

  return (
    <VeridaContext.Provider value={contextValue}>
      {props.children}
    </VeridaContext.Provider>
  )
}
VeridaProvider.displayName = "VeridaProvider"
