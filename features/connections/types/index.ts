import { SVGProps } from "react";

export type Connection = {
  id: string;
  item: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};
