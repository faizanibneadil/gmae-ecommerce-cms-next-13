import { Callout } from "@tremor/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Callout className="w-full" title="Categories not found." color="rose">
      Categories are not found. Please create click on Create Category button.
    </Callout>
  );
}