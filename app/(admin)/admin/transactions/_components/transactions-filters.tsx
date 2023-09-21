import { $Enums } from "@prisma/client";
import { cache, memo, use } from "react";
import FindByBooker from "./find-by-booker";
import FindByTransactionId from "./find-by-id";
import FindBySaleMane from "./find-by-sale-mane";
import FindByArea from "./find-by-area";
import FindByDeliveryDate from "./find-by-delivery-date";
import FindByIssueDate from "./find-by-issue-date";
import FindByShop from "./find-by-shop";
import FindByCompany from "./find-by-company";
import { prisma } from "@/config/db";

const getUsers = cache(async () => {
  const users = await prisma.user.findMany({
    where: { role: { in: ["BOOKER", "SALES_MAN"] } },
  });
  return users;
});

const getAreas = cache(async () => {
  const areas = await prisma.areas.findMany();
  return areas;
});

const getCompanies = cache(async () => {
  const companies = await prisma.companies.findMany();
  return companies;
});

const TransactionFilters: React.FC<{}> = memo(() => {
  const users = use(getUsers());
  const areas = use(getAreas());
  const companies = use(getCompanies());
  const bookers = users.filter((u) => u.role === "BOOKER");
  const salesMans = users.filter((u) => u.role === "SALES_MAN");
  return (
    <div className="space-y-2">
      <div className="grid content-center grid-cols-1 gap-x-1 gap-y-1 md:grid-cols-2">
        <FindByTransactionId />
        <FindByBooker bookers={bookers} />
        <FindBySaleMane saleManes={salesMans} />
        <FindByArea areas={areas} />
        <FindByShop />
        <FindByCompany companies={companies} />
        <FindByIssueDate />
        <FindByDeliveryDate />
      </div>
      {/* <BillingProducts /> */}
    </div>
  );
});
TransactionFilters.displayName = "TransactionFilters";
export default TransactionFilters;
