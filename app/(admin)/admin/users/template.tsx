"use client";

import { useParams } from "next/navigation";
import {
  Building,
  Building2,
  Calendar,
  Factory,
  ImagePlus,
  List,
  ListChecks,
  Map,
  MoveLeft,
  PackagePlus,
  PackageSearch,
  Target,
  User,
  UserCircle,
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
import MoreOptions from "./[id]/_components/more-options";

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
        <MoreOptions />
      </div>

      {children}
    </div>
  ) : (
    <div className="max-w-3xl px-2 mx-auto mt-2">
      <div className="flex mb-2 space-x-2">
        <Input placeholder="Search User ..." />
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
