export default function Loading() {
  return (
    <div>
      <div className="h-[40vw] bg-gray-400 animate-pulse" />
      {[...Array(3)].map((c) => (
        <>
          <section key={c} className="p-2 md:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-semibold truncate ">
                <div className="relative w-8 h-8 rounded-full">
                  <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse" />
                </div>
                <div className="w-40 h-4 bg-gray-400 rounded-md animate-pulse" />
              </div>
              <div className="w-20 h-4 bg-gray-400 rounded-md animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-6">
              {[...Array(6)].map((p) => (
                <div key={p} className="rounded-lg shadow-md">
                  <div className="relative w-full h-32">
                    <div className="h-32 bg-gray-400 rounded-t-md animate-pulse" />
                    <div className="absolute w-5 h-6 bg-gray-500 rounded-md animate-pulse top-2 right-2" />
                  </div>
                  <div className="p-2 mt-2 space-y-2">
                    <h2 className="h-6 bg-gray-400 rounded-md animate-pulse" />
                    <div className="flex items-center justify-between space-x-2 item">
                      <div className="flex flex-col items-center space-y-2 text-left">
                        <div className="w-8 h-2 bg-gray-400 rounded-md animate-pulse" />
                        <div className="w-8 h-2 bg-gray-400 rounded-md animate-pulse" />
                      </div>
                      <div className="w-8 h-8 bg-gray-400 rounded-md animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="flex-grow border-t border-gray-200"></div>
        </>
      ))}
    </div>
  );
}
