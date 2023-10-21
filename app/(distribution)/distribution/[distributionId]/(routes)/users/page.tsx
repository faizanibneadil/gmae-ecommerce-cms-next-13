import { _getUsers } from "@/queries";
import { notFound } from "next/navigation";
import { memo, use } from "react";
import UserCard from "./_components/user-card";

interface Props {
  params: { distributionId: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const users = use(_getUsers(params.distributionId));
  return users?.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {users?.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
