import { StaticImageData } from "next/image";

import { VeridaRecord } from "@/features/verida";

export type DataField = {
  field: string;
  value: unknown;
};

export type DataItem = {
  data: DataField[];
  title: string;
};

export type DataFolderDisplayType = "grid" | "folders" | "cards";

export type DataFolderDefinition = {
  name: string;
  title: string;
  titlePlural?: string;
  icon: React.ReactNode;
  color?: string;
  root: boolean;
  database?: string;
} & (
  | {
      display: "folders";
      folders: string[];
    }
  | {
      display: "grid" | "cards";
      database: string;
      layouts?: {
        list?: string[];
        view?: string[];
      };
      sort?: Record<string, unknown>[];
      fields?: {
        [key: string]: {
          label: string;
        };
      };
      card?: {
        name?: (record: VeridaRecord) => string;
        summary?: (record: VeridaRecord) => string;
      };
      nameField?: string;
      summaryField?: string;
    }
);

export type DataSchema = {
  $schema: string;
  $id: string;
  title: string;
  titlePlural: string;
  description: string;
  type: string;
  appearance: {
    style: {
      color: string;
      icon: string;
    };
  };
  database: {
    name: string;
    indexes: {
      email: string[];
      did: string[];
      name: string[];
    };
  };
  layouts: {
    create: string[];
    view: string[];
  };
  allOf: (
    | { $ref: string }
    | {
        properties: Record<string, { title: string; type: string }>;
        required: string[];
      }
  )[];
  properties: Record<string, { title: string; type: string }>;
};

export type CredentialProvider = {
  name: string;
  image: StaticImageData;
  schema: string;
};

export type Credential = {
  id: string;
  name: string;
  title: string;
  host: string;
  icon: string;
  type: string;
  description: string;
  message: string;
  provider: CredentialProvider;
};

export enum AddCredentialStatus {
  Start,
  Loading,
  Failed,
  Success,
}

export type ZkPassResult = {
  allocatorAddress: string;
  allocatorSignature: string;
  publicFields: any[];
  publicFieldsHash: string;
  taskId: string;
  uHash: string;
  validatorAddress: string;
  validatorSignature: string;
  zkPassSchemaId?: string;
  zkPassSchemaLabel?: string;
};
