import { Gauge, PlusCircle, Settings, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className="sticky top-0 z-50 bg-white border-t border-b border-gray-200 ">
      <div className="grid h-full max-w-lg grid-cols-5 ">
        <button className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group">
          <Gauge className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600" />
          <span className="sr-only">Dashboard</span>
        </button>
        <Link
          href="/create"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group"
        >
          <PlusCircle className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600" />
          <span className="sr-only">Add</span>
        </Link>
        <Link href="/create/user" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group">
          <UserPlus className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600" />
          <span className="sr-only">New User</span>
        </Link>
        <Link href="/settings" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group">
          <Settings className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600" />
          <span className="sr-only">Settings</span>
        </Link>
      </div>
    </div>
  );
}
