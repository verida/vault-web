import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

export const DeleteIcon = (props: Props) => (
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
      d="M2.40039 5.3998H21.6004M8.40039 1.7998H15.6004M16.2004 22.1998H7.80039C6.47491 22.1998 5.40039 21.1253 5.40039 19.7998L4.85247 6.64976C4.82407 5.96801 5.36909 5.3998 6.05143 5.3998H17.9493C18.6317 5.3998 19.1767 5.96801 19.1483 6.64976L18.6004 19.7998C18.6004 21.1253 17.5259 22.1998 16.2004 22.1998Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
)
