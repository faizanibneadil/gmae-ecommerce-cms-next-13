"use client";

import {
  MagnifyingGlassCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useSession, signIn, signOut } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import TransitionButton from "@/app/components/transitionButton";

export default function Navigation() {
  const { data: session } = useSession();
  return (
    <NavigationMenu.Root className="bg-white border-gray-200 dark:bg-gray-900">
      <NavigationMenu.List className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <NavigationMenu.Item className="hidden md:block">
          <img className="w-16 md:w-20" src="/logo.png" />
        </NavigationMenu.Item>
        <NavigationMenu.Item className={`${!session && `hidden`} md:hidden`}>
          <TransitionButton path="/" className="btn btn-circle btn-outline">
            <HomeIcon className="w-5 h-5" />
          </TransitionButton>
        </NavigationMenu.Item>
        <div className="flex items-center space-x-2">
          <NavigationMenu.Item className="relative">
            <NavigationMenu.Trigger>
              <button className="w-full gap-2 rounded-full btn btn-outline">
                <PlusCircleIcon className="w-5 h-5" />
                Add New
              </button>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="top-0 bottom-0 z-50 right-0 w-screen h-screen data-[state=open]:animate-enterFromRight fixed md:w-80 bg-base-100">
              <NavigationMenu.Link asChild>
                <div>
                  <div className="flex items-center justify-between bg-base-300">
                    <div className="p-4">My Shopping Cart.</div>
                    <div className="p-4 cursor-pointer hover:bg-base-100">
                      <XMarkIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="w-full ">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="px-2 divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="w-8 h-8 rounded-full"
                                src="/docs/images/people/profile-picture-1.jpg"
                                alt="Neil image"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Neil Sims
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                - 20 +
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              PKR320
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="relative"></NavigationMenu.Item>
          {session ? (
            <NavigationMenu.Item className="relative">
              <NavigationMenu.Trigger>
                <Avatar.Root className="inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                  <Avatar.Image
                    className="h-full w-full rounded-[inherit] object-cover"
                    src={`${session?.user?.image}`}
                    alt={`${session?.user?.name}`}
                  />
                  <Avatar.Fallback>{session?.user?.name}</Avatar.Fallback>
                </Avatar.Root>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="top-0 bottom-0 z-50 right-0 w-screen h-screen data-[state=open]:animate-enterFromRight fixed md:w-80 bg-base-100">
                <NavigationMenu.Link asChild>
                  <div>
                    <div className="flex items-center justify-between bg-base-300">
                      <div className="p-4">About Me.</div>
                      <div className="p-4 cursor-pointer hover:bg-base-100">
                        <XMarkIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="w-full bg-base-300">
                      <div className="flex flex-col items-center pb-10">
                        <img
                          className="w-24 h-24 mb-3 rounded-full shadow-lg"
                          src={`${session?.user?.image}`}
                          alt="Bonnie image"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {session?.user?.name}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Visual Designer
                        </span>
                        <div className="flex mt-4 space-x-3 md:mt-6">
                          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Any Query.?
                          </button>
                          <button
                            onClick={() => signOut()}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item>
              <button
                onClick={() => signIn("google")}
                type="button"
                className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              >
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </button>
            </NavigationMenu.Item>
          )}
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
