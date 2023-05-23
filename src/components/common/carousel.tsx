"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper";

export default function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        // spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="max-h-[25rem] rounded-3xl"
        autoplay={{ delay: 2500 }}
      >
        <SwiperSlide>
          <img
            className="w-full"
            src={`https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?t=st=1684823431~exp=1684824031~hmac=2b2925a166792f45b343fc9eaf0f8c350d290bc674b3cc7d534858524db4cb36`}
            alt="Burger"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full"
            src={`https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309652.jpg?w=826&t=st=1684854116~exp=1684854716~hmac=d8222a436bd17ab481f20bac9ec84e27a5903b5d4f636b179477e8e4c9b70866`}
            alt="Burger"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full"
            src={`https://img.freepik.com/free-vector/flat-black-friday-sale-background_23-2149101849.jpg`}
            alt="Burger"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
