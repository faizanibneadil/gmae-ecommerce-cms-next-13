"use client";
import { memo, useEffect, useState, useTransition } from "react";
import { $getVariants } from "../_actions";
import { useParams } from "next/navigation";
import { Card, List, ListItem } from "@tremor/react";
import DisconnectVariant from "./disconnect-button";

const Variants: React.FC<{}> = memo(() => {
  const productId = useParams()?.id as string;
  const [variants, setVariants] = useState<any>();
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
    <Card className="p-0">
      <List>
        {variants?.map((v: any) => (
          <ListItem key={v.id} className="px-2">
            <span>{v.title}</span>
            <span>
              <DisconnectVariant productId={productId} variantId={v.id} />
            </span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
});
Variants.displayName = "Variants";
export default Variants;
