"use client";
import { useRouter } from "next/navigation";
import { ReactNode, forwardRef, useTransition } from "react";

interface ButtonProps {
  className?: string;
  path: string;
  children: ReactNode
}

const TransitionButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, path, children }, forwardedRef) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    return <button disabled={isPending} onClick={() => startTransition(() => router.replace(path))} className={`${isPending ? `loading ${className}` : className}`} ref={forwardedRef}>{isPending ? `` : children}</button>;
});

export default TransitionButton
