"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { memo } from "react";
import AddNewAddress from "../../me/address/_components/Init-address";
import useCart from "@/store/cart-store";

type TAddress = {
  id: string;
  label: string | null;
  streetAddress1: string | null;
  streetAddress2: string | null;
  apartment: string | null;
  city: string | null;
  province: string | null;
  postalCode: number | null;
  phone: number | null;
  userId: string | null;
};

const CartAddress: React.FC<{
  address: TAddress[];
}> = memo(({ address }) => {
  const setAddress = useCart((state) => state.setAddress);
  return address?.length ? (
    <RadioGroup
      onValueChange={(addressId) => setAddress(addressId)}
      defaultValue={address[0].id}
    >
      {address?.map((adrs) => (
        <SelectAddress key={adrs.id} address={adrs} />
      ))}
    </RadioGroup>
  ) : (
    <AddNewAddress />
  );
});
CartAddress.displayName = "CartAddress";
export default CartAddress;

/**
 *
 * SelectAddress Component
 *
 */

const SelectAddress: React.FC<{
  address: TAddress;
}> = memo(({ address }) => {
  return (
    <Label htmlFor={address.id} className="flex flex-col space-y-4">
      <Card className="flex flex-row items-center justify-between px-2 py-2">
        <div className="flex flex-row items-center space-x-2">
          <RadioGroupItem value={address.id} id={address.id} />
          <div className="flex flex-col">
            <p>{address.streetAddress1}</p>
          </div>
        </div>
        <Badge>{address.label}</Badge>
      </Card>
    </Label>
  );
});
SelectAddress.displayName = "SelectAddress";
