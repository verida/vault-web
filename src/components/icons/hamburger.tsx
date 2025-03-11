import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const Hamburger = (props: Props) => (
  <svg
    width="22"
    height="18"
    viewBox="0 0 22 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.6004 16.1998H1.40039M20.6004 8.99981H1.40039M20.6004 1.7998H1.40039"
      stroke="#111111"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export { Hamburger }
