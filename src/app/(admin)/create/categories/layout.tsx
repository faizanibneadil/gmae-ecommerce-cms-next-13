import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ReactNode } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import CategoriesHeader from "./components/CategoriesHeader";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <CategoriesHeader /> */}
      {children}
    </div>
  );
}
