import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Valid = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={2} y={2} width={20} height={20} rx={10} fill="#5ECEA5" />
    <path
      d="M9.86337 14.5831L7.55004 12.2698C7.42548 12.1449 7.25638 12.0748 7.08004 12.0748C6.90369 12.0748 6.73459 12.1449 6.61004 12.2698C6.35004 12.5298 6.35004 12.9498 6.61004 13.2098L9.39671 15.9964C9.65671 16.2564 10.0767 16.2564 10.3367 15.9964L17.39 8.9431C17.65 8.6831 17.65 8.2631 17.39 8.0031C17.2655 7.87826 17.0964 7.80811 16.92 7.80811C16.7437 7.80811 16.5746 7.87826 16.45 8.0031L9.86337 14.5831Z"
      fill="white"
    />
  </svg>
);

export { Valid };
