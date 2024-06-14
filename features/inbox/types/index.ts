export enum InboxType {
  DATA_SEND = "inbox/type/dataSend",
  DATA_REQUEST = "inbox/type/dataRequest",
  DATASTORE_SYNC = "inbox/type/datastoreSync",
  MESSAGE = "inbox/type/message",
}

export type InboxEntry = {
  _id: string;
  sentAt: Date | string;
  sentBy: InboxSentBy;
  read: boolean;
  message: string;
  type: InboxType;
};

export type InboxSentBy = {
  did: string;
  context: string;
  name: string;
  avatar?: Record<string, any>;
};
