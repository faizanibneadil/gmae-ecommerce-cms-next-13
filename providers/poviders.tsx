"use client";

import { ReactNode } from "react";
import AuthSessionProvider from "./authSessionProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
