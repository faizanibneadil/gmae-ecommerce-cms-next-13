"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";

export default function UserDropDown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar.Root className="inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            alt="User icon"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          />
          <Avatar.Fallback
            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
            delayMs={600}
          >
            CT
          </Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content loop className="w-48 mt-4 mr-8 rounded bg-base-300">
          <DropdownMenu.Separator className="px-2 pt-2 text-xs bg-base-300">Create Actions</DropdownMenu.Separator>
          <DropdownMenu.Item className="p-1 px-2 dark:text-white"><Link href="/create/product">Add Product</Link></DropdownMenu.Item>
          <DropdownMenu.Item className="p-1 px-2 dark:text-white"><Link href="/create/category">Add Category</Link></DropdownMenu.Item>
          <DropdownMenu.Separator className="px-2 pt-2 text-xs bg-base-300">User Actions</DropdownMenu.Separator>
          <DropdownMenu.Item className="p-1 px-2 dark:text-white">Profile</DropdownMenu.Item>
          <DropdownMenu.Item className="p-1 px-2 dark:text-white">Settings</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
