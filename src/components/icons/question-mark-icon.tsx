import React, { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

export const QuestionMarkIcon = (props: Props) => (
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
      d="M11.9993 16.7999V16.8421M9.60039 9.04523C9.60039 7.69471 10.6749 6.5999 12.0004 6.5999C13.3259 6.5999 14.4004 7.69471 14.4004 9.04523C14.4004 10.3957 13.3259 11.4906 12.0004 11.4906C12.0004 11.4906 11.9993 12.2204 11.9993 13.1208M21.6004 11.9999C21.6004 17.3018 17.3023 21.5999 12.0004 21.5999C6.69846 21.5999 2.40039 17.3018 2.40039 11.9999C2.40039 6.69797 6.69846 2.3999 12.0004 2.3999C17.3023 2.3999 21.6004 6.69797 21.6004 11.9999Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
