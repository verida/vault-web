"use client";

import { IDatabase } from "@verida/types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import {
  FilterSheet,
  FilterSheetBody,
  FilterSheetFooter,
  FilterSheetHeader,
} from "@/components/common/filter-sheet";
import { CredentialItem } from "@/components/data/credential-item";
import { FilterButton } from "@/components/filter-button";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { SortSelector } from "@/components/sort-selector";
import { Typography } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
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

  const [issuer, setIssuer] = React.useState<any>({});

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

  console.log(items);

  return (
    <div className="flex-col">
      <Button
        variant="secondary"
        className="mb-4 flex h-16 items-center gap-5 text-sm font-medium"
        onClick={() => router.push(pathName.split("/").slice(0, -1).join("/"))}
      >
        <ArrowLeft /> Back
      </Button>

      <div className="flex items-center justify-between">
        <Typography variant="heading-3">{folder?.title}</Typography>
        <nav className="flex space-x-2 md:w-auto md:space-x-3">
          <SortSelector />
          <FilterButton />
        </nav>
      </div>

      {loading ? (
        <div className="flex w-full flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-row items-center p-4">
            <Typography
              variant="base-s-semibold"
              className="w-1/4 text-secondary-foreground"
            >
              Name
            </Typography>
            <Typography
              variant="base-s-semibold"
              className="w-1/4 text-sm text-secondary-foreground"
            >
              Source
            </Typography>
            <Typography
              variant="base-s-semibold"
              className="w-1/4 text-secondary-foreground"
            >
              Date
            </Typography>
            <Typography
              variant="base-s-semibold"
              className="w-1/4 text-secondary-foreground"
            >
              Credential Status
            </Typography>
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
      )}

      <FilterSheet
        open={true}
        onClose={() => {}}
        className="border-l border-border shadow-sm"
      >
        <FilterSheetHeader title="Filter" onClose={() => {}} />
        <FilterSheetBody>
          <Typography variant="heading-5">Source</Typography>
          {[
            "Facebook",
            "Twitter",
            "Ticketeck",
            "Government of Western Australia",
            "Government of New South Wales",
            "Royal Melbourne Hospital",
            "Metamask",
            "Discord",
          ].map((source) => (
            <div className="flex items-center gap-3 p-2">
              <Checkbox />
              <Typography>{source}</Typography>
            </div>
          ))}

          <Typography variant="heading-5" className="mt-4">
            Credential Status
          </Typography>
          {["All", "Valid", "Expired"].map((status) => (
            <div className="flex items-center gap-3 p-2">
              <Checkbox />
              <Typography>{status}</Typography>
            </div>
          ))}
        </FilterSheetBody>
        <FilterSheetFooter>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary">Reset All</Button>
            <Button variant="primary">Apply</Button>
          </div>
        </FilterSheetFooter>
      </FilterSheet>
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
                Object.entries(selectedItem.credentialData).map(
                  (entry: any) => (
                    <div
                      key={entry[0]}
                      className="flex justify-between gap-4 px-4 py-4"
                    >
                      <p className="text-muted-foreground">{entry[0]}</p>
                      <p>{entry[1]}</p>
                    </div>
                  )
                )
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
