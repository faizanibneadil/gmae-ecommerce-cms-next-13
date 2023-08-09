"use client";

import { createAttributesAction, deleteAttribute } from "@/_actions";
import { CheckIcon, TrashIcon } from "@/app/_components/icons";
import { Button, Icon, TextInput } from "@tremor/react";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { useRouter } from "next/navigation";

type TAttribute = {
  id: string;
  name: string | null;
  value: string | null;
  productId: string | null;
};

interface Props {
  props: {
    productId: string;
    attribute: TAttribute;
  };
}
const AttributeItemForm: React.FC<Props> = ({ props }) => {
  const { refresh } = useRouter();
  const [isPending, startTransition] = useTransition();
  const action = (formData: FormData) => {
    return startTransition(() => createAttributesAction(formData));
  };

  const [isDeleting, startDelete] = useTransition();
  const del = () => {
    return startDelete(() => {
      deleteAttribute({
        attributeId: props.attribute.id,
        productId: props.productId,
      });
      refresh();
    });
  };

  return (
    <form action={action} className="flex items-center w-full p-1">
      <input name="productId" type="hidden" value={props.productId} />
      <input name="attrId" type="hidden" value={props.attribute.id} />
      <div className="flex flex-col md:flex-row gap-1.5">
        <TextInput
          defaultValue={props?.attribute?.name?.toString()}
          name="name"
        />
        <TextInput
          defaultValue={props?.attribute?.value?.toString()}
          name="value"
        />
      </div>
      <div className="flex flex-col items-center justify-items-end gap-1.5 md:flex-row">
        <Button type="submit" variant="light" color="indigo" className="ml-0.5">
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
  );
};

export default AttributeItemForm;
