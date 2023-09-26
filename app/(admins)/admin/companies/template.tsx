"use client";

import { useParams } from "next/navigation";
import {
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
    <div className="max-w-2xl px-2 mx-auto mt-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <ActionsButtons path="/" tooltipContent="Back">
            <MoveLeft />
          </ActionsButtons>
        </div>
        <div className="flex flex-wrap items-center space-x-1">
          <ActionsButtons path="/brands" tooltipContent="Add Brands">
            <Target />
          </ActionsButtons>
          <ActionsButtons path="/products" tooltipContent="Add Products">
            <PackagePlus />
          </ActionsButtons>
        </div>
      </div>

      {children}
    </div>
  ) : (
    <div className="max-w-4xl px-2 mx-auto mt-2">
      <div className="flex mb-2 space-x-2">
        <Input placeholder="Search Company ..." />
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
