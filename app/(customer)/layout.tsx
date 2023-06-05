import { ReactNode } from "react";
import Navigation from "./components/navigation";
import TransitionButton from "../components/transitionButton";
import { ChevronLeft, Search } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="grid grid-flow-row-dense grid-cols-2 ...">
        <div className="sticky top-0 z-50 col-span-2 p-2 md:p-4 md:col-span-1 backdrop-blur-xl bg-base-100/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <TransitionButton
                path="/"
                className="btn btn-circle btn-outline btn-sm md:hidden"
              >
                <ChevronLeft className="w-5 h-5" />
              </TransitionButton>
              <img className="w-16" src="/logo.png" />
            </div>
            <TransitionButton
              path="/search"
              className="btn btn-circle btn-outline btn-sm md:hidden"
            >
              <Search className="w-6 h-6" />
            </TransitionButton>
          </div>
        </div>
        <div className="col-span-2">{children}</div>
        <div className="sticky bottom-0 right-0 z-50 col-span-2 p-2 m-0 md:top-0 md:col-span-1 backdrop-blur-xl bg-base-100/30">
          <Navigation />
        </div>
      </div>
    </div>
  );
}
