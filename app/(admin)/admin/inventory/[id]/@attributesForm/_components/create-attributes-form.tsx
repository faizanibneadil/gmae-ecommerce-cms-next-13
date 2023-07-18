"use client";
import { createAttributesAction } from "@/_actions";
import { Button, TextInput, Title } from "@tremor/react";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, memo, useTransition } from "react";

interface Props {
  id: string;
  attributeId: string;
}
const CreateAttributesForm: FC<Props> = ({ id, attributeId }) => {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const action = (formData: FormData) => {
    startTransition(() => createAttributesAction(formData));
    replace(`/admin/inventory/${id}`);
  };
  return (
    <div className="mt-6">
      <Title>Add Product Attributes</Title>

      <form
        className="grid w-full grid-cols-1 gap-2 mt-2 md:grid-cols-5"
        action={action}
      >
        <input name="productId" type="hidden" value={id} />
        <input name="attrId" type="hidden" value={attributeId} />
        <TextInput
          name="name"
          // defaultValue={image?.src}
          className="md:col-span-2"
          placeholder="Name - Ex: Color, Size"
          required
        />
        <TextInput
          // defaultValue={image?.order.toString()}
          name="value"
          className="md:col-span-2"
          placeholder="Value - Ex: Green, Medium"
          required
        />
        <Button
          type="submit"
          loading={isPending}
          disabled={isPending}
          icon={Save}
          className="w-full md:w-auto"
        >
          ADD
        </Button>
      </form>
    </div>
  );
};

export default memo(CreateAttributesForm);
