"use server";

import { z } from "zod";

import { prisma } from "@root/database";
import { newBookFormSchema } from "@root/app/add-book/page";
import { supabase } from "@root/storage";

export const addBookAction = async (payload: z.infer<typeof newBookFormSchema>) => {
  try {
    const file = payload.cover[0];

    if (file) {
      const { data, error } = await supabase.storage.from("covers").upload(file.name, file);

      console.log({ data, error });
      if (error) {
        throw new Error(error.message);
      }

      const book = await prisma.book.create({
        data: {
          title: payload.title,
          author: payload.author,
          isbn: payload.isbn,
          categoryId: payload.category,
          cover: data.fullPath,
        },
      });

      if (book) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.log({ error });
    return false;
  }
};
