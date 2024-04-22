import { DatabasePermissionOptionsEnum, IContext, IDatastore } from '@verida/types'
import axios from 'axios'
import EventEmitter from 'events'
import moment from 'moment'

const DATA_CONNECTION_SCHEMA =
    'https://vault.schemas.verida.io/data-connections/connection/v0.1.0/schema.json'
// const DATA_PROFILE_SCHEMA =
//   'https://vault.schemas.verida.io/data-connections/profile/v0.1.0/schema.json'
// const DATA_SOURCE_SCHEMA =
//   'https://vault.schemas.verida.io/data-connections/source/v0.1.0/schema.json'
const DATA_SYNC_REQUEST_SCHEMA =
    'https://vault.schemas.verida.io/data-connections/sync-request/v0.1.0/schema.json'

const delay = async (ms: number) => {
    await new Promise((resolve: any) => setTimeout(() => resolve(), ms))
}

let CONNECTION_CACHE: any

const DATA_CONNECTOR_URL = 'http://127.0.0.1:5021'
const RETRY_INTERVAL = 5000
const RETRY_LIMIT = 10

// possible states for status: syncing, disabled, active

class DataConnectorsEvents extends EventEmitter {
    private static instance: DataConnectorsEvents

    private constructor() {
        super()
    }

    static getInstance() {
        if (!DataConnectorsEvents.instance) {
            DataConnectorsEvents.instance = new DataConnectorsEvents()
        }
        return DataConnectorsEvents.instance
    }
}

/**
 * 
 */
export default class DataConnectorsManager {
    private datastore?: IDatastore
    private connections: any = {}
    private context: IContext
    private did: string

    public constructor(context: IContext, did: string) {
        this.context = context
        this.did = did
    }

    public async emit(eventName: string, args: any) {
        DataConnectorsEvents.getInstance().emit(eventName, args)
    }

    public async on(eventName: string, fn: any) {
        DataConnectorsEvents.getInstance().on(eventName, fn)
    }

    public async off(eventName: string, fn: any) {
        DataConnectorsEvents.getInstance().off(eventName, fn)
    }

    public async authComplete(connectorName: string, requestParams: any) {
        const connection = await this.getConnection(connectorName)
        await connection.setAuth(requestParams)
        await connection.sync()
    }

    public getContext(): IContext {
        return this.context
    }

    public async getDatastore(): Promise<IDatastore> {
        if (this.datastore) {
            return this.datastore
        }

        this.datastore = await this.context.openDatastore(
            DATA_CONNECTION_SCHEMA
        )

        return this.datastore
    }

    public async getConnections(): Promise<Record<string, any>> {
        if (CONNECTION_CACHE) {
            return CONNECTION_CACHE
        }

        // @todo cache
        const response = await axios.get(`${DATA_CONNECTOR_URL}/providers`)
        CONNECTION_CACHE = response.data
        return CONNECTION_CACHE
    }

    public async getConnectionInfo(connectorName: string) {
        const CONNECTIONS = await this.getConnections()
        return CONNECTIONS[connectorName]
    }

    public async getConnection(connectorName: string): Promise<DataConnection> {
        if (this.connections[connectorName]) {
            return this.connections[connectorName]
        }

        const connectionInfo = await this.getConnectionInfo(
            connectorName
        )

        const connector = new DataConnection(
            this,
            connectorName,
            connectionInfo.icon,
            connectionInfo.label,
            this.did
        )
        await connector.init()

        this.connections[connectorName] = connector
        return connector
    }

    public async getConnectors(): Promise<Record<string, DataConnection>> {
        const connections: any = Object.values(
            await this.getConnections()
        )
        const connectors: any = {}
        for (let i = 0; i < connections.length; i++) {
            const connection = await this.getConnection(
                connections[i].name
            )
            connectors[connection.name] = connection
        }

        return connectors
    }

    public async resetConnector() {
        const connections: any = Object.values(
            await this.getConnections()
        )
        for (let i = 0; i < connections.length; i++) {
            if (
                this.connections[connections[i].name].syncStatus !==
                'disabled'
            ) {
                this.connections[connections[i].name].disconnect()
            }
        }
    }

    public async triggerSync() {
        const connections = await this.getConnectors()
        const now = moment().unix()

        for (const connectorName in connections) {
            const connection = connections[connectorName]
            if (
                connection.syncStatus !== 'active' &&
                connection.syncStatus !== 'error'
            ) {
                continue
            }

            if (!connection.syncNext) {
                connection.sync()
            }

            const next = moment(connection.syncNext).unix()
            if (next < now) {
                connection.sync()
            }
        }
    }
}

class DataConnection extends EventEmitter {
    private manager: DataConnectorsManager

    private did: string
    private _init = false

    private _datastore?: any
    private _record?: any
    private profile?: any

    public name: string
    public label: string

