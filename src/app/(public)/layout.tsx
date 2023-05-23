import { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/common/navbart";
import Carousel from "@/components/common/carousel";

import {
  TagIcon,
  Square2StackIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/solid";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - gmae Mobile Accessories Enterprise",
  description: "Buy mobie Accessories here.",
};

export default function RootLayout({
  services,
  topSellingProducts,
  newArrivals,
  onSale,
  mobilePhones,
  accessories,
  laptops,
  gaming,
}: {
  topSellingProducts: React.ReactNode;
  services: React.ReactNode;
  newArrivals: React.ReactNode;
  onSale: React.ReactNode;
  mobilePhones: React.ReactNode;
  accessories: React.ReactNode;
  laptops: React.ReactNode;
  gaming: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <div className="w-full p-4 md:w-2/3 2xl:w-3/4">
          <Carousel />
        </div>
        <div className="w-full p-4 md:w-1/3 2xl:w-1/4">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-full card bg-neutral text-neutral-content">
              <div className="items-center text-center card-body">
                <TagIcon className="w-8" />
                <h2>Promotions</h2>
              </div>
            </div>
            <div className="w-full card bg-neutral text-neutral-content">
              <div className="items-center text-center card-body">
                <Square2StackIcon className="w-8" />
                <h2>Categories</h2>
              </div>
            </div>
            <div className="w-full card bg-neutral text-neutral-content">
              <div className="items-center text-center card-body">
                <SparklesIcon className="w-8" />
                <h2>Services</h2>
              </div>
            </div>
            <div className="w-full card bg-neutral text-neutral-content">
              <div className="items-center text-center card-body">
                <CurrencyDollarIcon className="w-8" />
                <h2>Offers</h2>
              </div>
            </div>
            <div className="w-full card bg-neutral text-neutral-content">
              <div className="items-center text-center card-body">
                <PuzzlePieceIcon className="w-8" />
                <h2>Gaming</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TESTING PARALLEL ROUTING  */}
      <main className="px-4">
        {/* TOP SELLIGN PRODUCTS SECTION  */}
        <section>
          <div className="flex justify-between">
            <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
              Top Selling Products.
            </h6>
            <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See more
            </div>
          </div>
          {topSellingProducts}
        </section>
        {/* SERVICES SECTION  */}
        <section>
          <div className="flex justify-between">
            <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
              Our Services.
            </h6>
            <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See more
            </div>
          </div>
          {services}
        </section>
        <section>
          <div className="flex justify-between">
            <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
              New Arrivals.
            </h6>
            <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See more
            </div>
          </div>
          {newArrivals}
        </section>
        <section>
          <div className="flex justify-between">
            <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
              On Sale.
            </h6>
            <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See more
            </div>
          </div>
          {onSale}
        </section>
        <section>
          <div className="flex justify-between">
            <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
              Mobile Phones.
            </h6>
            <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See more
            </div>
          </div>
          {mobilePhones}
        </section>
        <section>
          <div className="flex justify-between">
            <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
              Accessories.
            </h6>
            <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See more
            </div>
          </div>
          {accessories}
        </section>
        <section>
          <div className="flex justify-between">
            <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
              Laptops.
            </h6>
            <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See more
            </div>
          </div>
          {laptops}
        </section>
        <section>
          <div className="flex justify-between">
            <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
              Gaming.
            </h6>
            <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See more
            </div>
          </div>
          {gaming}
        </section>
      </main>
      {/* TESTING PARALLEL ROUTING  */}
      <footer className="p-10 mt-10 footer bg-base-200 text-base-content">
        <div>
          <img src="/logo.png" className="w-20 h-50" />
          <p>
            Global Mobile Accessories Enterprise-GMAE.
            <br />
            Providing reliable tech since 1992
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </>
  );
}
