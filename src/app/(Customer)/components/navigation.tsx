"use client";
import {
  BookmarkIcon,
  FireIcon,
  GiftIcon,
  MagnifyingGlassCircleIcon,
  RectangleGroupIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useSession, signIn, signOut } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import { HomeIcon } from "@radix-ui/react-icons";
import TransitionButton from "@/app/components/transitionButton";

export default function Navigation() {
  const { data: session, status } = useSession();
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex items-center justify-between md:justify-end md:space-x-2">
        <NavigationMenu.Item>
          <TransitionButton
            path="/"
            className="btn btn-circle btn-sm md:btn-md btn-accent"
          >
            <HomeIcon className="w-5 h-5" />
          </TransitionButton>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <TransitionButton
            path="/browse"
            className="btn btn-circle btn-sm md:btn-md btn-secondary"
          >
            <RectangleGroupIcon className="w-5 h-5" />
          </TransitionButton>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <TransitionButton
            path="/hot"
            className="btn btn-circle btn-sm md:btn-md btn-error"
          >
            <FireIcon className="w-5 h-5" />
          </TransitionButton>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <TransitionButton path="/cart" className="btn btn-circle btn-warning">
            <ShoppingBagIcon className="w-5 h-5" />
          </TransitionButton>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <TransitionButton
            path="/freebies"
            className="btn btn-circle btn-sm md:btn-md btn-primary"
          >
            <GiftIcon className="w-5 h-5" />
          </TransitionButton>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <TransitionButton
            path="/bookmark"
            className="btn btn-circle btn-sm md:btn-md btn-info"
          >
            <BookmarkIcon className="w-5 h-5" />
          </TransitionButton>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <TransitionButton
            path="/search"
            className="hidden btn btn-circle btn-sm md:btn-md btn-accent md:flex"
          >
            <MagnifyingGlassCircleIcon className="w-8 h-8" />
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
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}