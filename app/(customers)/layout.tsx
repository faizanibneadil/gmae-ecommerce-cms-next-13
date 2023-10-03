import { memo } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return <main>{children}</main>;
});

Layout.displayName = "Layout";
export default Layout;
