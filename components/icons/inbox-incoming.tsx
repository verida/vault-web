import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const InboxIncoming = (props: Props) => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="0.666016" width="20" height="20" rx="4" fill="#F5F4FF" />
    <g clipPath="url(#clip0_1135_12890)">
      <path
        d="M5.04102 10.4688L10.666 16.0938L16.291 10.4688H13.4785V5.3125C13.4785 5.18818 13.4291 5.06895 13.3412 4.98104C13.2533 4.89314 13.1341 4.84375 13.0098 4.84375H8.32227C8.19795 4.84375 8.07872 4.89314 7.99081 4.98104C7.9029 5.06895 7.85352 5.18818 7.85352 5.3125V10.4688H5.04102Z"
        fill="#5354D1"
      />
    </g>
    <defs>
      <clipPath id="clip0_1135_12890">
        <rect
          width="15"
          height="15"
          fill="white"
          transform="translate(3.16602 2.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

export { InboxIncoming };
