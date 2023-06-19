// @ts-nocheck
"use client";

import MarkdownIt from "markdown-it";
import TextareaAutosize from "react-textarea-autosize";
import { TextCursor, Text as TextIcon, Hash, Save } from "lucide-react";
import { Formik, Form, Field, FieldArray } from "formik";
import { useGetAllCategoriesQuery, useSaveProductMutation } from "@/store/apis";
import { Categories } from "@prisma/client";
import { createProductSchema, productFormInitialValues } from "@/schema";
import ImagesForm from "./imagesForm";
import AttributesForm from "./attributesForm";
import { useRouter } from "next/navigation";
import { slug } from "github-slugger";
import {
  TextInput,
  AccordionList,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Grid,
  Col,
  Text,
  Button,
  Select,
  SelectItem,
} from "@tremor/react";
import { createProductAction } from "@/_actions";

const MyEditor = ({ field, form, ...props }: any) => {
  return (
    <TextareaAutosize
      {...field}
      {...props}
      placeholder={`Product Description ... \nProduct detailed description ... \nFeature: bla, bla ... \nColors: bla, bla ... \n\n\n\n\n\n`}
      className="w-full p-2 overflow-hidden text-sm bg-transparent rounded appearance-none resize-none b focus:outline-none focus:ring-0 placeholder:text-gray-500"
    />
  );
};

export default function ProductForm({ data }: { data?: any }) {
  const router = useRouter();
  const mdParser = new MarkdownIt({
    typographer: true,
    breaks: true,
    linkify: true,
    xhtmlOut: true,
  });
  const query: any = useGetAllCategoriesQuery();
  const [saveProduct, res] = useSaveProductMutation();
  return (
    <Formik
      enableReinitialize={true}
      validationSchema={createProductSchema}
      initialValues={data ?? productFormInitialValues}
      onSubmit={(values, actions) => createProductAction(values)}
    >
      {({ isSubmitting, errors, setFieldValue, values }) => (
        <Form className="space-y-2">
          <FieldArray
            name="images"
            render={(actions) => (
              <ImagesForm images={values.images} actions={actions} />
            )}
          />

          <TextInput
            name="title"
            placeholder="Product Title ..."
            icon={TextIcon}
            error={!!errors.title}
            errorMessage={errors.title?.toString()}
            value={values.title}
            onChange={(e) => {
              setFieldValue("title", e.target.value);
              setFieldValue("slug", slug(e.target.value));
            }}
          />
          <TextInput
            name="slug"
            placeholder="Product slug ..."
            icon={TextCursor}
            error={!!errors.slug}
            errorMessage={errors.slug?.toString()}
            value={values.slug}
            onChange={(e) => setFieldValue("slug", slug(e.target.value))}
          />

          <AccordionList>
            <Accordion>
              <AccordionHeader>Description</AccordionHeader>
              <AccordionBody className="p-0 m-0">
                <Field name="description" component={MyEditor} />
              </AccordionBody>
            </Accordion>
            <Accordion>
              <AccordionHeader>Preview</AccordionHeader>
              <AccordionBody>
                <div
                  className="w-full prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: mdParser.render(values.description),
                  }}
                />
              </AccordionBody>
            </Accordion>
            <Accordion>
              <AccordionHeader>Editor help</AccordionHeader>
              <AccordionBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus tempor lorem non est congue blandit. Praesent non
                lorem sodales, suscipit est sed, hendrerit dolor.
              </AccordionBody>
            </Accordion>
          </AccordionList>

          <Grid numItems={1} numItemsMd={3} className="gap-2">
            <Col>
              <Text>Regular Price.</Text>
              <TextInput
                name="regularPrice"
                placeholder="Regular Price Ex: 1200/"
                icon={Hash}
                error={!!errors.regularPrice}
                errorMessage={errors.regularPrice?.toString()}
                value={`${values.regularPrice}`}
                onChange={(e) =>
                  setFieldValue("regularPrice", Number(e.target.value))
                }
              />
            </Col>
            <Col>
              <Text>Stock.</Text>
              <TextInput
                name="stock"
                placeholder="stock"
                icon={Hash}
                error={!!errors.stock}
                errorMessage={errors.stock?.toString()}
                value={`${values.stock}`}
                onChange={(e) => setFieldValue("stock", Number(e.target.value))}
              />
            </Col>
            <Col>
              <Text>Sale Price.</Text>
              <TextInput
                name="salePrice"
                placeholder="Sale Price Ex: 1100/"
                icon={Hash}
                error={!!errors.salePrice}
                errorMessage={errors.salePrice?.toString()}
                value={`${values.salePrice}`}
                onChange={(e) =>
                  setFieldValue("salePrice", Number(e.target.value))
                }
              />
            </Col>
            <Col>
              <Text>Purchase Price.</Text>
              <TextInput
                name="purchasePrice"
                placeholder="Purchase Price Ex: 1000/"
                icon={Hash}
                error={!!errors.purchasePrice}
                errorMessage={errors.purchasePrice?.toString()}
                value={`${values.purchasePrice}`}
                onChange={(e) =>
                  setFieldValue("purchasePrice", Number(e.target.value))
                }
              />
            </Col>
            <Col>
              <Text>Select Category.</Text>
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
                  {query?.data?.categories?.map((category: Categories) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category?.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </Col>
            <Col>
              <Text>Sold individually.</Text>
              <Select
                color="zinc"
                defaultValue={values.purchaseLimit.toString()}
                onValueChange={(value: any) =>
                  setFieldValue("purchaseLimit", value === "true")
                }
              >
                <SelectItem value="true">ON</SelectItem>
                <SelectItem value="false">OFF</SelectItem>
              </Select>
              <Text className="text-xs">{`(Limit purchases to 1 item per order)`}</Text>
            </Col>
            <Col>
              <Text>Track stock quantity for this product.</Text>
              <Select
                color="orange"
                defaultValue="false"
                value={values.isTrackStock.toString()}
                onValueChange={(value: any) =>
                  setFieldValue("isTrackStock", value === "true")
                }
              >
                <SelectItem value="true">ON</SelectItem>
                <SelectItem value="false">OFF</SelectItem>
              </Select>
            </Col>
            <Col>
              <Text>Enable Reviews.</Text>
              <Select
                color="orange"
                defaultValue="false"
                value={values.isReviewEnable.toString()}
                onValueChange={(value: any) =>
                  setFieldValue("isReviewEnable", value === "true")
                }
              >
                <SelectItem value="true">ON</SelectItem>
                <SelectItem value="false">OFF</SelectItem>
              </Select>
            </Col>
            <Col>
              <Text>Visibility.</Text>
              <Select
                color="orange"
                defaultValue="false"
                value={values.visibility.toString()}
                onValueChange={(value: any) =>
                  setFieldValue("visibility", value === "true")
                }
              >
                <SelectItem value="true">ON</SelectItem>
                <SelectItem value="false">OFF</SelectItem>
              </Select>
            </Col>
          </Grid>
          <FieldArray
            name="attributes"
            render={(actions) => (
              <AttributesForm
                attributes={values.attributes}
                actions={actions}
              />
            )}
          />
          <Button
            disabled={isSubmitting}
            loading={isSubmitting}
            icon={Save}
            variant="primary"
            type="submit"
          >
            Save Product
          </Button>
        </Form>
      )}
    </Formik>
  );
}
