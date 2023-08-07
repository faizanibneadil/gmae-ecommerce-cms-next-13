import { cache, memo, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/config/db";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const getCategories = cache(async (slug: string) => {
  const relatedCategories = await prisma.categories.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      images: {
        select: {
          id: true,
          src: true,
        },
      },
    },
    where: {
      name: {
        search: slug.split("-").join(" | "),
      },
    },
    take: 6,
  });
  return relatedCategories;
});

const Page: React.FC<Props> = ({ params }) => {
  const relatedCategories = use(getCategories(params.slug));
  return relatedCategories?.length ? (
    <div className="space-y-2">
      <div className="font-semibold text-md">More Categories.</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {relatedCategories?.map((Categories) => (
          <div key={Categories.id} className="relative h-20 rounded-md">
            <Link href={`/categories/${Categories.slug}`}>
              <Image
                src={`https://lh3.googleusercontent.com/d/${Categories.images?.src}=s620`}
                fill
                className="object-cover rounded-md"
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center px-2 text-sm text-center text-white rounded-md bg-gray-900/40 line-clamp-2">
                {Categories.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
