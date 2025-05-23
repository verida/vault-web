import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

export const ArrowLeftIcon = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    {...props}
  >
    <path
      d="M19 12H5M5 12L11 6M5 12L11 18"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
)
