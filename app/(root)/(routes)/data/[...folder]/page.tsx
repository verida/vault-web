"use client";

import { IDatabase } from "@verida/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Category } from "@/components/category/category";
import { CredentialItem } from "@/components/credential/credential-item";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { DataFolderDefinition, dataFolders } from "@/features/data";
import { getPublicProfile } from "@/features/profiles";
import { useVerida } from "@/features/verida";

const FolderPage = ({ params }: { params: { folder: string[] } }) => {
  const router = useRouter();
  const [db, setDB] = React.useState<IDatabase | undefined>();
  const [loading, setLoading] = React.useState(true);
  const { webUserInstanceRef, isConnected, isReady } = useVerida();
  const [folder, setFolder] = React.useState<DataFolderDefinition>();
  const [items, setItems] = React.useState<any[]>([]);
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const itemId = searchParams.get("id");
  const selectedItem = items?.find((it) => it._id === itemId);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const folderName = params.folder.join("/");
        const folder = dataFolders.find((folder) => folder.name === folderName);
        setFolder(folder);
        console.log("folderMName", folderName, folder!.database);
        if (folder?.database) {
          const db = await webUserInstanceRef.current?.openDatabase(
            folder!.database
          );

          setLoading(true);
          // TODO: Add stronger typing
          const fetchedItems = await db?.getMany(null, null);

          setItems(fetchedItems);

          console.log("fetchedItems", JSON.stringify(fetchedItems, null, 2));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    isConnected && fetchData();
  }, [params.folder, webUserInstanceRef, isConnected]);

  console.log("Selected item", JSON.stringify(selectedItem, null, 2));

  const [issuer, setIssuer] = React.useState({});

  React.useEffect(() => {
    function parseJwt(token: string) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      console.log("parseJwt", JSON.parse(jsonPayload));
      return JSON.parse(jsonPayload);
    }

    async function fetchIssuerProfile(did: string) {
      // TODO: make the call to API work so we have a server cache for public profiles
      // const res = await fetch('/api/profile/' + dat.iss)
      // console.log('profile', await res.json())
      const profile = await getPublicProfile(did);
      setIssuer(profile);
    }

    selectedItem?.didJwtVc &&
      fetchIssuerProfile(parseJwt(selectedItem.didJwtVc)?.iss);
  }, [selectedItem]);

  return (
    <div className="flex-col">
      <Button
        variant="secondary"
        className="mb-4 flex h-16 items-center gap-5 text-sm font-medium"
        onClick={() => router.push(pathName.split("/").slice(0, -1).join("/"))}
      >
        <ArrowLeft /> Back
      </Button>

      <h1 className="mb-6 text-xl font-medium">{folder?.title}</h1>

      {loading ? (
        <div className="flex w-full flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : folder?.database ? (
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-row items-center p-4">
            <p className="w-1/4 text-sm text-gray-500">Name</p>
            <p className="w-1/4 text-sm text-gray-500">Source</p>
            <p className="w-1/4 text-sm text-gray-500">Date</p>
            <p className="w-1/4 text-sm text-gray-500">Credential Status</p>
          </div>
          {items.map((item) => (
            <CredentialItem
              key={item._id}
              credential={item.didJwtVc}
              fallbackAvatar=""
              href={`?id=${item._id}`}
              title={item.name}
              date={new Date(item.insertedAt).getTime()}
              source="Government of New South Wales"
              status="valid"
            />
          ))}
        </div>
      ) : folder?.display === "folders" ? (
        <div className="grid grid-cols-4 gap-6">
          {folder?.folders.map((folderName) => {
            const nestedFolder = dataFolders.find(
              (folder) => folder.name === folderName
            );
            return nestedFolder ? (
              <Category
                key={nestedFolder.name}
                icon={nestedFolder.icon}
                href={`/data/${nestedFolder.name}`}
                title={nestedFolder.title}
                description="0 items"
              />
            ) : null;
          })}
        </div>
      ) : null}

      <Drawer
        direction="right"
        open={Boolean(itemId)}
        onClose={() => {
          router.push(pathName);
        }}
      >
        <DrawerContent>
          <DrawerHeader className="border-b-2">
            <div className="flex items-center gap-2">
              <Avatar>
                {issuer?.avatar?.uri && (
                  <AvatarImage src={issuer?.avatar?.uri} asChild>
                    <Image
                      src={issuer?.avatar?.uri}
                      width={40}
                      height={40}
                      alt="Issuer avatar"
                    />
                  </AvatarImage>
                )}
                <AvatarFallback />
              </Avatar>
              <p className="text-wrap text-sm">{issuer?.name}</p>
            </div>
          </DrawerHeader>
          {loading && (
            <div className="flex w-full flex-col gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}

          {selectedItem && (
            <div className="flex flex-col">
              {selectedItem.credentialData ? (
                Object.entries(selectedItem.credentialData).map((entry) => (
                  <div
                    key={entry[0]}
                    className="flex justify-between gap-4 px-4 py-4"
                  >
                    <p className="text-muted-foreground">{entry[0]}</p>
                    <p>{entry[1]}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between gap-4 px-4 py-4">
                    <p className="text-muted-foreground">Name</p>
                    <p>{selectedItem.name}</p>
                  </div>
                  <div className="flex justify-between gap-4 px-4 py-4">
                    <p className="text-muted-foreground">Email</p>
                    <p>{selectedItem.email}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FolderPage;
