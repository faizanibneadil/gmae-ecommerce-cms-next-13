import { prisma } from "@/config/db";

export default async function Page() {
  const categories = await prisma.categories.findMany({});
  return (
    <div className="w-full p-2 ">
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {categories?.map((category) => (
            <li key={category.id} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {category.name}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
