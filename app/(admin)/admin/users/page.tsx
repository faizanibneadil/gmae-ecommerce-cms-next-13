import { prisma } from "@/config/db";
import { List, ListItem } from "@tremor/react";
import Image from "next/image";
import UsersPageHeader from "./components/usersPageHeader";

export default async function Page() {
  const customers = await prisma.user.findMany();
  return (
    <div className="md:mx-52">
      <UsersPageHeader />
      <List className="mt-6">
        {customers.map((customer) => (
          <ListItem key={customer.id}>
          <span className="flex items-center space-x-2">
            <Image
              className="w-8 h-8 mr-4 rounded-full"
              width={30}
              height={30}
              alt=""
              src={`${customer?.image}`}
              loading="lazy"
            />
            <span className="truncate">{customer.name}</span>
          </span>
          <span className="flex items-center space-x-2">
            actions
            {/* <Icon size="xs" icon={Trash} variant="solid" tooltip="Delete" />
            <Link href={`/admin/categories/${category.id}`}>
              <Icon size="xs" icon={Edit} variant="solid" tooltip="Edit" />
            </Link> */}
          </span>
        </ListItem>
        ))}
      </List>
    </div>
  );
}
