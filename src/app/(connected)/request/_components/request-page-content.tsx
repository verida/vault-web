import { UserProfileApiRequestContent } from "@/app/(connected)/request/_components/user-profile-api-request-content"
import type { SupportedRequest } from "@/features/requests/types"

export interface RequestPageContentProps {
  request: SupportedRequest
}

export function RequestPageContent(props: RequestPageContentProps) {
  const { request } = props

  switch (request.type) {
    case "userProfileApiRequest":
      return <UserProfileApiRequestContent request={request} />
    default:
      // Should not happen as handled in the parent component
      return <div>Unsupported request</div>
  }
}
RequestPageContent.displayName = "RequestPageContent"
