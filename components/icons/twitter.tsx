import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Twitter = (props: Props) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none' {...props}>
    <path
      d='M12.7351 7.44015L24.8711 -6.66699H21.9952L11.4576 5.58204L3.04126 -6.66699H-6.66602L6.06118 11.8557L-6.66602 26.6492H-3.79003L7.33797 13.7138L16.2263 26.6492H25.9335L12.7344 7.44015H12.7351ZM8.79609 12.0189L7.50656 10.1745L-2.75377 -4.50197H1.66358L9.94378 7.34238L11.2333 9.18682L21.9966 24.5827H17.5793L8.79609 12.0196V12.0189Z'
      fill='#6B7280'
    />
  </svg>
);

export { Twitter };
