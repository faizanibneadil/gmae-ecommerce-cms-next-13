import DiscountBanner from "./components/discountBanner";
import Products from "./components/products";
import ProductsCarousel from "./components/productsCarousel";
import SellerProfile from "./components/sellerProfile";
import { prisma } from "@/config/db";

export default async function Page() {
  const products = await prisma.products.findMany();
  return (
    <div>
      {/* <DiscountBanner /> */}
      {/* <SellerProfile /> */}
      <section className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold"> 👍 Top Selling Products.</h2>
          <span>See more...</span>
        </div>
        <ProductsCarousel products={products} />
      </section>
      <section className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold"> 🎉 New Arrivals.</h2>
          <span>See more...</span>
        </div>
        <ProductsCarousel products={products} />
      </section>
      <section className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold"> 🎮 Gaming Products.</h2>
          <span>See more...</span>
        </div>
        <ProductsCarousel products={products} />
      </section>
      <section className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold"> 📱 Mobiles Phones.</h2>
          <span>See more...</span>
        </div>
        <ProductsCarousel products={products} />
      </section>
    </div>
  );
}
