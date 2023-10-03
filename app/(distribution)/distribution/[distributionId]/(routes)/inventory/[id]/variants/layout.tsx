import { MoveLeftIcon } from "@/app/_components/icons";
import { Button, Icon } from "@tremor/react";
import Link from "next/link";

interface Props {
  params: { id: string };
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ params, children }) => {
  return <div className="mt-2">{children}</div>;
};

export default Layout;
