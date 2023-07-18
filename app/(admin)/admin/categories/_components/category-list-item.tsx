import { Button, Icon, ListItem } from "@tremor/react";
import { Trash, Unplug } from "lucide-react";
import Image from "next/image";
import EditButton from "./edit-button";
import DisconnectButton from "./disconnect-button";

interface Props {
  category: {
    id: string;
    slug: string | null;
    name: string | null;
    order: number | null;
    images: {
      id: string;
      src: string | null;
    } | null;
  } | null;
  isSubCategory: boolean;
  categoryId: string | undefined;
  subCategoryId?: string | undefined;
}

export default function CategoryListItem({
  category,
  isSubCategory,
  categoryId,
  subCategoryId,
}: Props) {
  return (
    <ListItem>
      <span className="flex items-center space-x-2">
        <Image
          className="w-8 h-8 mr-4 rounded-full"
          width={30}
          height={30}
          alt=""
          src={`https://drive.google.com/thumbnail?id=${category?.images?.src}&sz=w120`}
        />
        <span className="truncate">
          {category?.order} {category?.name}
        </span>
      </span>
      <span className="flex items-center space-x-2">
        {isSubCategory && (
          <DisconnectButton
            categoryId={categoryId}
            subCategoryId={subCategoryId}
          />
        )}
        <Button size="xs" icon={Trash} variant="primary" className="pr-0" />
        <EditButton categoryId={category?.id} />
      </span>
    </ListItem>
  );
}
