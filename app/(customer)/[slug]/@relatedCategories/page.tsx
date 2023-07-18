import React from "react";
import { getProductRelatedCategories } from "./_queries";
import Image from "next/image";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  const { relatedCategories } = await getProductRelatedCategories(params.slug);
  return (
    <div className="space-y-2">
      <div className="font-semibold text-md">Related Categories:</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {relatedCategories?.map((Categories) => (
          <div
            key={Categories.id}
            className="flex flex-col col-span-2 space-y-2"
          >
            <div className="relative w-full h-40 rounded-md">
              <Image
                className="object-cover rounded-md"
                fill
                alt=""
                src={`https://lh3.googleusercontent.com/d/${Categories.images?.src}=s620`}
              />
            </div>
            <h3 className="">{Categories.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
