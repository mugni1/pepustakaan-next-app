import BtnHref from "@/components/Admin/Button/BtnHref";
import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import { getBooksDetail } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Details",
};

interface Category {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  image: string;
  writer: string;
  publisher: string;
  publication_date: string;
  description: string;
  stock: number;
  category: Category;
  created_at: string;
  updated_at: string;
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data }: { data: Book } = await getBooksDetail(id);

  return (
    <MainContainer>
      <div className="flex justify-between mb-5">
        <BtnHref href="/dashboard/books">Back</BtnHref>
      </div>
      <Container>
        {/* info lain lain  */}
        <section className="w-full flex">
          {/* image  */}
          <div className="w-3/12 rounded-lg overflow-hidden shadow-lg">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${data.image}`}
              alt=""
              className="w-full "
            />
          </div>
          {/* end image  */}
          {/* info  */}
          <div className="w-8/12 px-5 flex flex-col gap-3">
            {/* title  */}
            <h1 className="poppins-bold text-2xl line-clamp-1">{data.title}</h1>
            {/* end title  */}
            {/* penulis  */}
            <div className="flex flex-col">
              <h3 className="poppins-semibold flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
                </svg>
                Penulis
              </h3>
              <span>{data.writer}</span>
            </div>
            {/* end penulis  */}
            {/* Penerbit  */}
            <div className="flex flex-col">
              <h3 className="poppins-semibold flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,16a87.5,87.5,0,0,1,48,14.28V74L153.83,99.74,122.36,104l-.31-.22L102.38,90.92A16,16,0,0,0,79.87,95.1L58.93,126.4a16,16,0,0,0-2.7,8.81L56,171.44l-3.27,2.15A88,88,0,0,1,128,40ZM62.29,186.47l2.52-1.65A16,16,0,0,0,72,171.53l.21-36.23L93.17,104a3.62,3.62,0,0,0,.32.22l19.67,12.87a15.94,15.94,0,0,0,11.35,2.77L156,115.59a16,16,0,0,0,10-5.41l22.17-25.76A16,16,0,0,0,192,74V67.67A87.87,87.87,0,0,1,211.77,155l-16.14-14.76a16,16,0,0,0-16.93-3l-30.46,12.65a16.08,16.08,0,0,0-9.68,12.45l-2.39,16.19a16,16,0,0,0,11.77,17.81L169.4,202l2.36,2.37A87.88,87.88,0,0,1,62.29,186.47ZM185,195l-4.3-4.31a16,16,0,0,0-7.26-4.18L152,180.85l2.39-16.19L184.84,152,205,170.48A88.43,88.43,0,0,1,185,195Z"></path>
                </svg>
                Penerbit
              </h3>
              <span>{data.publisher}</span>
            </div>
            {/* end Penerbit  */}
            {/* Tahun Terbit  */}
            <div className="flex flex-col">
              <h3 className="poppins-semibold flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
                </svg>
                Tahun Terbit
              </h3>
              <span>{data.publication_date}</span>
            </div>
            {/* end Tahun Terbit  */}
            {/* Kategori  */}
            <div className="flex flex-col">
              <h3 className="poppins-semibold flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z"></path>
                </svg>
                Kategori
              </h3>
              <span>{data.category.name}</span>
            </div>
            {/* end Kategori  */}
            {/* Stok  */}
            <div className="flex items-center gap-1">
              <h3 className="poppins-semibold flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M231.65,194.55,198.46,36.75a16,16,0,0,0-19-12.39L132.65,34.42a16.08,16.08,0,0,0-12.3,19l33.19,157.8A16,16,0,0,0,169.16,224a16.25,16.25,0,0,0,3.38-.36l46.81-10.06A16.09,16.09,0,0,0,231.65,194.55ZM136,50.15c0-.06,0-.09,0-.09l46.8-10,3.33,15.87L139.33,66Zm6.62,31.47,46.82-10.05,3.34,15.9L146,97.53Zm6.64,31.57,46.82-10.06,13.3,63.24-46.82,10.06ZM216,197.94l-46.8,10-3.33-15.87L212.67,182,216,197.85C216,197.91,216,197.94,216,197.94ZM104,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32ZM56,48h48V64H56Zm0,32h48v96H56Zm48,128H56V192h48v16Z"></path>
                </svg>
                Stok :
              </h3>
              <span className="rounded-full poppins-semibold text-purple-600">
                {data.stock}
              </span>
            </div>
            {/* end Stok  */}
          </div>
          {/* info  */}
        </section>
        {/* end info lain lain  */}
        {/* Deskripsi  */}
        <section className="w-full mt-3">
          <div className="flex flex-col">
            <h3 className="poppins-semibold flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M128,96H232a8,8,0,0,1,0,16H128a8,8,0,0,1,0-16Zm104,32H128a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm0,32H80a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm0,32H80a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM96,144a8,8,0,0,0,0-16H88V64h32v8a8,8,0,0,0,16,0V56a8,8,0,0,0-8-8H32a8,8,0,0,0-8,8V72a8,8,0,0,0,16,0V64H72v64H64a8,8,0,0,0,0,16Z"></path>
              </svg>
              Deskripsi
            </h3>
            <span>{data.description}</span>
          </div>
        </section>
        {/* end Deskripsi  */}
      </Container>
    </MainContainer>
  );
}
