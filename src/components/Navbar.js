"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NotebookPen } from "lucide-react";

function Navbar() {
  const router = useRouter(); //hook
  return (
    <header className="px-4 pt-4 pb-8   bg-white md:bg-fuchsia-50 md:rounded-t-lg shadow-md lg:shadow-none">
      <Link href={"/"}>
        <div className="flex items-center flex-row gap-2">
          <NotebookPen className="w-9 h-9" />
          <h1 className="text-4xl font-semibold tracking-wide">Notas</h1>
        </div>
      </Link>
    </header>
  );
}

export default Navbar;
