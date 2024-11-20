"use client";
import { useState } from "react";
import React from "react";
import { useTasks } from "@/context/TasksContext";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Plus, Search, FolderPlus, StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

function page() {
  const [isOpen, setIsOpen] = useState(false);
  const { tasks } = useTasks();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="flex flex-col p-20">
      {/* Botón para abrir el menú */}
      <div className="flex flex-row items-center justify-between gap-4">
        <Button
          onClick={toggleMenu}
          className="flex items-center space-x-2 bg-black text-white rounded-md px-4 py-2 shadow-sm"
        >
          <span>Crear nueva</span>
          <Plus className="text-white" />
        </Button>
        <div className="relative">
          {/* Contenedor para el ícono */}
          <Input
            className="pl-10" // Agregar espacio a la izquierda para que el ícono no se sobreponga al texto
            placeholder="Buscar"
          />
          {/* Ícono dentro del input */}
          <Search
            style={{ width: "20px", height: "20px" }}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Menú desplegable 
        <div
          className={`absolute left-24 mt-2 w-40 bg-white border rounded-md shadow-md transition-all duration-300 transform ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <ul className="px-4 py-2 space-y-2">
            <div className="flex flex-row items-center hover:bg-gray-200 duration-300 transition-all rounded-md px-2 py-1 gap-2">
              <StickyNote size={20} />
              <li
                className="cursor-pointer text-md"
                onClick={() => router.push("/new")}
              >
                Tarea
              </li>
            </div>
            <div className="flex flex-row items-center hover:bg-gray-200 duration-300 transition-all rounded-md px-2 py-1 gap-2">
              <FolderPlus size={20} />
              <li
                className="cursor-pointer text-md "
                onClick={() => router.push("/new-folder")}
              >
                Carpeta
              </li>
            </div>
          </ul>
        </div>
        */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tasks.map((task, i) => (
          <TaskCard task={task} key={i} /> //Le coloco como propiedad la tarea que se espera recibir
        ))}
      </div>
    </section>
  );
}

export default page;
