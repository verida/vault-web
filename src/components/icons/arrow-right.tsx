import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const ArrowRight = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="#111111"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
)

export { ArrowRight }
