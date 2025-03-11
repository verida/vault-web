import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const ChevronDown = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.20711 10C6.76165 10 6.53857 10.5386 6.85355 10.8536L12 16L17.1464 10.8536C17.4614 10.5386 17.2383 10 16.7929 10L7.20711 10Z"
      fill="#111111"
    />
  </svg>
)

export { ChevronDown }
