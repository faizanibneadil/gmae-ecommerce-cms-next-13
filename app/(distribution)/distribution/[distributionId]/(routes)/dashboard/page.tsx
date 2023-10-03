import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { memo } from "react";

const Page: React.FC<{}> = memo(() => {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Total Sale</CardTitle>
          <CardDescription>Today Sale</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Display Hare Today Sale Count</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Profit</CardTitle>
          <CardDescription>Today Profit</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Display Hare Today Profit Count</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Transactions</CardTitle>
          <CardDescription>Today Transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Display Hare Today Transactions Count</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
});

Page.displayName = "Page";
export default Page;
