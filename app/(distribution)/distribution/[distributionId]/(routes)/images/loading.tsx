const Loading = () => {
  return (
    <div className="gap-y-2 gap-x-2 columns-4 md:columns-8">
      {[...Array(20)].map((i) => (
        <div
          key={i}
          style={{
            height: `${Math.floor(Math.random() * (8 - 10 + 1)) + 10}rem`,
          }}
          className="w-full bg-gray-400 rounded-md shadow-lg animate-pulse ring-2 ring-white"
        />
      ))}
    </div>
  );
};

export default Loading;
