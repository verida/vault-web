import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Data = (props: Props) => (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M21.6004 6.6C21.6004 8.58823 17.3023 10.2 12.0004 10.2C6.69846 10.2 2.40039 8.58823 2.40039 6.6M21.6004 6.6C21.6004 4.61177 17.3023 3 12.0004 3C6.69846 3 2.40039 4.61177 2.40039 6.6M21.6004 6.6V17.4C21.6004 19.3882 17.3023 21 12.0004 21C6.69846 21 2.40039 19.3882 2.40039 17.4V6.6M21.6004 12C21.6004 13.9882 17.3023 15.6 12.0004 15.6C6.69846 15.6 2.40039 13.9882 2.40039 12'
      stroke='currentColor'
      strokeWidth={2}
    />
  </svg>
);

export { Data };
