import { Button, Card, Metric, Text } from "@tremor/react";

export default function DiscountBanner() {
  return (
    <Card decorationColor="orange" decoration="top" className="mb-4 text-white bg-orange-500">
      <div className="py-6 text-center text-white">
        <h2 className="text-5xl font-bold">Discounts</h2>
        <h2 className="text-5xl font-bold">Upto 10% off</h2>
        <Button variant="light" size="xl" className="mt-6 text-white">Shop Now</Button>
      </div>
    </Card>
  );
}
