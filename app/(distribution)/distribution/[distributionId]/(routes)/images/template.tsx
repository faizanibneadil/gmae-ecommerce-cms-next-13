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
import Link from "next/link";
import { PlusIcon } from "@/app/_components/icons";

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  return params?.id ? (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <ActionsButtons path="/" tooltipContent="Back">
            <MoveLeft />
          </ActionsButtons>
        </div>
        <div className="flex flex-wrap items-center space-x-1">
          <ActionsButtons path="/categories" tooltipContent="Add Categories">
            <ListChecks />
          </ActionsButtons>
          <ActionsButtons path="/products" tooltipContent="Add Products">
            <PackagePlus />
          </ActionsButtons>
        </div>
      </div>

      {children}
    </div>
  ) : (
    <div className="">
      <div className="flex mb-2 space-x-1">
        <Input placeholder="Search image ..." />
        <Link href={`/distribution/${params?.distributionId}/images/new`}>
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" /> Create
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Template;
