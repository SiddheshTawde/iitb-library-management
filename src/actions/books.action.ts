"use server";

import { z } from "zod";
import { v4 as uuid } from "uuid";

import { prisma } from "@root/database";
import { supabase } from "@root/storage";
import { newBookFormSchema } from "@root/app/add-book/page";

export const getBookAction = async () => {
  try {
    const book = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        cover: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
    });
    return book;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addBookAction = async (payload: z.infer<typeof newBookFormSchema>) => {
  try {
    const file = payload.cover;

    if (file) {
      const { data, error } = await supabase.storage.from("covers").upload(uuid() + "_" + file.name, file);

      if (error) {
        throw new Error(error.message);
      }

      const book = await prisma.book.create({
        data: {
          title: payload.title,
          author: payload.author,
          isbn: payload.isbn,
          categoryId: payload.category,
          cover: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL + "/storage/v1/object/public/" + data.fullPath,
        },
      });

      if (book) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
