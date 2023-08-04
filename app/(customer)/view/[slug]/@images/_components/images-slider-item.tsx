import Image from "next/image";
import { memo } from "react";

type Props = {
  src: string | null;
};

const ImagesSliderItem = ({ src }: Props) => {
  return (
    <Image
      src={`https://lh3.googleusercontent.com/d/${src}=s820`}
      alt=""
      fill
      className="object-contain w-full"
    />
  );
};

export default memo(ImagesSliderItem);
