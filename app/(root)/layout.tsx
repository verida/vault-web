"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

import { AppHeader } from "@/app/(root)/_components/app-header"
import { useAuth } from "@/features/auth"
import { useVerida } from "@/features/verida"

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props

  const pathName = usePathname()
  const router = useRouter()
  const { isConnected } = useVerida()
  const { setRedirectPath } = useAuth()

  useEffect(() => {
    const redirectUrl = pathName

    if (!isConnected) {
      setRedirectPath(redirectUrl)
      router.push("/")
    }
  }, [isConnected, router, setRedirectPath, pathName])

  if (!isConnected) {
    return null
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      <AppHeader />
      <main className="flex-1 overflow-y-auto p-6 pb-0 md:pt-10">
        {children}
      </main>
    </div>
  )
}
