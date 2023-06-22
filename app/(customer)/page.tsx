import DiscountBanner from "./components/discountBanner";
import Products from "./components/products";
import SellerProfile from "./components/sellerProfile";
import { prisma } from "@/config/db";
import ProductCard from "./components/productsCard";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const revalidate = 60;

const getCategoriesAndProducts = async () =>
  await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
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
      {categories?.map((category) => (
        <section key={category.id} className="p-2 md:p-4">
          <div className="relative flex items-center py-5">
            <span className="flex-shrink mr-4 font-semibold truncate">
              {category.name}.
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
            <Link href="#" className="flex-shrink ml-4 font-semibold">See all</Link>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-6">
            {category?.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
