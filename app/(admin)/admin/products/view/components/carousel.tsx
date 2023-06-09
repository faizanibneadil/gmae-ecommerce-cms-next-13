"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Icon } from "@tremor/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function Carousel({ images }: { images: any }) {
  const ref = useRef<any>();
  const imageLoader = ({ src }: { src: string }) => {
    return `https://drive.google.com/uc?id=${src}`;
  };
  return (
    <div>
      <Swiper ref={ref} loop={true} spaceBetween={2} slidesPerView={1}>
        {images?.map((image: any) => (
          <SwiperSlide key={image.id}>
            <Image
              loader={imageLoader}
              src={image.src}
              alt=""
              width={100}
              height={100}
              className="w-full"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-2 space-x-2">
        <Icon
          onClick={() => ref.current.swiper.slidePrev()}
          icon={ChevronLeft}
          variant="solid"
          className="cursor-pointer"
        />
        <Icon
          onClick={() => ref.current.swiper.slideNext()}
          icon={ChevronRight}
          variant="solid"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
