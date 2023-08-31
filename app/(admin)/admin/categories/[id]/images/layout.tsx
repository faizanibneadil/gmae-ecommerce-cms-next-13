import { memo } from "react";

const Layout: React.FC<{
  children: React.ReactNode;
}> = memo(({ children }) => {
  return <div>{children}</div>;
});
Layout.displayName = "Layout";
export default Layout;
