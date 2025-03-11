import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const Success = (props: Props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="0" y="0" width="20" height="20" rx="10" fill="#5ECEA5" />
    <path
      d="M8.88533 12.1527L6.95755 10.2249C6.85376 10.1209 6.71284 10.0624 6.56589 10.0624C6.41893 10.0624 6.27801 10.1209 6.17422 10.2249C5.95755 10.4416 5.95755 10.7916 6.17422 11.0082L8.49644 13.3304C8.71311 13.5471 9.06311 13.5471 9.27977 13.3304L15.1576 7.45266C15.3742 7.23599 15.3742 6.88599 15.1576 6.66933C15.0538 6.5653 14.9128 6.50684 14.7659 6.50684C14.6189 6.50684 14.478 6.5653 14.3742 6.66933L8.88533 12.1527Z"
      fill="white"
    />
  </svg>
)

export { Success }
