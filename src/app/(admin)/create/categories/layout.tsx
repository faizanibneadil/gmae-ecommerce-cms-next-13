import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ReactNode } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import CategoriesHeader from "./components/CategoriesHeader";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex flex-row items-center p-4 mb-4 space-x-4">
        <div>
          <Link href="/create" className="btn btn-circle btn-outline btn-sm">
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
        </div>
        <div>Create New Category.</div>
      </div>
      <CategoriesHeader />
      <div className="p-4">{children}</div>
    </div>
  );
}
