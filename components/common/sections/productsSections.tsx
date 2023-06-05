import { ReactNode } from "react";

export default function ProductsSection({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="divider">{name}</div>
      {children}
    </div>
  );
}
