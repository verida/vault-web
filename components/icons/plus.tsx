import { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const Plus = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    {...props}
  >
    <path
      d="M7.33366 5.66675H11.8337V6.33341H7.33366H6.83366V6.83341V11.3334H6.16699V6.83341V6.33341H5.66699H1.16699V5.66675H5.66699H6.16699V5.16675V0.666748H6.83366V5.16675V5.66675H7.33366Z"
      stroke="currentColor"
    />
  </svg>
)

export { Plus }
