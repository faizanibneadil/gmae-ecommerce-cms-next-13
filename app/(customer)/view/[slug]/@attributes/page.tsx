import { prisma } from "@/config/db";
import { List, ListItem } from "@tremor/react";
import React, { cache } from "react";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const getAttributes = cache(async (slug: string) => {
  const attributes = await prisma.products.findUnique({
    select: {
      Attributes: {
        select: {
          id: true,
          name: true,
          value: true,
        },
      },
    },
    where: {
      slug: slug,
    },
  });
  return attributes;
});

const Page = async ({ params }: Props) => {
  const attributes = await getAttributes(params.slug);
  return !!attributes?.Attributes?.length ? (
    <div className="space-y-2">
      <div className="font-semibold text-md">Attributes</div>

      <List>
        {attributes?.Attributes?.map((attribute) => (
          <ListItem key={attribute.id} className="space-x-2">
            <span>{attribute.name}</span>
            <span>{attribute.value}</span>
            <span></span>
          </ListItem>
        ))}
      </List>
    </div>
  ) : null;
};

export default Page;
