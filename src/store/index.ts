import { createStore } from "zustand/vanilla";
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

export const useBookList = createStore<BookStore>()(
  persist(
    devtools((set) => ({
      bookList: [],
      setBookList: (newList: any) => set(() => ({ bookList: newList })),
    })),
    { name: "book-storage" }
  )
);
