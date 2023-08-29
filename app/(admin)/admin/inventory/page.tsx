import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import MoreOptions from "./_components/more-options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EyeIcon, PublicIcon } from "@/app/_components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Layout } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const getAllProducts = cache(async () => {
  const res = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      isPublished: true,
      isFeatured: true,
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

const Page: React.FC<{
  searchParams: { [key: string]: string };
  params: { id: string };
}> = memo(({ params, searchParams }) => {
  const products = use(getAllProducts());
  return !!products?.length ? (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-8">
      {products?.map((p) => (
        <div key={p.id} className="flex flex-col space-y-1">
          <Card className="relative w-full h-32">
            <Image
              fill
              sizes="100vh"
              src={`https://lh3.googleusercontent.com/d/${p?.images[0]?.src}=s220`}
              alt=""
              className="object-cover w-full h-20 mb-2 rounded-md"
            />
          </Card>
          <MoreOptions
            id={p.id}
            isFeatured={p.isFeatured}
            isPublished={p.isPublished}
          />
        </div>
      ))}
    </div>
  ) : (
    // <div>
    //   <div className="grid gap-6">
    //     {products?.map((p) => (
    //       <div
    //         key={p.id}
    //         className="flex items-center justify-between space-x-4"
    //       >
    //         <div className="flex items-center space-x-4">
    //           <Avatar>
    //             <AvatarImage
    //               src={`https://lh3.googleusercontent.com/d/${p.images[0]?.src}=s220`}
    //             />
    //             <AvatarFallback>IMG</AvatarFallback>
    //           </Avatar>
    //           <div className="flex flex-col space-y-1">
    //             <p className="text-sm font-medium leading-none">{p.title}</p>
    //             <div className="flex flex-row items-center space-x-2 text-sm text-muted-foreground">
    //               {p.isPublished ? (
    //                 <TooltipProvider>
    //                   <Tooltip>
    //                     <TooltipTrigger>
    //                       <PublicIcon className="w-4 h-4" />
    //                     </TooltipTrigger>
    //                     <TooltipContent>Published</TooltipContent>
    //                   </Tooltip>
    //                 </TooltipProvider>
    //               ) : (
    //                 <TooltipProvider>
    //                   <Tooltip>
    //                     <TooltipTrigger>
    //                       <EyeIcon className="w-4 h-4" />
    //                     </TooltipTrigger>
    //                     <TooltipContent>Private</TooltipContent>
    //                   </Tooltip>
    //                 </TooltipProvider>
    //               )}
    //               {p.isFeatured && (
    //                 <TooltipProvider>
    //                   <Tooltip>
    //                     <TooltipTrigger>
    //                       <Layout className="w-4 h-4" />
    //                     </TooltipTrigger>
    //                     <TooltipContent>Featured</TooltipContent>
    //                   </Tooltip>
    //                 </TooltipProvider>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //         <MoreOptions id={p.id} />
    //       </div>
    //     ))}
    //   </div>
    // </div>
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
