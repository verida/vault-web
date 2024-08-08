import { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const ChevronRight = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 7.20711C10 6.76165 10.5386 6.53857 10.8536 6.85355L16 12L10.8536 17.1464C10.5386 17.4614 10 17.2383 10 16.7929V7.20711Z"
      fill="#111111"
    />
  </svg>
)

export { ChevronRight }
