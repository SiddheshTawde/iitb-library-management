"use client";

import Image from "next/image";
import { Button } from "@root/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="h-16 container mx-auto flex items-center justify-between relative px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="Globe" width={40} height={40} />
        <div className="flex flex-col">
          <span className="text-base font-black">भारतीय प्रौद्योगिकी संस्थान, मुंबई</span>
          <span className="text-sm">Indian Institute of Technology, Bombay</span>
        </div>
      </Link>
      <div>
        <SignedOut>
          <Button variant="secondary" asChild>
            <SignInButton mode="modal" />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton showName={true} />
        </SignedIn>
      </div>
    </header>
  );
};
