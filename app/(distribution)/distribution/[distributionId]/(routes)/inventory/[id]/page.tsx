import { use } from "react";
import PropertiesForm from "./_components/properties-form";
import { _getInventoryById } from "@/queries";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const Page: React.FC<Props> = ({ params, searchParams }) => {
  const properties = use(_getInventoryById(params.id));
  return <PropertiesForm properties={properties} />;
};

export default Page;
