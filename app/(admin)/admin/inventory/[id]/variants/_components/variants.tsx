"use client";
import { memo, useEffect, useState, useTransition } from "react";
import { $getVariants } from "../_actions";
import { useParams } from "next/navigation";
import DisconnectVariant from "./disconnect-button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type TVariants = {
  id: string;
  images: {
    src: string | null;
  }[];
  title: string | null;
};

const Variants: React.FC<{}> = memo(() => {
  const productId = useParams()?.id as string;
  const [variants, setVariants] = useState<TVariants[]>();
  const [fetching, startFetch] = useTransition();

  useEffect(() => {
    startFetch(async () => {
      const variants = await $getVariants(productId);
      setVariants(variants);
    });
  }, []);

  return fetching ? (
    <div>Loading...</div>
  ) : (
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
          <DisconnectVariant productId={productId} variantId={v.id} />
        </div>
      ))}
    </div>
  );
});
Variants.displayName = "Variants";
export default Variants;
