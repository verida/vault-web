import { type SVGProps } from "react"

export interface MediumLogoProps extends SVGProps<SVGSVGElement> {}

export function MediumLogo(props: MediumLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_1372_10159)">
        <path
          d="M11.2171 6.15716C11.2171 9.13688 8.818 11.5524 5.85866 11.5524C2.89933 11.5524 0.5 9.13633 0.5 6.15716C0.5 3.17798 2.89915 0.761719 5.85866 0.761719C8.81818 0.761719 11.2171 3.17743 11.2171 6.15716ZM17.0956 6.15716C17.0956 8.96192 15.896 11.2365 14.4162 11.2365C12.9365 11.2365 11.7369 8.96192 11.7369 6.15716C11.7369 3.35239 12.9363 1.07777 14.4161 1.07777C15.8958 1.07777 17.0954 3.35166 17.0954 6.15716H17.0956ZM19.5 6.15716C19.5 8.66954 19.0782 10.7075 18.5577 10.7075C18.0372 10.7075 17.6155 8.67009 17.6155 6.15716C17.6155 3.64422 18.0374 1.60683 18.5577 1.60683C19.078 1.60683 19.5 3.64404 19.5 6.15716Z"
          fill="#6B7280"
        />
      </g>
      <defs>
        <clipPath id="clip0_1372_10159">
          <rect
            width="19"
            height="10.7907"
            fill="white"
            transform="translate(0.5 0.759766)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
