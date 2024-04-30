import { useCallback, useEffect, useState } from "react";
import { useVerida } from "@/features/verida";
import DataConnectorsManager from "@/lib/DataConnectorManager";
import { Connection } from "@/features/connections";
import { Client } from "@verida/client-ts";
import { EnvironmentType } from "@verida/types";

export const useConnect = ({ provider, authParams }: any) => {
  const [connectLoading, setConnectLoading] = useState<boolean>(false);
  const [dcm, setDcm] = useState<DataConnectorsManager>();
  const [connections, setConnections] = useState<Connection[]>([]);
  const { webUserInstanceRef, isConnected } = useVerida();

  const connect = useCallback(
    async (__connectionId: string) => {
      setConnectLoading(true);
      const connection = await dcm?.getConnection(__connectionId);
      const connectionUrl = await connection?.getConnectUrl();

      setConnectLoading(false);
      window.location.href = connectionUrl ?? "";
    },
    [dcm]
  );

  useEffect(() => {
    const authComplete = async () => {
      if (!dcm || !provider) {
        return;
      }
      await dcm?.authComplete(provider, authParams);
    };

    authComplete();
  }, [dcm, provider, authParams]);

  useEffect(() => {
    const init = async () => {
      try {
        if (!isConnected) {
          return;
        }
        // const context = await webUserInstanceRef.current.getClient().openContext('Verida: Data Connector') //await client.openContext('Verida: Data Connector')

        const client = new Client({
          environment: EnvironmentType.MAINNET,
          didClientConfig: {
            network: EnvironmentType.MAINNET,
          },
        })
        // await client.connect(webUserInstanceRef.current.getAccount())
        // const context = await client.openExternalContext('Verida: Data Connector', webUserInstanceRef.current.getDid())
        // const context = await client.openExternalContext('Verida: Data Connector', webUserInstanceRef.current.getDid())
        const context = await webUserInstanceRef.current.getClient().openExternalContext('Verida: Data Connector', webUserInstanceRef.current.getDid())
        // const datastore = await context.openExternalDatastore(
        //   veridaClient,
        //   didOrUsername,
        //   config.veridaOneContextName,
        //   config.schemasURL.profile,
        //   {
        //     permissions: {
        //       write: DatabasePermissionOptionsEnum.OWNER,
        //       read: DatabasePermissionOptionsEnum.PUBLIC,
        //     },
        //     readOnly: true,
        //   }
        // )


        const dcm = new DataConnectorsManager(
          context,
          webUserInstanceRef.current.getDid()
        );
        setDcm(dcm);

        dcm.on("connectionUpdated", async () => {
          console.log("Connection Updated");
          await dcm.triggerSync();
        });

        dcm.on("connectionDisconnectError", () => {
          console.log("Connection Disconnected Error");
        });
        // Get all the available connections
        const connections = await dcm.getConnections();
        setConnections(Object.values(connections));
      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, [isConnected, webUserInstanceRef]);

  return { connect, connections, connectLoading };
};
