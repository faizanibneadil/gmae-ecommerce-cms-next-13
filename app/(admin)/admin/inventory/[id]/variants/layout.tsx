import { MoveLeftIcon } from "@/app/_components/icons";
import { Button, Icon } from "@tremor/react";
import Link from "next/link";

interface Props {
  params: { id: string };
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ params, children }) => {
  return (
    <div>
      <Link href={`/admin/inventory/${params.id}`} prefetch={false}>
        <Icon icon={MoveLeftIcon} variant="shadow">
          Back to product
        </Icon>
      </Link>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default Layout;
