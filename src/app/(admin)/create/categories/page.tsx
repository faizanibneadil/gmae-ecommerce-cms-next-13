import { prisma } from "@/config/db";
import CreateCategoryForm from "./components/createForm";
import DeleteButton from "./components/deleteButton";
import { TrashIcon } from "@heroicons/react/24/solid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import Image from "next/image";
import CategoriesAccordian from "./components/categoryAccordian";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const categories = await prisma.categories.findMany({
    where: { parentCategory: null },
    include: {
      subCategory: {
        select: {
          name: true,
          image: true,
          createdAt: true,
          id: true,
          User: {
            select: {
              name: true,
            },
          },
        },
      },
      User: { select: { name: true } },
    },
  });
  return (
    <div className="w-full p-4 bg-white sm:p-8 dark:bg-gray-800">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <CreateCategoryForm
          userId={session?.user?.id}
          categories={categories}
        />
      </ul>
      <CategoriesAccordian categories={categories} />
    </div>
  );
}
