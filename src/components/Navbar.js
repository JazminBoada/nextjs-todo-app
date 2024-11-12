"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Navbar() {
  const router = useRouter(); //hook
  return (
    <header className="flex flex-row items-center justify-between px-4 mt-4 pb-4 border-b-[1px] border-blue-neutral">
      <Link href={"/"}>
        <h1 className="text-7xl font-logo-sm">T</h1>
      </Link>

      <div>
        <Select>
          <SelectTrigger className="w-[150px] h-[50px] bg-black text-white rounded-full text-xl font-semibold">
            <SelectValue placeholder="Carpetas" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* <div>
        <button onClick={() => router.push("/new")}>Agregar tarea</button>
      </div> */}
    </header>
  );
}

export default Navbar;
