const Layout: React.FC<{
  params: { slug: string };
  children: React.ReactNode;
  images: React.ReactNode;
  // relatedCategories: React.ReactNode;
  variants: React.ReactNode;
  // relatedProducts: React.ReactNode;
  content: React.ReactNode;
  actions: React.ReactNode;
}> = ({
  params,
  children,
  images,
  content,
  actions,
  // relatedCategories,
  variants,
  // relatedProducts,
}) => {
  return (
    <div className="h-screen">
      <div className="bg-[#F1F5F9] h-1/4 relative">
        <div className="flex items-center justify-center w-full h-full">
          <div className="absolute mx-auto rounded-md w-60 h-60 -bottom-28">
            {images}
          </div>
        </div>
      </div>

      <div className="max-w-4xl p-2 mx-auto mt-44">
        <div className="flex flex-col justify-between md:flex-row gap-x-2 gap-y-2">
          <div className="w-full md:w-3/4">
            {content}
            {variants}
          </div>
          <div className="w-full md:w-1/4">{actions}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

// // <div className="max-w-6xl p-2 mx-auto mt-4 space-y-4 md:p-0">
//       {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
//         <div className="col-span-2">{images}</div>
//         <div className="col-span-4">{children}</div>
//       </div>
//       <div className="">{content}</div> */}
//       {/* <div>{variants}</div> */}
//       {/* <div>{relatedCategories}</div> */}
//       {/* <div>{relatedProducts}</div> */}
//     // </div>
