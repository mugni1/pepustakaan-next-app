import Image from "next/image";

interface Book {
  id: number;
  image: string;
  title: string;
  writer: string;
  stock: number;
}

export default function ListBooks({ books }: { books: Book[] }) {
  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5 mt-2">
      {books?.map((book: Book, index) => (
        <div
          key={book.id + index}
          className="columns-1 rounded-xl shadow-lg border border-foreground/30 overflow-hidden group"
        >
          {/* head  */}
          <div className="w-full h-52 md:h-60 xl:h-72 overflow-hidden cursor-pointer">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${book.image}`}
              className="object-cover h-full w-full group-hover:scale-110 group-hover:rotate-4 transition-all"
              alt=""
              width={150}
              height={200}
            />
          </div>
          {/* end head  */}
          {/* body  */}
          <div className="p-3 flex flex-col">
            <span className="font-bold line-clamp-1">{book.title}</span>
            <span className="text-slate-400 mb-1">{book.writer}</span>
            <span
              className={` ${
                book.stock > 0
                  ? "bg-accent2/20 text-accent2"
                  : "bg-red-200 text-red-600"
              } py-1 px-3 rounded-md w-fit flex items-center font-semibold`}
            >
              Stock : {book.stock}
            </span>
          </div>

          {/* end body */}
        </div>
      ))}
    </section>
  );
}
