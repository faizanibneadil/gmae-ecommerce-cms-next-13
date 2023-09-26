"use client";

import { memo, useRef, useState } from "react";
import { A11y, FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ImagesSliderItem from "./images-slider-item";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Card } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  images: {
    images: {
      id: string;
      src: string | null;
    }[];
  } | null;
};

const ImagesSlider: React.FC<Props> = memo(({ images }) => {
  const sliderRef = useRef<any>();
  return (
    <div>
      <Swiper
        ref={sliderRef}
        modules={[A11y, FreeMode, Thumbs]}
        loop={true}
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
      <div className="flex items-center justify-center mt-2 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => sliderRef.current?.swiper?.slidePrev()}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => sliderRef.current?.swiper?.slideNext()}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
});

ImagesSlider.displayName = "ImagesSlider";
export default ImagesSlider;
