"use client";

import { memo, useState, useTransition } from "react";
import { $searchVariants } from "../_actions";
import { Button, Card, Icon, List, ListItem, TextInput } from "@tremor/react";
import { Search } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";
import ConnectVariant from "./connect-button";
import { useParams } from "next/navigation";

const SearchVariants: React.FC<{}> = memo(() => {
  const productId = useParams()?.id as string;
  const [variants, setVariants] = useState<any>();
  const [searching, startSearch] = useTransition();

  const action = (formData: FormData) => {
    return startSearch(async () => {
      const variants = await $searchVariants(formData);
      setVariants(variants);
    });
  };

  return (
    <>
      <form action={action} className="flex">
        <TextInput
          disabled={searching}
          className="w-full"
          placeholder="Search ..."
          name="query"
        />
        <Button disabled={searching} variant="light">
          <Icon icon={searching ? Spin : Search} variant="shadow" />
        </Button>
      </form>
      {searching ? (
        <div>Searching ...</div>
      ) : variants?.length ? (
        <Card className="p-0">
          <List>
            {variants?.map((v: any) => (
              <ListItem key={v.id} className="px-2">
                <span>{v.title}</span>
                <span>
                  <ConnectVariant productId={productId} variantId={v.id} />
                </span>
              </ListItem>
            ))}
          </List>
        </Card>
      ) : null}
    </>
  );
});
SearchVariants.displayName = "SearchVariants";
export default SearchVariants;
