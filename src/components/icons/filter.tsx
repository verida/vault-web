import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const Filter = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 11.5H8.7037M8.7037 11.5V9.25M8.7037 11.5V13.75M11.6667 11.5H18.3333M18.3333 6.25H14.6296M14.6296 6.25V8.5M14.6296 6.25V4M11.6667 6.25H5M18.3333 16.75H13.1481M13.1481 16.75V19M13.1481 16.75V14.5M10.1852 16.75H5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export { Filter }
