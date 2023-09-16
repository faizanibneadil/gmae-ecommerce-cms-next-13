"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Spin from "@/app/_components/loading-spinner"

const AdminLogin: React.FC<{}> = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading"
  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <Button
        disabled={status === "loading"}
        onClick={session ? () => signOut() : () => signIn("google")}
      >
        {isLoading ? <Spin /> : session ? `Logout` : `Signin With Google`}
      </Button>
    </div>
  );
};
export default AdminLogin;
