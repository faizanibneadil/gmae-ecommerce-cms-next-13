"use client";

import { Button } from "@tremor/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  return (
    <Button
      disabled={status === "loading"}
      loading={status === "loading"}
      onClick={session ? () => signOut() : () => signIn("google")}
      size="xs"
      variant="primary"
      className="w-full"
    >
      {session ? `Logout` : `login`}
    </Button>
  );
}
