"use client";

import {
  ArrowLeftRight,
  BarChart,
  ChevronsUpDown,
  Factory,
  Gauge,
  ImageIcon,
  ImagePlus,
  Laptop,
  ListChecks,
  Map,
  Moon,
  Package,
  PackagePlus,
  Palette,
  PlusIcon,
  Receipt,
  Sheet,
  Store,
  Sun,
  Target,
  Truck,
  Users,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { memo, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Spin from "@/app/_components/loading-spinner";
import {
  initBrand,
  initImage,
  initShop,
  initializeNewCategory,
  initializeNewInventory,
} from "@/_actions";
import { useTheme } from "next-themes";

const menu = [{ name: "Dashboard", route: "Dashboard" }];

const Menu = memo(() => {
  const { setTheme } = useTheme();
  const { replace } = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // create empty inventory
  const initInventory = () => {
    return startTransition(async () => {
      const id = await initializeNewInventory();
      return replace(`/admin/inventory/${id}`);
    });
  };

  // create empty image
  const initNewImage = () => {
    return startTransition(async () => {
      const id = await initImage();
      return replace(`/admin/images/${id}`);
    });
  };

  // create empty category
  const initCategory = () => {
    return startTransition(async () => {
      const id = await initializeNewCategory();
      return replace(`/admin/categories/${id}`);
    });
  };

  // create empty brand
  const initNewBrand = () => {
    return startTransition(async () => {
      const id = await initBrand();
      return replace(`/admin/brands/${id}`);
    });
  };

  // create empty Shop
  const initNewShop = () => {
    return startTransition(async () => {
      const id = await initShop();
      return replace(`/admin/shops/${id}`);
    });
  };

  const route = (path: string) => {
    return startTransition(() => {
      setOpen((open) => !open);
      replace(path);
    });
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "m" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger disabled={pending}>
        <Button disabled={pending} variant="outline" className="w-44 md:w-80">
          {pending ? <Spin /> : `Menu`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 md:w-80">
        <DropdownMenuLabel>Root</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => route("/admin")}>
          <Gauge className="w-4 h-4 mr-2" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => route(`/admin/transactions`)}>
          <ArrowLeftRight className="w-4 h-4 mr-2" />
          <span>Transactions</span>
        </DropdownMenuItem>

        {/* // inventory  */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="w-4 h-4 mr-2" />
                <span>Inventory</span>
              </div>
              <ChevronsUpDown className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 md:w-80">
            <DropdownMenuLabel>Inventory</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={initInventory}>
              <PackagePlus className="w-4 h-4 mr-2" />
              <span>Add Inventory</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => route("/admin/inventory/analytics")}
            >
              <BarChart className="w-4 h-4 mr-2" />
              <span>Analytics</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => route("/admin/inventory")}>
              <Package className="w-4 h-4 mr-2" />
              <span>Show Inventory</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* image gallery  */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" />
                <span>Image Gallery</span>
              </div>
              <ChevronsUpDown className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 md:w-80">
            <DropdownMenuLabel>Image Gallery</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={initNewImage}>
              <ImagePlus className="w-4 h-4 mr-2" />
              <span>Add Images</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => route("/admin/images")}>
              <ImageIcon className="w-4 h-4 mr-2" />
              <span>All Images</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* categories  */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <ListChecks className="w-4 h-4 mr-2" />
                <span>Categories</span>
              </div>
              <ChevronsUpDown className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 md:w-80">
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={initCategory}>
              <PlusIcon className="w-4 h-4 mr-2" />
              <span>Add Category</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => route("/admin/categories")}>
              <ListChecks className="w-4 h-4 mr-2" />
              <span>All Categories</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenuItem onClick={() => route("/admin/orders")}>
          <Truck className="w-4 h-4 mr-2" />
          <span>Orders</span>
        </DropdownMenuItem>

        {/* customers  */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <Users2 className="w-4 h-4 mr-2" />
                <span>Customers</span>
              </div>
              <ChevronsUpDown className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 md:w-80">
            <DropdownMenuLabel>Customers</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => route("/admin/customers/new")}>
              <PlusIcon className="w-4 h-4 mr-2" />
              <span>Add Customer</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => route("/admin/customers")}>
              <ListChecks className="w-4 h-4 mr-2" />
              <span>All Customers</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* users  */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Users</span>
              </div>
              <ChevronsUpDown className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 md:w-80">
            <DropdownMenuLabel>Users</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => route("/admin/users/new")}>
              <PlusIcon className="w-4 h-4 mr-2" />
              <span>Add User</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => route("/admin/users")}>
              <ListChecks className="w-4 h-4 mr-2" />
              <span>All Users</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Areas  */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <Map className="w-4 h-4 mr-2" />
                <span>Areas</span>
              </div>
              <ChevronsUpDown className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 md:w-80">
            <DropdownMenuLabel>Areas</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => route("/admin/areas/new")}>
              <PlusIcon className="w-4 h-4 mr-2" />
              <span>Add Area</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => route("/admin/areas")}>
              <ListChecks className="w-4 h-4 mr-2" />
              <span>All Areas</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* shops  */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <Store className="w-4 h-4 mr-2" />
                <span>Shops</span>
              </div>
              <ChevronsUpDown className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 md:w-80">
            <DropdownMenuLabel>Shops</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={initNewShop}>
              <Store className="w-4 h-4 mr-2" />
              <span>Add Shop</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => route("/admin/shops")}>
              <Store className="w-4 h-4 mr-2" />
              <span>All Shops</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* brands  */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                <span>Brands</span>
              </div>
              <ChevronsUpDown className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 md:w-80">
            <DropdownMenuLabel>Brands</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={initNewBrand}>
              <Target className="w-4 h-4 mr-2" />
              <span>Add Brand</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => route("/admin/brands")}>
              <Target className="w-4 h-4 mr-2" />
              <span>All Brands</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* companies  */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <Factory className="w-4 h-4 mr-2" />
                <span>Companies</span>
              </div>
              <ChevronsUpDown className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 md:w-80">
            <DropdownMenuLabel>Companies</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => route("/admin/companies/new")}>
              <Factory className="w-4 h-4 mr-2" />
              <span>Add Company</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => route("/admin/companies")}>
              <Factory className="w-4 h-4 mr-2" />
              <span>All Companies</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>More</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                <span>Theme</span>
              </div>
              <ChevronsUpDown className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 md:w-80">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Moon className="w-4 h-4 mr-2" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Sun className="w-4 h-4 mr-2" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Laptop className="w-4 h-4 mr-2" />
              <span>System Default</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
Menu.displayName = "Menu";
export default Menu;
