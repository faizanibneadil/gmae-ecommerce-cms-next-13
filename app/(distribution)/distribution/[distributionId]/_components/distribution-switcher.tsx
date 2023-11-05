"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Building, CheckIcon, PlusCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface DistributionSwitcherProps extends PopoverTriggerProps {
  distributions: {
    id: string;
    name: string;
    ledgerId: string | null;
  }[];
}

export default function DistributionSwitcher({
  distributions,
}: DistributionSwitcherProps) {
  const distributionId = useParams()?.distributionId as string;
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [showNewDistributionDialog, setShowNewDistributionDialog] =
    React.useState(false);
  const [selectedDistribution, setDistribution] = React.useState(
    distributions.find((d) => d.id === distributionId)
  );

  return (
    <Dialog
      open={showNewDistributionDialog}
      onOpenChange={setShowNewDistributionDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a distribution"
            className={buttonVariants({
              variant: "secondary",
              className: `w-full flex items-center justify-between pl-3 rounded-none`,
              size: "sm",
            })}
          >
            <Avatar className="w-5 h-5">
              <AvatarImage
                src={session?.user.image?.toString()}
                alt={session?.user.name?.toString()}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span className="hidden md:block">
              {selectedDistribution?.name}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No distribution found.</CommandEmpty>
              {distributions.map((distribution) => (
                <CommandItem
                  key={distribution.id}
                  onSelect={() => {
                    router.push(`/distribution/${distribution?.id}`);
                    setDistribution(distribution);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Building className="w-5 h-5 mr-2" />
                  {distribution.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedDistribution?.id === distribution.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewDistributionDialog(true);
                    }}
                  >
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Create Distribution
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create distribution</DialogTitle>
          <DialogDescription>
            Add a new distribution to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="py-2 pb-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Distribution name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewDistributionDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
