"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import Image from "next/image";
import { Icon } from "@tremor/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function Carousel() {
  const ref = useRef<any>();
  const images: any = [
    {
      id: 1,
      src: "https://img.freepik.com/premium-vector/shopping-cart-with-alarm-clock-inside-realistic-style-vector-illustration_548887-248.jpg",
    },
    {
      id: 2,
      src: "https://img.freepik.com/premium-vector/discount-time-banner-with-gift-bags-cart-location-your-store-realistic-style-vector-illustration_548887-119.jpg",
    },
    {
      id: 3,
      src: "https://img.freepik.com/premium-vector/discount-banner-design-with-rendering-gifts-white-background-with-balloons-shopping-bags-map-with-pointer-vector-illustration_548887-139.jpg",
    },
    {
      id: 4,
      src: "https://img.freepik.com/free-vector/banner-black-friday-super-sale-realistic-3d-black-shopping-cart_548887-22.jpg",
    },
  ];
  return (
    <div>
      <Swiper
        ref={ref}
        modules={[Autoplay]}
        loop={true}
        spaceBetween={2}
        slidesPerView={"auto"}
        centeredSlides={true}
        className="h-40 md:h-80"
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {images?.map((image: any) => (
          <SwiperSlide key={image.id} className="mx-6">
            <Image
              src={image.src}
              alt=""
              fill
              className="object-fill object-center w-full rounded-lg"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
