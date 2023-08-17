import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import InitializeNewCategory from "./_components/initialize-new-category";
import {
  Badge,
  Card,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import Image from "next/image";
import EditCategory from "./_components/edit-category-button";
import DeleteCategory from "./_components/delete-category-button";
import RefreshPage from "./_components/refresh-button";
import { EyeIcon, LayoutIcon, PublicIcon } from "@/app/_components/icons";

const getCategories = cache(async () => {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      order: true,
      displayOnLandingPage: true,
      isPublished: true,
      parentCategory: { select: { name: true } },
      images: { select: { id: true, src: true } },
    },
    orderBy: { order: "asc" },
  });
  return categories;
});

const Page = () => {
  const categories = use(getCategories());
  return categories?.length ? (
    <div>
      <div className="flex items-center justify-between p-2 border-b">
        <div>
          <Title>Categories</Title>
          <Text>Manage store categories.</Text>
        </div>
        <div className="flex justify-end space-x-2">
          <InitializeNewCategory />
          <RefreshPage />
        </div>
      </div>
      <Card className="p-0 mt-4 rounded-none">
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {categories?.map((category) => (
              <li className="px-3 py-1" key={category.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="relative w-8 h-8 rounded-full shadow-lg">
                      <Image
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-contain rounded-full"
                        src={`https://lh3.googleusercontent.com/d/${category.images?.src}=s220`}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {category.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Icon
                        size="xs"
                        icon={category.isPublished ? PublicIcon : EyeIcon}
                        variant="simple"
                        className="p-0"
                        color={category.isPublished ? `green` : `rose`}
                        tooltip={category.isPublished ? `Published` : `Private`}
                      />
                      {category.displayOnLandingPage && (
                        <Icon
                          size="xs"
                          className="p-0"
                          color="fuchsia"
                          icon={LayoutIcon}
                          tooltip="Display On Landing Page"
                        />
                      )}
                      {category.parentCategory?.name && (
                        <Badge size="xs">{category.parentCategory?.name}</Badge>
                      )}
                      <EditCategory id={category.id} />
                      <DeleteCategory id={category.id} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  ) : (
    notFound()
  );
};
const MemoizedPage = memo(Page);
export default MemoizedPage;
