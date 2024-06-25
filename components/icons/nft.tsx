import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Nft = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.30514 18.3219L11.407 14.1347C11.675 13.8613 12.0842 13.8537 12.3602 14.117L16.9064 18.4544M15.2693 16.5398L17.1845 14.546C17.4933 14.253 17.8376 14.2329 18.1237 14.4718L20.4994 16.4549M20.5 6.99985L12 2L3.5 6.99985V16.9999L12 22L20.5 16.9999V6.99985ZM9.08796 11.6959C10.257 11.6959 11.2047 10.7482 11.2047 9.57921C11.2047 8.4102 10.257 7.46251 9.08796 7.46251C7.91895 7.46251 6.97126 8.4102 6.97126 9.57921C6.97126 10.7482 7.91895 11.6959 9.08796 11.6959Z"
      stroke="#111111"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { Nft };
