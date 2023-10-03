const Loading = () => {
  return (
    <div>
      <div className="flex flex-col w-full gap-2 mt-4">
        <div className="h-10 bg-gray-400 rounded-md animate-pulse" />
        <div className="h-10 bg-gray-400 rounded-md animate-pulse" />
        <div className="h-10 bg-gray-400 rounded-md animate-pulse" />
        <div className="h-10 bg-gray-400 rounded-md animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
