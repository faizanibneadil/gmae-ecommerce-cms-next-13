import { prisma } from "@/config/db";
import ProductForm from "../components/productForm";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div className="md:mx-52">
      <ProductForm data={product} />
    </div>
  );
}
