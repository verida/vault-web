import { NewDataConnectionCallbackHandler } from "@/app/callback/new-data-connection/_components/new-data-connection-callback-handler"
import {
  SuccessBlock,
  SuccessBlockDescription,
  SuccessBlockImage,
  SuccessBlockTitle,
} from "@/components/ui/success"

export default function NewDataConnectionCallbackPage() {
  return (
    <NewDataConnectionCallbackHandler>
      <div className="flex h-dvh flex-col items-center justify-center">
        <SuccessBlock>
          <SuccessBlockImage />
          <SuccessBlockTitle>
            You successfully connected your account!
          </SuccessBlockTitle>
          <SuccessBlockDescription>
            This window should close automatically, if not, you can close it
            now.
          </SuccessBlockDescription>
        </SuccessBlock>
      </div>
    </NewDataConnectionCallbackHandler>
  )
}
NewDataConnectionCallbackPage.displayName = "NewDataConnectionCallbackPage"
