"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const router = useRouter(); //hook
  return (
    <header className="bg-slate-500 text-white">
      <Link href={"/"}>
        <h1>Todo App</h1>
      </Link>
      <div>
        <button onClick={() => router.push("/new")}>Agregar tarea</button>
      </div>
    </header>
  );
}

export default Navbar;
