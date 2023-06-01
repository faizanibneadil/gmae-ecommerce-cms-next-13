"use client";
import {
  ChartPieIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
  RectangleStackIcon,
  SquaresPlusIcon,
  TagIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useSession, signIn, signOut } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import { PlusIcon } from "@radix-ui/react-icons";
import TransitionButton from "@/app/components/transitionButton";
import { useRouter } from "next/navigation";
import { ReactNode, useTransition } from "react";

export default function Navigation() {
  const { data: session, status } = useSession();
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex items-center justify-center space-x-2 md:justify-end">
        <NavigationMenu.Item>
          <TransitionButton
            path="/browse"
            className="btn btn-circle btn-sm md:btn-md btn-secondary"
          >
            <UserGroupIcon className="w-5 h-5" />
          </TransitionButton>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <TransitionButton
            path="/hot"
            className="btn btn-circle btn-sm md:btn-md btn-error"
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </TransitionButton>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="btn btn-circle btn-warning">
            <PlusCircleIcon className="w-8 h-8" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="p-4">
            <div className="grid grid-cols-2 gap-4 cursor-pointer md:grid-cols-4">
              <NavigationMenu.Link asChild>
                <NavigationItem path="/create/users" label="Create User">
                  <UserCircleIcon className="w-12 h-12" />
                </NavigationItem>
              </NavigationMenu.Link>
              <NavigationMenu.Link asChild>
                <NavigationItem path="/create/categories" label="Create Category">
                  <SquaresPlusIcon className="w-10 h-10" />
                </NavigationItem>
              </NavigationMenu.Link>
              <NavigationMenu.Link asChild>
                <NavigationItem path="/create/promotions" label="Create Promotion">
                  <RectangleStackIcon className="w-10 h-10" />
                </NavigationItem>
              </NavigationMenu.Link>
              <NavigationMenu.Link asChild>
                <NavigationItem
                  path="/create/promocodes"
                  label="Create Promo Codes"
                >
                  <TagIcon className="w-10 h-10" />
                </NavigationItem>
              </NavigationMenu.Link>
              <NavigationMenu.Link asChild>
                <NavigationItem path="/create/products" label="Create Product">
                  <PlusIcon className="w-10 h-10" />
                </NavigationItem>
              </NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <TransitionButton
            path="/dashboard"
            className="btn btn-circle btn-sm md:btn-md btn-info"
          >
            <ChartPieIcon className="w-5 h-5" />
          </TransitionButton>
        </NavigationMenu.Item>
        {session ? (
          <NavigationMenu.Item>
            <TransitionButton
              path="/cuser"
              className="btn btn-circle btn-sm md:btn-md btn-success"
            >
              <Avatar.Root className="inline-flex h-[20px] w-[20px] md:h-[40px] md:w-[40px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={`${session?.user?.image}`}
                  alt={`${session?.user?.name}`}
                />
                <Avatar.Fallback>{session?.user?.name}</Avatar.Fallback>
              </Avatar.Root>
            </TransitionButton>
          </NavigationMenu.Item>
        ) : (
          <NavigationMenu.Item>
            <button
              disabled={status.toString() === `loading`}
              onClick={() => signIn("google")}
              className={`btn btn-circle  btn-sm md:btn-md btn-success ${
                status.toString() === `loading` && `loading`
              }`}
            >
              <Avatar.Root className="inline-flex h-[20px] w-[20px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={`https://cdn-icons-png.flaticon.com/512/281/281764.png`}
                  alt={`SignIn With Google`}
                />
                <Avatar.Fallback>user</Avatar.Fallback>
              </Avatar.Root>
            </button>
          </NavigationMenu.Item>
        )}

        <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut bottom-full md:top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative md:top-[70%] bottom-1 h-[10px] w-[10px] -rotate-45 md:rotate-45 rounded-tl-[2px] bg-white" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
      <div className="absolute left-0 flex justify-center w-full bottom-full md:top-full">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[3px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
}

function NavigationItem({
  children,
  label,
  path,
}: {
  children: ReactNode;
  path: string;
  label: string;
}) {
  const [ispending, startTransition] = useTransition();
  const { replace } = useRouter();
  return (
    <NavigationMenu.Link asChild>
      <button
        onClick={() => startTransition(() => replace(path))}
        className="flex flex-col w-full pt-4 mt-auto space-y-2 rounded-3xl place-items-center hover:bg-primary backdrop-blur-xl"
      >
        <div className={`btn btn-lg btn-circle ${ispending && `loading`}`}>
          {children}
        </div>
        <h2 className="text-black btn btn-ghost btn-block">{label}</h2>
      </button>
    </NavigationMenu.Link>
  );
}
