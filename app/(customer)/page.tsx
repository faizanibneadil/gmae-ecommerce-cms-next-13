import DiscountBanner from "./components/discountBanner";
import Products from "./components/products";
import SellerProfile from "./components/sellerProfile";
import { prisma } from "@/config/db";
import ProductCard from "./components/productsCard";

export default async function Page() {
  const products = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      images: true,
      salePrice: true,
      regularPrice: true,
    },
    take: 12,
  });
  return (
    <div>
      {/* <DiscountBanner /> */}
      {/* <SellerProfile /> */}
      <section className="p-2 md:p-4">
        <div className="flex items-center justify-between">
          <h2 className="truncate">🎉 New Arrivals.</h2>
          <a>See all</a>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="p-2 md:p-4">
        <div className="flex items-center justify-between">
          <h2 className="truncate">📱 Mobile Phones.</h2>
          <a>See all</a>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
