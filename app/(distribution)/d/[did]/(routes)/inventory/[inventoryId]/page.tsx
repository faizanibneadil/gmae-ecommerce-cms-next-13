import { use } from "react";
import PropertiesForm from "./_components/properties-form";
import { _getInventoryById } from "@/queries";
import { PageProps } from "@/types";

const Page: React.FC<PageProps> = ({ params, searchParams }) => {
  const properties = use(
    _getInventoryById({ inventoryId: params.inventoryId, did: params.did })
  );
  return <PropertiesForm properties={properties} />;
};

export default Page;
