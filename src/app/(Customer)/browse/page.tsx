import { prisma } from "@/config/db";

export default async function Page() {
  const categories = await prisma.categories.findMany({});
  return (
    <div className="w-full p-2 ">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {categories?.map((category) => (
          <div key={category.id} className="flow-root">
            <div className="w-full border border-gray-200 rounded-lg shadow bg-base-300/30 backdrop-blur-xl dark:border-gray-700">
              <img
                className="rounded-t-lg"
                src="/docs/images/blog/image-1.jpg"
                alt=""
              />
                <h5 className="p-2 font-bold tracking-tight text-gray-900 text-md dark:text-white">
                  {category.name}
                </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
