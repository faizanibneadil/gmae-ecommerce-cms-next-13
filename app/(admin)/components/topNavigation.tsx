"use client";
import { Button } from "@tremor/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function TopNavigation() {
  const { data: session, status } = useSession();
  return (
    <>
      <nav className="bg-gray-50 ">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex flex-row justify-between mt-0 mr-6 space-x-8 text-sm font-medium">
            <Link href="/">
              <Image
                alt="Brand Logo Image"
                width={100}
                height={75}
                className="w-12"
                src="/logo.png"
              />
            </Link>
            <Button
              size="xs"
              variant="light"
              onClick={session ? () => signOut() : () => signIn("google")}
            >
              {session ? `Logout` : `Login`}
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
