import { FC, memo } from "react";
import EditButton from "./edit-button";
import ProductImagesList from "./products-images-list";

interface Props {
  products: {
    id: string;
    title: string | null;
    images: {
      id: string;
      src: string | null;
    }[];
  }[];
}

const ProductList: FC<Props> = ({ products }) => {
  return (
    <div className="mt-4 space-y-2">
      {products?.map((product) => (
        <div
          key={product.id}
          className="grid grid-flow-row-dense grid-cols-5 grid-rows-4 p-2 border border-gray-100 rounded-lg shadow-md cursor-pointer hover:shadow-lg md:grid-rows-1"
        >
          <ProductImagesList images={product.images} />
          <div className="self-start col-span-4 row-span-3 line-clamp-1 md:self-center md:col-span-3 md:row-span-1">
            {product.title}
          </div>
          <div className="self-center col-span-4 row-span-1 md:col-span-1 md:row-span-1 md:justify-self-end">
            <EditButton id={product.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ProductList);
