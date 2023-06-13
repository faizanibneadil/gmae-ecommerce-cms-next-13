import { prisma } from "@/config/db";
import ProductsPageHeader from "./components/layoutHeader";
import { Card, Text } from "@tremor/react";
import Image from "next/image";
import DeleteButton from "./components/deleteButton";
import EditButton from "./components/editButton";
import Link from "next/link";

export default async function Page() {
  const products = await prisma.products.findMany();
  return (
    <div className="md:mx-52">
      <ProductsPageHeader />
      <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-4">
        {products?.map((product) => {
          const images: any = product.images;
          const attributes: any = product.attributes;
          return (
            <Card
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
                    src={`https://drive.google.com/uc?export=view&id=${images[0]?.src}`}
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
            </Card>
          );
        })}
      </div>
    </div>
  );
}
