import { getServerSession } from "next-auth";
import AddToCartButton from "./_components/add-to-cart-button";
import AddToFavoriteButton from "./_components/add-to-favorite-button";
import BuyNowButton from "./_components/buy-now-button";
import { authOptions } from "@/config/authOptions";
import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import { priceFormatter } from "@/lib/utils";
import { List, ListItem } from "@tremor/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const getProperties = cache(async ({ slug }: { slug: string }) => {
  const properties = await prisma.products.findUnique({
    select: {
      title: true,
      description: true,
      variants: {
        select: {
          id: true,
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

const Page: React.FC<Props> = ({ params }) => {
  const session = use(getServerSession(authOptions));
  const properties = use(getProperties({ slug: params.slug }));

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-lg font-semibold leading-tight">
        {properties?.title}
      </div>
      <div className="text-md">{properties?.description?.slice(0, 120)}</div>

      <div className="grid grid-cols-3 gap-2">
        {properties?.variants?.map((v) => (
          <Card key={v.id} className="relative w-full h-20">
            <Image
              fill
              sizes="100vw"
              src={`https://lh3.googleusercontent.com/d/${v.images[0]?.src?.toString()}=s820`}
              alt=""
              className="object-contain w-full h-20 rounded-md"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
