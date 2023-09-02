import Navigation from "./_components/navigation";
import Footer from "./_components/footer";
import { memo } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return (
    <div>
      {children}
      {/* <Navigation /> */}
      {/* <main>{children}</main> */}
      {/* <Footer /> */}
    </div>
  );
});
Layout.displayName = "Layout";
export default Layout;
