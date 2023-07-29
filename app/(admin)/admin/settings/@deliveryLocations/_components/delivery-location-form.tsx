import { Button, TextInput } from "@tremor/react";
import { memo } from "react";

const DeliveryLocationFOrm = () => (
  <form className="grid grid-cols-1 gap-2 md:grid-cols-5">
    <TextInput placeholder="Locations" className="col-span-2" />
    <TextInput placeholder="Rate" className="col-span-2" />
    <Button type="submit" className="w-full">
      Save
    </Button>
  </form>
);

export default memo(DeliveryLocationFOrm);
