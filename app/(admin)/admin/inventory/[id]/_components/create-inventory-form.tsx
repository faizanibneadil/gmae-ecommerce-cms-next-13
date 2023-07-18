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
import { FC, memo, useState, useTransition } from "react";
import { createProductAction } from "@/_actions";
import { Products } from "@prisma/client";

interface Props {
  id: string;
  categories: {
    id: string;
    name: string | null;
  }[];
  product: Products & {
    Categories: {
      id: string;
    }[];
  };
}

const CreateInventoryForm: FC<Props> = ({ id, categories, product }) => {
  const [isPending, startTransition] = useTransition();
  const [productCategories, setCategories] = useState<string[]>(
    product.Categories.map((c) => c.id)
  );
  const [isTrackStock, setIsTrackStock] = useState<boolean>(
    Boolean(product.isTrackStock)
  );
  const [isReviewEnable, setIsReviewEnable] = useState<boolean>(
    Boolean(product.isReviewEnable)
  );
  const [isPublished, setIsPublished] = useState<boolean>(
    Boolean(product.isPublished)
  );

  // Server Action
  const action = (formData: FormData) => {
    formData.append("categories", `${productCategories}`);
    startTransition(() => createProductAction(formData));
  };

  return (
    <form action={action}>
      <Title>Add Product Properties.</Title>

      <input name="id" type="hidden" value={id} />
      <div className="mt-2 space-y-2">
        <TextInput
          name="title"
          defaultValue={product.title?.toString()}
          placeholder="Product title"
          required
        />
        <TextInput
          name="slug"
          defaultValue={product.slug?.toString()}
          placeholder="Product slug"
          required
        />
        <TextareaAutosize
          name="description"
          placeholder="Product Description"
          minRows={4}
          defaultValue={product.description?.toString()}
          className="w-full text-sm p-2 border resize-none rounded-md shadow border-[#f1f2f4]"
        />
        <div className="grid content-center grid-cols-1 gap-2 md:grid-cols-3">
          <TextInput
            name="regularPrice"
            placeholder="Regular Price"
            defaultValue={product.regularPrice?.toString()}
            required
          />
          <TextInput
            defaultValue={product.salePrice?.toString()}
            name="salePrice"
            placeholder="Sale Price"
            required
          />
          <TextInput
            defaultValue={product.purchasePrice?.toString()}
            name="purchasePrice"
            placeholder="Purchase Price"
          />
          <TextInput
            name="purchaseLimit"
            placeholder="Purchase Limit Quantity"
            defaultValue={product.purchaseLimit?.toString()}
          />
          <TextInput
            defaultValue={product.stock?.toString()}
            name="stock"
            placeholder="Stock Quantity"
          />
          <MultiSelect
            placeholder="Select Categories"
            value={productCategories}
            onValueChange={setCategories}
          >
            {categories.map((category) => (
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