    public _rev?: string
    public encryptionKey?: string
    public accessToken?: string
    public refreshToken?: string
    public source?: string
    public syncFrequency?: moment.unitOfTime.DurationConstructor
    public syncLast?: string
    public syncNext?: string
    public syncLastError?: string
    public syncPosition?: string
    public syncStatus?: string // active, paused, disabled, processing
    public metadata?: any
    public icon?: any

    constructor(manager: DataConnectorsManager, name: string, icon: string, label: string, did: string) {
        super()
        this.manager = manager
        this.name = this.source = name
        this.syncStatus = 'disabled'
        this.icon = icon
        this.label = label
        this.syncFrequency = 'hour'
        this.did = did
    }

    public async getConnectUrl() {
        return `${DATA_CONNECTOR_URL}/connect/${this.source}?did=${this.did}&key=${this.encryptionKey}&redirect=http://localhost:3000/connections`
    }

    public async save(): Promise<any> {
        await this.init()

        // This is ugly AF!
        this._record.accessToken = this.accessToken
        this._record.refreshToken = this.refreshToken
        this._record.syncStatus = this.syncStatus
        this._record.syncLast = this.syncLast
        this._record.syncLastError = this.syncLastError
        this._record.syncFrequency = this.syncFrequency
        this._record.syncNext = this.syncNext
        this._record.syncPosition = this.syncPosition
        this._record.encryptionKey = this.encryptionKey

        try {
            const result = await this._datastore.save(this._record)
            this._rev = this._record._rev = result.rev
            if (!result) {
                // TODO: Handle this._datastore.errors
                return result
            }

            this.emit('connectionUpdated', this)

            return result
        } catch (error: any) {
            console.log('Save connection error', error.message)
        }
    }

    public async setAuth(auth: any) {
        await this.init()
        this.accessToken = auth.accessToken
        if (auth.refreshToken) {
            this.refreshToken = auth.refreshToken
        }

        this.syncStatus = 'active'
        await this.save()
    }

    public async init() {
        if (this._init) {
            return
        }

        this._datastore = await this.manager.getDatastore()

        // @todo: if it doesn't exist, create it
        try {
            this._record = await this._datastore.get(this.name)

            this.profile = this._record.profile

            const record = this._record

            Object.keys(this._record).forEach((key) => {
                if (key === 'profile') return

                // TODO: Strictly type the _record field to be
                //       Omit<keyof DataConnection, 'profile'>.
                // @ts-expect-error This is a dangerous assignment as we do not have
                //                  strict guidelines as to what the keyof record is.
                this[key] = record[key]
            })
        } catch (err: any) {
            if (err.name === 'not_found') {
                // Set the encryption key to the same encryption key as the connection database
                // In the future this could be a randomly generated key
                const db = await this._datastore.getDb()
                const info = await db.info()
                this.encryptionKey = Buffer.from(info.encryptionKey).toString('hex')
                this.source = this.name
                this._record = {
                    _id: this.name,
                    name: this.name,
                    source: this.source,
                    encryptionKey: this.encryptionKey,
                }
            } else {
                throw err
            }
        }

        this._init = true
    }

    public async setSyncError(message: string) {
        this.syncLastError = message
        this.syncLast = new Date().toISOString()
        this.syncStatus = 'error'
        this.syncNext = moment().add(1, this.syncFrequency).toISOString()
        await this.save()
    }

    public async sync(): Promise<void> {
        if (this.syncStatus === 'processing') {
            // @todo: check if the sync has been processing for more than 10 minutes, then reset
            return
        }

        // logger.debug(`Syncing ${this.name}!`)

        const accessToken = this.accessToken
        const refreshToken = this.refreshToken

        this.syncLastError = undefined
        this.syncStatus = 'processing'
        this.emit('connectionUpdated', this)

        try {
            // Request the server to sync the third party connector data into a collection of encrypted datastores
            const axiosInstance = axios.create()

            // @todo: handle errors
            const syncRequestResult = await axiosInstance.get(
                `${DATA_CONNECTOR_URL}/sync/${this.name}?accessToken=${accessToken}&refreshToken=${refreshToken}&did=${this.did}&key=${this.encryptionKey}`
            )
            const { serverDid, contextName, syncRequestId, syncRequestDatabaseName } =
                syncRequestResult.data

            this.checkSync(
                serverDid,
                contextName,
                syncRequestId,
                syncRequestDatabaseName
            )
        } catch (error: any) {
            console.log(error.message)
            if (error instanceof Error) {
                this.setSyncError(error.message)
            }
        }
    }

