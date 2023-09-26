import { memo } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return children;
});
Layout.displayName = "Layout";
export default Layout;
