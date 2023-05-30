"use client";

import { ReactNode } from "react";
import AuthSessionProvider from "./authSessionProvider";
import ReduxProvider from "./reduxProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthSessionProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </AuthSessionProvider>
  );
}
