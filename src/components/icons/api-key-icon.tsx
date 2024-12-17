import React, { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {}

export const ApiKeyIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    {...props}
  >
    <path
      d="M7.67922 6.5999H7.80039M14.6186 9.38172L21.3075 16.0706C21.495 16.2582 21.6004 16.5125 21.6004 16.7778V20.5999C21.6004 21.1522 21.1527 21.5999 20.6004 21.5999H18.1095V18.9817H15.4913V16.3635L12.2665 13.3266C11.2303 14.1359 9.92618 14.6181 8.50948 14.6181C5.13552 14.6181 2.40039 11.8829 2.40039 8.50899C2.40039 5.13503 5.13552 2.3999 8.50948 2.3999C11.8834 2.3999 14.6186 5.13503 14.6186 8.50899V9.38172Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
