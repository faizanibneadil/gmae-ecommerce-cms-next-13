"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import { InitAddress } from "@/_actions";
import { useSession } from "next-auth/react";

const AddNewAddress: React.FC<{}> = memo(() => {
  const { data: session, status } = useSession();
  const { replace } = useRouter();
  const [pending, start] = useTransition();
  const action = () => {
    return start(async () => {
      const id = await InitAddress(session);
      return replace(`/me/address/${id}`);
    });
  };
  return status === "loading" ? (
    <div>please wait...</div>
  ) : (
    <Button onClick={action} disabled={pending} className="w-full mt-2">
      {pending ? `Adding ...` : `Add New Address`}
    </Button>
  );
});
AddNewAddress.displayName = "AddNewAddress";
export default AddNewAddress;
