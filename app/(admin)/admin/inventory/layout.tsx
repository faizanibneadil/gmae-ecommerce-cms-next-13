import { memo } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return <div className="max-w-6xl mx-auto">{children}</div>;
});

Layout.displayName = "Layout";
export default Layout;
