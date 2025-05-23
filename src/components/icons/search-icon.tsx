import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

export const SearchIcon = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    {...props}
  >
    <g>
      <path
        d="M20 20L16.5 16.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={11} cy={11} r={7} stroke="currentColor" strokeWidth={2} />
    </g>
  </svg>
)
