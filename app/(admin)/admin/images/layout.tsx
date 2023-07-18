import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  form: ReactNode;
};

const Layout = ({ children, form }: Props) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-2">{form}</div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
