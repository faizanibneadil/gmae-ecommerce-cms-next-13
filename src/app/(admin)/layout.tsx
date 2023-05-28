import ContextMenuProvider from "@/components/admin/contextMenuProvider";
import Navigation from "@/components/admin/navigation/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div>
        {children}
        {/* <ContextMenuProvider></ContextMenuProvider> */}
      </div>
    </div>
  );
}
