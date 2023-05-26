import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const menu = [
    {
      name: "Home",
      href: "/",
      msg: "12 New Offers",
      img: "https://img.freepik.com/free-vector/stay-home-abstract-concept-vector-illustration-forced-isolation-covid19-outbreak-prevention-measures-social-distance-governmental-support-self-protection-wear-mask-abstract-metaphor_335657-4138.jpg",
    },
    {
      name: "Mobiles",
      href: "/mobiles",
      msg: "145 Mobiles Variants",
      img: "https://img.freepik.com/free-vector/dark-themed-mobile-phone-surrounded-by-apps_52683-23826.jpg",
    },
    {
      name: "Laptops",
      href: "/laptops",
      msg: "12 Brands",
      img: "https://img.freepik.com/free-vector/antigravity-technology-with-elements_23-2148072447.jpg",
    },
    {
      name: "New Arrivals",
      href: "/newArrivals",
      msg: "240 New Stuff",
      img: "https://img.freepik.com/free-vector/new-arrival-background-with-colorful-confetti_23-2147878673.jpg",
    },
    {
      name: "Services",
      href: "/services",
      msg: "4 Services",
      img: "https://img.freepik.com/premium-photo/male-hand-touching-service-concept_220873-7826.jpg",
    },
    {
      name: "Gaming",
      href: "/gaming",
      msg: "12 New Gaming Tools",
      img: "https://img.freepik.com/free-vector/online-games-concept_52683-38701.jpg",
    },
    {
      name: "Accessories",
      href: "/accessories",
      msg: "150+ new accessories",
      img: "https://img.freepik.com/free-vector/social-media-concept-with-antigravity-smartphone_23-2148276983.jpg",
    },
  ];
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col drawer-content">
          {/* <!-- Navbar --> */}
          <div className="w-full navbar bg-base-100">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 md:hidden">
              <img className="w-16 md:w-20" src="/logo.png" />
            </div>
            <div className="flex-1 hidden mx2 px- md:block">
              <input
                type="text"
                placeholder="Search you'r product"
                className="w-full input input-bordered input-warning"
              />
            </div>
            <div className="flex-none">
              {/* CART BUTTON  */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">8</span>
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className="mt-3 shadow card card-compact dropdown-content w-52 bg-base-100"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">8 Items</span>
                    <span className="text-info">Subtotal: $999</span>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* USER BUTTON  */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- Page content here --> */}
          {children}
          <footer className="p-10 mt-10 footer bg-base-200 text-base-content">
            <div>
              <img src="/logo.png" className="w-20 h-50" />
              <p>
                Global Mobile Accessories Enterprise-GMAE.
                <br />
                Providing reliable tech since 1992
              </p>
            </div>
            <div>
              <span className="footer-title">Services</span>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </div>
            <div>
              <span className="footer-title">Company</span>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </div>
            <div>
              <span className="footer-title">Legal</span>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </div>
          </footer>
        </div>
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
                  {menu?.map((menu) => (
                    <li key={menu.name} className="p-2 mx- hover:bg-base-200">
                      <Link
                        href={menu.href}
                        className="flex items-center space-x-4"
                      >
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={`${menu.img}`}
                            alt="Neil image"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {menu.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {menu.msg}
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
      </div>
    </>
  );
}
