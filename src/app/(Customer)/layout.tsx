import { ReactNode } from "react";
import Navigation from "./components/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-col">
        <div className="sticky bottom-0 z-50 w-full bg-base-300 md:relative">
          <Navigation />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
