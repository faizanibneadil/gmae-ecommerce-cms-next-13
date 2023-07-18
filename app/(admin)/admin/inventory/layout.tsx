import { FC, ReactNode, memo } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="max-w-4xl mx-auto">{children}</div>;
};

export default memo(Layout);
