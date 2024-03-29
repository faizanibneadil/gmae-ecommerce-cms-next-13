"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ArrowRightLeft,
  Gauge,
  ImageIcon,
  Laptop,
  List,
  Moon,
  Package,
  Percent,
  Settings,
  Sun,
  Truck,
  Users2,
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import CMDItem from "./cmd-item";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";

const Command = memo(() => {
  const did = useParams()?.did as string;
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Root">
          <CMDItem
            open={open}
            setOpen={setOpen}
            label="Dashboard"
            route={`/d/${did}`}
          >
            <Gauge width={4} height={4} />
          </CMDItem>
          <CMDItem
            open={open}
            setOpen={setOpen}
            label="Inventory"
            route={`/d/${did}/inventory`}
          >
            <Package width={4} height={4} />
          </CMDItem>
          <CMDItem
            open={open}
            setOpen={setOpen}
            label="Categories"
            route={`/d/${did}/categories`}
          >
            <List width={4} height={4} />
          </CMDItem>
          <CMDItem
            open={open}
            setOpen={setOpen}
            label="Image Gallery"
            route={`/d/${did}/images`}
          >
            <ImageIcon width={4} height={4} />
          </CMDItem>
          <CMDItem
            open={open}
            setOpen={setOpen}
            label="Orders"
            route={`/d/${did}/orders`}
          >
            <Truck width={4} height={4} />
          </CMDItem>
          <CMDItem
            open={open}
            setOpen={setOpen}
            label="Transactions"
            route={`/d/${did}/transactions`}
          >
            <ArrowRightLeft width={4} height={4} />
          </CMDItem>
          <CMDItem
            open={open}
            setOpen={setOpen}
            label="Coupons / Discounts"
            route={`/d/${did}`}
          >
            <Percent width={4} height={4} />
          </CMDItem>
          <CMDItem
            open={open}
            setOpen={setOpen}
            label="Customers"
            route={`/d/${did}`}
          >
            <Users2 width={4} height={4} />
          </CMDItem>
          <CMDItem
            open={open}
            setOpen={setOpen}
            label="Settings"
            route={`/d/${did}`}
          >
            <Settings width={4} height={4} />
          </CMDItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem
            onSelect={() => {
              setTheme("light");
              setOpen((open) => !open);
            }}
          >
            <Moon width={4} height={4} className="mr-2" /> Light
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme("dark");
              setOpen((open) => !open);
            }}
          >
            <Sun width={4} height={4} className="mr-2" /> Dark
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme("system");
              setOpen((open) => !open);
            }}
          >
            <Laptop width={4} height={4} className="mr-2" /> System Default
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
});
Command.displayName = "Command";
export default Command;
