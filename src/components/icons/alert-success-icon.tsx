import { SVGProps } from "react"

type AlertSuccessIconProps = SVGProps<SVGSVGElement>

export const AlertSuccessIcon = (props: AlertSuccessIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
      fill="#5ECEA5"
    />
    <path
      d="M9.86337 14.5831L7.55004 12.2698C7.42548 12.1449 7.25638 12.0748 7.08004 12.0748C6.90369 12.0748 6.73459 12.1449 6.61004 12.2698C6.35004 12.5298 6.35004 12.9498 6.61004 13.2098L9.39671 15.9964C9.65671 16.2564 10.0767 16.2564 10.3367 15.9964L17.39 8.9431C17.65 8.6831 17.65 8.2631 17.39 8.0031C17.2655 7.87826 17.0964 7.80811 16.92 7.80811C16.7437 7.80811 16.5746 7.87826 16.45 8.0031L9.86337 14.5831Z"
      fill="white"
    />
  </svg>
)
