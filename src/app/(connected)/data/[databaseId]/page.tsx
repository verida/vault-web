"use client"

import { useSearchParams } from "next/navigation"
import React, { useEffect, useMemo, useState } from "react"

import { CredentialItem } from "@/app/(connected)/data/[databaseId]/_components/credential-item"
import { DataError } from "@/app/(connected)/data/[databaseId]/_components/data-error"
import { DataItem } from "@/app/(connected)/data/[databaseId]/_components/data-item"
import { DataItemDetailsSheet } from "@/app/(connected)/data/[databaseId]/_components/data-item-details-sheet"
import { Typography } from "@/components/typography"
import { Skeleton } from "@/components/ui/skeleton"
import { DATABASE_DEFS } from "@/features/data"
import { useData } from "@/features/data/hooks"
import { useDataSchema } from "@/features/data/hooks/useDataSchema"
import { getPublicProfile } from "@/features/profiles"
import { useVerida } from "@/features/verida"

export type DatabasePageProps = {
  params: { databaseId: string }
}

export default function DatabasePage(props: DatabasePageProps) {
  const { params } = props
  const { databaseId: encodedDatabaseId } = params
  const databaseId = decodeURIComponent(encodedDatabaseId)

  const databaseDefinition = useMemo(() => {
    return DATABASE_DEFS.find((databaseDef) => databaseDef.id === databaseId)
  }, [databaseId])

  // TODO: Handle folder not found

  const { isConnected } = useVerida()

  const {
    dataItems: items,
    isDataItemsPending: loading,
    isDataItemsError,
  } = useData<any>(databaseDefinition?.databaseVaultName || "") // TODO: Type properly

  const {
    dataSchema,
    isDataSchemaPending: schemaLoading,
    isDataSchemaError,
  } = useDataSchema(items?.at(0)?.schema || "")

  const searchParams = useSearchParams()

  const itemId = searchParams.get("id")
  const selectedItem = items?.find((it) => it._id === itemId)

  const [, setIssuer] = useState<any>({})

  useEffect(() => {
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
      <div className="mb-4 flex items-center justify-between gap-4">
        <Typography variant="heading-3">
          {databaseDefinition?.titlePlural}
        </Typography>
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
          {/* TODO: Leverage the Error Boundary instead? */}
          <DataError description="There's been an error when loading the data" />
        </div>
      ) : items?.length === 0 || !dataSchema ? (
        <Typography variant={"heading-4"} className="py-40 text-center">
          No {databaseDefinition?.titlePlural}
        </Typography>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-row items-center p-4 [&>p]:w-0 [&>p]:grow">
            {(items?.at(0)["name"] || items?.at(0)["icon"]) && (
              <Typography
                variant="base-s-semibold"
                className="text-muted-foreground"
              >
                {databaseDefinition?.title} Name
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
          {databaseDefinition?.id === "credentials"
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

      <DataItemDetailsSheet
        open={Boolean(itemId)}
        data={selectedItem}
        schema={dataSchema}
        folder={databaseDefinition}
      />
    </div>
  )
}
DatabasePage.displayName = "DatabasePage"
