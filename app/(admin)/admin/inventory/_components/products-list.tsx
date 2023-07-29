import { FC, memo } from "react";
import EditButton from "./edit-button";
import ProductImagesList from "./products-images-list";
import { Button } from "@tremor/react";
import ConnectVariantButton from "./connect-variant-button";

interface Props {
  products: {
    id: string;
    title: string | null;
    images: {
      id: string;
      src: string | null;
    }[];
  }[];
  showAsRelatedProductForInventoryForm?: boolean;
  showAsVariantsForInventoryForm?: boolean;
  productId?: string;
}

const ProductList: FC<Props> = ({
  products,
  showAsRelatedProductForInventoryForm,
  showAsVariantsForInventoryForm,
  productId,
}) => {
  return (
    <div className="mt-4 space-y-2">
      {products?.map((product) => (
        <div
          key={product.id}
          className="grid w-full grid-cols-1 border border-gray-100 rounded-lg shadow-md cursor-pointer hover:shadow-lg md:grid-cols-5"
        >
          <ProductImagesList images={product.images} />
          <div className="self-center col-span-4 line-clamp-1 md:col-span-3">
            {product.title}
          </div>
          <div className="items-stretch self-center col-span-1">
            <div className="grid h-10 grid-flow-col justify-stretch justify-items-stretch content-stretch">
              {showAsRelatedProductForInventoryForm ? (
                <ConnectVariantButton
                  productId={productId}
                  variantId={product.id}
                />
              ) : showAsVariantsForInventoryForm ? (
                <Button>Disconnect</Button>
              ) : (
                <EditButton id={product.id} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ProductList);
