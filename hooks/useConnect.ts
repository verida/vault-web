import { useCallback, useEffect, useState } from "react";
import { useVerida } from "@/features/verida";
import DataConnectorsManager from "@/lib/DataConnectorManager";
import { Connection } from "@/features/connections";

export const useConnect = () => {
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
      window.open(connectionUrl ?? "", "__blank");
    },
    [dcm]
  );

  useEffect(() => {
    const init = async () => {
      try {
        if (!isConnected) {
          return;
        }
        const context = webUserInstanceRef.current?.getContext();
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
