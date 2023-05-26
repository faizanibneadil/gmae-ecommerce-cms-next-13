"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

// Import Swiper styles
import "swiper/css";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
export default function Gaming() {
  const sliderRef = useRef<any>();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const get = async () => {
      await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((res) => setProducts(res));
    };
    get();
  }, []);
  return (
    <>
      <section>
        <div className="flex justify-between">
          <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
            Gaming.
          </h6>
          <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
            See more
          </div>
        </div>
        <Suspense fallback={<p>Loading ...</p>}>
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
            {products?.map((_: any) => (
              <SwiperSlide key={_.id}>
                <Link
                  href="#"
                  className="my-4 border-gray-200 rounded-lg shadow "
                >
                  <div className="relative">
                    <img
                      className="rounded-lg aspect-square"
                      src={`${_.image}`}
                      alt=""
                    />
                    <span className="absolute bottom-2 left-2 badge badge-primary">
                      {_.category}
                    </span>
                  </div>
                  <div className="p-2">
                    <p className="mb-3 text-sm font-normal text-gray-700 line-clamp-3 dark:text-gray-400">
                      {_.description}
                    </p>
                    <span className="badge">Rs: {_.price}</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="items-center justify-center hidden mt-2 space-x-2 md:flex">
            <button
              onClick={() => sliderRef.current?.swiper?.slidePrev()}
              className="btn btn-circle"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => sliderRef.current?.swiper?.slideNext()}
              className="btn btn-circle"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </Suspense>
      </section>
    </>
  );
}
