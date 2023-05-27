import Carousel from "@/components/common/carousel";
import Accessories from "@/components/common/landingPage/accessories";
import Gaming from "@/components/common/landingPage/gaming";
import Laptops from "@/components/common/landingPage/laptops";
import MobilePhone from "@/components/common/landingPage/mobilePhone";
import NewArrivals from "@/components/common/landingPage/newArrivals";
import OnSale from "@/components/common/landingPage/onSale";
import Services from "@/components/common/landingPage/services";
import TopSellingProducts from "@/components/common/landingPage/topSellingProducts";

import {
  TagIcon,
  Square2StackIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/solid";

export default function Page() {
  return (
    <>
      <div>
        <div className="grid grid-flow-row-dense grid-cols-3 ...">
          <div className="col-span-2">
            <Carousel />
          </div>
          <div>
            <Carousel />
            <Carousel />
          </div>
        </div>
        <div className="divider">Top Selling Products.</div>
        <TopSellingProducts />
        <div className="divider">New Arrivals.</div>
        <NewArrivals />
        <div className="divider">On Sale.</div>
        <OnSale />
        <div className="divider">Our Services.</div>
        <Services />
        <div className="divider">Mobile Phones.</div>
        <MobilePhone />
        <div className="divider">Accessories.</div>
        <Accessories />
        <div className="divider">Laptops.</div>
        <Laptops />
        <div className="divider">Gaming.</div>
        <Gaming />
      </div>
    </>
  );
}
