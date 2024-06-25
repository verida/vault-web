import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const ArrowUp = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 19L12 5M12 5L18 11M12 5L6 11"
      stroke="#111111"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

export { ArrowUp };
