import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { memo, use } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  const session = use(getServerSession(authOptions));

  if (session) {
    switch (session.user.role) {
      case "SALES_MAN":
        return redirect("/riders");
        break;
      case "BOOKER":
        return redirect("/bookers");
        break;
      case "BILLING":
        return redirect("/billing");
        break;
      case "ADMIN":
        return redirect("/admin");
        break;
      default: // Redirect to the default route for unknown roles
        break;
    }
  }

  // If the user's role doesn't match any of the specified cases, they will be redirected to the default route
  return <main>{children}</main>;
});

Layout.displayName = "Layout";
export default Layout;
