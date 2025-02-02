import { core } from "@root/components/core";
import { getBookAction } from "@root/actions/books.action";

export default async function Page() {
  const books = await getBookAction();

  return (
    <main className="flex-1 container mx-auto px-4">
      <core.list books={books} />
    </main>
  );
}
