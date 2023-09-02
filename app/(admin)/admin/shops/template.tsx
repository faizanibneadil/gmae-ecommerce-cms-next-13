"use client";

import { useParams } from "next/navigation";
import {
  Building,
  Building2,
  ImagePlus,
  List,
  ListChecks,
  MoveLeft,
  PackagePlus,
  PackageSearch,
  Target,
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

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  return params?.id ? (
    <div className="px-2 mt-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <ActionsButtons path="/" tooltipContent="Back">
            <MoveLeft />
          </ActionsButtons>
        </div>
        <div className="flex flex-wrap items-center space-x-1">
          {/* <ActionsButtons path="/companies" tooltipContent="Add Company">
            <Building2 />
          </ActionsButtons>
          <ActionsButtons path="/products" tooltipContent="Add Products">
            <PackagePlus />
          </ActionsButtons> */}
        </div>
      </div>

      {children}
    </div>
  ) : (
    <div className="px-2 mt-2">
      <div className="flex mb-2 space-x-2">
        <Input placeholder="Search Shops ..." />
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
