import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="space-y-2">
      <div className="h-6 max-w-xs bg-gray-400 rounded-md animate-pulse" />
      <div className="mt-4 space-y-2">
        {[...Array(4)].map((i) => (
          <div
            key={i}
            className="grid grid-flow-row-dense grid-cols-5 grid-rows-4 bg-gray-400 rounded-lg h-14 animate-pulse md:grid-rows-1"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
