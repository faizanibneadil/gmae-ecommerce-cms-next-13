import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import UserProfileForm from "./_components/user-profile-form";
import { _getDistribution, _getUserById } from "@/queries";

const getUserById = cache(async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { distributors: { select: { id: true } } },
  });
  return user;
});

const Page: React.FC<{ params: { id: string } }> = memo(({ params }) => {
  const user = use(_getUserById(params?.id));
  const distributions = use(_getDistribution());
  return <UserProfileForm user={user} />;
});

Page.displayName = "Page";
export default Page;
