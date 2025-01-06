/**
 * @deprecated
 */
export enum InboxType {
  DATA_SEND = "inbox/type/dataSend",
  DATA_REQUEST = "inbox/type/dataRequest",
  DATASTORE_SYNC = "inbox/type/datastoreSync",
  MESSAGE = "inbox/type/message",
}

/**
 * @deprecated
 */
export type InboxEntry = {
  _id: string
  data: any
  sentAt: Date | string
  sentBy: InboxSentBy
  read: boolean
  message: string
  type: InboxType
}

/**
 * @deprecated
 */
export type InboxSentBy = {
  did: string
  context: string
}
