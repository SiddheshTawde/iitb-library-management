type PageProps = {
  params: { bookId: string };
};

export default async function Page({ params }: PageProps) {
  const { bookId } = await params;

  return bookId;
}
