import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Switch = (props: Props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.00039 9.60002L2.40039 6.00002M2.40039 6.00002L6.00039 2.40002M2.40039 6.00002H21.6004M18.0004 14.4L21.6004 18M21.6004 18L18.0004 21.6M21.6004 18H2.40039"
      stroke="#D1D5DB"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export { Switch };
