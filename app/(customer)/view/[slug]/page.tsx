import { getServerSession } from "next-auth";
import AddToCartButton from "./_components/add-to-cart-button";
import AddToFavoriteButton from "./_components/add-to-favorite-button";
import BuyNowButton from "./_components/buy-now-button";
import { authOptions } from "@/config/authOptions";
import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import { priceFormatter } from "@/lib/utils";
import { Badge } from "@tremor/react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const getProperties = cache(
  async ({ slug, userId }: { slug: string; userId: string | undefined }) => {
    const properties = await prisma.products.findUnique({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        regularPrice: true,
        salePrice: true,
        Attributes: {
          select: {
            id: true,
            name: true,
            value: true,
          },
        },
        CartItem: {
          select: {
            quantity: true,
          },
          where: {
            products: { slug },
            Cart: {
              user: {
                id: userId,
              },
            },
          },
        },
      },
      where: {
        slug: slug,
      },
    });
    return properties;
  }
);

const Page: React.FC<Props> = ({ params }) => {
  const session = use(getServerSession(authOptions));
  const properties = use(
    getProperties({ slug: params.slug, userId: session?.user.id })
  );
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-lg font-semibold">{properties?.title}</div>
      <div className="text-md">{properties?.description}</div>
      <div
        className={`text-sm font-semibold ${
          properties?.salePrice && `line-through`
        }`}
      >
        {priceFormatter.format(Number(properties?.regularPrice))}
      </div>
      {properties?.salePrice && (
        <div className="text-lg font-semibold">
          {priceFormatter.format(Number(properties?.salePrice))}
        </div>
      )}

      <div className="flex space-x-0.5 flex-wrap space-y-0.5">
        {properties?.Attributes.map((attribute) => (
          <Badge size="md" key={attribute.id}>
            <Badge color="orange" size="xs" className="capitalize">
              {attribute.name}
            </Badge>
            <span className="ml-1 capitalize">{attribute.value}</span>
          </Badge>
        ))}
      </div>

      <div className="max-w-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AddToCartButton
            slug={properties?.slug}
            quantity={properties?.CartItem[0]?.quantity}
            session={session}
            productId={properties?.id}
          />
          <AddToFavoriteButton />
          <BuyNowButton />
        </div>
      </div>
    </div>
  );
};

export default Page;