    public async checkSync(
        serverDid: string,
        contextName: string,
        syncRequestId: string,
        syncRequestDatabaseName: string,
        retryCount: number = RETRY_LIMIT
    ) {
        const encryptionKey = Buffer.from(
            this.encryptionKey ? this.encryptionKey : '',
            'hex'
        )

        try {
            const externalDatastore = await this.manager.getContext().openExternalDatastore(
                DATA_SYNC_REQUEST_SCHEMA,
                serverDid,
                {
                    permissions: {
                        read: DatabasePermissionOptionsEnum.USERS,
                        write: DatabasePermissionOptionsEnum.USERS,
                        readList: this.did ? [this.did] : [],
                        writeList: this.did ? [this.did] : [],
                    },
                    // @ts-ignore (incorrect type fixed in next release)
                    encryptionKey,
                    databaseName: syncRequestDatabaseName,
                    contextName,
                }
            )

            const syncRequest = await externalDatastore.get(syncRequestId, undefined)

            if (syncRequest.status === 'complete') {
                // Sync has completed on the server
                // Complete the sync by replicating data from the server
                await this.syncReplication(serverDid, contextName, syncRequest)
            } else {
                if (retryCount === 0) {
                    // Retry count limit hit
                    this.setSyncError('Timeout waiting for server')
                    return
                }

                if (syncRequest.status === 'error') {
                    // Error syncing from API
                    this.setSyncError(`API error: ${syncRequest.syncInfo.error}`)
                    return
                }

                // Delay for five seconds, then try again
                await delay(RETRY_INTERVAL)
                retryCount--

                this.checkSync(
                    serverDid,
                    contextName,
                    syncRequestId,
                    syncRequestDatabaseName,
                    retryCount
                )
            }
        } catch (error: any) {
            console.log(error.message)
            // @todo: Set error on this connection
            if (error instanceof Error) {
                this.setSyncError(error.message)
            }
        }
    }

    /**
     * Replicate data from the Data Connector Server into the users vault.
     *
     * This is triggered when the Data Connector Server updates the sync status to
     * `complete`
     */
    public async syncReplication(
        serverDid: string,
        contextName: string,
        syncRequest: any
    ) {
        const { schemas, newAuth } = syncRequest.syncInfo

        try {
            // Datastores are now available for syncing into the vault, let's sync them!

            // Loop through all the schemaUri's (that correspond to a given datastore)
            for (const schemaUri in schemas) {
                // Open the external datastore
                const { databaseName, encryptionKey } = schemas[schemaUri]
                const key = Buffer.from(encryptionKey, 'hex')

                const externalDatastore = await this.manager.getContext().openExternalDatastore(
                    schemaUri,
                    serverDid,
                    {
                        permissions: {
                            read: DatabasePermissionOptionsEnum.USERS,
                            write: DatabasePermissionOptionsEnum.USERS,
                            readList: this.did ? [this.did] : [],
                            writeList: this.did ? [this.did] : [],
                        },
                        // @ts-ignore (incorrect type fixed in next release)
                        encryptionKey: key,
                        databaseName,
                        contextName,
                    }
                )

                // In order to sync we need to locate the underlying PouchDb instances
                // for the Vault's datastore and the connector's datastore
                const externalDb = await externalDatastore?.getDb()
                const externalCouch = await externalDb?.getDb()

                const vaultDatastore = await this.manager.getContext().openDatastore(schemaUri)
                const vaultDb = await vaultDatastore.getDb()
                const vaultCouch = await vaultDb.getDb()

                // Replicate (pull) data from the connector's datastore to this user's Vault datastore
                try {
                    // logger.debug(`Starting replication ${schemaUri}`)
                    await externalCouch.replicate.to(vaultCouch, {
                        // Don't replicate design documents (such as permissions)
                        filter: (doc: any) => {
                            return doc._id.indexOf('_design') !== 0
                        },
                        // This ensures that if there is a conflict between the documents, the "latest" wins
                        style: 'main_only',
                    })
                } catch (error: any) {
                    console.log(error.message)
                    if (error instanceof Error) {
                        this.setSyncError(error.message)
                    }
                    return
                }
            }

            // cleanup by calling sync done to the server so the temporary data can be deleted
            const axiosInstance = axios.create()
            await axiosInstance.get(
                `${DATA_CONNECTOR_URL}/syncDone/${this.name}?did=${this.did}`
            )

            this.syncLast = new Date().toISOString()
            this.syncLastError = undefined
            this.syncStatus = 'active'
            this.syncNext = moment().add(1, this.syncFrequency).toISOString()

            if (newAuth) {
                this.accessToken = newAuth.accessToken
                this.refreshToken = newAuth.refreshToken
            }

            await this.save()
            // logger.debug(`Sync done and sync status updated`)
        } catch (error: any) {
            console.log(error.message)
            // @todo: How to handle?
        }
    }

    // @todo: Disconnect a connector so it stops syncing
    public async disconnect() {
        // logger.debug(`Disconnect ${this.name}`)
        const syncStatus = this.syncStatus
        this.syncStatus = 'disabled'
        const success = await this.save()

        if (!success) {
            this.syncStatus = syncStatus
            // @todo: display something
            this.emit('connectionDisconnectError', this)
        } else {
            this.emit('connectionUpdated', this)
        }
    }

    public render() {
        return {
            icon: this.icon,
            label: this.label,
            syncStatus: this.syncStatus,
            name: this.name,
        }
    }

    public duration(val: any) {
        const now = moment(new Date())
        return moment.duration(now.diff(moment(val)))
    }
}
