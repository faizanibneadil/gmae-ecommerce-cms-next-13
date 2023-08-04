"use client";
import { createCategoryAction } from "@/_actions";
import {
  Button,
  Select,
  SelectItem,
  TextInput,
  NumberInput,
} from "@tremor/react";
import { useRef, useState, useTransition } from "react";
import { Check, Hash, Save, TextCursor, Type } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type TCategories = {
  id: string;
  name: string | null;
  isPublished: boolean | null;
  displayOnLandingPage: boolean | null;
  order: number | null;
  slug: string | null;
  images: {
    id: string;
    src: string | null;
  } | null;
  parentCategory: {
    id: string;
    name: string | null;
  } | null;
};

interface Props {
  categories: TCategories[];
  editCategoryId?: string;
}

const CategoryForm: React.FC<Props> = ({ editCategoryId, categories }) => {
  const category = categories.find((c) => c.id === editCategoryId);
  const ref = useRef<HTMLFormElement>(null);

  const [categoryIds, setCategoryIds] = useState(
    category?.parentCategory?.id.toString()
  );
  const [isPending, startTransition] = useTransition();
  const [isPublish, setIsPublished] = useState(category?.isPublished);
  const [isLandingPage, setIsLandingPage] = useState(
    category?.displayOnLandingPage
  );
  const [errors, setErrors] = useState<any>();

  // server action
  const action = async (formData: FormData) => {
    formData.append("categoryId", `${categoryIds}`);
    startTransition(async () => {
      const res = await createCategoryAction(formData);
      setErrors(res?.error);
    });
  };

  // component
  return (
    <form ref={ref} action={action} className="flex flex-col w-full space-y-2">
      <input name="id" type="hidden" value={editCategoryId} />
      {category?.images && (
        <div className="relative w-20 h-10 cursor-pointer group md:w-40 md:h-32">
          <Image
            alt=""
            fill
            sizes="100vw"
            src={`https://drive.google.com/thumbnail?id=${category?.images?.src}&sz=w280`}
            className="object-cover rounded-md shadow-lg ring-2 ring-white"
          />
        </div>
      )}
      <TextInput
        disabled={isPending}
        name="name"
        defaultValue={category?.name?.toString()}
        placeholder="Name Ex: Shoes, Man's Cloths ..."
        icon={Type}
        error={!!errors?.name?._errors?.length}
        errorMessage={errors?.name?._errors?.join(",")}
        required
      />
      <TextInput
        disabled={isPending}
        name="slug"
        defaultValue={category?.slug?.toString()}
        placeholder="Slug Ex: Mans-Shoes, Mans-Cloths ..."
        icon={TextCursor}
        error={!!errors?.slug?._errors?.length}
        errorMessage={errors?.slug?._errors?.join(",")}
        required
      />
      <TextInput
        disabled={isPending}
        name="order"
        defaultValue={category?.order?.toString()}
        placeholder="Order Ex: 1,2,3 default is 0 ..."
        icon={Hash}
        error={!!errors?.order?._errors?.length}
        errorMessage={errors?.order?._errors?.join(",")}
      />
      <Select
        enableClear
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
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name="isPublished"
          className="sr-only peer"
          onChange={(e) => setIsPublished(e.target.checked)}
          checked={isPublish?.valueOf()}
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900">Publish</span>
      </label>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name="displayOnLandingPage"
          className="sr-only peer"
          onChange={(e) => setIsLandingPage(e.target.checked)}
          checked={isLandingPage?.valueOf()}
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900">
          Display On Landing Page
        </span>
      </label>
      <Button
        disabled={isPending}
        loading={isPending}
        variant="primary"
        type="submit"
        icon={Save}
      >
        {isPending ? `Updating ...` : `Update`}
      </Button>
    </form>
  );
};

export default CategoryForm;
