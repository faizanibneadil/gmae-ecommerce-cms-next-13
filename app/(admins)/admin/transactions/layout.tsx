import { memo } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return <div className="max-w-2xl px-2 mx-auto mt-2">{children}</div>;
});

Layout.displayName = "Layout";
export default Layout;
