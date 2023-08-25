import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import InitializeNewInventory from "./_components/initialize-new-inventory";
import RefreshPage from "./_components/refresh-button";
import { Card, Icon, ProgressBar, Text, Title } from "@tremor/react";
import Image from "next/image";
import EditProduct from "./_components/edit-button";
import { notFound } from "next/navigation";
import { EyeIcon, PublicIcon } from "@/app/_components/icons";
import DeleteProduct from "./_components/deleteButton";
import PageHeader from "../../_components/page-header";

const getAllProducts = cache(async () => {
  const res = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      isPublished: true,
      stock: true,
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
    <div>
      <PageHeader
        backRoute=""
        enableBackButton={false}
        pageDescription="Manage your store inventory."
        pageHeading="Inventory"
      />
      <Card className="max-w-4xl p-0 mx-auto mt-4 rounded-none">
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {!!products?.length
              ? products?.map((p) => (
                  <li className="px-3 py-1" key={p.id}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="relative w-8 h-8 rounded-full shadow-lg">
                          {p.images.map((image) => (
                            <Image
                              key={image.id}
                              alt=""
                              fill
                              sizes="100vw"
                              className="object-contain rounded-full"
                              src={`https://lh3.googleusercontent.com/d/${image?.src}=s220`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {p.title}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Icon
                            size="xs"
                            icon={p.isPublished ? PublicIcon : EyeIcon}
                            variant="simple"
                            className="p-0"
                            color={p.isPublished ? `green` : `rose`}
                            tooltip={p.isPublished ? `Published` : `Private`}
                          />
                          <ProgressBar
                            tooltip={p.stock?.toString()}
                            value={Number(p.stock)}
                            color={Number(p.stock) > 50 ? "green" : "rose"}
                            className="w-20"
                          />
                          <EditProduct id={p.id} />
                          <DeleteProduct id={p.id} />
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              : notFound()}
          </ul>
        </div>
      </Card>
    </div>
  );
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
