import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { ReactNode, memo, use } from "react";

const Layout: React.FC<{
  children: ReactNode;
  auth: ReactNode;
}> = memo(({ children, auth }) => {
  const session = use(getServerSession(authOptions));
  return <div>{session ? children : auth}</div>;
});
Layout.displayName = "Layout";
export default Layout;
