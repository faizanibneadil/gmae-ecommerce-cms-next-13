"use client";

import { signOut } from "next-auth/react";
import { ReactNode } from "react";

export default function LogoutButton({ children }: { children: ReactNode }) {
  return (
    <button onClick={() => signOut()} className="btn btn-warning btn-sm">
      {children}
    </button>
  );
}
