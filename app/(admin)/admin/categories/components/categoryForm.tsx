"use client";

import {
  useGetAllCategoriesQuery,
  useSaveCategoryMutation,
} from "@/store/apis";
import { Categories } from "@prisma/client";
import { Button, Select, SelectItem, Text, TextInput } from "@tremor/react";
import { Form, Formik } from "formik";
import { Image as ImageIcon, Save } from "lucide-react";
import { TextCursor } from "lucide-react";
import * as yup from "yup";
import Image from "next/image";
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";

export default function CategoryForm({ data }: { data?: any }) {
  const imageLoader = ({ src }: { src: string }) => {
    return `https://drive.google.com/uc?id=${src}`;
  };
  const query: any = useGetAllCategoriesQuery();
  const [saveCategory, res] = useSaveCategoryMutation();
  return (
    <Formik
      initialValues={{
        id: data?.id ?? "616c048d746602001fb86ec3",
        image: data?.image ?? "",
        name: data?.name ?? "",
        categoryId: data?.parentCategoryId ?? "",
      }}
      validationSchema={yup.object({
        id: yup.string().default("616c048d746602001fb86ec3"),
        image: yup.string().required("Category Image is Required."),
        name: yup.string().required("Category Name is Required."),
        categoryId: yup.string().notRequired(),
      })}
      onSubmit={(values, actions) => {
        saveCategory(values)
        actions.setSubmitting(false)
        revalidatePath("/admin/categories")
        redirect("/admin/categories")
      }}
    >
      {({ isSubmitting, setFieldValue, errors, values }) => (
        <Form className="space-y-2">
          {values.image && (
            <Image
              key={values.image}
              loader={imageLoader}
              className="w-10 h-10 rounded-full"
              width={30}
              height={30}
              alt=""
              src={values.image}
              loading="lazy"
            />
          )}
          <TextInput
            name="image"
            placeholder="Paste hare image id that is uploaded on Google Drive ..."
            icon={ImageIcon}
            error={!!errors.image}
            errorMessage={errors.image?.toString()}
            value={values.image}
            onChange={(e) => setFieldValue("image", e.target.value)}
          />
          <TextInput
            name="name"
            placeholder="Category Name Ex: Shoes, Man's Cloths ..."
            icon={TextCursor}
            error={!!errors.name}
            errorMessage={errors.name?.toString()}
            value={values.name}
            onChange={(e) => setFieldValue("name", e.target.value)}
          />
          <Text>Select Parent Category.</Text>
          {query?.isLoading || query.isFetching ? (
            <Button
              disabled
              loading={query?.isLoading || query.isFetching}
              className="w-full"
            ></Button>
          ) : (
            <Select
              onValueChange={(value) => setFieldValue("categoryId", value)}
              defaultValue={values.categoryId}
            >
              <SelectItem value="disconnect">Disconnect</SelectItem>
              {query?.data?.categories?.map((category: Categories) => (
                <SelectItem key={category.id} value={category.id}>
                  {category?.name}
                </SelectItem>
              ))}
            </Select>
          )}
          <Button loading={isSubmitting} icon={Save} variant="primary" type="submit">
            Save Product
          </Button>
        </Form>
      )}
    </Formik>
  );
}
