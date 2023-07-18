import { ReactNode } from "react";
import Navigation from "./_components/navigation";
import { X } from "lucide-react";
import { Card } from "@tremor/react";
import Footer from "./_components/footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
