"use client";
import {
  Button,
  MultiSelect,
  MultiSelectItem,
  TextInput,
  Title,
} from "@tremor/react";
import { Save } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { FC, cache, memo, useState, useTransition } from "react";
import { createProductAction } from "@/_actions";
import { Products } from "@prisma/client";

type TCategory = { id: string; name: string | null };
type TProperty = { Categories: { id: TCategory["id"] }[] } & Products;
type TProperties = TProperty | null;

interface Props {
  props: {
    productId: string;
    categories: TCategory[];
    properties: TProperties;
  };
}

const CreateInventoryForm: FC<Props> = ({ props }) => {
  // data variants
  const cIds = props?.properties?.Categories.map((c) => c.id);
  const pub = Boolean(props?.properties?.isPublished);
  const review = Boolean(props?.properties?.isReviewEnable);
  const tStock = Boolean(props?.properties?.isTrackStock);
  const feat = Boolean(props?.properties?.isFeatured);

  // state
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<string[] | undefined>(cIds);
  const [isTrackStock, setIsTrackStock] = useState<boolean>(tStock);
  const [isReviewEnable, setIsReviewEnable] = useState<boolean>(review);
  const [isPublished, setIsPublished] = useState<boolean>(pub);
  const [isFeatured, setIsFeatured] = useState<boolean>(feat);

  // Server Action
  const action = (formData: FormData) => {
    formData.append("categories", `${categories}`);
    startTransition(() => createProductAction(formData));
  };

  return (
    <form action={action}>
      <input name="id" type="hidden" value={props.productId} />
      <div className="mt-2 space-y-2">
        <TextInput
          name="title"
          defaultValue={props?.properties?.title?.toString()}
          placeholder="Product title"
          required
        />
        <TextInput
          name="slug"
          defaultValue={props?.properties?.slug?.toString()}
          placeholder="Product slug"
          required
        />
        <TextareaAutosize
          name="description"
          placeholder="Product Description"
          minRows={4}
          defaultValue={props?.properties?.description?.toString()}
          className="w-full text-sm p-2 border resize-none rounded-md shadow border-[#f1f2f4]"
        />
        <div className="grid content-center grid-cols-1 gap-2 md:grid-cols-3">
          <TextInput
            name="regularPrice"
            placeholder="Regular Price"
            defaultValue={props?.properties?.regularPrice?.toString()}
            required
          />
          <TextInput
            defaultValue={props?.properties?.salePrice?.toString()}
            name="salePrice"
            placeholder="Sale Price"
            required
          />
          <TextInput
            defaultValue={props?.properties?.purchasePrice?.toString()}
            name="purchasePrice"
            placeholder="Purchase Price"
          />
          <TextInput
            name="purchaseLimit"
            placeholder="Purchase Limit Quantity"
            defaultValue={props?.properties?.purchaseLimit?.toString()}
          />
          <TextInput
            defaultValue={props?.properties?.stock?.toString()}
            name="stock"
            placeholder="Stock Quantity"
          />
          <MultiSelect
            placeholder="Select Categories"
            value={categories}
            onValueChange={setCategories}
          >
            {props.categories.map((category) => (
              <MultiSelectItem key={category.id} value={category.id}>
                {category.name}
              </MultiSelectItem>
            ))}
          </MultiSelect>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isTrackStock"
              className="sr-only peer"
              onChange={(e) => setIsTrackStock(e.target.checked)}
              checked={isTrackStock}
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              Track Stock
            </span>
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isReviewEnable"
              className="sr-only peer"
              onChange={(e) => setIsReviewEnable(e.target.checked)}
              checked={isReviewEnable}
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              Enable Reviews
            </span>
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              className="sr-only peer"
              onChange={(e) => setIsPublished(e.target.checked)}
              checked={isPublished}
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              Publish
            </span>
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              className="sr-only peer"
              onChange={(e) => setIsFeatured(e.target.checked)}
              checked={isFeatured}
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              Featured
            </span>
          </label>
        </div>
      </div>
      <Button
        disabled={isPending}
        loading={isPending}
        type="submit"
        icon={Save}
        className="w-full mt-4"
      >
        {isPending ? `Updating ...` : `Update`}
      </Button>
    </form>
  );
};

export default memo(CreateInventoryForm);
