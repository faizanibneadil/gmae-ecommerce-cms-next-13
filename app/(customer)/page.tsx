import DiscountBanner from "./components/discountBanner";
import Products from "./components/products";
import SellerProfile from "./components/sellerProfile";
import { prisma } from "@/config/db";
import ProductCard from "./components/productsCard";

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
        take: 12,
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
          <div className="flex items-center justify-between">
            <h2 className="font-semibold truncate">{category.name}.</h2>
            <a>See all</a>
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
