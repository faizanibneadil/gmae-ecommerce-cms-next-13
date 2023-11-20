import { PageProps } from "@/types";
import { _getAreas, _getCompanies, _getUsers } from "@/queries";
import dynamic from "next/dynamic";
const CreateBillForm = dynamic(() => import("./_components/create-bill-form"), {
  ssr: false,
  loading: () => <div>Please Wait ...</div>,
});

const Page: React.FC<PageProps> = async ({ params }) => {
  const [users, companies, areas] = await Promise.all([
    _getUsers(params.did),
    _getCompanies(params.did),
    _getAreas(params.did),
  ]);
  return <CreateBillForm areas={areas} companies={companies} users={users} />;
};

export default Page;
