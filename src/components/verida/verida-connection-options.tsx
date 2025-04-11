"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { type ComponentProps, useMemo } from "react"
import {
  useActiveWalletConnectionStatus,
  useAdminWallet,
  useWalletInfo,
} from "thirdweb/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
} from "@/components/ui/loading"
import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"
import { VeridaConnectButton } from "@/components/verida/verida-connect-button"
import { useOnboardingEntryQueryState } from "@/features/onboarding/hooks/use-onboarding-entry-query-state"
import { getOnboardingPageRoute } from "@/features/routes/utils"
import { ThirdwebConnectEmbed } from "@/features/thirdweb/components/thirdweb-connect-embed"
import { THIRDWEB_IN_APP_WALLET_ID } from "@/features/thirdweb/constants"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

export interface VeridaConnectionOptionsProps
  extends Omit<ComponentProps<"div">, "children"> {}

export function VeridaConnectionOptions(props: VeridaConnectionOptionsProps) {
  const { className, ...divProps } = props

  const thirdWebStatus = useActiveWalletConnectionStatus()
  const wallet = useAdminWallet()
  const { data: walletInfo } = useWalletInfo(wallet?.id)

  const { account, isConnected, disconnect, requestThirdWebConsentSignature } =
    useVerida()
  // If the account is defined and the verida account exists but it is not connected, something went wrong, may need to reconnect manually. Handle it if such cases is detected.

  const pathName = usePathname()
  const searchParams = useSearchParams()
  const { serializeOnboardingEntryPath } = useOnboardingEntryQueryState()
  const onboardingUrl = useMemo(() => {
    return serializeOnboardingEntryPath(
      `${getOnboardingPageRoute()}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
      {
        onboardingEntryPath: pathName,
      }
    )
  }, [pathName, searchParams, serializeOnboardingEntryPath])

  return (
    <div className={cn("flex flex-col gap-8", className)} {...divProps}>
      {isConnected ? null : thirdWebStatus !== "connected" ? (
        <ThirdwebConnectEmbed />
      ) : (
        <Card className="rounded-[20px]">
          <LoadingBlock className="min-h-[350px] w-[358px] justify-center">
            {account ? (
              <>
                <LoadingBlockDescription>
                  We have to finalise your Verida identity with you.
                </LoadingBlockDescription>
                <LoadingBlockDescription>
                  You should be redirected to an onboarding shortly, or click to
                  button below if not.
                </LoadingBlockDescription>
                <Button variant="outline" asChild>
                  <Link href={onboardingUrl}>
                    Finalise your Verida identity
                  </Link>
                </Button>
                <Separator />
                <LoadingBlockDescription>
                  {`You are connecting with ${walletInfo?.name}`}
                </LoadingBlockDescription>
                <Button variant="outline" onClick={disconnect}>
                  Change connection methods
                </Button>
              </>
            ) : (
              <>
                <LoadingBlockSpinner className="size-14" />
                <LoadingBlockDescription>
                  {wallet?.id === THIRDWEB_IN_APP_WALLET_ID
                    ? "Waiting for automatic signature" // Should not happen
                    : `Please sign the authorization${
                        walletInfo?.name ? ` with ${walletInfo.name}` : ""
                      }`}
                </LoadingBlockDescription>
                <Button
                  variant="outline"
                  onClick={requestThirdWebConsentSignature}
                >
                  Retry
                </Button>
              </>
            )}
          </LoadingBlock>
        </Card>
      )}
      {thirdWebStatus === "disconnected" || thirdWebStatus === "unknown" ? (
        <div className="flex flex-col gap-2">
          <Typography variant="heading-5" component="p" className="text-center">
            Using the Verida Wallet?
          </Typography>
          <VeridaConnectButton
            variant="outline"
            label="Connect with Verida Wallet"
          />
        </div>
      ) : null}
    </div>
  )
}
VeridaConnectionOptions.displayName = "VeridaConnectionOptions"
