import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const SimpleArrowLeft = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.6977 17.2937C15.0861 16.9048 15.0864 16.2749 14.6984 15.8856L10.8266 12L14.6984 8.11443C15.0864 7.72511 15.0861 7.09524 14.6977 6.70634C14.3083 6.31639 13.6763 6.31639 13.2869 6.70634L8.00039 12L13.2869 17.2937C13.6763 17.6836 14.3083 17.6836 14.6977 17.2937Z"
      fill="#111111"
    />
  </svg>
);

export { SimpleArrowLeft };
