"use client";

import { useParams } from "next/navigation";
import {
  ImagePlus,
  List,
  ListChecks,
  MoveLeft,
  PackagePlus,
  PackageSearch,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ActionsButtons from "./_components/actions-buttons";
import MoreOptions from "./_components/more-options";

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  return params?.id ? (
    <div className="max-w-2xl px-2 mx-auto mt-2">
      <div className="flex items-center justify-between mb-2 space-x-1">
        <div className="flex items-center">
          <ActionsButtons path="/" tooltipContent="Back">
            <MoveLeft />
          </ActionsButtons>
        </div>
        <MoreOptions id={params?.id.toString()} />
      </div>

      {children}
    </div>
  ) : (
    <div className="px-2 mt-2">
      <div className="flex mb-2 space-x-2">
        <Input placeholder="Search Product ..." />
        <Button variant="secondary" className="shrink-0">
          Search
        </Button>
      </div>
      {/* <Separator className="my-2" /> */}
      {children}
    </div>
  );
};

export default Template;
