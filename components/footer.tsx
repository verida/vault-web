import Link from "next/link"

import { Typography } from "./typography"

// TODO: Remove this component
/**
 * @deprecated
 */
export const Footer = () => {
  return (
    <div className="lg:mx[108px] w-full bg-background p-4">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <Typography
          variant="base-s-regular"
          className="text-secondary-foreground"
        >
          © 2024 Verida Vault
        </Typography>
        <Link href="/terms" className="text-xs text-secondary-foreground">
          Terms & Conditions
        </Link>
      </div>
    </div>
  )
}
