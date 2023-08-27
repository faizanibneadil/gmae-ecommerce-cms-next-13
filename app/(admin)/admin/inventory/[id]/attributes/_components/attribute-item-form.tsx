"use client";

import { createAttributesAction, deleteAttribute } from "@/_actions";
import { CheckIcon, TrashIcon } from "@/app/_components/icons";
import { Button, Card, Icon, TextInput } from "@tremor/react";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { useParams, useRouter } from "next/navigation";

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
        <TextInput
          className="p-0 m-0"
          defaultValue={attribute?.name?.toString()}
          name="name"
        />
        <TextInput
          className="p-0 m-0"
          defaultValue={attribute?.value?.toString()}
          name="value"
        />
        <div className="flex items-center space-x-0.5">
          <Button
            type="submit"
            variant="light"
            color="indigo"
            className="ml-0.5"
          >
            <Icon
              icon={isPending ? Spin : CheckIcon}
              color="green"
              variant="shadow"
              size="sm"
            />
          </Button>
          <Button
            onClick={del}
            type="button"
            variant="light"
            color="rose"
            className="ml-0.5"
          >
            <Icon
              icon={isDeleting ? Spin : TrashIcon}
              color="rose"
              variant="shadow"
              size="sm"
            />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AttributeItemForm;
