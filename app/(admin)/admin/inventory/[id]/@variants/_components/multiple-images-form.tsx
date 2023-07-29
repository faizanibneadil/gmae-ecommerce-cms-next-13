"use client";

import { Button, TextInput } from "@tremor/react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, memo, useTransition } from "react";

type TImages = {
  id: string;
  src: string;
  order: number;
} | null;

interface Props {
  productId: string;
  image: TImages | undefined;
}

const MultipleImagesForm: FC<Props> = ({ productId, image }) => {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();

  const action = (formData: FormData) => {
    // startTransition(() => createProductImageAction(formData));
    replace(`/admin/inventory/${productId}`);
  };

  return (
    <form
      className="grid w-full grid-cols-1 gap-2 md:grid-cols-5"
      action={action}
    >
      <input name="productId" type="hidden" value={productId} />
      <TextInput
        name="search"
        // defaultValue={image?.src}
        className="md:col-span-4"
        placeholder="Search Image by its alt Text Or Search Text."
        required
      />
      <Button
        type="submit"
        loading={isPending}
        disabled={isPending}
        icon={Search}
        className="w-full md:w-auto"
      >
        Search
      </Button>
    </form>
  );
};

export default memo(MultipleImagesForm);
