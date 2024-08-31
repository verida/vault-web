"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React, { useMemo } from "react"

import { CredentialItem } from "@/app/(connected)/data/[...folder]/_components/credential-item"
import { DataError } from "@/app/(connected)/data/[...folder]/_components/data-error"
import { DataItem } from "@/app/(connected)/data/[...folder]/_components/data-item"
import { DataItemDetailsSheet } from "@/app/(connected)/data/[...folder]/_components/data-item-details-sheet"
// import {
//   FilterSheet,
//   FilterSheetBody,
//   FilterSheetFooter,
//   FilterSheetHeader,
// } from "@/components/filter-sheet"
// import SearchBox from "@/components/search-box"
// import { FilterButton } from "@/components/filter-button"
import { ArrowLeft } from "@/components/icons/arrow-left"
// import { SortSelector } from "@/components/sort-selector"
import { Typography } from "@/components/typography"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { dataFolders } from "@/features/data"
import { useData } from "@/features/data/hooks"
import { useDataSchema } from "@/features/data/hooks/useDataSchema"
import { getPublicProfile } from "@/features/profiles"
import { useVerida } from "@/features/verida"

export type DataFolderPageProps = {
  params: { folder: string[] }
}

export default function DataFolderPage(props: DataFolderPageProps) {
  const { params } = props
  const folder = useMemo(() => {
    const folderName = params.folder.join("/")
    return dataFolders.find((f) => f.name === folderName)
  }, [params])

  const { isConnected } = useVerida()

  const {
    dataItems: items,
    isDataItemsPending: loading,
    isDataItemsError,
  } = useData<any>(folder?.database || "") // TODO: Type properly

  const {
    dataSchema,
    isDataSchemaPending: schemaLoading,
    isDataSchemaError,
  } = useDataSchema(items?.at(0)?.schema || "")

  const searchParams = useSearchParams()

  const itemId = searchParams.get("id")
  const selectedItem = items?.find((it) => it._id === itemId)

  const [, setIssuer] = React.useState<any>({})
  // const [isFilterOpen, setIsFilterOpen] = React.useState(false)

  React.useEffect(() => {
    function parseJwt(token: string) {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join("")
      )
      // console.log("parseJwt", JSON.parse(jsonPayload))
      return JSON.parse(jsonPayload)
    }

    async function fetchIssuerProfile(did: string) {
      const profile = await getPublicProfile(did)
      setIssuer(profile)
    }

    selectedItem?.didJwtVc &&
      fetchIssuerProfile(parseJwt(selectedItem.didJwtVc)?.iss)
  }, [selectedItem])

  return (
    <div className="flex-col pb-6">
      <div className="flex justify-start">
        <Link href={"/data"} className="my-5 flex items-center gap-5">
          <ArrowLeft />
          <Typography variant={"heading-5"}>Back to all Data</Typography>
        </Link>
      </div>

      <div className="mb-4 flex items-center justify-between gap-4">
        <Typography variant="heading-3">{folder?.titlePlural}</Typography>
        <nav className="flex space-x-2 md:w-auto md:space-x-3">
          {/* <SearchBox /> */}
          {/* <SortSelector /> */}
          {/* <FilterButton onClick={() => setIsFilterOpen(true)} /> */}
          {/* <Button size={"lg"} className="hidden h-12 md:flex">
            Add New
          </Button> */}
        </nav>
      </div>

      {!isConnected || loading || schemaLoading ? (
        <div className="flex w-full flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : isDataSchemaError || isDataItemsError ? (
        <div className="py-40">
          <DataError description="There's been an error when loading the data" />
        </div>
      ) : items?.length === 0 || !dataSchema ? (
        <Typography variant={"heading-4"} className="py-40 text-center">
          No {folder?.titlePlural}
        </Typography>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-row items-center p-4 [&>p]:w-0 [&>p]:grow">
            {(items?.at(0)["name"] || items?.at(0)["icon"]) && (
              <Typography
                variant="base-s-semibold"
                className="text-muted-foreground"
              >
                {folder?.title} Name
              </Typography>
            )}
            {dataSchema?.layouts.view.map((key) => (
              <Typography
                key={key}
                variant="base-s-semibold"
                className="text-muted-foreground"
              >
                {dataSchema?.properties[key]?.title}
              </Typography>
            ))}
          </div>
          {folder?.name === "credentials"
            ? items?.map((item, index) => (
                <CredentialItem
                  key={index}
                  credential={item.didJwtVc}
                  fallbackAvatar=""
                  href={`?id=${item._id}`}
                  title={item.name}
                  date={new Date(item.insertedAt).getTime()}
                  source="Government of New South Wales"
                  status="valid"
                />
              ))
            : items?.map((item, index) => (
                <DataItem data={item} key={index} schema={dataSchema} />
              ))}
        </div>
      )}

      {/* <FilterSheet
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        className="border-l shadow-sm"
      >
        <FilterSheetHeader
          title="Filter"
          onClose={() => setIsFilterOpen(false)}
        />
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
            <div key={source} className="flex items-center gap-3 p-2">
              <Checkbox />
              <Typography>{source}</Typography>
            </div>
          ))}

          <Typography variant="heading-5" className="mt-4">
            Credential Status
          </Typography>
          {["All", "Valid", "Expired"].map((status) => (
            <div key={status} className="flex items-center gap-3 p-2">
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
      </FilterSheet> */}

      <DataItemDetailsSheet
        open={Boolean(itemId)}
        data={selectedItem}
        schema={dataSchema}
        folder={folder}
      />
    </div>
  )
}
