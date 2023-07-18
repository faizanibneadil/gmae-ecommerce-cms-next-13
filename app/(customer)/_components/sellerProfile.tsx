"use client";

import { Card, Icon } from "@tremor/react";
import { Medal, Trophy, Truck } from "lucide-react";

export default function SellerProfile() {
  return (
    <div className="flex flex-col items-center justify-between md:flex-row md:gap-2">
      <Card>
        <div className="flex items-center space-x-2">
          <Icon icon={Truck} variant="shadow" size="lg" color="orange" />
          <h2 className="text-lg font-medium leading-tight line-clamp-2">Within 24-48 Hours Delivery Nationwide.</h2>
        </div>
      </Card>
      <Card>
        <div className="flex items-center space-x-2">
          <Icon icon={Medal} variant="shadow" size="lg" color="orange" />
          <h2 className="text-lg font-medium leading-tight line-clamp-2">More Than 50,000 Verified Reviews.</h2>
        </div>
      </Card>
      <Card>
        <div className="flex items-center space-x-2">
          <Icon icon={Trophy} variant="shadow" size="lg" color="orange" />
          <h2 className="text-lg font-medium leading-tight line-clamp-2">100% Original Products with Warranty.</h2>
        </div>
      </Card>
    </div>
  );
}
