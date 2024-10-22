// @todo: Move Verida interfaces into a separate package and import

/**
 * @deprecated
 */
export interface Client {
  openContext(
    contextName: string,
    forceCreate: boolean
  ): Promise<Context | undefined>
  openPublicProfile(did: string, contextName: string): Promise<Profile>
}

/**
 * @deprecated
 */
export interface Context {
  getMessaging(): Promise<Messaging>
  openProfile(profileName: string, did?: string): Promise<Profile | undefined>
  openDatabase(
    databaseName: string,
    options: DatabaseOpenConfig
  ): Promise<Database>
  openDatastore(
    schemaName: string,
    config: DatastoreOpenConfig
  ): Promise<Datastore>
}

/**
 * @deprecated
 */
export interface Profile {
  get(key: string, options?: any, extended?: boolean): Promise<any | undefined>
  getMany(filter: any, options: any): Promise<any>
  delete(key: string): Promise<void>
  set(doc: Document | string, value: any): Promise<any>
  listen(callback: any): Promise<any>
}

/**
 * @deprecated
 */
export interface Messaging {
  send(
    did: string,
    type: string,

    data: object,
    message: string,
    config?: MessageSendConfig
  ): Promise<object | null>
  onMessage(callback: any): void

  getMessages(filter: object, options: any): Promise<any>
  getInbox(): Promise<any>
}

/**
 * @deprecated
 */
export interface DatabaseOpenConfig {
  permissions?: PermissionsConfig
  did?: string
  dsn?: string
  saveDatabase?: boolean
  readOnly?: boolean
  isOwner?: boolean
  encryptionKey?: string
  createContext?: boolean
}

/**
 * @deprecated
 */
export interface DatastoreOpenConfig {
  permissions?: PermissionsConfig
  did?: string
  saveDatabase?: boolean
  readOnly?: boolean
  encryptionKey?: string
  databaseName?: string
  createContext?: boolean
}

/**
 * @deprecated
 */
export interface MessagesConfig {
  maxItems?: number
}

/**
 * @deprecated
 */
export interface StorageEngineTypes {
  [key: string]: any
}

/**
 * @deprecated
 */
export interface PermissionsConfig {
  read: PermissionOptionsEnum
  write: PermissionOptionsEnum
  readList?: string[]
  writeList?: string[]
}

/**
 * @deprecated
 */
export enum PermissionOptionsEnum {
  OWNER = "owner",
  PUBLIC = "public",
  USERS = "users",
}

/**
 * @deprecated
 */
export interface MessageSendConfig {
  recipientContextName?: string
  expiry?: number
}

/**
 * @deprecated
 */
export interface Datastore {
  save: (payload: any) => Document
  get: (key: string, options?: any) => Document
  delete: (key: string) => void
  getMany: (filter: any, options?: any) => Document[]
  getDb: () => Database
  errors: []
}

/**
 * @deprecated
 */
export interface Database {
  save: (payload: any) => Document
  get: (key: string, options?: any) => Document
  delete: (key: string) => void
  getMany: (filter: any, options?: any) => Document[]
  getInstance: () => any
  errors: []
}

/**
 * @deprecated
 */
export interface Document {
  _id: string
  _rev?: string
  key: string
  value?: any
}

//export interface CouchDB {
//  changes: (options: any) => any
//  // eslint-disable-next-line @typescript-eslint/ban-types
//  get: (docId: string, options?: any, callback?: Function) => any
//}
