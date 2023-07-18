import React from "react";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = (props: Props) => {
  return (
    <div className="space-y-2">
      <div className="h-6 max-w-xs bg-gray-400 rounded-md animate-pulse" />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {[...Array(3)].map((i) => (
          <div key={i + 5} className="flex flex-col col-span-2 space-y-2">
            <div className="w-full h-40 bg-gray-400 rounded-md animate-pulse" />
            <div className="h-2 max-w-[10rem] bg-gray-400 rounded-md animate-pulse" />
            <div className="h-2 max-w-xs bg-gray-400 rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
