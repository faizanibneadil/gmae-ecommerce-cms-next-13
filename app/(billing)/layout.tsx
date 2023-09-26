import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { memo, use } from "react";
import Wrapper from "./_components/wrapper";
import Menu from "./_components/menu";

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  const session = use(getServerSession(authOptions));
  const isAdmin = session && session.user.role === "ADMIN";
  const isBilling = session && session.user.role === "BILLING";
  const isAuthorized = isBilling || isAdmin;
  return isAuthorized ? (
    <Wrapper>
      <Menu session={session} />
      {children}
    </Wrapper>
  ) : (
    redirect("/")
  );
});
Layout.displayName = "Layout";
export default Layout;
