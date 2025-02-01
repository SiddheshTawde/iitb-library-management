"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@root/components/ui/breadcrumb";
import Link from "next/link";

const formatURL = (slug: string) => {
  if (slug === "") {
    return "Home";
  }

  return slug.replace(/-/g, " ");
};

export function BreadcrumbClient() {
  const pathname = usePathname();
  const [slugs, updateSlugs] = React.useState<string[]>([""]);

  React.useEffect(() => {
    updateSlugs(Array.from(new Set(pathname.split("/"))));
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {slugs.map((slug, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === slugs.length - 1 ? (
                <BreadcrumbPage className="capitalize">{formatURL(slug)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink className="capitalize" asChild>
                  <Link href={"/" + slug}>{formatURL(slug)}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {index === slugs.length - 1 ? null : <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
