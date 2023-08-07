import Image from "next/image";
import { memo } from "react";

type Props = {
  src: string | null;
};

const ImagesSliderItem: React.FC<Props> = ({ src }) => {
  return (
    <Image
      src={`https://lh3.googleusercontent.com/d/${src}=s820`}
      alt=""
      fill
      className="object-contain w-full"
    />
  );
};

const memoizedSlider = memo(ImagesSliderItem);
export default memoizedSlider;
