import { ReactNode } from "react";
import Navigation from "./components/navigation";
import Carousel from "./components/carousel";
import { X } from "lucide-react";
import { Card } from "@tremor/react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigation />
      <Carousel />
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
