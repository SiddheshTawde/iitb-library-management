"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@root/components/ui/card";
import { useBookList } from "@root/store";
import { useEffect } from "react";

export type BookList = { id: string; title: string; author: string; cover: string }[];

export const RenderBookList = ({ books }: { books: BookList }) => {
  const { bookList, setBookList } = useBookList.getState();

  useEffect(() => {
    if (books.length > 0) {
      setBookList(books);
    }
  }, [books]);

  return (
    <ul className="py-6 h-full w-full grid grid-cols-4">
      {bookList.map((book) => (
        <Card key={book.id} className="w-fit h-fit col-span-1">
          <Link href={"/book/" + book.id} className="w-fit h-fit">
            <CardContent className="p-4 pb-0">
              <Image src={book.cover} alt={book.title} className="object-cover" width={196} height={196} />
            </CardContent>
            <CardHeader className="p-4 pt-2">
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>By {book.author}</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      ))}
    </ul>
  );
};
