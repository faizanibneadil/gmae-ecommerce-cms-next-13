import { ReactNode } from "react";
import Navigation from "./components/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigation />
      <main className="p-4">{children}</main>
    </div>
  );
}
