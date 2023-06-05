import LogoutButton from "@/app/components/logoutButton";
import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Page() {
  const session = await getServerSession(authOptions);
  // const user = await prisma.user.findUnique({
  //   where: { id: session?.user?.email },
  // });
  return (
    <div className="w-full p-2">
      <div className="w-full ">
        <div className="flex flex-col items-center pb-10">
          <Image
            width={24}
            height={24}
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={`${session?.user?.image}`}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {session?.user?.name}
          </h5>
          <span className="mb-10 text-sm text-gray-500 dark:text-gray-400">
            {/* {session?.user?.role} */}
            User Role or about user
          </span>
          <LogoutButton>Logout</LogoutButton>
        </div>
      </div>
    </div>
  );
}
