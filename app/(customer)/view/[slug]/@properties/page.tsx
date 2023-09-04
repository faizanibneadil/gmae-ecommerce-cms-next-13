import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import AddToCartButton from "../_components/add-to-cart-button";
import AddToFavoriteButton from "../_components/add-to-favorite-button";
import BuyNowButton from "../_components/buy-now-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { priceFormatter } from "@/lib/utils";

const getProperties = cache(async ({ slug }: { slug: string }) => {
  const properties = await prisma.products.findUnique({
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      regularPrice: true,
      salePrice: true,
      purchaseLimit: true,
      Attributes: {
        select: {
          id: true,
          name: true,
          value: true,
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
    <div>
      <div className="flex flex-col space-y-2">
        <Badge
          className={`text-sm font-semibold w-full  ${
            properties?.salePrice && `line-through`
          }`}
        >
          {priceFormatter.format(Number(properties?.regularPrice))}
        </Badge>
        {properties?.salePrice && (
          <Badge
            variant="destructive"
            className="w-full text-lg font-semibold "
          >
            {priceFormatter.format(Number(properties?.salePrice))}
          </Badge>
        )}
      </div>
      <Card className="mt-2">
        <div className="divide-y">
          {properties?.Attributes?.map((attribute) => (
            <div
              className="flex items-center justify-between p-2"
              key={attribute.id}
            >
              <span>{attribute.name}</span>
              <span>{attribute.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-col mt-4 space-y-2">
        <AddToCartButton
          slug={properties?.slug}
          session={session}
          product={properties}
        />
        <AddToFavoriteButton
          props={{ productId: properties?.id, userId: session?.user.id }}
        />
        <BuyNowButton />
      </div>
    </div>
  );
});

Page.displayName = "Page";
export default Page;
