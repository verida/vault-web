'use client'

import Link from "next/link";

import { ArrowLeft } from "@/components/icons/arrow-left";
import { CredentialItem } from "@/components/credential/credential-item";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IDatabase } from "@verida/types";
import { useVerida } from "@/features/verida";
import { DataFolderDefinition, dataFolders } from "@/features/data";
import { Category } from "@/components/category/category";
import { Button } from "@/components/ui/button";


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { getPublicProfile } from "@/features/profiles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const FolderPage = ({
  params,
}: {
  params: { folder: string[] };
}) => {

  const router = useRouter()
  const [db, setDB] = React.useState<IDatabase | undefined>()
  const [loading, setLoading] = React.useState(true)
  const { webUserInstanceRef, isConnected, isReady } = useVerida();
  const [folder, setFolder] = React.useState<DataFolderDefinition>()
  const [items, setItems] = React.useState<any[]>([])
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const itemId = searchParams.get('id')
  const selectedItem = items?.find(it => it._id === itemId)

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

    isConnected && fetchData()

  }, [params.folder, webUserInstanceRef, isConnected])

  console.log('Selected item', JSON.stringify(selectedItem, null, 2))


  const [issuer, setIssuer] = React.useState({})

  React.useEffect(() => {
    function parseJwt(token: string) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      console.log('parseJwt', JSON.parse(jsonPayload))
      return JSON.parse(jsonPayload);
    }

    async function fetchIssuerProfile(did: string) {
      // TODO: make the call to API work so we have a server cache for public profiles
      // const res = await fetch('/api/profile/' + dat.iss) 
      // console.log('profile', await res.json())
      const profile = await getPublicProfile(did)
      setIssuer(profile)
    }

    selectedItem?.didJwtVc && fetchIssuerProfile(parseJwt(selectedItem.didJwtVc)?.iss)
  }, [selectedItem])


  return (
    <div className="flex-col">
      <Button variant={"ghost"} className="flex gap-5 text-sm font-medium items-center mb-4 h-16" onClick={() => router.push(pathName.split('/').slice(0, -1).join('/'))}><ArrowLeft /> Back</Button>

      <h1 className="text-xl font-medium mb-6">{folder?.title}</h1>

      {loading ? <div className="flex w-full flex-col gap-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div> :
        folder?.database ?
          <div className="flex flex-col gap-2" >
            <div className="flex p-4 flex-row items-center w-full">
              <p className="text-sm text-gray-500 w-1/4">Name</p>
              <p className="text-sm text-gray-500 w-1/4">Source</p>
              <p className="text-sm text-gray-500 w-1/4">Date</p>
              <p className="text-sm text-gray-500 w-1/4">Credential Status</p>
            </div>
            {items.map((item => <CredentialItem key={item._id} credential={item.didJwtVc} fallbackAvatar="" href={`?id=${item._id}`} title={item.name} date={new Date(item.insertedAt).getTime()} source="Government of New South Wales" status="valid" />))}
          </div>
          : folder?.display === 'folders'
            ? <div className="grid grid-cols-4 gap-6">{folder?.folders.map((folderName) => {
              const nestedFolder = dataFolders.find(folder => folder.name === folderName)
              return nestedFolder ? <Category key={nestedFolder.name} icon={nestedFolder.icon} href={`/data/${nestedFolder.name}`} title={nestedFolder.title} description="0 items" /> : null
            })}
            </div>
            : null
      }


      <Drawer direction="right" open={Boolean(itemId)} onClose={() => {
        router.push(pathName)
      }}>
        <DrawerContent >
          <DrawerHeader className="border-b-2">
            <div className="flex gap-2 items-center">
              <Avatar>
                {issuer?.avatar?.uri && <AvatarImage src={issuer?.avatar?.uri} asChild><Image src={issuer?.avatar?.uri} width={40} height={40} alt="Issuer avatar" /></AvatarImage>}
                <AvatarFallback />
              </Avatar>
              <p className="text-sm text-wrap">{issuer?.name}</p>
            </div>
          </DrawerHeader>
          {loading && <div className="flex w-full flex-col gap-4">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>}

          {selectedItem &&
            <div className="flex flex-col">
              {
                selectedItem.credentialData ?
                  Object.entries(selectedItem.credentialData).map(entry =>
                    <div key={entry[0]} className="flex gap-4 px-4 py-4 justify-between">
                      <p className="text-muted-foreground">{entry[0]}</p>
                      <p>{entry[1]}</p>
                    </div>)
                  :
                  <>
                    <div className="flex gap-4 px-4 py-4 justify-between">
                      <p className="text-muted-foreground">Name</p>
                      <p>{selectedItem.name}</p>
                    </div>
                    <div className="flex gap-4 px-4 py-4 justify-between">
                      <p className="text-muted-foreground">Email</p>
                      <p>{selectedItem.email}</p>
                    </div>
                  </>
              }
            </div>
          }
        </DrawerContent>

      </Drawer>
    </div>

  );
};

export default FolderPage;
