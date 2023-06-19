"use client";

import { Categories } from "@prisma/client";
import { Icon, List, ListItem } from "@tremor/react";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Categories({
  categories,
}: {
  categories: (Categories & {
    subCategory: Categories[];
  })[];
}) {
  const imageLoader = ({ src }: { src: string }) => {
    return `https://drive.google.com/uc?id=${src}`;
  };
  return (
    <List className="mt-6">
      {categories?.map((category) => (
        <details key={category.id}>
          <summary className="block">
            <ListItem>
              <span className="flex items-center space-x-2">
                <Image
                  loader={imageLoader}
                  className="w-8 h-8 mr-4 rounded-full"
                  width={30}
                  height={30}
                  alt=""
                  src={`${category?.image}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="truncate">{category.name}</span>
              </span>
              <span className="flex items-center space-x-2">
                <Icon size="xs" icon={Trash} variant="solid" tooltip="Delete" />
                <Link href={`/admin/categories/${category.id}`}>
                  <Icon size="xs" icon={Edit} variant="solid" tooltip="Edit" />
                </Link>
              </span>
            </ListItem>
          </summary>
          <List className="pl-6">
            {category?.subCategory?.map((item) => (
              <ListItem key={item.id}>
                <span className="flex space-x-2">
                  <Image
                    loader={imageLoader}
                    className="w-6 h-6 mr-4 rounded-full"
                    width={30}
                    height={30}
                    alt=""
                    src={`${item?.image}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Icon
                    size="xs"
                    icon={Trash}
                    variant="shadow"
                    tooltip="Delete"
                  />
                  <Link href={`/admin/categories/${item.id}`}>
                    <Icon
                      size="xs"
                      icon={Edit}
                      variant="shadow"
                      tooltip="Edit"
                    />
                  </Link>
                </span>
              </ListItem>
            ))}
          </List>
        </details>
      ))}
    </List>
  );
}
