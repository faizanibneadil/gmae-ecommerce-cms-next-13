import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import AddToFavoriteButton from "../_components/add-to-favorite-button";
import AddToCartButton from "../_components/add-to-cart-button";
import { priceFormatter } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "@/app/_components/icons";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const getProperties = cache(async ({ slug }: { slug: string }) => {
  const properties = await prisma.products.findUnique({
    select: {
      id: true,
      title: true,
      slug: true,
      regularPrice: true,
      salePrice: true,
      purchaseLimit: true,
      description: true,
      variants: {
        select: {
          id: true,
          slug: true,
          images: { select: { src: true }, take: 1 },
        },
      },
      images: { select: { src: true }, take: 1 },
    },
    where: {
      slug: slug,
    },
  });

  return properties;
});

const Page: React.FC<{
  params: { slug: string };
}> = memo(({ params }) => {
  const session = use(getServerSession(authOptions));

  const properties = use(getProperties({ slug: params?.slug }));
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-xl font-semibold leading-tight">
        {properties?.title}
      </h1>

      {/* <p className="text-md">{properties?.description}</p> */}

      <div className="flex space-x-1">
        <StarIcon className="w-4 h-4 stroke-1 stroke-yellow-400 hover:fill-yellow-400" />
        <StarIcon className="w-4 h-4 stroke-1 stroke-yellow-400 hover:fill-yellow-400" />
        <StarIcon className="w-4 h-4 stroke-1 stroke-yellow-400 hover:fill-yellow-400" />
        <StarIcon className="w-4 h-4 stroke-1 stroke-yellow-400 hover:fill-yellow-400" />
        <StarIcon className="w-4 h-4 stroke-1 stroke-yellow-400 hover:fill-yellow-400" />
      </div>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
        {properties?.variants.map((v) => (
          <Link key={v.id} href={`/view/${v.slug}`}>
            <Card className="relative w-full h-20">
              <Image
                fill
                sizes="100vw"
                src={`https://lh3.googleusercontent.com/d/${v.images[0]?.src?.toString()}=s820`}
                alt=""
                className="object-contain w-full h-20 rounded-md"
              />
            </Card>
          </Link>
        ))}
      </div>

      <div
        className={`text-sm font-semibold w-full  ${
          properties?.salePrice && `line-through`
        }`}
      >
        {priceFormatter.format(Number(properties?.regularPrice))}
      </div>
      {properties?.salePrice && (
        <div className="w-full text-lg font-semibold ">
          {priceFormatter.format(Number(properties?.salePrice))}
        </div>
      )}

      <AddToCartButton
        slug={properties?.slug}
        session={session}
        product={properties}
      />
      <AddToFavoriteButton
        props={{ productId: properties?.id, userId: session?.user.id }}
      />
    </div>
  );
});

Page.displayName = "Page";
export default Page;
