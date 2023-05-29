import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex flex-row items-center mb-4 space-x-4">
        <div>
          <Link href="/create" className="btn btn-circle btn-outline btn-sm">
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
        </div>
        <div className="line-clamp-1">Create New Category.</div>
      </div>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div>Category Name</div>
        <div>Category Desction</div>
        <div>Submit button</div>
      </div>
      {children}
    </div>
  );
}
