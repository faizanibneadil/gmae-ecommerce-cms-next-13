"use client";
import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { ReactNode, useState, useTransition } from "react";
import { createCategoryAction } from "../_actions";
import { CheckIcon, ChevronDownIcon, Save, UploadCloud } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { ChevronUpIcon } from "lucide-react";
import { Categories } from "@prisma/client";
export default function CreateCategoryForm({
  userId,
  categories,
}: {
  userId?: string;
  categories: Categories[];
}) {
  const [image, setImage] = useState<string>("");
  const [categorieId, setCategorieId] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  async function action(data: FormData) {
    const name = data.get("name");
    const image = data.get("image");
    const categoryId = data.get("categoryId");
    const payload = { name, image, userId, categoryId };
    startTransition(async () => await createCategoryAction(payload));
  }
  return (
    <li className="py-3 sm:py-4">
      <form
        action={action}
        className="flex flex-col items-center space-x-4 space-y-4 md:space-y-0 md:flex-row"
      >
        <div className="flex-shrink-0">
          {image ? (
            <CldImage
              width={12}
              height={12}
              className="w-12 h-12 rounded-full"
              src={`${image}`}
              alt="image"
            />
          ) : (
            <CldUploadButton
              options={{
                clientAllowedFormats: ["jpg", "webp"],
                maxFiles: 1,
                multiple: false,
                showCompletedButton: true,
                showPoweredBy: false,
                showUploadMoreButton: false,
                singleUploadAutoClose: true,
              }}
              uploadPreset="ml_default"
              onUpload={(data: any) => setImage(data.info.public_id)}
            >
              <div className="shadow-lg btn btn-circle btn-outline">
                <UploadCloud className="w-5 h-5" />
              </div>
            </CldUploadButton>
          )}
          <input name="image" type="hidden" value={`${image}`} />
        </div>
        <div className="flex-1 min-w-0 form-control">
          <input
            name="name"
            type="text"
            placeholder="Create one."
            className="w-full input"
          />
        </div>
        <div>
          <input name="categoryId" type="hidden" value={`${categorieId}`} />
          <Select.Root onValueChange={(value: string) => setCategorieId(value)}>
            <Select.Trigger
              className="inline-flex items-center  gap-[5px]  input"
              aria-label="Food"
            >
              <Select.Value placeholder="Select a parent category ..." />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden rounded-md bg-base-300 ">
                <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-base-300 cursor-default">
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-[5px]">
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                  <ChevronDownIcon />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        <button
          disabled={isPending}
          className={`btn gap-2 ${isPending && `loading`}`}
          type="submit"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </form>
    </li>
  );
}

const SelectItem = ({
  children,
  ...props
}: {
  children: ReactNode;
  value: string;
}) => {
  return (
    <Select.Item
      {...props}
      className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};
