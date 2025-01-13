"use client"

import { useMemo } from "react"

import { RequestPageContent } from "@/app/(connected)/request/_components/request-page-content"
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTitle,
} from "@/components/ui/empty-state"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { useEncodedRequestPayloadState } from "@/features/requests/hooks/use-encoded-request-payload-state"
import { decodeRequest } from "@/features/requests/utils"
import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("requests")

export default function RequestPage() {
  const { encodedRequestPayload } = useEncodedRequestPayloadState()

  const { request } = useMemo(() => {
    if (!encodedRequestPayload) {
      return {
        request: null,
      }
    }

    try {
      const request = decodeRequest(encodedRequestPayload)

      return { request }
    } catch (error) {
      logger.warn("Error decoding request")
      return {
        request: null,
      }
    }
  }, [encodedRequestPayload])

  return (
    <>
      {request ? (
        <RequestPageContent request={request} />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          {encodedRequestPayload ? (
            <ErrorBlock>
              <ErrorBlockImage />
              <ErrorBlockTitle>Invalid request</ErrorBlockTitle>
              <ErrorBlockDescription>
                The request you are trying to view is invalid or unsupported.
              </ErrorBlockDescription>
            </ErrorBlock>
          ) : (
            <EmptyState>
              <EmptyStateImage />
              <EmptyStateTitle>No request</EmptyStateTitle>
              <EmptyStateDescription>
                No request found. Please check the URL or try again.
              </EmptyStateDescription>
            </EmptyState>
          )}
        </div>
      )}
    </>
  )
}
RequestPage.displayName = "RequestPage"
