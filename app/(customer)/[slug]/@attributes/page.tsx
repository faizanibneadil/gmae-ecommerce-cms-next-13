import { List, ListItem } from "@tremor/react";
import React from "react";
import { getProductAttributes } from "./_queries";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  const { attributes } = await getProductAttributes(params.slug);
  return (
    <div className="space-y-2">
      <div className="font-semibold text-md">Attributes</div>

      <List>
        {attributes?.map((attribute) => (
          <ListItem key={attribute.id} className="space-x-2">
            <span>{attribute.name}</span>
            <span>{attribute.value}</span>
            <span></span>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Page;
