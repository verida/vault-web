import { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

const Refer = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.1994 3.97673C11.4032 2.99121 12.9421 2.3999 14.6192 2.3999C18.4752 2.3999 21.601 5.52577 21.601 9.38172C21.601 11.058 21.0103 12.5964 20.0256 13.7999M16.363 14.6181C16.363 18.474 13.2372 21.5999 9.38123 21.5999C5.52528 21.5999 2.39941 18.474 2.39941 14.6181C2.39941 10.7621 5.52528 7.63627 9.38123 7.63627C13.2372 7.63627 16.363 10.7621 16.363 14.6181Z"
      stroke="#111111"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export { Refer }
