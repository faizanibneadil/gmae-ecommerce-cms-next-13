import { ReactNode } from "react";
import Navigation from "./components/navigation";
import TopNavigation from "./components/topNavigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <TopNavigation />
      <Navigation />
      <main className="p-4">{children}</main>
    </div>
  );
}
