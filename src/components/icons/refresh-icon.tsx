import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

export const RefreshIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    {...props}
  >
    <path
      d="M6.375 18.7501C4.51104 18.7501 3 17.2391 3 15.3751V8.625C3 6.76104 4.51104 5.25 6.375 5.25H11.4375M15.9375 5.25H17.625C19.489 5.25 21 6.76104 21 8.625V15.3751C21 17.2391 19.489 18.7501 17.625 18.7501H10.3125M10.3125 18.7501L12.5625 16.5M10.3125 18.7501L12.5625 21M10.3125 7.5L12.5625 5.25L10.3125 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
