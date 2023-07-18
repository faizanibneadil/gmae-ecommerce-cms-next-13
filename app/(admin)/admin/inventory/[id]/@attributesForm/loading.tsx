import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="mt-8 space-y-2">
      <div className="h-4 max-w-sm bg-gray-400 rounded-md animate-pulse" />

      <div className="grid w-full grid-cols-1 gap-2 mt-4 md:grid-cols-5">
        <div className="h-10 bg-gray-400 rounded-md md:col-span-2 animate-pulse" />
        <div className="h-10 bg-gray-400 rounded-md md:col-span-2 animate-pulse" />
        <div className="w-full h-10 bg-gray-400 rounded-md md:w-auto animate-pulse" />
      </div>
      <div className="h-40 bg-gray-400 rounded-md md:col-span-2 animate-pulse" />
    </div>
  );
};

export default Loading;
