import { type SVGProps } from "react"

export interface InboxIconProps extends SVGProps<SVGSVGElement> {}

export function InboxIcon(props: InboxIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M3.60039 6.1043L12.0004 11.5043L21.0004 6.1043M4.80039 19.0956C3.47491 19.0956 2.40039 18.0211 2.40039 16.6956V7.3043C2.40039 5.97882 3.47491 4.9043 4.80039 4.9043H19.2004C20.5259 4.9043 21.6004 5.97881 21.6004 7.3043V16.6956C21.6004 18.0211 20.5259 19.0956 19.2004 19.0956H4.80039Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
