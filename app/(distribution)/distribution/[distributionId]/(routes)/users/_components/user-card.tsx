"use client";
import { EditIcon } from "@/app/_components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { $Enums } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo } from "react";

interface Props {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: $Enums.Role | null;
  cnic: string | null;
  phone: string | null;
}

const UserCard: React.FC<Props> = memo(({ id, image, name, role }) => {
  const distributionId = useParams()?.distributionId as string;
  return (
    <div
      key={id}
      className="flex flex-row items-center justify-between p-4 border rounded-lg"
    >
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={image?.toString()} />
          <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="space-y-0.5">
          <h2 className="text-base truncate">{name}</h2>
          <div className="flex flex-row items-center space-x-2">
            <Badge>{role}</Badge>
          </div>
        </div>
      </div>
      <Link href={`/distribution/${distributionId}/users/${id}`}>
        <Button size="sm" variant="secondary" className="">
          <EditIcon width={16} height={16} />
        </Button>
      </Link>
    </div>
  );
});
UserCard.displayName = "UserCard";
export default UserCard;
