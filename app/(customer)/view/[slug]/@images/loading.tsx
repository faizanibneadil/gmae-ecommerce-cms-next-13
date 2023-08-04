const Loading = () => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="w-full bg-gray-400 rounded-md h-80 animate-pulse" />
      <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
        {[...Array(5)].map((i) => (
          <div
            key={i + 20}
            className="w-full h-20 bg-gray-400 rounded-md animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
