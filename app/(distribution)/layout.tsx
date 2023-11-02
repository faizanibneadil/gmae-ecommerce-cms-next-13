import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { use } from "react";
import CreateDistributionForm from "./_components/create-distribution-form";
import { _getDistribution } from "@/queries";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = use(getServerSession(authOptions));
  const distributions = session ? use(_getDistribution()) : [];
  if (session)
    if (distributions) return children;
    else return <CreateDistributionForm session={session} />;
  else return redirect("/");
};
export default Layout;
