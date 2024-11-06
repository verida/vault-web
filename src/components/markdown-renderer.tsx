import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export type MarkdownRendererProps = Omit<
  React.ComponentProps<typeof ReactMarkdown>,
  "remarkPlugins" | "components"
>

export function MarkdownRenderer(props: MarkdownRendererProps) {
  const { children, ...rest } = props

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        a: ({ node, ...props }) => (
          <a target="_blank" rel="noopener noreferrer" {...props} />
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        pre: ({ node, ...props }) => (
          <pre className="overflow-x-auto" {...props} />
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        code: ({ node, ...props }) => (
          <code className="overflow-x-auto" {...props} />
        ),
      }}
      {...rest}
    >
      {children}
    </ReactMarkdown>
  )
}
MarkdownRenderer.displayName = "MarkdownRenderer"
