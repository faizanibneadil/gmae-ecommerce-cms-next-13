import { prisma } from "@/config/db";
import ProductsPageHeader from "./components/layoutHeader";
import { Badge, Card, Text } from "@tremor/react";
import Image from "next/image";
import DeleteButton from "./components/deleteButton";
import EditButton from "./components/editButton";
import Link from "next/link";
import { Star } from "lucide-react";
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
                  <h2 className="mt-2 text-sm font-semibold leading-tight text-left md:text-md line-clamp-2">
                    {product.title}
                  </h2>
                  <Badges />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 z-10 rounded-md bg-gradient-to-b from-white/20 from-30% via-white/40 via-40% to-white to-90% " />
                {/* BG Image */}
                <Image
                  className="object-cover object-center rounded-md"
                  src={`https://drive.google.com/uc?id=${images[0]?.src}`}
                  fill
                  alt=""
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

{
  /* <Card
              key={product.id}
              className="p-2 text-center"
              decorationColor="orange"
              decoration="top"
            >
              <Link href={`/admin/products/view/${product.slug}`}>
                <div className="h-32">
                  <Image
                    width={100}
                    height={100}
                    className="w-auto mx-auto"
                    alt=""
                    src={`https://drive.google.com/uc?id=${images[0]?.src}`}
                  />
                </div>
                <div className="py-4 text-left">
                  <Text className="font-medium line-clamp-2">
                    {product?.title}
                  </Text>
                  <Text>Price Rs: {product?.regularPrice}</Text>
                  <Text>Price Rs: {product?.salePrice}</Text>
                  <Text>{attributes?.length} Variants.</Text> 
                </div>
              </Link>
              <div className="flex flex-col space-y-2">
                <EditButton id={product.id} />
                <DeleteButton id={product.id} />
              </div>
            </Card> */
}
