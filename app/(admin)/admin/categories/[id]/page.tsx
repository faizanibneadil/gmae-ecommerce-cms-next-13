import { prisma } from "@/config/db";
import CategoryForm from "../components/categoryForm";

export default async function Page({ params }: { params: { id: string } }) {
    const category = await prisma.categories.findUnique({ where: { id: params.id}})
    return (
      <div className="md:mx-52">
        <CategoryForm data={category} />
      </div>
    );
  }
  