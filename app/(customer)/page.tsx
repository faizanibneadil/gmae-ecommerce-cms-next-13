import DiscountBanner from "./_components/discountBanner";
import Products from "./_components/products";
import SellerProfile from "./_components/sellerProfile";
import { prisma } from "@/config/db";
import ProductCard from "./_components/productsCard";
import Link from "next/link";
import Image from "next/image";
import Carousel from "./_components/carousel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { getCategoriesAndProductsQuery } from "./_queries";

// export const revalidate = 120;

export default async function Page() {
  const { categoriesAndProducts } = await getCategoriesAndProductsQuery()
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Carousel />
      <div className="container mx-auto">
        {categoriesAndProducts?.map((category) => (
          <>
            <section key={category.id} className="p-2 md:p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2 font-semibold truncate ">
                  <span className="relative w-8 h-8 rounded-full">
                    <Image
                      src={`https://drive.google.com/thumbnail?id=${category.images?.src}&sz=w64-h64`}
                      fill
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                  </span>
                  <span className="uppercase">{category.name}</span>
                </span>
                <Link
                  href={`/categories/${category.slug}`}
                  className="font-semibold "
                >
                  See all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-6">
                {category?.Products.map((p, pIdx) => (
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
