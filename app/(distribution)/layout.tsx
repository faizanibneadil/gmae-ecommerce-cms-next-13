import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { cache, memo, use } from "react";
import Wrapper from "./_components/wrapper";
import { prisma } from "@/config/db";
import CreateDistributionForm from "./_components/create-distribution-form";

const getDistributions = cache(async (userId: string | undefined) => {
  const distributions = await prisma.distributors.findFirst({
    where: { users: { some: { id: userId } } },
  });
  return distributions;
});

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  const session = use(getServerSession(authOptions));
  const isAdmin = session && session.user.role === "ADMIN";
  const distributions = isAdmin ? use(getDistributions(session.user.id)) : [];
  return isAdmin ? (
    distributions ? (
      children
    ) : (
      <CreateDistributionForm session={session} />
    )
  ) : (
    redirect("/")
  );
});
Layout.displayName = "Layout";
export default Layout;
