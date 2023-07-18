import { Title } from "@tremor/react";
import ImagesList from "./_components/images-list";
import { getWidgetImagesAndCategoryById } from "../_queries";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const { widgetImages } = await getWidgetImagesAndCategoryById(searchParams?.id);
  return searchParams.id ? (
    <div className="space-y-2">
      <Title>Related Images.</Title>
      <ImagesList images={widgetImages} categoryId={searchParams?.id} />
    </div>
  ) : null;
};

export default Page;
