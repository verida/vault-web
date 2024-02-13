import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {

}

const ChevronUp = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.7929 14C17.2383 14 17.4614 13.4614 17.1464 13.1464L12 8L6.85355 13.1464C6.53857 13.4614 6.76165 14 7.20711 14L16.7929 14Z"
      fill="#111111"
    />
  </svg>
);

export { ChevronUp };
