import { create } from "zustand";
import { BookList } from "@root/components/core/list";
import { devtools, persist } from "zustand/middleware";

interface States {
  bookList: BookList;
}

// Action types
interface Actions {
  setBookList: (bookList: BookList) => void;
}

type BookStore = States & Actions;

export const useBookList = create<BookStore>()(
  persist(
    devtools((set) => ({
      bookList: [],
      setBookList: (newList) => set(() => ({ bookList: newList })),
    })),
    { name: "books-storage" }
  )
);
