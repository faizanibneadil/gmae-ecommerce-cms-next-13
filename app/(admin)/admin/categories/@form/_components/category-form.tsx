"use client";
import { createCategoryAction } from "@/_actions";
import { Button, Select, SelectItem, TextInput } from "@tremor/react";
import { useMemo, useRef, useState, useTransition } from "react";
import { Check, Hash, Save, TextCursor, Type } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  categories: {
    images: {
      id: string;
      src: string | null;
    } | null;
    id: string;
    name: string | null;
    slug: string | null;
    order: number | null;
    subCategory: {
      images: {
        id: string;
        src: string | null;
      } | null;
      id: string;
      name: string | null;
      slug: string | null;
      order: number | null;
    }[];
  }[];
  category: {
    id: string;
    slug: string | null;
    name: string | null;
    order: number | null;
    images: {
      id: string;
      src: string | null;
    } | null;
    parentCategory: {
      id: string;
    } | null;
  } | null;
  categoryId?: string;
}

export default function CategoryForm({
  category,
  categoryId,
  categories,
}: Props) {
  const ref = useRef<HTMLFormElement>(null);
  const { replace } = useRouter();
  const [categoryIds, setCategoryIds] = useState<any>(
    category?.parentCategory?.id
  );
  const [isPending, startTransition] = useTransition();
  const [isBackPending, goBack] = useTransition();

  // server action
  const action = async (formData: FormData) => {
    formData.append("categoryId", `${categoryIds}`);
    startTransition(() => createCategoryAction(formData));
  };

  const back = () =>
    goBack(() => {
      ref.current?.reset();
      replace("/admin/categories");
    });

  // component
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="relative w-20 h-10 cursor-pointer group md:w-40 md:h-32">
        <Image
          alt=""
          fill
          src={`https://drive.google.com/thumbnail?id=${category?.images?.src}&sz=w280`}
          className="object-cover rounded-md shadow-lg ring-2 ring-white"
        />
      </div>
      <form ref={ref} action={action} className="w-full">
        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
          <input name="id" type="hidden" value={categoryId} />
          <TextInput
            disabled={isPending}
            name="name"
            defaultValue={category?.name?.toString()}
            placeholder="Name Ex: Shoes, Man's Cloths ..."
            icon={Type}
            required
          />
          <TextInput
            disabled={isPending}
            name="slug"
            defaultValue={category?.slug?.toString()}
            placeholder="Slug Ex: Mans-Shoes, Mans-Cloths ..."
            icon={TextCursor}
            required
          />
          <TextInput
            disabled={isPending}
            name="order"
            defaultValue={category?.order?.toString()}
            placeholder="Order Ex: 1,2,3 default is 0 ..."
            icon={Hash}
          />
          <Select
            value={categoryIds}
            onValueChange={setCategoryIds}
            placeholder="Choose any one parent category."
          >
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </Select>
          <Button
            disabled={isPending}
            loading={isPending}
            // className="md:col-span-2"
            variant="primary"
            type="submit"
            icon={Save}
          >
            {isPending ? `Updating ...` : `Update`}
          </Button>
          <Button
            disabled={isBackPending}
            loading={isBackPending}
            // className="md:col-span-2"
            variant="primary"
            type="button"
            icon={Check}
            onClick={back}
          >
            Done - Back to Categories
          </Button>
        </div>
      </form>
    </div>
  );
}
