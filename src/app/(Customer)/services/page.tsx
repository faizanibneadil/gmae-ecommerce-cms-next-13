export default async function Page() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return (
    <div >
      {products?.map((_: any) => (
        <div
          key={_.id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <img
            className="rounded-t-lg aspect-square"
            src={`${_.image}`}
            alt=""
          />
          <div className="p-5">
            <h5 className="mb-2 font-bold tracking-tight text-gray-900 text-md dark:text-white line-clamp-1">
              {_.title}
            </h5>
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
