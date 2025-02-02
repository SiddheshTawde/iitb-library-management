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
import { useBookList } from "@root/store";
import { formatBreadcrumb } from "@root/lib/utils";

export function BreadcrumbClient() {
  const { bookList } = useBookList.getState();

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
                <BreadcrumbPage className="capitalize">{formatBreadcrumb(slug, bookList)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink className="capitalize" asChild>
                  <Link href={"/" + slug}>{formatBreadcrumb(slug, bookList)}</Link>
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
