import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@root/components/ui/button";
import { BreadcrumbClient } from "./breadcrumb.client";

export async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="w-full bg-black/5 px-4 h-8 flex items-center">
      <div className="container mx-auto flex items-center justify-between w-full px-4">
        <BreadcrumbClient />
        {user && user.privateMetadata.role === "admin" ? (
          <div className="flex items-center gap-4">
            <Link href="/manage-book">
              <Button variant="link" className="px-0">
                Manage book
              </Button>
            </Link>

            <Link href="/add-book">
              <Button variant="link" className="px-0">
                Add new book
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
