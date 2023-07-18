import React, { ReactNode } from "react";

type Props = {
  form: ReactNode;
  children: ReactNode;
  widget: ReactNode;
};

const Layout = ({ form, children, widget }: Props) => {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {widget}
      {form}
      {children}
    </div>
  );
};

export default Layout;
