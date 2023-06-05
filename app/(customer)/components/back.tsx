"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const attr = {
  contry: ["hongkong", "pakistan", "lla"],
  colors: ["black", "green"],
  PTA: ["approved", "non approved"],
  software: ["factory unlocked", "jv"],
  device: ["active", "non active"],
  ram: ["1tb", "512", "300"],
};

export default function Back({ heading }: { heading: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-start p-2 space-x-2">
      <button
        className="btn btn-circle btn-outline"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div>{heading}</div>
    </div>
  );
}
