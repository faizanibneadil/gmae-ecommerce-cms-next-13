"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Spin from "@/app/_components/loading-spinner";

const Logout: React.FC<{}> = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  return (
    <Button
      className="rounded-none"
      disabled={status === "loading"}
      onClick={() => signOut()}
      size="sm"
      variant="destructive"
    >
      {isLoading ? <Spin /> : `Logout`}
    </Button>
  );
};
Logout.displayName = "Logout";
export default Logout;
