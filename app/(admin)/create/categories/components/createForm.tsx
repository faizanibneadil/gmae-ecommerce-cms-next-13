"use client";
import { CldUploadButton } from "next-cloudinary";
import { useState, useTransition } from "react";
import { createCategoryAction } from "../../../../../_actions";
import { UploadCloud } from "lucide-react";
import { Categories } from "@prisma/client";
import Image from "next/image";
import {
  Button,
  Card,
  Flex,
  SelectBox,
  SelectBoxItem,
  Text,
  TextInput,
} from "@tremor/react";
export default function CreateCategoryForm({
  userId,
  categories,
}: {
  userId?: string;
  categories: Categories[];
}) {
  const [image, setImage] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  async function action(data: FormData) {
    const name = data.get("name");
    const image = data.get("image");
    const categoryId = data.get("categoryId");
    const payload = { name, image, userId, categoryId };
    startTransition(async () => await createCategoryAction(payload));
  }
  return (
    <>
      <form action={action} className="space-y-6">
        <Card decorationColor="indigo" decoration="top" className="space-y-2">
          <Text className="mb-2">Add Category.</Text>
          {image ? (
            <Image
              width={1000}
              height={1000}
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
              onUpload={(data: any) => setImage(data.info.secure_url)}
            >
              <Card
                decoration="left"
                decorationColor="indigo"
                className="text-center text-slate-400"
              >
                <UploadCloud className="w-5 h-5" />
              </Card>
            </CldUploadButton>
          )}
          <input name="image" type="hidden" value={`${image}`} />

          <TextInput name="name" placeholder="Ex: Accessories" />
          <input name="categoryId" type="hidden" value={`${categoryId}`} />
          <SelectBox value={categoryId} onValueChange={setCategoryId}>
            {categories.map((category) => (
              <SelectBoxItem key={category.id} value={category.id} text={`${category?.name}`} />
            ))}
          </SelectBox>
          <footer>
            <Flex justifyContent="end" className="space-x-2">
              <Button type="reset" size="xs" variant="secondary">
                Discard
              </Button>

              <Button
                loading={isPending}
                disabled={isPending}
                type="submit"
                size="xs"
                variant="primary"
              >
                Save
              </Button>
            </Flex>
          </footer>
        </Card>
      </form>
    </>
  );
}