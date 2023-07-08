import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import ProductCard from "../components/productsCard";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const favorites = await prisma.favorites.findUnique({
    select: { productId: true },
    where: { userId: session?.user.id },
  });
  const products = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      salePrice: true,
      regularPrice: true,
      images: true,
    },
    where: { id: { in: favorites?.productId } },
  });
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-4">
        {products.map((p, pIdx) => (
          <ProductCard userId={session?.user.id} key={pIdx} product={p} />
        ))}
      </div>
    </div>
  );
}
