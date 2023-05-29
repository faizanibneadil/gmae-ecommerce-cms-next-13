import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ReactNode } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import CategoriesHeader from "./components/CategoriesHeader";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="sticky top-0 z-50 flex flex-row items-center p-4 space-x-4 bg-base-300">
        <div>
          <Link href="/create" className="btn btn-circle btn-outline btn-sm">
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
        </div>
        <div>Create New Category.</div>
      </div>
      <CategoriesHeader />
      {children}
    </div>
  );
}
