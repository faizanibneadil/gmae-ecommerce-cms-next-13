import DiscountBanner from "./components/discountBanner";
import Products from "./components/products";
import SellerProfile from "./components/sellerProfile";
import { prisma } from "@/config/db";
import ProductCard from "./components/productsCard";
import Link from "next/link";
import Image from "next/image";
import Carousel from "./components/carousel";

export const revalidate = 60;

const getCategoriesAndProducts = async () =>
  await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      products: {
        select: {
          id: true,
          title: true,
          regularPrice: true,
          salePrice: true,
          images: true,
        },
        take: 6,
      },
      subCategory: {
        select: { id: true, name: true },
        where: { products: { some: { id: {} } } },
      },
    },
    where: {
      parentCategoryId: null,
      products: { some: { id: {} } },
    },
    take: 8,
  });

export default async function Page() {
  const categories = await getCategoriesAndProducts();
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
                      src={`https://drive.google.com/uc?export=view&id=${category.image}`}
                      fill
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                  </span>
                  <span>{category.name}</span>
                </span>
                <Link href="#" className="font-semibold ">
                  See all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-6">
                {category?.products.map((p, pIdx) => (
                  <ProductCard key={pIdx} product={p} />
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
