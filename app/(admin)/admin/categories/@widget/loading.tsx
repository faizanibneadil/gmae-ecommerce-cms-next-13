export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-2">
      <div className="h-4 max-w-sm bg-gray-400 rounded-md animate-pulse" />
      <div className="gap-x-2 gap-y-2 columns-3 md:columns-8">
        {[...Array(8)].map((i) => (
          <div
            key={i}
            className="w-full h-10 bg-gray-400 rounded-md md:w-full md:h-20 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
