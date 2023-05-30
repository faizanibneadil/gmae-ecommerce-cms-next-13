import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Back from "../components/back";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Back heading="Categories" />
      {children}
    </div>
  );
}
