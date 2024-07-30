import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const ArrowRightGray = (props: Props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.6">
        <path
          opacity="0.6"
          d="M8.99953 7.21075C8.60953 7.60075 8.60953 8.23075 8.99953 8.62075L12.8795 12.5008L8.99953 16.3808C8.60953 16.7708 8.60953 17.4008 8.99953 17.7908C9.38953 18.1808 10.0195 18.1808 10.4095 17.7908L14.9995 13.2008C15.3895 12.8108 15.3895 12.1808 14.9995 11.7908L10.4095 7.20075C10.0295 6.82075 9.38953 6.82075 8.99953 7.21075Z"
          fill="#7F8388"
        />
      </g>
    </svg>
  );
};

export default ArrowRightGray;
