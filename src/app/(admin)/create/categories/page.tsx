import { prisma } from "@/config/db";
import CreateCategoryForm from "./components/createForm";
import DeleteButton from "./components/deleteButton";
import { TrashIcon } from "@heroicons/react/24/solid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import Image from "next/image";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const categories = await prisma.categories.findMany({
    where: { parentCategory: null },
    include: {
      subCategory: {
        select: {
          _count: true,
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
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        <CreateCategoryForm
          userId={session?.user?.id}
          categories={categories}
        />
      </ul>
      {categories?.map((category) => (
        <div
          key={category.id}
          className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex items-center justify-start space-x-4 text-lg font-semibold text-gray-900 dark:text-white">
            <Image
              width={100}
              height={100}
              className="w-12 h-12 rounded-full"
              src={`${category?.image}`}
              alt="Neil image"
            />
            <p>{category.name}</p>
            <DeleteButton CategoryId={category.id}>
              <TrashIcon className="w-4 h-4" />
            </DeleteButton>
          </div>
          <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
            {category?.subCategory?.map((subCat) => (
              <li key={subCat.id} className="py-3 pl-4 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="self-start flex-shrink-0">
                    <Image
                      width={100}
                      height={100}
                      className="w-8 h-8 rounded-full"
                      src={`${subCat?.image}`}
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {subCat.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Created by: <b>{subCat?.User?.name}</b> Created At:{" "}
                      <b>{new Date(subCat?.createdAt).toLocaleString()}</b>
                    </p>
                  </div>
                  <DeleteButton CategoryId={subCat.id}>
                    <TrashIcon className="w-4 h-4" />
                  </DeleteButton>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
