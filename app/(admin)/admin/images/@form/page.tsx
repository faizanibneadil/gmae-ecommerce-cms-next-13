import { Button, TextInput } from "@tremor/react";
import { Image } from "lucide-react";
import React from "react";
import CreateImageForm from "./_components/create-image-form";
import { getImageById } from "./_queries";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ searchParams }: Props) => {
  const image = await getImageById(searchParams.id);
  return <CreateImageForm id={searchParams?.id} image={image} />;
};

export default Page;
