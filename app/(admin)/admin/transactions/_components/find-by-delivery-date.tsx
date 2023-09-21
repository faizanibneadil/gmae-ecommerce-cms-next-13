"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useBilling from "@/store/use-billing";
import { $Enums } from "@prisma/client";
import { Check } from "lucide-react";
import { memo } from "react";
import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const FindByDeliveryDate: React.FC<{}> = memo(() => {
  const deliveryDate = useBilling((state) => state.deliveryDate);
  const setDeliveryDate = useBilling((state) => state.setDeliveryDate);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !deliveryDate && "text-muted-foreground"
          )}
        >
          {deliveryDate ? (
            format(deliveryDate, "PPP")
          ) : (
            <span>Delivery Date</span>
          )}

          {/* <CalendarIcon className="w-4 h-4 ml-auto opacity-50" /> */}
          <Badge
            variant="secondary"
            className="text-[0.50rem]/[0.8rem] ml-auto  py-0.5"
          >
            Delivery date
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={deliveryDate}
          onSelect={(date) => setDeliveryDate(date as Date)}
          disabled={(date) => date < new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
});
FindByDeliveryDate.displayName = "FindByDeliveryDate";
export default FindByDeliveryDate;
