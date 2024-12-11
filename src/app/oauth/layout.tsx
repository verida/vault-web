type OAuthLayoutProps = {
  children: React.ReactNode
}

export default function OAuthLayout(props: OAuthLayoutProps) {
  const { children } = props

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
      {children}
    </div>
  )
}
OAuthLayout.displayName = "OAuthLayout"
