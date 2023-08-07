"use client";

import { memo, useState } from "react";
import { A11y, FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ImagesSliderItem from "./images-slider-item";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

type Props = {
  images: {
    images: {
      id: string;
      src: string | null;
    }[];
  } | null;
};

const ImagesSlider: React.FC<Props> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div>
      <Swiper
        // ref={ref}
        modules={[A11y, FreeMode, Thumbs]}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={0}
        slidesPerView={1}
        className="flex items-center justify-center w-full h-80"
      >
        {images?.images.map((image: any) => (
          <SwiperSlide key={image.id}>
            <ImagesSliderItem src={image.src} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        // @ts-ignore
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="h-20"
      >
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
          {images?.images.map((image: any) => (
            <SwiperSlide key={image.id}>
              <ImagesSliderItem src={image.src} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

const MemoizedSlid = memo(ImagesSlider);
export default MemoizedSlid;
