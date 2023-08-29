"use client";

import { memo, useState, useTransition } from "react";
import { $searchVariants } from "../_actions";
import { Search } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";
import ConnectVariant from "./connect-button";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type TSearchItems = {
  id: string;
  images: {
    src: string | null;
  }[];
  title: string | null;
};

const SearchVariants: React.FC<{}> = memo(() => {
  const productId = useParams()?.id as string;
  const [variants, setVariants] = useState<TSearchItems[]>();
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
        <Input
          disabled={searching}
          className="w-full"
          placeholder="Search ..."
          name="query"
        />
        <Button size="icon" disabled={searching} variant="outline">
          {searching ? <Spin /> : <Search />}
        </Button>
      </form>
      {searching ? (
        <div>Searching ...</div>
      ) : variants?.length ? (
        <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-8">
          {variants?.map((v) => (
            <div key={v.id} className="flex flex-col space-y-1">
              <Card className="relative w-full h-32">
                <Image
                  fill
                  sizes="100vh"
                  src={`https://lh3.googleusercontent.com/d/${v?.images[0]?.src}=s220`}
                  alt=""
                  className="object-contain w-full h-20 mb-2 rounded-md"
                />
              </Card>
              <ConnectVariant productId={productId} variantId={v.id} />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
});
SearchVariants.displayName = "SearchVariants";
export default SearchVariants;
