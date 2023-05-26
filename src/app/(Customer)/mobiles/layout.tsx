import { ReactNode } from "react";

export default function Layout({
  children,
  brands,
}: {
  children: ReactNode;
  brands: ReactNode;
}) {
  return (
    <>
      <div>
        <div className="px-2 py-4">{brands}</div>
        <div className="px-2">{children}</div>
      </div>
    </>
  );
}
