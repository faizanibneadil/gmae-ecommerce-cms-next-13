import UserProfileForm from "./_components/user-profile-form";
import { _getDistribution, _getUserById } from "@/queries";

interface Props {
  params: { userId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const user = await _getUserById(params?.userId);
  const distributions = await _getDistribution();
  return <UserProfileForm user={user} />;
};

export default Page;
