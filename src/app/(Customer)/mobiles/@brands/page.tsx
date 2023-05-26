import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const brands = [
    {name: "Samsung", src: "https://gmae.pk/wp-content/uploads/2022/06/472839_542476a3-86fc-4a6c-88be-d77fd42d5c5a.jpg"},
    {name: "Iphone", src: "https://gmae.pk/wp-content/uploads/2022/07/Apple-iPhone-13.jpg"},
    {name: "Vivo", src: "https://gmae.pk/wp-content/uploads/2022/05/vivo-v23-5g-pakistan-priceoye-g1caw-500x500-1.webp"},
    {name: "Oppo", src: "https://gmae.pk/wp-content/uploads/2022/06/8da817aa-1e72-4ec8-8de3-852e2673a09b21150759.jpg"},
    {name: "Xiomi", src: "https://gmae.pk/wp-content/uploads/2022/07/efe9a8d0-abaf-4c60-a5d7-7ebf2f47b0c121081307.jpg"},
    {name: "Nokia", src: "https://gmae.pk/wp-content/uploads/2022/09/2060-Nokia-110.jpg"},
    {name: "Jazz", src: "https://gmae.pk/wp-content/uploads/2022/07/jazz-digit-pro-4g-pakistan-priceoye-nf45f.jpg"},
    {name: "Oneplus", src: "https://gmae.pk/wp-content/uploads/2022/08/OnePlus-9RT-5G-Nano-Silver-Back.webp"},
    {name: "Redmi", src: "https://gmae.pk/wp-content/uploads/2022/07/xiaomi-redmi-9c-pakistan-priceoye-r0fbp.jpg"},
    {name: "Techno", src: "https://gmae.pk/wp-content/uploads/2022/05/tecno-camon-18-premier-pakistan-priceoye-5qbz6-500x500-1.webp"},
    {name: "Itel", src: "https://gmae.pk/wp-content/uploads/2022/07/A-17-Light-Blue-FB.png"},
    {name: "infinix", src: "https://gmae.pk/wp-content/uploads/2022/06/hot-12-play-gold.jpg"},
  ];
  return (
    <div className="w-full space-x-4 carousel carousel-center">
      {brands.map((_) => (
        <Link key={_.name} href={`/mobiles/${_.name}`} className="carousel-item">
          <div className="w-full max-w-sm ">
            <div className="flex flex-col items-center">
              <Image
                width={24}
                height={24}
                className="w-24 h-24 mb-3 rounded-full shadow-lg aspect-square"
                src={`${_.src}`}
                alt={_.name}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
