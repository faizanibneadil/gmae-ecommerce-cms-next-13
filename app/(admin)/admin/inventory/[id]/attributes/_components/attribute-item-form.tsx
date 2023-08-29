"use client";

import { createAttributesAction, deleteAttribute } from "@/_actions";
import { CheckIcon, TrashIcon } from "@/app/_components/icons";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TAttribute = {
  id: string;
  name: string | null;
  value: string | null;
  productId: string | null;
};

const AttributeItemForm: React.FC<{
  attribute: TAttribute;
}> = ({ attribute }) => {
  const productId = useParams()?.id as string;
  const { refresh } = useRouter();
  const [isPending, startTransition] = useTransition();
  const action = (formData: FormData) => {
    return startTransition(() => createAttributesAction(formData));
  };

  const [isDeleting, startDelete] = useTransition();
  const del = () => {
    return startDelete(() => {
      deleteAttribute({
        attributeId: attribute.id,
        productId,
      });
      refresh();
    });
  };

  return (
    <Card className="p-2">
      <form
        action={action}
        className="flex flex-col items-center w-full space-y-1"
      >
        <input name="productId" type="hidden" value={productId} />
        <input name="attrId" type="hidden" value={attribute.id} />
        <Input defaultValue={attribute?.name?.toString()} name="name" />
        <Input defaultValue={attribute?.value?.toString()} name="value" />
        <div className="flex items-center space-x-0.5">
          <Button type="submit" variant="outline">
            {isPending ? (
              <Spin className="w-4 h-4" />
            ) : (
              <div className="flex flex-row items-center space-x-2">
                <CheckIcon className="w-4 h-4" />
                <p>Save</p>
              </div>
            )}
          </Button>
          <Button onClick={del} type="button" variant="destructive">
            {isDeleting ? (
              <Spin className="w-4 h-4" />
            ) : (
              <div className="flex flex-row items-center space-x-2">
                <TrashIcon className="w-4 h-4" />
                <p>Delete</p>
              </div>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AttributeItemForm;
