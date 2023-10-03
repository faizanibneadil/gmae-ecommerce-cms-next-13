"use client";

import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PlusIcon } from "@/app/_components/icons";
import { Button } from "@/components/ui/button";

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  return params?.id ? (
    <div className="">{children}</div>
  ) : (
    <div className="">
      <div className="flex mb-2 space-x-1">
        <Input placeholder="Search Area ..." />
        <Link href={`/distribution/${params?.distributionId}/areas/new`}>
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
