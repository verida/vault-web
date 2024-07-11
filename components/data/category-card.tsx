import Link from "next/link";
import { ReactNode } from "react";

import { Typography } from "../typography";
import { Card, CardContent } from "../ui/card";

type CategoryCardProps = {
  icon?: ReactNode;
  title?: string;
  description: string;
  href?: string;
};

export function CategoryCard({
  icon,
  title,
  description,
  href,
}: CategoryCardProps) {
  return (
    <Link href={href || "#"}>
      <Card className="shadow-card rounded-2xl">
        <CardContent className="p-6">
          {icon && icon}
          {title && (
            <Typography variant="heading-4" className="mt-6">
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant="base-l"
              className="mt-1 text-secondary-foreground"
            >
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
