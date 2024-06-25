"use client";

import { IDatabase } from "@verida/types";
import React from "react";

import { Category } from "@/components/category/category";
import { dataFolders } from "@/features/data";
import { useVerida } from "@/features/verida";

const DataPage = () => {
  const { webUserInstanceRef, isConnected } = useVerida();
  const [db, setDB] = React.useState<IDatabase | undefined>();
  const [Loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFolder = async () => {
      const db = await webUserInstanceRef.current?.openDatabase("credential");

      setDB(db);
    };
  }, [webUserInstanceRef, isConnected]);

  React.useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        // TODO: Add stronger typing
        const fetchedItems = await db?.getMany(null, null);

        console.log("fetchedItems", JSON.stringify(fetchedItems, null, 2));
      } catch (err: any) {
        console.log(err);
        // If the error is caused by a missing index, automatically create the index and try again
        if (err.message?.indexOf("default index")) {
          const matches = err.message?.match(
            // eslint-disable-next-line no-useless-escape
            /Cannot sort on field\(s\) \"([0-9a-zA-Z\.-]+)\" when using the default index/
          );
          const missingIndexName = matches[1];
          const couchDb = await db!.getDb();
          await couchDb.createIndex({
            name: missingIndexName,
            fields: [missingIndexName],
          });

          // try to fetch restuls again with index
          await init();
        }
      } finally {
        setLoading(false);
      }
    };

    // db && init()
  }, [db]);

  return (
    <div className="flex-col pt-10">
      <h1 className="mb-6 text-2xl font-medium">Categories</h1>
      <div className="grid grid-cols-4 gap-6">
        {dataFolders
          .filter((folder) => folder.root)
          .map((folder) => {
            return (
              <Category
                key={folder.name}
                icon={folder.icon}
                href={`/data/${folder.name}`}
                title={folder.title}
                description="0 items"
              />
            );
          })}

        {/* <Category icon={<FolderCredentials />} href="/data/credentials" title="Credentials" description="0 items" /> */}
        {/* <Category icon={<FolderTickets />} href="/data/tickets" title="Tickets" description="0 items" />
        <Category icon={<FolderQualifications />} href="/data/qualifications" title="Qualifications" description="0 items" />
        <Category icon={<FolderNft />} href="/data/nfts" title="NFTs" description="0 items" />

        <Category icon={<FolderLoyalty />} href="/data/loyalty" title="Loyalty" description="0 items" />
        <Category icon={<FolderContacts />} href="/data/contacts" title="Contacts" description="0 items" />
        <Category icon={<FolderHealth />} href="/data/health" title="Health" description="0 items" />
        <Category icon={<FolderIdentity />} href="/data/identity" title="Identity" description="0 items" />

        <Category icon={<FolderSocial />} href="/data/social" title="Social" description="0 items" /> */}
      </div>
    </div>
  );
};

export default DataPage;
