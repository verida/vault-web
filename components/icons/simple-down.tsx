import { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const SimpleDown = (props: Props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.2937 9.30281C16.9048 8.91444 16.2749 8.91409 15.8856 9.30204L12 13.1739L8.11443 9.30204C7.72511 8.91409 7.09524 8.91444 6.70634 9.30281C6.31639 9.69223 6.31639 10.3242 6.70634 10.7136L12 16.0001L17.2937 10.7136C17.6836 10.3242 17.6836 9.69223 17.2937 9.30281Z"
      fill="currentColor"
    />
  </svg>
)

export { SimpleDown }
