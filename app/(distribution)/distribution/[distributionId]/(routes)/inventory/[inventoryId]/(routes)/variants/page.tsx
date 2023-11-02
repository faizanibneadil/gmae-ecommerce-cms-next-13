import { prisma } from "@/config/db";
import VariantCard from "./_components/variant-card";

interface Props {
  params: { inventoryId: string };
  searchParams: { query: string };
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const variants = searchParams.query
    ? await prisma.products.findMany({
        where: { title: { search: searchParams.query.split(" ").join(" | ") } },
        select: {
          id: true,
          title: true,
          images: { select: { src: true }, take: 1 },
        },
      })
    : [];

  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-5">
      {variants.map((variant) => (
        <VariantCard key={variant.id} variant={variant} />
      ))}
    </div>
  );
};

export default Page;
