"use client"

import { type DatastoreOpenConfig, type IDatastore } from "@verida/types"
import { WebUser } from "@verida/web-helpers"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { clientConfig } from "@/config/client"
import { getPublicProfile } from "@/features/profiles"
import { PublicProfile } from "@/features/profiles/@types"
import { Logger } from "@/features/telemetry"
import {
  CLEAR_SESSION_AFTER_MAINNET_UPGRADE_LOCAL_STORAGE_KEY,
  VERIDA_CONNECT_SESSION_LOCAL_STORAGE_KEY,
  VERIDA_VAULT_CONTEXT_NAME,
} from "@/features/verida/constants"

const logger = Logger.create("Verida")

const webUserInstance = new WebUser({
  debug: clientConfig.DEBUG_MODE,
  clientConfig: {
    environment: clientConfig.VERIDA_NETWORK,
    didClientConfig: {
      network: clientConfig.VERIDA_NETWORK,
      rpcUrl: clientConfig.VERIDA_RPC_URL,
    },
  },
  contextConfig: {
    name: VERIDA_VAULT_CONTEXT_NAME,
  },
  accountConfig: {
    request: {
      logoUrl: `${clientConfig.BASE_URL}/images/verida_vault_logo_for_connect.png`,
    },
    environment: clientConfig.VERIDA_NETWORK,
  },
})

type VeridaContextType = {
  webUserInstanceRef: React.MutableRefObject<WebUser>
  isReady: boolean
  isConnected: boolean
  isConnecting: boolean
  isDisconnecting: boolean
  isCheckingConnection: boolean
  did: string | undefined
  profile?: PublicProfile
  connect: () => Promise<boolean>
  disconnect: () => Promise<void>
  openDatastore: (
    schemaUrl: string,
    config?: DatastoreOpenConfig
  ) => Promise<IDatastore>
}

export const VeridaContext = React.createContext<VeridaContextType | null>(null)

type VeridaProviderProps = {
  children?: React.ReactNode
}

export const VeridaProvider: React.FunctionComponent<VeridaProviderProps> = (
  props
) => {
  const webUserInstanceRef = useRef(webUserInstance)

  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const [isCheckingConnection, setIsCheckingConnection] = useState(false)
  const [did, setDid] = useState<string>()
  const [profile, setProfile] = useState<PublicProfile>()

  const updateStates = useCallback(async () => {
    // isConnected
    const newIsConnected = webUserInstance.isConnected()
    setIsConnected(newIsConnected)
    // logger.info(
    //   newIsConnected
    //     ? "User is connected to Verida"
    //     : "User is not connected to Verida"
    // );

    setIsConnecting(false)
    setIsDisconnecting(false)
    setIsCheckingConnection(false)

    // If not connected, no need to continue, just clear everything
    if (!newIsConnected) {
      // Sentry.setUser(null);
      setDid(undefined)
      setProfile(undefined)
      return
    }

    try {
      const newDid = webUserInstance.getDid()
      setDid(newDid)
      // Sentry.setUser({ id: newDid });
    } catch (_error: unknown) {
      // Only error is if user not connected which is prevented by above check
      // Sentry.setUser(null);
      setDid(undefined)
    }

    //getPublicProfile
    try {
      const newProfile = await getPublicProfile(webUserInstance.getDid())
      logger.debug("Profile", newProfile)
      setProfile(newProfile)
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message !== "Not connected to Verida Network"
      ) {
        setProfile(undefined)
      } else {
        logger.error(error)
      }
    }
  }, [])

  const veridaEventListener = useCallback(() => {
    void updateStates()
  }, [updateStates])

  useEffect(() => {
    logger.info("Initialising the Verida client")
    webUserInstance.addListener("connected", veridaEventListener)
    webUserInstance.addListener("profileChanged", veridaEventListener)
    webUserInstance.addListener("disconnected", veridaEventListener)

    const autoConnect = async () => {
      // Clear the potential Testnet sessions after the Mainnet upgrade
      const clearedSession = localStorage.getItem(
        CLEAR_SESSION_AFTER_MAINNET_UPGRADE_LOCAL_STORAGE_KEY
      )
      if (!clearedSession || clearedSession !== "true") {
        localStorage.removeItem(VERIDA_CONNECT_SESSION_LOCAL_STORAGE_KEY)
        localStorage.setItem(
          CLEAR_SESSION_AFTER_MAINNET_UPGRADE_LOCAL_STORAGE_KEY,
          "true"
        )
      }

      setIsCheckingConnection(true)
      await webUserInstanceRef.current.autoConnectExistingSession()
      // Will trigger a 'connected' event if already connected and therefore update the states
      setIsCheckingConnection(false)
    }
    void autoConnect()

    return () => {
      logger.info("Cleaning the Verida client")
      webUserInstance.removeAllListeners()
    }
  }, [updateStates, veridaEventListener])

  // Exposing common methods for easier access than through the ref
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

    return connected
  }, [webUserInstanceRef])

  const disconnect = useCallback(async () => {
    logger.info("User disconnecting from Verida")

    setIsDisconnecting(true)
    await webUserInstanceRef.current.disconnect()
    setIsDisconnecting(false)

    logger.info("User successfully disconnected from Verida")
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
      isReady: isConnected && !!did && !!profile,
      isConnected,
      isConnecting,
      isDisconnecting,
      isCheckingConnection,
      did,
      connect,
      disconnect,
      openDatastore,
      profile,
      webUserInstanceRef,
    }),
    [
      isConnected,
      isConnecting,
      isDisconnecting,
      isCheckingConnection,
      did,
      connect,
      disconnect,
      openDatastore,
      profile,
      webUserInstanceRef,
    ]
  )

  return (
    <VeridaContext.Provider value={contextValue}>
      {props.children}
    </VeridaContext.Provider>
  )
}
