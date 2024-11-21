"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const router = useRouter(); //hook
  return (
    <header className="text-center px-4 pt-4 pb-8  text-gray-600 border-b border-b-slate-300">
      <Link href={"/"}>
        <h1 className="text-6xl font-semibold tracking-wide">TO DO</h1>
        <h2 className="text-3xl pt-2 tracking-wide">Reminds Everything</h2>
      </Link>
    </header>
  );
}

export default Navbar;
