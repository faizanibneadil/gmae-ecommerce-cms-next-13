import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await fetch(
    `https://dummyjson.com/products/category/${params.category}`
  ).then((res) => res.json());
  return (
    <div className="px-2 space-y-2">
        Filter By Category
      <div className="w-full space-x-4 carousel carousel-center">
        {[...Array(20)].map(_ => <div key={_} className="carousel-item"><button className="btn btn-outline btn-warning btn-sm">Sub {_}</button></div>)}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {products?.products?.map((_: any) => (
          <div key={_.id} className="w-full rounded-2xl">
            <Link href="#">
              <div
                className="w-full h-32 bg-white bg-center bg-no-repeat bg-contain rounded-t-lg rounded-b-lg"
                style={{ backgroundImage: `url("${_.thumbnail}")` }}
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
              {/* <button className="gap-2 btn btn-xs">Buy Now</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
