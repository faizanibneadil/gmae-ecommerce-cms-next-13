import { prisma } from "@/config/db";
import ProductsPageHeader from "./components/layoutHeader";
import { Card } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import Badges from "./components/badges";

export default async function Page() {
  const products = await prisma.products.findMany();
  return (
    <div className="md:mx-52">
      <ProductsPageHeader />
      <div className="grid grid-cols-2 gap-2 mt-4 sm:grid-cols-2 md:grid-cols-4">
        {products?.map((product) => {
          const images: any = product.images;
          const attributes: any = product.attributes;
          return (
            <Card
              key={product.id}
              className="p-2 text-center shadow-lg"
            >
              <Link href={`/admin/products/view/${product.slug}`}>
              <div className="relative overflow-hidden rounded-md h-36 md:h-56">
                {/* Content */}
                <div className="relative z-20 flex flex-col justify-end w-full h-full">
                  <Badges />
                  <h2 className="mt-2 text-sm font-semibold leading-tight text-left md:text-md line-clamp-2">
                    {product.title}
                  </h2>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 z-10 rounded-md bg-gradient-to-t from-white from-[20%] via-transparent via-30% to-transparent to-90%" />
                {/* BG Image */}
                <Image
                  className="object-contain object-top rounded-md"
                  src={`https://drive.google.com/uc?id=${images[0]?.src}`}
                  fill
                  alt=""
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}