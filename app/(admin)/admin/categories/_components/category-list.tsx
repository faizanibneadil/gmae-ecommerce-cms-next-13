"use client";

import { List } from "@tremor/react";
import CategoryListItem from "./category-list-item";
import { Categories, Images } from "@prisma/client";

interface Props {
  categories: {
    id: string;
    slug: string | null;
    name: string | null;
    order: number | null;
    images: {
      id: string;
      src: string | null;
    } | null;
    subCategory: {
      id: string;
      slug: string | null;
      name: string | null;
      order: number | null;
      images: {
        id: string;
        src: string | null;
      } | null;
    }[];
  } | null;
  categoryId: string | undefined;
}
export default function CategoryList({ categories, categoryId }: Props) {
  return (
    <details open>
      <summary className="block">
        <CategoryListItem
          category={categories}
          isSubCategory={false}
          categoryId={categoryId}
        />
      </summary>
      <List className="pl-6">
        {categories?.subCategory?.map((item) => (
          <CategoryListItem
            key={item.id}
            category={item}
            isSubCategory={true}
            categoryId={categoryId}
            subCategoryId={item.id}
          />
        ))}
      </List>
    </details>
  );
}
