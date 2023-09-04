"use client";

import { memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spin from "@/app/_components/loading-spinner";
import InfiniteScrollCard from "./infinite-scroll-card";
import { getInventory } from "../_actions/get-infinite-products";

interface InitialInventoryTypes {
  title: string | null;
  slug: string | null;
  images: {
    id: string;
    src: string | null;
  }[];
  id: string;
  isPublished: boolean | null;
  isFeatured: boolean | null;
  stock: number | null;
  regularPrice: number | null;
  salePrice: number | null;
}

const InfiniteScroll: React.FC<{
  initialInventory: InitialInventoryTypes[];
}> = memo(({ initialInventory }) => {
  const [inventory, setInventory] =
    useState<InitialInventoryTypes[]>(initialInventory);
  const [end, setEnd] = useState(true);
  const [ref, inView] = useInView();

  const loadInventory = async () => {
    const newInventory = await getInventory({
      lastProductId: inventory.slice(-1)[0].id,
    });
    if (newInventory?.length === 0) {
      setEnd(false);
    }
    if (newInventory?.length) {
      setInventory((prev) => [...prev, ...newInventory]);
    }
  };

  useEffect(() => {
    if (inView) loadInventory();
  }, [inView]);

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-8">
        {inventory?.map((p) => (
          <InfiniteScrollCard key={p.id} item={p} />
        ))}
      </div>
      {end && (
        <div ref={ref} className="flex items-center justify-center py-10">
          <Spin />
        </div>
      )}
    </div>
  );
});
InfiniteScroll.displayName = "InfiniteScroll";
export default InfiniteScroll;
