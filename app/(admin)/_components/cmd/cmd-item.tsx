"use client";

import { CommandItem } from "@/components/ui/command";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { useRouter } from "next/navigation";

const CMDItem: React.FC<{
  children: React.ReactNode;
  label: string;
  route: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}> = memo(({ children, label, route, setOpen, open }) => {
  const { replace } = useRouter();
  const [pending, startTransaction] = useTransition();
  return (
    <CommandItem
      onSelect={() =>
        startTransaction(() => {
          replace(route);
          setOpen(!open);
        })
      }
      className="flex flex-row items-center justify-between"
    >
      <div className="flex flex-row space-x-2">
        {children}
        <span>{label}</span>
      </div>
      {pending && <Spin />}
    </CommandItem>
  );
});
CMDItem.displayName = "CMDItem";
export default CMDItem;
