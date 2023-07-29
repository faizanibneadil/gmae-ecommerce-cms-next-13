import { List, ListItem } from "@tremor/react";
import React from "react";
import { getProductAttributes } from "./_queries";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  await wait(8000)
  const { attributes } = await getProductAttributes(params.slug);
  return !!attributes?.length ? (
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
  ) : null;
};

export default Page;
