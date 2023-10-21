import { memo, use } from "react";
import CreateCompanyForm from "./_components/create-company-form";
import { _getCompanyById } from "@/queries";

interface Props {
  params: { id: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const company = use(_getCompanyById(params?.id));
  return <CreateCompanyForm company={company} />;
});

Page.displayName = "Page";
export default Page;
