'use client'

import React from "react";

import { Category } from "@/components/category/category";
import { FolderCredentials } from "@/components/icons/folder-credentials";
import { FolderTickets } from "@/components/icons/folder-tickets";
import { FolderQualifications } from "@/components/icons/folder-qualifications";
import { FolderNft } from "@/components/icons/folder-nft";
import { FolderLoyalty } from "@/components/icons/folder-loyalty";
import { FolderContacts } from "@/components/icons/folder-contacts";
import { FolderHealth } from "@/components/icons/folder-health";
import { FolderIdentity } from "@/components/icons/folder-identity";
import { FolderSocial } from "@/components/icons/folder-social";
import { useVerida } from "@/features/verida";
import { IDatabase } from "@verida/types";
import { dataFolders } from "@/features/data";

const DataPage = () => {
  const { webUserInstanceRef, isConnected } = useVerida();
  const [db, setDB] = React.useState<IDatabase | undefined>()
  const [Loading, setLoading] = React.useState(true)


  React.useEffect(() => {
    const x = async () => {
      console.log('22222 Open DB Credentials', webUserInstanceRef.current)

      const db = await webUserInstanceRef.current?.openDatabase(
        'credential'
      )

      console.log('DB', db)

      setDB(db)
    }

    isConnected && x()

  }, [webUserInstanceRef, isConnected])


  React.useEffect(() => {
    const init = async () => {
      try {
        setLoading(true)
        // TODO: Add stronger typing
        const fetchedItems = await db?.getMany(
          null, null
        )

        console.log('fetchedItems', JSON.stringify(fetchedItems, null, 2))
      } catch (err: any) {

        console.log(err)
        // If the error is caused by a missing index, automatically create the index and try again
        if (err.message?.indexOf('default index')) {
          const matches = err.message?.match(
            // eslint-disable-next-line no-useless-escape
            /Cannot sort on field\(s\) \"([0-9a-zA-Z\.-]+)\" when using the default index/
          )
          const missingIndexName = matches[1]
          const couchDb = await db!.getDb()
          await couchDb.createIndex({
            name: missingIndexName,
            fields: [missingIndexName],
          })

          // try to fetch restuls again with index
          await init()
        }
      } finally {
        setLoading(false)
      }
    }

    // db && init()
  }, [db])



  return (
    <div className="flex-col pt-10">
      <h1 className="text-2xl font-medium mb-6">Categories</h1>
      <div className="grid grid-cols-4 gap-6">

        {dataFolders.filter(folder => folder.root).map(folder => {
          return (
            <Category key={folder.name} icon={folder.icon} href={`/data/${folder.name}`} title={folder.title} description="0 items" />
          )
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
