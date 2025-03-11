import { type SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

export const EditIcon = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.325 4.90729C15.7153 4.51674 16.3483 4.51647 16.739 4.9067L19.0924 7.25746C19.4832 7.64784 19.4835 8.28116 19.093 8.67187L9.13519 18.6352C8.99591 18.7745 8.81857 18.8696 8.62542 18.9085L4.2002 19.8002L5.09344 15.3802C5.1324 15.1875 5.22732 15.0105 5.36633 14.8714L15.325 4.90729Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </svg>
)
