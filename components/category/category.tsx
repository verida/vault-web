import Link from "next/link";
import { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "../ui/card";

type CategoryProps = {
  icon?: ReactNode;
  title?: string;
  description: string;
  href?: string;
};

function Category({ icon, title, description, href }: CategoryProps) {
  return (
    <Link href={href || "#"}>
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          {icon && icon}
          {title && <h3 className="mt-6 text-2xl">{title}</h3>}
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export { Category };
