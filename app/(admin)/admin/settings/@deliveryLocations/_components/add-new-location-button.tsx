"use client";
import { addNewDeliveryLocation } from "@/_actions";
import { Button } from "@tremor/react";
import { MapPin } from "lucide-react";
import { memo, useTransition } from "react";

const AddNewLocation = () => {
  const [isPending, startTransition] = useTransition();
  const action = () => startTransition(() => addNewDeliveryLocation());
  return (
    <Button
      loading={isPending}
      disabled={isPending}
      onClick={action}
      className="w-full rounded-none"
      icon={MapPin}
    >
      Add location.
    </Button>
  );
};

export default memo(AddNewLocation);
