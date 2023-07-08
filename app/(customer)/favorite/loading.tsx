export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-4">
        {[...Array(6)].map((item) => (
          <div key={item} className="w-full rounded-md h-52 bg-slate-300 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
