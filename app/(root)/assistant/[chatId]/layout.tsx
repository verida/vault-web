type AssistantChatLayoutProps = {
  children: React.ReactNode
}

export default function AssistantChatLayout(props: AssistantChatLayoutProps) {
  const { children } = props

  return (
    <div className="flex h-full min-h-0 flex-col items-center">
      <div className="flex h-full w-full max-w-screen-md flex-col pb-4">
        {children}
      </div>
    </div>
  )
}
