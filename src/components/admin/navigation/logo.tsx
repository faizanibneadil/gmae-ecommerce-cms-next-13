"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/admin">
      <Image width={80} height={30} src="/logo.png" alt="Logo" />
    </Link>
  );
}
