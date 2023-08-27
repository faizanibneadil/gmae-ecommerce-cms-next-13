import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import InitializeNewInventory from "./_components/initialize-new-inventory";
import RefreshPage from "./_components/refresh-button";
import Image from "next/image";
import EditProduct from "./_components/edit-button";
import { notFound } from "next/navigation";
import DeleteProduct from "./_components/deleteButton";
import PageHeader from "../../_components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import MoreOptions from "./_components/more-options";

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
  return !!products?.length ? (
    <Command>
      <CommandInput placeholder="Search Product" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>Add Product</CommandItem>
          <CommandItem>Refresh Product</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Products">
          {products.map((p) => (
            <CommandItem
              key={p.id}
              className="flex flex-row items-center justify-between"
            >
              <div className="flex flex-row items-center justify-center space-x-2">
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
                <div className="flex flex-col">
                  <h2>{p.title}</h2>
                  <div className="flex flex-row items-center justify-start space-x-2">
                    <div>Public</div>
                    <div>Private</div>
                    <div>Featured</div>
                  </div>
                </div>
              </div>
              <MoreOptions id={p.id} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  ) : (
    // <div>
    //   <Card className="max-w-4xl p-0 mx-auto mt-4 rounded-none">
    //     <div className="flow-root">
    //       <ul
    //         role="list"
    //         className="divide-y divide-gray-200 dark:divide-gray-700"
    //       >
    //         {!!products?.length
    //           ? products?.map((p) => (
    //               <li className="px-3 py-1" key={p.id}>
    //                 <div className="flex items-center space-x-4">
    //                   <div className="flex-shrink-0">
    //                     <div className="relative w-8 h-8 rounded-full shadow-lg">
    //                       {p.images.map((image) => (
    //                         <Image
    //                           key={image.id}
    //                           alt=""
    //                           fill
    //                           sizes="100vw"
    //                           className="object-contain rounded-full"
    //                           src={`https://lh3.googleusercontent.com/d/${image?.src}=s220`}
    //                         />
    //                       ))}
    //                     </div>
    //                   </div>
    //                   <div className="flex-1 min-w-0">
    //                     <p className="text-sm font-medium text-gray-900 truncate">
    //                       {p.title}
    //                     </p>
    //                     <div className="flex items-center space-x-2">
    //                       <Icon
    //                         size="xs"
    //                         icon={p.isPublished ? PublicIcon : EyeIcon}
    //                         variant="simple"
    //                         className="p-0"
    //                         color={p.isPublished ? `green` : `rose`}
    //                         tooltip={p.isPublished ? `Published` : `Private`}
    //                       />
    //                       <ProgressBar
    //                         tooltip={p.stock?.toString()}
    //                         value={Number(p.stock)}
    //                         color={Number(p.stock) > 50 ? "green" : "rose"}
    //                         className="w-20"
    //                       />
    //                       <EditProduct id={p.id} />
    //                       <DeleteProduct id={p.id} />
    //                     </div>
    //                   </div>
    //                 </div>
    //               </li>
    //             ))
    //           : notFound()}
    //       </ul>
    //     </div>
    //   </Card>
    // </div>
    notFound()
  );
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
