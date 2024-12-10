import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"

type OAuthVeridaNotConnectedProps = {
  title?: string
  description?: string
} & React.ComponentProps<typeof ErrorBlock>

export function OAuthVeridaNotConnected(props: OAuthVeridaNotConnectedProps) {
  const {
    title = "Not Connected",
    description = "Connect with Verida to continue",
    ...errorBlockProps
  } = props

  return (
    <ErrorBlock {...errorBlockProps}>
      <ErrorBlockImage />
      <ErrorBlockTitle>{title}</ErrorBlockTitle>
      <ErrorBlockDescription>{description}</ErrorBlockDescription>
      <VeridaConnectButton />
    </ErrorBlock>
  )
}
OAuthVeridaNotConnected.displayName = "OAuthVeridaNotConnected"
