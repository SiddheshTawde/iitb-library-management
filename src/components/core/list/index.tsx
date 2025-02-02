"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useBookList } from "@root/store";
import { ScrollArea } from "@root/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@root/components/ui/card";

export type BookList = { id: string; title: string; author: string; cover: string }[];

export const RenderBookList = ({ books }: { books: BookList }) => {
  const { bookList, setBookList } = useBookList.getState();

  React.useEffect(() => {
    if (books.length > 0) {
      setBookList(books);
    }
  }, [books, setBookList]);

  return (
    <ScrollArea className="py-6 h-full w-full whitespace-nowrap">
      <div className="grid grid-cols-4 gap-6">
        {bookList.map((book) => (
          <Card key={book.id} className="w-full h-fit col-span-1">
            <Link href={"/book/" + book.id}>
              <CardContent className="p-4 pb-0">
                <Image
                  width={196}
                  height={196}
                  alt={book.title}
                  src={book.cover}
                  className="object-cover mx-auto max-h-[196px] h-auto w-auto"
                />
              </CardContent>
              <CardHeader className="p-4 pt-2">
                <CardTitle className="overflow-hidden text-ellipsis">{book.title}</CardTitle>
                <CardDescription>By {book.author}</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
