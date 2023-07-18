import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  images: ReactNode;
  attributesForm: ReactNode;
  imagesGadget: ReactNode;
}

const Layout = ({
  children,
  attributesForm,
  images,
  imagesGadget,
}: Props) => {
  return (
    <div className="max-w-3xl mx-auto">
      {imagesGadget}
      {images}
      {children}
      {attributesForm}
    </div>
  );
};

export default Layout;
