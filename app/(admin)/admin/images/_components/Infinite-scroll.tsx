"use client";

import { memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spin from "@/app/_components/loading-spinner";
import { Card } from "@/components/ui/card";
import InfiniteScrollCard from "./infinite-scroll-card";
import { getImages } from "../_actions";

interface Images {
  id: string;
  src: string | null;
  searchText: string[];
  altText: string | null;
}

const InfiniteScroll: React.FC<{
  initialImages: Images[];
}> = memo(({ initialImages }) => {
  const [images, setImages] = useState<Images[]>(initialImages);
  const [end, setEnd] = useState(true);
  const [ref, inView] = useInView();

  const loadImages = async () => {
    const newImages = await getImages({
      lastImagId: images.slice(-1)[0].id,
    });
    if (newImages?.length === 0) {
      setEnd(false);
    }
    if (newImages?.length) {
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  useEffect(() => {
    if (inView) loadImages();
  }, [inView]);

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-8">
        {images?.map((p) => (
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
