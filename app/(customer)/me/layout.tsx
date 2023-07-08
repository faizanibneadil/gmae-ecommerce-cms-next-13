import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

export default async function Layout({
  children,
  auth,
}: {
  children: ReactNode;
  auth: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return <div>{session ? children : auth}</div>;
}
