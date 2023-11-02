import { prisma } from "@/config/db";
import EditCategory from "./_components/edit-category-button";
import { EyeIcon, LayoutIcon, PublicIcon } from "@/app/_components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Props {}

const getCategories = async () => {
  const categories = await prisma.categories.findMany({
    select: {
      _count: { select: { subCategories: true } },
      id: true,
      name: true,
      slug: true,
      order: true,
      displayOnLandingPage: true,
      isPublished: true,
      images: { select: { id: true, src: true } },
    },
    orderBy: { order: "asc" },
  });
  return categories;
};

const Page: React.FC<Props> = async () => {
  const categories = await getCategories();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {categories?.map((c) => (
        <div
          key={c.id}
          className="flex flex-row items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src={`https://lh3.googleusercontent.com/d/${c?.images?.src}=s220`}
              />
              <AvatarFallback>{c.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="space-y-0.5">
              <h2 className="text-base">{c.name}</h2>
              <div className="flex flex-row items-center space-x-2">
                <Badge>{c?._count.subCategories} Sub Categories.</Badge>
                {c?.displayOnLandingPage && <LayoutIcon className="w-4 h-4" />}
                {c?.isPublished ? (
                  <PublicIcon className="w-4 h-4" />
                ) : (
                  <EyeIcon className="w-4 h-4" />
                )}
              </div>
            </div>
          </div>
          <EditCategory id={c.id} />
        </div>
      ))}
    </div>
  );
};

export default Page;
