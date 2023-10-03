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

const Page: React.FC<{ params: { id: string } }> = memo(({ params }) => {
  const user = use(getUserById(params?.id));
  return <UserProfileForm user={user} />;
});

Page.displayName = "Page";
export default Page;
