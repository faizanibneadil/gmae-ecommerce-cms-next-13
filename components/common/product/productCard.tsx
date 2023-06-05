import { ShoppingBag, Star } from "lucide-react";
import Link from "next/link";

export default function ProductCard({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description: string;
}) {
  return (
    <div className="w-full rounded-2xl">
      <Link href="#">
        <div
          className="w-full h-32 bg-white bg-center bg-no-repeat bg-contain rounded-t-lg rounded-b-lg"
          style={{ backgroundImage: `url("${image}")` }}
        />
      </Link>
      <div className="py-2 ">
        <Link
          href="#"
          className="mb-2 tracking-tight text-gray-900 text-md dark:text-white line-clamp-1"
        >
          {title}
        </Link>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button className="gap-2 btn btn-xs btn-outline btn-circle btn-warning">
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button className="gap-2 btn btn-xs btn-outline btn-circle btn-success">
            <Star className="w-3 h-3" />
          </button>
        </div>
        <button className="gap-2 btn btn-xs">Buy Now</button>
      </div>
    </div>
  );
}
