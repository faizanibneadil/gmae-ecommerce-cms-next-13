"use client";

import { ReactNode, useTransition } from "react";
import { deleteCategoryByIdAction } from "../../../../../_actions";
import { Button } from "@tremor/react";

export default function DeleteButton({
  CategoryId,
  children,
}: {
  CategoryId: string;
  children: ReactNode;
}) {
  const [isPending, startDeleting] = useTransition();
  async function deleteCategory(id: string) {
    startDeleting(async () => await deleteCategoryByIdAction(id));
  }
  return (
    <Button size="xs" loading={isPending} disabled={isPending} onClick={() => deleteCategory(CategoryId)}>
      {children}
    </Button>
  );
}
