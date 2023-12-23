import Image from "next/image";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="grow p-6 bg-gray-100 text-gray-800 w-full">
          <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Jun 1, 2020</span>
              <span className="px-2 py-1 rounded bg-red-600 text-gray-50 text-sm ">
                #javascript
              </span>
            </div>
            <div className="mt-3">
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-2xl font-bold hover:underline"
              >
                Nos creasse pendere crescit angelos etc
              </a>
              <p className="mt-2">
                Tamquam ita veritas res equidem. Ea in ad expertus paulatim
                poterunt. Imo volo aspi novi tur. Ferre hic neque vulgo hae
                athei spero. Tantumdem naturales excaecant notaverim etc cau
                perfacile occurrere. Loco visa to du huic at in dixi aër.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <a
                rel="noopener noreferrer"
                href="#"
                className="hover:underline text-red-600"
              >
                Read more
              </a>
              <div>
                <span className=" flex items-center text-gray-600">
                  Leroy Jenkins
                </span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
