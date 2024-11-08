import { type WebUser } from "@verida/web-helpers"

import {
  SendDataRequestData,
  type SendDataRequestOptions,
  SendMessageData,
  type SendSimpleMessageOptions,
  type SentMessage,
  SimpleMessage,
  VeridaMessageType,
} from "@/features/inbox/types"
import { Logger } from "@/features/telemetry"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"

const logger = Logger.create("verida-inbox")

export function getMessaging(veridaWebUser: WebUser) {
  const context = veridaWebUser.getContext()
  return context.getMessaging()
}

export async function sendDataRequest(
  veridaWebUser: WebUser,
  options: SendDataRequestOptions
): Promise<SentMessage | null> {
  const opts: SendDataRequestOptions = Object.assign(
    {
      userSelectLimit: 1,
      userSelect: true,
    },
    options
  )

  logger.info("Getting the DID, Context and Messaging")

  const did = veridaWebUser.getDid()
  const messaging = await getMessaging(veridaWebUser)

  const messageType = VeridaMessageType.DATA_REQUEST

  const dataToSend: SendDataRequestData = {
    requestSchema: opts.requestSchema,
    filter: opts.filter,
    userSelectLimit: opts.userSelectLimit,
    userSelect: opts.userSelect,
  }

  logger.info("Sending data request", { did, messageType, data: dataToSend })

  const sentMessage = await messaging.send(
    did,
    messageType,
    dataToSend,
    opts.messageSubject,
    {
      recipientContextName: VERIDA_VAULT_CONTEXT_NAME,
      did,
    }
  )

  logger.info("Data request sent", { did, messageType, data: dataToSend })

  // The `messaging.sent` function is poorly typed so have to cast
  return sentMessage as SentMessage | null
}

export async function sendMessage(
  veridaWebUser: WebUser,
  options: SendSimpleMessageOptions
) {
  logger.info("Getting the DID, Context and Messaging")

  const userDid = veridaWebUser.getDid()
  const messaging = await getMessaging(veridaWebUser)

  const messageType = VeridaMessageType.SIMPLE_MESSAGE

  const dataToSend: SendMessageData<SimpleMessage> = {
    data: {
      data: [
        {
          message: options.message,
          subject: options.subject,
          link: options.link,
        },
      ],
    },
  }

  const targetDid = options.targetDid || userDid
  const targetContext = options.targetContext || VERIDA_VAULT_CONTEXT_NAME

  logger.info("Sending message", {
    did: userDid,
    targetDid,
    targetContext,
    messageType,
    data: dataToSend,
  })

  const sentMessage = await messaging.send(
    targetDid,
    messageType,
    dataToSend,
    options.messageSubject || options.subject,
    {
      recipientContextName: targetContext,
      did: targetDid,
    }
  )

  logger.info("Message sent", {
    did: userDid,
    targetDid,
    targetContext,
    messageType,
    data: dataToSend,
  })

  // The `messaging.sent` function is poorly typed so have to cast
  return sentMessage as SentMessage | null
}
