const Loading = () => {
  return (
    <div className="flex flex-col space-y-2">
      {/* title  */}
      <div className="h-6 max-w-full bg-gray-400 rounded-md animate-pulse" />
      <div className="h-6 max-w-full bg-gray-400 rounded-md animate-pulse" />
      <div className="h-6 max-w-full bg-gray-400 rounded-md animate-pulse" />
      {/* descriptio  */}
      <div className="h-2 max-w-sm bg-gray-400 rounded-md animate-pulse" />
      <div className="h-2 max-w-md bg-gray-400 rounded-md animate-pulse" />
      <div className="h-2 max-w-lg bg-gray-400 rounded-md animate-pulse" />
      <div className="h-2 max-w-sm bg-gray-400 rounded-md animate-pulse" />
      <div className="h-2 max-w-md bg-gray-400 rounded-md animate-pulse" />
      <div className="h-2 max-w-lg bg-gray-400 rounded-md animate-pulse" />
      <div className="h-2 max-w-sm bg-gray-400 rounded-md animate-pulse" />
      <div className="h-2 max-w-md bg-gray-400 rounded-md animate-pulse" />
      <div className="h-2 max-w-lg bg-gray-400 rounded-md animate-pulse" />

      {/* actions  */}
      <div className="max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full h-10 bg-gray-400 rounded-md animate-pulse" />
          <div className="w-full h-10 bg-gray-400 rounded-md animate-pulse" />
          <div className="w-full h-10 bg-gray-400 rounded-md animate-pulse" />
          <div className="w-full h-10 bg-gray-400 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
