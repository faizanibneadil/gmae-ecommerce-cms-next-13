export default function Loading() {
  return [...Array(5)].map((i) => (
    <div key={i} className="w-full h-10 mb-1 bg-gray-400 animate-pulse" />
  ));
}
