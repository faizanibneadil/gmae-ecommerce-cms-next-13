import { getServerSession } from "next-auth";
import AddToCartButton from "./_components/add-to-cart-button";
import AddToFavoriteButton from "./_components/add-to-favorite-button";
import BuyNowButton from "./_components/buy-now-button";
import { authOptions } from "@/config/authOptions";
import { cache } from "react";
import { prisma } from "@/config/db";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const getProperties = cache(async (slug: string) => {
  const properties = await prisma.products.findUnique({
    select: {
      id: true,
      title: true,
      description: true,
      regularPrice: true,
      salePrice: true,
    },
    where: {
      slug: slug,
    },
  });
  return properties;
});

const Page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const properties = await getProperties(params.slug);
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-lg font-semibold">{properties?.title}</div>
      <div className="text-md">{properties?.description}</div>

      <div className="max-w-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AddToCartButton session={session} productId={properties?.id} />
          <AddToFavoriteButton />
          <BuyNowButton />
        </div>
      </div>
    </div>
  );
};

export default Page;
