import { notFound } from "next/navigation";
// import { getCategories } from "./_queries";
import { cache } from "react";
import { prisma } from "@/config/db";
import InitializeNewCategory from "./_components/initialize-new-category";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
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

const Page = async () => {
  const categories = await getCategories();
  return categories?.length ? (
    <div>
      <div className="flex justify-end mb-4 space-x-2">
        <InitializeNewCategory />
        <RefreshPage />
      </div>
      <Table>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="relative">
                <Image
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-contain"
                  src={`https://lh3.googleusercontent.com/d/${category?.images?.src}=s220`}
                />
              </TableCell>
              <TableCell className="flex">
                <Text>
                  {category.order} - {category.name}
                </Text>
              </TableCell>
              <TableCell className="space-x-1">
                <Badge
                  icon={category.isPublished ? PublicIcon : EyeIcon}
                  className="pr-0 bg-transparent"
                  color={category.isPublished ? `green` : `rose`}
                  tooltip={category.isPublished ? `Published` : `Private`}
                />
                {category.displayOnLandingPage && (
                  <Badge
                    className="pr-0 bg-transparent"
                    color="fuchsia"
                    icon={LayoutIcon}
                    tooltip="Display On Landing Page"
                  />
                )}
                {category.parentCategory?.name && (
                  <Badge>{category.parentCategory?.name}</Badge>
                )}
              </TableCell>
              <TableCell className="space-x-1">
                <EditCategory id={category.id} />
                <DeleteCategory id={category.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : (
    notFound()
  );
};

export default Page;
