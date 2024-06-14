import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const CloseSideRight = (props: Props) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M4 12H15M15 12L11 8M15 12L11 16' stroke='#6B7280' strokeWidth='2' strokeLinecap='round' />
    <path d='M19 5V19' stroke='#6B7280' strokeWidth='2' strokeLinecap='round' />
  </svg>
);

export { CloseSideRight };
