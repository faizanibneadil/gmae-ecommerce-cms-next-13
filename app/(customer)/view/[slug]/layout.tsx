export const revalidate = 0;
export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
  children: React.ReactNode;
  images: React.ReactNode;
  relatedCategories: React.ReactNode;
  variants: React.ReactNode;
  relatedProducts: React.ReactNode;
}

const Layout: React.FC<Props> = ({
  params,
  children,
  images,
  relatedCategories,
  variants,
  relatedProducts,
}) => {
  return (
    <div className="max-w-6xl p-2 mx-auto mt-4 space-y-4 md:p-0">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div>{images}</div>
        <div className="col-span-2">{children}</div>
      </div>
      <div>{variants}</div>
      <div>{relatedCategories}</div>
      <div>{relatedProducts}</div>
    </div>
  );
};

export default Layout;
