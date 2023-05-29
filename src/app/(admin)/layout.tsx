import ContextMenuProvider from "@/components/admin/contextMenuProvider";
import Navigation from "@/components/admin/navigation/navigation";
import { ReactNode } from "react";
import SideMenuBar from "./components/layouts/sideMenuBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="h-full text-white bg-black md:h-screen">
        <div className="flex flex-col-reverse items-center md:h-full md:flex-row">
          <div className="sticky bottom-0 w-full text-center text-white bg-black md:w-auto">
            <SideMenuBar />
          </div>
          <div className="bg-gray-900 md:w-full md:overflow-x-auto  md:h-[calc(100vh)]">
            {children}
          </div>
        </div>
      </div>

      <div>{/* <Navigation /> */}</div>
      <div>
        {/* {children} */}
        {/* <ContextMenuProvider></ContextMenuProvider> */}
      </div>
    </div>
  );
}
