import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

export const SendIcon = (props: Props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.0708 2.92949L10.4068 13.5935M3.27149 8.23517L19.8774 2.47394C20.9 2.11915 21.8811 3.10028 21.5264 4.12291L15.7651 20.7288C15.3704 21.8664 13.773 21.8976 13.3342 20.7763L10.6973 14.0375C10.5656 13.701 10.2993 13.4347 9.96275 13.303L3.22402 10.6661C2.10268 10.2273 2.13387 8.62985 3.27149 8.23517Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)
