"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { memo } from "react";

const Authenticate = () => {
  const { data: session } = useSession();
  return (
    <Button onClick={session ? () => signOut() : () => signIn("google")}>
      {session ? `Signout` : `signin`}
    </Button>
  );
};

export default memo(Authenticate);
