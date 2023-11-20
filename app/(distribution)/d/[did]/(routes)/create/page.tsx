import CreateInventoryCard from "./_components/create-inventory-card";
import CreateCompanyCard from "./_components/create-company-card";
import CreateAreaCard from "./_components/create-area-card";
import CreateShopCard from "./_components/create-shop-card";
import CreateUserCard from "./_components/create-user-card";
import CreateCategoryCard from "./_components/create-category-card";
import CreateImageCard from "./_components/create-image-card";
import CreateBrandCard from "./_components/create-brand-card";
import { PageProps } from "@/types";

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-1 gap-y-1">
      <CreateInventoryCard />
      <CreateCompanyCard />
      <CreateAreaCard />
      <CreateShopCard />
      <CreateUserCard />
      <CreateCategoryCard />
      <CreateImageCard />
      <CreateBrandCard />
    </div>
  );
};

export default Page;
