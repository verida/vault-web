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
export interface Inbox {
  save: (data: InboxEntry) => void
  errors: any[]
}

/**
 * @deprecated
 */
export interface InboxEntry {
  _id: string
  read: boolean
  type: InboxType
  sentBy: InboxSentBy
  schema: string
  data: any
}

/**
 * @deprecated
 */
export interface InboxSentBy {
  did: string
  context: string
}

/**
 * @deprecated
 */
export class InboxResponse {
  public data: any | null
  public replyId: string

  constructor(id: string) {
    this.replyId = id
    this.data = null
  }
}

/**
 * @deprecated
 */
export interface EncryptionKey {
  key: string
  type: string
}

/**
 * @deprecated
 */
export interface InboxDataSyncExternalDb {
  name: string
  did: string
  context: string
  encryptionKey: EncryptionKey
}

/**
 * @deprecated
 */
export interface InboxDataSyncInternalDb {
  name: string
}

/**
 * @deprecated
 */
export interface InboxDatabaseSyncRequest {
  externalDb: InboxDataSyncExternalDb
  internalDb: InboxDataSyncInternalDb
  schemas: string[]
  filter: Record<string, unknown>
  direction: string
  status: string
}

/**
 * @deprecated
 */
export interface InboxDataSyncExternalDs {
  did: string
  context: string
  encryptionKey: EncryptionKey
  dbName?: string
}

/**
 * @deprecated
 */
export interface InboxDatastoreSyncRequest {
  externalDs: InboxDataSyncExternalDs
  schema: string
  filter: Record<string, unknown>
  direction: string
  status: string
}
