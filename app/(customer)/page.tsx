import DiscountBanner from "./components/discountBanner";
import Products from "./components/products";
import SellerProfile from "./components/sellerProfile";
import { prisma } from "@/config/db";
import ProductCard from "./components/productsCard";
import Link from "next/link";
import Image from "next/image";
import Carousel from "./components/carousel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

export const revalidate = 120;

const getCategoriesAndProducts = async () => {
  const query = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      products: {
        select: {
          id: true,
          title: true,
          images: true,
          regularPrice: true,
          salePrice: true,
        },
        take: 6,
      },
    },
    where: {
      products: {
        some: {
          id: {},
        },
      },
    },
    take: 8,
  });
  return query;
};

export default async function Page() {
  const categories = await getCategoriesAndProducts();
  const session = await getServerSession(authOptions);
  return (
    <div>
      {/* <DiscountBanner /> */}
      {/* <SellerProfile /> */}
      <Carousel />
      <div className="container mx-auto">
        {categories?.map((category, cIdx) => (
          <>
            <section key={cIdx} className="p-2 md:p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2 font-semibold truncate ">
                  <span className="relative w-8 h-8 rounded-full">
                    <Image
                      src={`https://drive.google.com/thumbnail?id=${category.image}&sz=w64-h64`}
                      fill
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                  </span>
                  <span>{category.name}</span>
                </span>
                <Link
                  href={`/categories/${category.name?.split(" ").join("/")}`}
                  className="font-semibold "
                >
                  See all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-6">
                {category?.products.map((p, pIdx) => (
                  <ProductCard
                    userId={session?.user.id}
                    key={pIdx}
                    product={p}
                  />
                ))}
              </div>
            </section>
            <div className="flex-grow border-t border-gray-200"></div>
          </>
        ))}
      </div>
    </div>
  );
}
