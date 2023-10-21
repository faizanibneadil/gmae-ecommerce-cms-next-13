"use client";

import { memo, useEffect, useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftRight,
  BarChart,
  ChevronsUpDown,
  Cloud,
  CreditCard,
  Factory,
  Gauge,
  Github,
  ImageIcon,
  ImagePlus,
  Keyboard,
  LifeBuoy,
  ListChecks,
  LogOut,
  Mail,
  MessageSquare,
  Package,
  PackagePlus,
  Palette,
  Plus,
  PlusCircle,
  PlusIcon,
  Settings,
  Store,
  Target,
  Truck,
  User,
  UserPlus,
  Users,
  Users2,
} from "lucide-react";
import { getCategories } from "../_actions/getCategories";
import Spin from "@/app/_components/loading-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TCategories = {
  images: {
    src: string | null;
  } | null;
  id: string;
  name: string | null;
  slug: string | null;
  subCategories: {
    images: {
      src: string | null;
    } | null;
    id: string;
    name: string | null;
    slug: string | null;
  }[];
};

const CategoriesMenu: React.FC<{}> = memo(() => {
  const [categories, setCategories] = useState<TCategories[]>();
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    return startTransition(async () => {
      const categories = await getCategories();
      setCategories(categories);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{pending ? <Spin /> : `Categories`}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {categories?.map((category) => (
          <DropdownMenuSub key={category.id}>
            <DropdownMenuSubTrigger>
              <Avatar className="w-4 h-4 mr-2">
                <AvatarImage
                  src={`https://lh3.googleusercontent.com/d/${category?.images?.src}=s220`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <span>{category.name}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {category.subCategories.map((sub) => (
                  <DropdownMenuItem key={sub.id}>
                    <Avatar className="w-4 h-4 mr-2">
                      <AvatarImage
                        src={`https://lh3.googleusercontent.com/d/${category?.images?.src}=s220`}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{sub.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
CategoriesMenu.displayName = "CategoriesMenu";
export default CategoriesMenu;
