import { prisma } from "@/config/db";
import { Button, Text, TextInput } from "@tremor/react";
import { cache, use } from "react";

const getLocations = cache(async () => {
  const locations = await prisma.deliveryLocations.findMany();
  return locations;
});

const Page: React.FC<{}> = () => {
  const locations = use(getLocations());
  return (
    <div className="grid grid-cols-1 gap-2 my-4 md:grid-cols-2">
      <div>Information about user cart</div>
      <div>
        <form className="flex flex-col space-y-2">
          <div>
            <Text>Receiver Name.</Text>
            <TextInput name="name" type="text" />
          </div>
          <div>
            <Text>Receiver Email.</Text>
            <TextInput name="email" type="email" />
          </div>
          <div>
            <Text>Receiver Address.</Text>
            <TextInput name="address" type="text" />
          </div>
          <div>
            <select>
              <option>Choose any one location.</option>
              {locations?.map((loc) => (
                <option key={loc.id}>{loc.location}</option>
              ))}
            </select>
          </div>
          <Button type="submit">Place Order</Button>
        </form>
      </div>
    </div>
  );
};
export default Page;
