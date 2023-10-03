export default function Loading() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-2">
        <div className="w-full h-10 col-span-9 bg-gray-400 rounded-md animate-pulse"></div>
        <div className="w-full h-10 col-span-1 bg-gray-400 rounded-md animate-pulse"></div>
        <div className="w-full h-10 col-span-2 bg-gray-400 rounded-md animate-pulse"></div>
      </div>
      <div className="mt-4 space-y-2">
        {[...Array(8)].map((i) => (
          <div
            key={i}
            className="grid grid-flow-row-dense grid-cols-5 grid-rows-4 bg-gray-400 rounded-lg h-14 animate-pulse md:grid-rows-1"
          />
        ))}
      </div>
    </div>
  );
}
