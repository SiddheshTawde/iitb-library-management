import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IIT Bombay | New book",
  description: "IIT Bombay - Add new book",
};

export default function AddBookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
