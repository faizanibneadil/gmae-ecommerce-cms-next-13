import CreateAttributeForm from "./_components/create-attribute-form";
import DeleteAttribute from "./_components/delete-attribute";
import { Badge } from "@/components/ui/badge";
import { _getAttributesOfProduct } from "@/queries";

interface Props {
  params: { inventoryId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const attributes = await _getAttributesOfProduct({
    productId: params.inventoryId,
  });
  return (
    <div className="flex flex-col space-y-2 ">
      <div className="flex flex-row flex-wrap gap-y-1 gap-x-1">
        {attributes?.map((attribute) => (
          <Badge
            key={attribute.id}
            variant="outline"
            className="flex items-center space-x-1 px-0.5"
          >
            <Badge variant="secondary">{attribute.name}</Badge>
            <Badge variant="secondary">{attribute.value}</Badge>
            <Badge className="px-0.5" variant="destructive">
              <DeleteAttribute attributeId={attribute.id} />
            </Badge>
          </Badge>
        ))}
      </div>

      <CreateAttributeForm />
    </div>
  );
};
export default Page;
