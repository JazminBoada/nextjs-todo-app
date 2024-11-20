"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const router = useRouter(); //hook
  return (
    <header className="text-center px-4 mt-4 pb-4 border-b-[1px] border-slate-200">
      <Link href={"/"}>
        <h1 className="text-6xl font-logo-md">TODO APP</h1>
      </Link>
    </header>
  );
}

export default Navbar;
