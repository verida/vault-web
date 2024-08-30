import { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const Sort = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M2.5 5H17.5M2.5 10H13.2143M2.5 15H8.92857"
      stroke="#6B7280"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export { Sort }
