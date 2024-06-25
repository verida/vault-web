import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const ArrowDown = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 5L12 19M12 19L6 13M12 19L18 13"
      stroke="#111111"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

export { ArrowDown };
