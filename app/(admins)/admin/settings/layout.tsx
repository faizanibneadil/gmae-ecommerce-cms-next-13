import { ReactNode, memo } from "react";

interface Props {
  children: ReactNode;
  deliveryLocations: ReactNode;
}

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return <div className="max-w-4xl mx-auto">{children}</div>;
});
Layout.displayName = "Layout";
export default Layout;
