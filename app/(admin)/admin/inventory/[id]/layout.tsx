import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  images: ReactNode;
  attributesForm: ReactNode;
  imagesGadget: ReactNode;
  variants: ReactNode;
  relatedProducts: ReactNode;
}

const Layout = ({
  children,
  attributesForm,
  images,
  imagesGadget,
  relatedProducts,
  variants,
}: Props) => {
  return (
    <div className="max-w-3xl mx-auto">
      {imagesGadget}
      {images}
      {children}
      {attributesForm}
      {variants}
      {relatedProducts}
    </div>
  );
};

export default Layout;
