type AssistantChatLayoutProps = {
  children: React.ReactNode
}

export default function AssistantChatLayout(props: AssistantChatLayoutProps) {
  const { children } = props

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex w-full max-w-screen-md flex-1 flex-col">
        {children}
      </div>
    </div>
  )
}
