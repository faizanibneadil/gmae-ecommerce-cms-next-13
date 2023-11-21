import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CreateDistributionForm from "../_components/create-distribution-form";
import { cache } from "react";

const checkDistributions = cache(async (userId: string | undefined) => {
  const distributions = await prisma.distributors.findFirst({
    where: { users: { some: { id: userId } } },
  });
  return distributions;
});

const Page = async () => {
  const session = await getServerSession(authOptions);
  const distributions = await checkDistributions(session?.user.id as string);
  if (distributions) redirect(`/d/${distributions.id}`);
  return <CreateDistributionForm />;
};

export default Page;
