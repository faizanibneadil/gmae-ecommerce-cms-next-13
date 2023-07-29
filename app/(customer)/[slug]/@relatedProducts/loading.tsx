const Loading = () => {
  return (
    <div className="space-y-2">
      {/* <div className="h-6 max-w-xs bg-gray-400 rounded-md animate-pulse" /> */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {[...Array(6)].map((i) => (
          <div key={i + 5} className="flex flex-col space-y-2">
            <div className="w-full h-40 bg-gray-400 rounded-md animate-pulse" />
            <div className="h-2 max-w-[10rem] bg-gray-400 rounded-md animate-pulse" />
            <div className="h-2 max-w-xs bg-gray-400 rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
