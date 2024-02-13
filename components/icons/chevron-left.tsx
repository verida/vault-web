import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {

}

const ChevronLeft = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14 7.20711C14 6.76165 13.4614 6.53857 13.1464 6.85355L8 12L13.1464 17.1464C13.4614 17.4614 14 17.2383 14 16.7929V7.20711Z"
      fill="#111111"
    />
  </svg>
);

export { ChevronLeft };
