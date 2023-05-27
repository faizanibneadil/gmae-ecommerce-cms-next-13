"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowTopRightOnSquareIcon,
  ShoppingBagIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

// Import Swiper styles
import "swiper/css";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
export default function TopSellingProducts() {
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
      <section className="px-4">
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
                <div className="w-full rounded-2xl">
                  <Link href="#">
                    <div
                      className="w-full h-32 bg-white bg-center bg-no-repeat bg-contain rounded-t-lg rounded-b-lg"
                      style={{ backgroundImage: `url("${_.image}")` }}
                    />
                  </Link>
                  <div className="py-2 ">
                    <Link
                      href="#"
                      className="mb-2 tracking-tight text-gray-900 text-md dark:text-white line-clamp-1"
                    >
                      {_.title}
                    </Link>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
                      {_.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <button className="gap-2 btn btn-xs btn-outline btn-circle btn-warning">
                        <ShoppingBagIcon className="w-4 h-4" />
                      </button>
                      <button className="gap-2 btn btn-xs btn-outline btn-circle btn-success">
                        <HeartIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <button className="gap-2 btn btn-xs">Buy Now</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-center justify-between mt-10">
            <div>
              <button className="inline-flex items-center text-blue-600 hover:underline">
                See All
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
            <div>
              <div className="items-center justify-center hidden mt-2 space-x-2 md:flex">
                <button
                  onClick={() => sliderRef.current?.swiper?.slidePrev()}
                  className="btn btn-sm btn-circle"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => sliderRef.current?.swiper?.slideNext()}
                  className="btn btn-sm btn-circle"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Suspense>
      </section>
    </>
  );
}
