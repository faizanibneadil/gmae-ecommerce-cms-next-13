"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import Image from "next/image";
import { Card, Icon } from "@tremor/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function ProductsCarousel({ products }: { products: any }) {
  const ref = useRef<any>();
  return (
    <div>
      <Swiper
        ref={ref}
        // modules={[Autoplay]}
        loop={true}
        slidesPerView={1}
        spaceBetween={4}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="relative m-4"
        centeredSlides={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 2,
            spaceBetween: 4,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 4,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 4,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 4,
          },
        }}
      >
        {products?.map((product: any) => {
          const images: any = product.images;
          const attributes: any = product.attributes;
          return (
            <SwiperSlide key={product.id} className="w-40 m-2">
              <Card key={product.id} className="p-2 text-center shadow-lg">
                <div className="relative overflow-hidden rounded-md h-36 md:h-56">
                  {/* Content */}
                  <div className="relative z-20 flex flex-col justify-end w-full h-full">
                    <h2 className="mt-2 text-sm font-semibold leading-tight text-left md:text-md line-clamp-2">
                      {product.title}
                    </h2>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 z-10 rounded-md bg-gradient-to-t from-white from-20% via-transparent via-40% to-transparent to-100%" />
                  {/* BG Image */}
                  <Image
                    className="object-contain object-top rounded-md"
                    src={`https://drive.google.com/uc?id=${images[0]?.src}`}
                    fill
                    alt=""
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </Card>
            </SwiperSlide>
          );
        })}
        <div className="hidden absolute z-50 w-full px-4 md:flex justify-between mt-2 space-x-2 top-[40%]">
          <Icon
            onClick={() => ref.current.swiper.slidePrev()}
            icon={ChevronLeft}
            variant="shadow"
            className="cursor-pointer"
          />
          <Icon
            onClick={() => ref.current.swiper.slideNext()}
            icon={ChevronRight}
            variant="shadow"
            className="cursor-pointer"
          />
        </div>
      </Swiper>
    </div>
  );
}
