"use client";

import { deleteAttribute } from "@/_actions";
import { XCircleIcon } from "@/app/_components/icons";
import { useParams } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { X } from "lucide-react";

const DeleteAttribute: React.FC<{
  attributeId: string;
}> = memo(({ attributeId }) => {
  const productId = useParams()?.id as string;
  const [pending, start] = useTransition();
  const action = () => start(() => deleteAttribute({ productId, attributeId }));
  return pending ? (
    <Spin className="w-4 h-4" />
  ) : (
    <button disabled={pending}>
      <X onClick={action} className="w-4 h-4" />
    </button>
  );
});
DeleteAttribute.displayName = "DeleteAttribute";
export default DeleteAttribute;
