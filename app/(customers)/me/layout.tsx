import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode, use } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const session = use(getServerSession(authOptions));
  return session ? (
    <div className="flex items-center justify-center">{children}</div>
  ) : (
    redirect("/")
  );
};

export default Layout;
