import { PlusIcon, RefreshIcon, SearchIcon } from "@/app/_components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-6xl p-1 mx-auto">
      <div>{children}</div>
    </div>
  );
};
export default Layout;
