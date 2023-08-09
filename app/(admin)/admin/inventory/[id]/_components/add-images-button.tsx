"use client";
import { PlusIcon } from "@/app/_components/icons";
import { Icon } from "@tremor/react";
import { useParams, useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "../../../../../_components/loading-spinner";

interface Props {}

const AddImages: React.FC<Props> = () => {
  const { replace } = useRouter();
  const params = useParams();
  const [adding, addImage] = useTransition();

  const goto = () => {
    return addImage(() => {
      return replace(`/admin/inventory/${params?.id}/images`);
    });
  };

  return (
    <Icon
      onClick={goto}
      size="lg"
      className={`flex justify-center ${
        adding ? `cursor-not-allowed` : `cursor-pointer`
      }`}
      variant="shadow"
      icon={adding ? Spin : PlusIcon}
    />
  );
};

const AddImagesButton = memo(AddImages);
export default AddImagesButton;
