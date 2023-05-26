export default function Page({ params }: { params: { brandSlug: string } }) {
  return (
    <div className="grid gap-4 grid-cols- md:grid-cols-4">
      {[...Array(10)].map((_) => (
        <div
          key={_}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <img
            className="rounded-t-lg"
            src={`https://source.unsplash.com/random/?mobiles`}
            alt=""
          />
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 font-bold tracking-tight text-gray-900 text-md dark:text-white line-clamp-2">
                Noteworthy technology acquisitions 2021
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
          <button className="btn btn-block">Add to cart</button>
        </div>
      ))}
    </div>
  );
}
