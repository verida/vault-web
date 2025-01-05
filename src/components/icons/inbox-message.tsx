import { SVGProps } from "react"

export interface InboxMessageTypeIconProps extends SVGProps<SVGSVGElement> {}

export function InboxMessageTypeIcon(props: InboxMessageTypeIconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.666016" width="20" height="20" rx="4" fill="#F5F4FF" />
      <path
        d="M10.6667 12.1667C10.2362 12.1667 9.80573 12.0256 9.43854 11.7394L4 7.5105V13.4167C4 14.1069 4.55964 14.6667 5.25 14.6667H16.0833C16.7737 14.6667 17.3333 14.1071 17.3333 13.4167V7.5105L11.8958 11.7423C11.5286 12.0261 11.0964 12.1667 10.6667 12.1667ZM4.42422 6.78394L9.95026 11.0834C10.3719 11.4115 10.9625 11.4115 11.3841 11.0834L16.9102 6.78394C17.1536 6.5756 17.3333 6.25529 17.3333 5.91675C17.3333 5.22638 16.7734 4.66675 16.0833 4.66675H5.25C4.55964 4.66675 4 5.22638 4 5.91675C4 6.25529 4.15651 6.5756 4.42422 6.78394Z"
        fill="#5354D1"
      />
    </svg>
  )
}
