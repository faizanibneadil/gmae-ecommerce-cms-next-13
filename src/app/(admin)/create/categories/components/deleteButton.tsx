"use client";

import { ReactNode, useTransition } from "react";
import { deleteCategoryByIdAction } from "../../../../../_actions";

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
    <button
      disabled={isPending}
      className={`btn btn-circle btn-sm btn-outline btn-error self-start ${
        isPending && `loading`
      }`}
      onClick={() => deleteCategory(CategoryId)}
    >
      {isPending ? `` : children}
    </button>
  );
}
