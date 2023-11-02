"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "@/app/_components/icons";
import Link from "next/link";
import { useParams } from "next/navigation";

const ActionsButtons: React.FC<{}> = () => {
  const distributionId = useParams()?.distributionId as string;

  return (
    <Link
      href={`/distribution/${distributionId}/create`}
      className={buttonVariants({
        variant: "default",
        className: "h-8 px-2 py-1.5 rounded-none space-x-2",
      })}
    >
      <PlusIcon className="w-4 h-4" /> <span>Create</span>
    </Link>
  );
};

export default ActionsButtons;
