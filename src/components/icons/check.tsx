import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const Check = (props: Props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.86337 10.5833L3.55004 8.27001C3.42548 8.14517 3.25638 8.07502 3.08004 8.07502C2.90369 8.07502 2.73459 8.14517 2.61004 8.27001C2.35004 8.53001 2.35004 8.95001 2.61004 9.21001L5.39671 11.9967C5.65671 12.2567 6.07671 12.2567 6.33671 11.9967L13.39 4.94334C13.65 4.68334 13.65 4.26334 13.39 4.00334C13.2655 3.8785 13.0964 3.80835 12.92 3.80835C12.7437 3.80835 12.5746 3.8785 12.45 4.00334L5.86337 10.5833Z"
      fill="currentColor"
    />
  </svg>
)

export { Check }
