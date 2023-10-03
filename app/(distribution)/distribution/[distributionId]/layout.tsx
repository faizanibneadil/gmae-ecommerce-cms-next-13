import { memo } from "react";
import Wrapper from "../../_components/wrapper";

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return <Wrapper>{children}</Wrapper>;
});
Layout.displayName = "Layout";
export default Layout;
