import { SVGProps } from "react";

export type Connection = {
  name: string;
  label: string;
  description?: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element | string;
};
