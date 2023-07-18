"use client";

import { createImageAction } from "@/_actions";
import { Images } from "@prisma/client";
import { Button, TextInput } from "@tremor/react";
import { Image, Save, Search, Text } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";

interface Props {
  id: string;
  image: Images | null;
}

const CreateImageForm = ({ id, image }: Props) => {
  const ref = useRef<HTMLFormElement>(null);
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const action = (formData: FormData) => {
    startTransition(() => createImageAction(formData));
    ref.current?.reset();
    replace("/admin/images");
  };
  return (
    <form ref={ref} action={action} className="flex flex-col w-full gap-2 mt-4">
      <input type="hidden" name="id" value={image?.id} />
      <TextInput
        defaultValue={image?.src as string}
        disabled={isPending}
        icon={Image}
        name="src"
        placeholder="Image Google Drive ID"
        required
      />
      <TextInput
        defaultValue={image?.searchText?.join(" ")}
        disabled={isPending}
        icon={Search}
        name="searchText"
        placeholder="Search Text Ex: headphones"
        required
      />
      <TextInput
        defaultValue={image?.altText as string}
        icon={Text}
        disabled={isPending}
        name="altText"
        placeholder="alt text Ex: iPhone black headphones etc ..."
        required
      />
      <Button
        loading={isPending}
        disabled={isPending}
        icon={Save}
        type="submit"
        className="w-full"
      >
        Save
      </Button>
    </form>
  );
};

export default CreateImageForm;
