export default function Loading() {
  return (
    <div>
      <div className="mt-8 space-y-2">
        <div className="h-4 max-w-sm bg-gray-400 rounded-md animate-pulse" />

        {[...Array(3)].map((i) => (
          <div key={i} className="h-10 bg-gray-400 rounded-md animate-pulse" />
        ))}
        <div className="grid w-full grid-cols-1 gap-2 mt-4 md:grid-cols-3">
          {[...Array(6)].map((i) => (
            <div
              key={i}
              className="h-10 bg-gray-400 rounded-md animate-pulse"
            />
          ))}
        </div>
        {[...Array(3)].map((i) => (
          <div key={i} className="h-10 bg-gray-400 rounded-md animate-pulse" />
        ))}
        <div className="h-10 bg-gray-400 rounded-md animate-pulse" />
      </div>
    </div>
  );
}
