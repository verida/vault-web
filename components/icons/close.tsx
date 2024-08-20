import { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const Close = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17 7L7 17M17 17L7 7"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
)

export { Close }
