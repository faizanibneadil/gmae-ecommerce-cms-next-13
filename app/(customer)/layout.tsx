import { ReactNode } from "react";
import Navigation from "./components/navigation";
import Carousel from "./components/carousel";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigation />
      <main className="mx-auto md:max-w-4xl">
        <Carousel />
        {children}
      </main>
    </div>
  );
}
