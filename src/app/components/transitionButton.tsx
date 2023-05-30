"use client";
import { useRouter } from "next/navigation";
import { ReactNode, forwardRef, useTransition } from "react";

interface ButtonProps {
  className?: string;
  path: string;
  children: ReactNode;
}

export default function TransitionButton({
  className,
  path,
  children,
}: ButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => router.replace(path))
      }
      className={`${isPending ? `loading ${className}` : className}`}
    >
      {isPending ? `` : children}
    </button>
  );
}
