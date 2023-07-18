import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="space-y-2">
      <div className="h-4 max-w-sm bg-gray-400 rounded-md animate-pulse" />

      <div className="flex items-center mr-2 -space-x-2">
        {[...Array(3)].map((i) => (
          <div key={i} className="relative w-10 h-10 md:w-20 md:h-20">
            <div className="w-10 h-10 bg-gray-400 rounded-full shadow-lg md:w-20 md:h-20 animate-pulse ring-2 ring-white" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
