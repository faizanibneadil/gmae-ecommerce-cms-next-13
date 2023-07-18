import { ReactNode } from "react";

interface Props {
  params: { slug: string };
  children: ReactNode;
  reviews: ReactNode;
  relatedProducts: ReactNode;
  videos: ReactNode;
  images: ReactNode;
  attributes: ReactNode;
  relatedCategories: ReactNode;
  variants: ReactNode;
}

const Layout = ({
  params,
  attributes,
  children,
  images,
  relatedCategories,
  relatedProducts,
  reviews,
  videos,
  variants,
}: Props) => {
  return (
    <div className="max-w-6xl p-2 mx-auto mt-4 space-y-4 md:p-0">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div>{images}</div>
        <div className="col-span-2">{children}</div>
      </div>
      <div>{attributes}</div>
      <div>{variants}</div>
      <div>{relatedCategories}</div>
      <div>{relatedProducts}</div>
      <div>{videos}</div>
      <div>{reviews}</div>
    </div>
  );
};

export default Layout;
