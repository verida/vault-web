import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const Logout = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.78056 3.6001H5.07468C4.51304 3.6001 3.97441 3.82135 3.57728 4.21517C3.18014 4.609 2.95703 5.14314 2.95703 5.7001V18.3001C2.95703 18.8571 3.18014 19.3912 3.57728 19.785C3.97441 20.1788 4.51304 20.4001 5.07468 20.4001H8.78056M9.04375 12.0001H21.0438M21.0438 12.0001L16.4586 7.2001M21.0438 12.0001L16.4586 16.8001"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export { Logout }
