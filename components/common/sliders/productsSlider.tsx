"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Children, ReactNode, useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
export default function ProductsSlider({ children }: { children: ReactNode }) {
  const sliderRef = useRef<any>();
  return (
    <>
      <section className="px-4">
        <Swiper
          ref={sliderRef}
          // slidesPerView={1}
          spaceBetween={10}
          // pagination={{
          //   clickable: true,
          // }}
          // className="space-y-2"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >
          {Children.map(children, (child, index) => {
            return <SwiperSlide key={index}>{child}</SwiperSlide>;
          })}
        </Swiper>
        <div className="flex items-center justify-between mt-10">
          <div>
            <button className="inline-flex items-center text-blue-600 hover:underline">
              See All
              <ExternalLink className="w-5 h-5 ml-2" />
            </button>
          </div>
          <div>
            <div className="items-center justify-center hidden mt-2 space-x-2 md:flex">
              <button
                onClick={() => sliderRef.current?.swiper?.slidePrev()}
                className="btn btn-sm btn-circle"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => sliderRef.current?.swiper?.slideNext()}
                className="btn btn-sm btn-circle"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
