"use client";

import { Button, Callout } from "@tremor/react";
import { XOctagon } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Callout
      className="flex items-center justify-center h-40 mt-4 text-center"
      title="Error"
      icon={XOctagon}
      color="rose"
    >
      <h2>Something went wrong!</h2>
      <Button color="rose" variant="primary" onClick={() => reset()}>
        Try again
      </Button>
    </Callout>
  );
}
