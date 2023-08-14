import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  deliveryLocations: ReactNode;
}

const Layout = ({ children, deliveryLocations }: Props) => (
  <div className="max-w-4xl mx-auto">
    {deliveryLocations}
    {children}
  </div>
);

export default Layout;
