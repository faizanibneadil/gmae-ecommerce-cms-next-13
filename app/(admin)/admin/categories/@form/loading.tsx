export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-2">
      <div className="h-4 max-w-sm bg-gray-400 rounded-md animate-pulse" />
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="w-20 h-10 bg-gray-400 rounded-md md:w-40 md:h-32 animate-pulse" />
        <div className="w-full">
          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
            {[...Array(6)].map((i) => (
              <div
                key={i}
                className="h-10 bg-gray-400 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
