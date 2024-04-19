import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Facebook = (props: Props) => (
  <svg
    width='48'
    height='48'
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <rect width='48' height='48' rx='24' fill='#1877F2' />
    <path
      d='M29.1213 25.6241L29.8622 20.9209H25.2983V17.8638C25.2983 16.5777 25.9354 15.3211 27.9729 15.3211H30.077V11.316C28.8517 11.1208 27.6135 11.0152 26.3726 11C22.6162 11 20.1638 13.2561 20.1638 17.3347V20.9209H16V25.6241H20.1638V37H25.2983V25.6241H29.1213Z'
      fill='white'
    />
  </svg>
);

export { Facebook };
