import { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

export const LockIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="41"
    viewBox="0 0 40 41"
    fill="none"
    {...props}
  >
    <path
      d="M11 15.1676V13.6438C11 8.57898 15.0143 4.50098 20 4.50098C24.9857 4.50098 29 8.57898 29 13.6438V15.1676M11 15.1676C9.35 15.1676 8 16.5391 8 18.2153V33.4534C8 35.1295 9.35 36.501 11 36.501H29C30.65 36.501 32 35.1295 32 33.4534V18.2153C32 16.5391 30.65 15.1676 29 15.1676M11 15.1676H29M20 22.7867C21.65 22.7867 23 24.1581 23 25.8343C23 27.5105 21.65 28.8819 20 28.8819C18.35 28.8819 17 27.5105 17 25.8343C17 24.1581 18.35 22.7867 20 22.7867Z"
      stroke="currentColor"
      strokeWidth="3"
    />
  </svg>
)
