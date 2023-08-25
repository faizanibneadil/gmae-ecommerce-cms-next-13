"use client";

import { Button } from "@tremor/react";
import { LogIn } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const AdminLogin: React.FC<{}> = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <Button
        icon={LogIn}
        disabled={status === "loading"}
        loading={status === "loading"}
        onClick={session ? () => signOut() : () => signIn("google")}
        variant="primary"
      >
        {session ? `Logout` : `Signin With Google`}
      </Button>
    </div>
  );
};
export default AdminLogin;
