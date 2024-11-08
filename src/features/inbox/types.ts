export enum InboxType {
  DATA_SEND = "inbox/type/dataSend",
  DATA_REQUEST = "inbox/type/dataRequest",
  DATASTORE_SYNC = "inbox/type/datastoreSync",
  MESSAGE = "inbox/type/message",
}

export type InboxEntry = {
  _id: string
  data: any
  sentAt: Date | string
  sentBy: InboxSentBy
  read: boolean
  message: string
  type: InboxType
}

export type InboxSentBy = {
  did: string
  context: string
}

export enum VeridaMessageType {
  SIMPLE_MESSAGE = "inbox/type/message",
  DATA_REQUEST = "inbox/type/dataRequest",
}

export type SimpleMessage = {
  subject: string
  message: string
  link?: {
    url: string
    text: string
  }
}

export type SendMessageData<D> = {
  data: {
    data: D[]
  }
}

export type SendSimpleMessageOptions = SimpleMessage & {
  messageSubject?: string
  targetDid?: string
  targetContext?: string
}

export type SendDataRequestData = {
  requestSchema: string
  filter?: Record<string, unknown>
  userSelectLimit?: number
  userSelect?: boolean
}

export type SendDataRequestOptions = SendDataRequestData & {
  messageSubject: string
}

export type SentMessage = {
  id: string
  ok: boolean
  rev: string
}

export type ReceivedMessage<D> = {
  type: VeridaMessageType
  read: boolean
  sentAt: string
  message: string
  sentBy: {
    context: string
    did: string
  }
  data: {
    data: D[]
    replyId?: string
  }
}
