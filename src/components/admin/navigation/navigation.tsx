"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import UserDropDown from "./user";
import Logo from "./logo";

export default function Navigation() {
  return (
    <NavigationMenu.Root className="items-center p-2 bg-base-200">
      <NavigationMenu.List>
        <div className="flex items-center justify-between px-4">
          <NavigationMenu.Item>
            <Logo />
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <UserDropDown />
          </NavigationMenu.Item>
        </div>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}
