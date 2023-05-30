"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Back({ heading }: { heading: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-start p-2 space-x-2">
      <button
        className="btn btn-circle btn-outline"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <div>{heading}</div>
    </div>
  );
}
