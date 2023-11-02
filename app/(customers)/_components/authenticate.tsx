import { UserIcon } from "@/app/_components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/config/authOptions";
import { _getDistribution } from "@/queries";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { use } from "react";

const Authenticate = () => {
  const session = use(getServerSession(authOptions));
  const distributions = use(_getDistribution());
  return session && distributions ? (
    <Link href="/me">
      <Avatar>
        <AvatarImage
          src={session.user.image?.toString()}
          alt={session.user.name?.toString()}
        />
        <AvatarFallback>{session.user.name}</AvatarFallback>
      </Avatar>
    </Link>
  ) : (
    <Button onClick={() => signIn("google")}>SignIn</Button>
  );
};

export default Authenticate;
