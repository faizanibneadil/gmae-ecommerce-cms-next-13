"use client";
import { useTransition } from "react";
import Spin from "../../../../../_components/loading-spinner";
import { connectImageToCategoryAction } from "@/_actions";
export default function ConnectImage({
  children,
  categoryId,
  imageId,
}: {
  children: React.ReactNode;
  categoryId: string;
  imageId: string;
}) {
  const [connecting, startConnect] = useTransition();
  const connect = () =>
    startConnect(() => connectImageToCategoryAction({ categoryId, imageId }));
  return (
    <button
      onClick={connect}
      disabled={connecting}
      className="relative h-10 group md:h-32"
    >
      {children}
      {connecting && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spin />
        </div>
      )}
    </button>
  );
}
