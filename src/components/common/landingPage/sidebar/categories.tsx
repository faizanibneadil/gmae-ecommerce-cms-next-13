import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function Categories({ menu }: { menu: string[] }) {
  return (
    <div className="drawer-side">
      {/* SIDE BAR CONTENT HARE ...  */}
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <div className="w-60 bg-base-100">
        {/* BRAND LOGO CARD  */}
        <div className="w-full mt-4">
          <div className="flex flex-col items-center">
            <img className="w-32 mb-3" src="/logo.png" alt="Logo" />
          </div>
        </div>
        {/* BRAND LOGO CARD  */}
        {/* MENU CARD  */}
        <div className="w-full ">
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 mx dark:divide-gray-700">
              <li className="p-2 mx- hover:bg-base-200">
                <Link href="/" className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 capitalize truncate dark:text-white">
                      Home
                    </p>
                    {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {menu?.msg}
                      </p> */}
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ChevronDoubleRightIcon className="w-4 " />
                  </div>
                </Link>
              </li>
              {menu?.map((menu: any) => (
                <li key={menu} className="p-2 mx- hover:bg-base-200">
                  <Link href={menu} className="flex items-center space-x-4">
                    {/* <div className="flex-shrink-0">
                      <Image
                        width={8}
                        height={8}
                        className="w-8 h-8 rounded-full"
                        src={`https://loremflickr.com/8/8/${menu}`}
                        alt="Neil image"
                      />
                    </div> */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 capitalize truncate dark:text-white">
                        {menu}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {menu?.msg}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <ChevronDoubleRightIcon className="w-4 " />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* MENU CARD  */}
      </div>
    </div>
  );
}
