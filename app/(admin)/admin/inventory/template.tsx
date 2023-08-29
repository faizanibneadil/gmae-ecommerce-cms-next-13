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

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  return params?.id ? (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
        <CardDescription>Manage Your Store Inventory.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap space-x-1">
          <ActionsButtons path="/" tooltipContent="Back">
            <MoveLeft />
          </ActionsButtons>
          <ActionsButtons path="/images" tooltipContent="Add Images">
            <ImagePlus />
          </ActionsButtons>
          <ActionsButtons path="/categories" tooltipContent="Add Categories">
            <ListChecks />
          </ActionsButtons>
          <ActionsButtons path="/variants" tooltipContent="Add Variants">
            <PackagePlus />
          </ActionsButtons>
          <ActionsButtons path="/attributes" tooltipContent="Add Attributes">
            <List />
          </ActionsButtons>
          <ActionsButtons
            path="/seo"
            tooltipContent="Make SEO (Search Engine Optimization)"
          >
            <PackageSearch />
          </ActionsButtons>
        </div>
        <Separator className="my-4" />
        {children}
      </CardContent>
    </Card>
  ) : (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
        <CardDescription>Manage Your Store Inventory.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input placeholder="Search Product ..." />
          <Button variant="secondary" className="shrink-0">
            Search
          </Button>
        </div>
        <Separator className="my-4" />
        {children}
      </CardContent>
    </Card>
  );
};

export default Template;
