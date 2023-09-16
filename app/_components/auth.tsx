"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Spin from "@/app/_components/loading-spinner"

export default function AuthButton() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading"
  return (
    <Button
      disabled={status === "loading"}
      onClick={session ? () => signOut() : () => signIn("google")}
      size="sm"
      className="w-full"
    >
      {isLoading ? <Spin /> : session ? `Logout` : `login`}
    </Button>
  );
}
