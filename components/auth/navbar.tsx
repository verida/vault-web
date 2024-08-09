import Link from "next/link"

import { Logo } from "@/components/logo"
import { veridaLandingSocials } from "@/config/platform"

export const Navbar = () => {
  return (
    <div className="lg:mx[108px] z-20 flex w-full items-center justify-between bg-background py-4 md:py-6">
      <Logo />

      <div className="flex items-center space-x-3">
        {veridaLandingSocials.map((social) => (
          <Link href={social.url} key={`link-${social.url}`}>
            {social.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}
