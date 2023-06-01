import CustomImage from "@/app/components/customImage";
import { prisma } from "@/config/db";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default async function Page() {
  const categories = await prisma.categories.findMany();
  return (
    <div className="w-full p-2 ">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {categories?.map((category) => (
          <div key={category.id} className="w-full rounded-2xl bg-base-300">
            <CustomImage
              crop="thumb"
              gravity="faces"
              width={400}
              height={400}
              className="rounded-t-2xl"
              src={`${category.image}`}
              alt=""
            />
            <div className="px-4 py-2">
              <h5 className="mb-2 tracking-tight text-gray-900 text-md dark:text-white line-clamp-1">
                {category.name}
              </h5>
              {/* <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
                Software installation and Hardware repairing.
              </p> */}
              {/* <button className="inline-flex items-center text-blue-600 hover:underline">
                See All Products
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
