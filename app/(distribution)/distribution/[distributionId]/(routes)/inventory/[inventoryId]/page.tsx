import { use } from "react";
import PropertiesForm from "./_components/properties-form";
import { _getInventoryById } from "@/queries";

interface Props {
  params: { inventoryId: string };
  searchParams: { [key: string]: string };
}

const Page: React.FC<Props> = ({ params, searchParams }) => {
  const properties = use(_getInventoryById(params.inventoryId));
  return <PropertiesForm properties={properties} />;
};

export default Page;
