import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import UserProfileForm from "./_components/user-profile-form";

const getUserById = cache(async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { distributors: { select: { id: true } } },
  });
  return user;
});

const getDistributions = cache(async () => {
  const distributions = await prisma.distributors.findMany();
  return distributions;
});

const Page: React.FC<{ params: { id: string } }> = memo(({ params }) => {
  const user = use(getUserById(params?.id));
  const distributions = use(getDistributions());
  return <UserProfileForm user={user} distributions={distributions} />;
});

Page.displayName = "Page";
export default Page;
