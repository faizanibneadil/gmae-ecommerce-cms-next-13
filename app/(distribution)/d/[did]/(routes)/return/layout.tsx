import { memo } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return <div className="max-w-3xl py-2 mx-auto">{children}</div>;
});
Layout.displayName = "Layout";
export default Layout;
