export default function Page() {
  return (
    
<div className="grid gap-2 md:grid-cols-4">
    
<div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex flex-col items-center py-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Smart Phones.</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">0 Products</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <button className="btn">Edit</button>
            <button className="btn btn-error">Delete</button>
        </div>
    </div>
</div>

</div>

  );
}
