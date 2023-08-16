import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import InitializeNewInventory from "./_components/initialize-new-inventory";
import RefreshPage from "./_components/refresh-button";
import {
  Badge,
  Card,
  ProgressBar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  Title,
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

const Page = ({ params }: Props) => {
  const products = use(getAllProducts());
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <Title>Inventory</Title>
          <Text>Manage your store inventory.</Text>
        </div>
        <div className="flex justify-end mb-4 space-x-2">
          <InitializeNewInventory />
          <RefreshPage />
        </div>
      </div>

      {/* Main section */}
      <div className="mt-6">
        {!!products?.length ? (
          <Table>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  {/* <TableCell className="relative">
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
                  </TableCell> */}
                  <TableCell className="flex p-0">
                    <Text>{product.title}</Text>
                  </TableCell>
                  <TableCell className="max-w-sm p-0">
                    <ProgressBar value={45} color="teal" />
                  </TableCell>
                  <TableCell className="p-0 space-x-1">
                    <Badge
                      icon={product.isPublished ? PublicIcon : EyeIcon}
                      className="pr-0 bg-transparent"
                      color={product.isPublished ? `green` : `rose`}
                      tooltip={product.isPublished ? `Published` : `Private`}
                    />
                  </TableCell>
                  <TableCell className="p-0 space-x-1">
                    <EditProduct id={product.id} />
                    <DeleteProduct id={product.id} />
                    {/* //edit images */}
                    <DeleteProduct id={product.id} />
                    {/* show history */}
                    <DeleteProduct id={product.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          notFound()
        )}
      </div>
    </div>
  );
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
