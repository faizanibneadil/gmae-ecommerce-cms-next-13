import { Card } from "@/components/ui/card";
import Image from "next/image";
import { memo } from "react";

const ImagesSliderItem: React.FC<{ src: string | null }> = memo(({ src }) => {
  return (
    <Card className="relative w-full h-60">
      <Image
        src={`https://lh3.googleusercontent.com/d/${src}=s820`}
        alt=""
        fill
        sizes="100vw"
        className="object-contain w-"
      />
    </Card>
  );
});

ImagesSliderItem.displayName = "ImagesSliderItem";
export default ImagesSliderItem;
