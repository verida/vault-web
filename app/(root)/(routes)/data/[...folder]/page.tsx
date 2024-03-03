'use client'

import Link from "next/link";

import { ArrowLeft } from "@/components/icons/arrow-left";
import { CredentialItem } from "@/components/credential/credential-item";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IDatabase } from "@verida/types";
import { useVerida } from "@/features/verida";
import { DataFolderDefinition, dataFolders } from "@/features/data";
import { Category } from "@/components/category/category";
import { Button } from "@/components/ui/button";

const FolderPage = ({
  params,
}: {
  params: { folder: string[] };
}) => {

  const router = useRouter()
  const [db, setDB] = React.useState<IDatabase | undefined>()
  const [Loading, setLoading] = React.useState(true)
  const { webUserInstanceRef, isConnected, isReady } = useVerida();
  const [folder, setFolder] = React.useState<DataFolderDefinition>()
  const [items, setItems] = React.useState<any[]>([])
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const folderName = params.folder.join('/')
        const folder = dataFolders.find(folder => folder.name === folderName)
        setFolder(folder)
        console.log('folderMName', folderName, folder!.database)
        if (folder?.database) {
          const db = await webUserInstanceRef.current?.openDatabase(
            folder!.database
          )

          setLoading(true)
          // TODO: Add stronger typing
          const fetchedItems = await db?.getMany(
            null, null
          )

          setItems(fetchedItems)

          console.log('fetchedItems', JSON.stringify(fetchedItems, null, 2))

        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }


    }

    isReady && fetchData()

  }, [params.folder, webUserInstanceRef, isReady])

  return (
    <div className="flex-col">
      <Button variant={"ghost"} className="flex gap-5 text-sm font-medium items-center mb-4 h-16" onClick={() => router.back()}><ArrowLeft /> Back</Button>

      <h1 className="text-xl font-medium mb-6">{folder?.title}</h1>
      {folder?.database ?
        <div className="flex flex-col gap-2" >
          <div className="flex p-4 flex-row items-center w-full">
            <p className="text-sm text-gray-500 w-1/4">Name</p>
            <p className="text-sm text-gray-500 w-1/4">Source</p>
            <p className="text-sm text-gray-500 w-1/4">Date</p>
            <p className="text-sm text-gray-500 w-1/4">Credential Status</p>
          </div>
          {items.map((item => <CredentialItem key={item._id} fallbackAvatar="A" href="#" title={item.name} date={new Date(item.insertedAt).getTime()} source="Government of New South Wales" status="valid" />))}

          {/* <CredentialItem logo='/logos/nsw-gov.png' href="#" title="Forklift Driver Licence" date={new Date().getTime()} source="Government of New South Wales" status="valid" />
          <CredentialItem logo='/logos/nsw-gov.png' href="#" title="Forklift Driver Licence" date={new Date().getTime()} source="Government of New South Wales" status="valid" />
          <CredentialItem logo='/logos/nsw-gov.png' href="#" title="Forklift Driver Licence" date={new Date().getTime()} source="Government of New South Wales" status="valid" />
          <CredentialItem logo='/logos/nsw-gov.png' href="#" title="Forklift Driver Licence" date={new Date().getTime()} source="Government of New South Wales" status="valid" /> */}
        </div>
        : folder?.display === 'folders'
          ? <div className="grid grid-cols-4 gap-6">{folder?.folders.map((folderName) => {
            const nestedFolder = dataFolders.find(folder => folder.name === folderName)
            return nestedFolder ? <Category key={nestedFolder.name} icon={nestedFolder.icon} href={`/data/${nestedFolder.name}`} title={nestedFolder.title} description="0 items" /> : null
          })}
          </div>
          : null
      }
    </div>

  );
};

export default FolderPage;
