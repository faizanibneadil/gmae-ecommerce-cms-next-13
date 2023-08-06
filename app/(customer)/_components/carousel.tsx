"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useRef, memo } from "react";

const Carousel = () => {
  const ref = useRef<any>();
  const images: any = [
    {
      id: 1,
      src: "https://img.freepik.com/free-vector/black-friday-sale-banner-background-with-realistic-3d-objects_1361-3581.jpg",
    },
    {
      id: 2,
      src: "https://img.freepik.com/free-vector/mega-sale-offers-banner-template_1017-31299.jpg",
    },
    {
      id: 3,
      src: "https://img.freepik.com/free-vector/realistic-3d-sale-background_52683-62689.jpg",
    },
    {
      id: 4,
      src: "https://img.freepik.com/premium-vector/mega-sale-banner-promotion-template-with-3d-megaphone-blue-background-special-deal-label-design_139869-1006.jpg",
    },
    {
      id: 1,
      src: "https://img.freepik.com/premium-vector/big-sale-banner-design-template_627209-132.jpg",
    },
    {
      id: 2,
      src: "https://img.freepik.com/free-vector/creative-sales-banner-with-abstract-details_52683-66950.jpg",
    },
    {
      id: 3,
      src: "https://img.freepik.com/free-vector/modern-super-sale-banner-with-red-paint-brush_1361-2253.jpg",
    },
    {
      id: 4,
      src: "https://img.freepik.com/free-vector/super-deal-banner-template-design_87202-1098.jpg",
    },
  ];
  return (
    <div>
      <Swiper
        ref={ref}
        modules={[Autoplay]}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        className="h-[40vw]"
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {images?.map((image: any) => (
          <SwiperSlide key={image.id}>
            <Image
              src={image.src}
              alt=""
              fill
              className="object-cover object-center"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const MemoCarousel = memo(Carousel);
export default MemoCarousel;
