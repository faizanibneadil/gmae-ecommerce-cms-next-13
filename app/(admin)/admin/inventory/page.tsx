import { cache } from "react";
import { prisma } from "@/config/db";
import InitializeNewInventory from "./_components/initialize-new-inventory";
import RefreshPage from "./_components/refresh-button";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
} from "@tremor/react";
import Image from "next/image";
import EditProduct from "./_components/edit-button";
import { notFound } from "next/navigation";
import { EyeIcon, PublicIcon } from "@/app/_components/icons";
import DeleteProduct from "./_components/deleteButton";

const getAllProducts = cache(async () => {
  const res = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      isPublished: true,
      images: {
        select: {
          id: true,
          src: true,
        },
      },
    },
  });
  return res;
});

interface Props {
  searchParams: { [key: string]: string };
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const products = await getAllProducts();
  return !!products?.length ? (
    <div>
      <div className="flex justify-end mb-4 space-x-2">
        <InitializeNewInventory />
        <RefreshPage />
      </div>
      <Table>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="relative">
                {product.images.map((image) => (
                  <Image
                    key={image.id}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-contain"
                    src={`https://lh3.googleusercontent.com/d/${image?.src}=s220`}
                  />
                ))}
              </TableCell>
              <TableCell className="flex">
                <Text>{product.title}</Text>
              </TableCell>
              <TableCell className="space-x-1">
                <Badge
                  icon={product.isPublished ? PublicIcon : EyeIcon}
                  className="pr-0 bg-transparent"
                  color={product.isPublished ? `green` : `rose`}
                  tooltip={product.isPublished ? `Published` : `Private`}
                />
              </TableCell>
              <TableCell className="space-x-1">
                <EditProduct id={product.id} />
                <DeleteProduct id={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : (
    notFound()
  );
};
export default Page;
