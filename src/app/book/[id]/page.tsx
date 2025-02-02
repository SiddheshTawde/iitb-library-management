import { Button } from "@root/components/ui/button";
import { prisma } from "@root/database";
import Image from "next/image";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const book = await prisma.book.findUnique({ where: { id } });

  if (book === null) {
    return null;
  }

  return (
    <main className="flex-1 container mx-auto px-4 flex gap-12 py-6">
      <section className="flex-1 flex flex-col">
        <div className="flex flex-col gap-4 w-full border p-4 rounded flex-1">
          <div className="flex items-start gap-12">
            <div>
              <p className="text-2xl font-bold">{book.title}</p>
              <p className="text-base">By {book.author}</p>
            </div>
            <div>
              <Button>Borrow</Button>
            </div>
          </div>

          <div>
            <Image src={book.cover} alt={book.title} className="object-contain max-h-[60vh]" width={256} height={256} />
          </div>
        </div>
      </section>
    </main>
  );
}
