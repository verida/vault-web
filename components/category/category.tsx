import Link from "next/link";
import { ReactNode } from "react";

import { Typography } from "../typography";
import { Card, CardContent } from "../ui/card";

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
          {title && (
            <Typography variant="heading-4" className="mt-6">
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="base-l" className="mt-1 text-gray-500">
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export { Category };
