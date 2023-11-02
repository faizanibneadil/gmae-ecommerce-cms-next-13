import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { _getDistributionInfo } from "@/queries";

interface Props {
  params: { distributionId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const distribution = await _getDistributionInfo(params.distributionId);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-1 gap-y-1">
      <Card>
        <CardHeader className="font-semibold">Total Companies</CardHeader>
        <CardContent className="text-6xl text-center">
          {distribution?._count.companies}
        </CardContent>
        <CardFooter>View All</CardFooter>
      </Card>
      <Card>
        <CardHeader className="font-semibold">Total Products</CardHeader>
        <CardContent className="text-6xl text-center">
          {distribution?._count.products}
        </CardContent>
        <CardFooter>View Inventory</CardFooter>
      </Card>
      <Card>
        <CardHeader className="font-semibold">Today Bills</CardHeader>
        <CardContent className="text-6xl text-center">
          {distribution?._count.bills}
        </CardContent>
        <CardFooter>View Transactions</CardFooter>
      </Card>
      <Card>
        <CardHeader className="font-semibold">Total Areas</CardHeader>
        <CardContent className="text-6xl text-center">
          {distribution?._count.areas}
        </CardContent>
        <CardFooter>View Areas</CardFooter>
      </Card>
      <Card>
        <CardHeader className="font-semibold">Total Shops</CardHeader>
        <CardContent className="text-6xl text-center">
          {distribution?._count.shops}
        </CardContent>
        <CardFooter>View Shops</CardFooter>
      </Card>
      <Card>
        <CardHeader className="font-semibold">Total users</CardHeader>
        <CardContent className="text-6xl text-center">
          {distribution?._count.users}
        </CardContent>
        <CardFooter>View Transactions</CardFooter>
      </Card>
    </div>
  );
};
export default Page;
