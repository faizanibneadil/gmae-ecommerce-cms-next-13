"use client";
import { Button } from "@tremor/react";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startDeleting] = useTransition();
  return (
    <Button
      size="xs"
      className="w-full"
      variant="primary"
      icon={Edit}
      loading={isPending}
      disabled={isPending}
      onClick={() =>
        startDeleting(() => router.replace(`/admin/products/${id}`))
      }
    >
      Edit
    </Button>
  );
}
