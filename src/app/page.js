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
  const { tasks } = useTasks();
  const router = useRouter();

  return (
    <section className="flex flex-col p-20">
      {/* Botón para abrir el menú */}
      <div className="flex flex-row items-center justify-between gap-4">
        <Button
          onClick={() => router.push("/new")}
          className="flex items-center gap-2 bg-black text-white rounded-md shadow-sm p-6"
        >
          <h1 className="text-xl">Crear tarea</h1>
          <Plus
            style={{ width: "19px", height: "19px" }}
            className="text-white mt-1"
          />
        </Button>
        <div className="relative">
          {/* Contenedor para el ícono */}
          <Input
            className="pl-10 placeholder:text-lg" // Agregar espacio a la izquierda para que el ícono no se sobreponga al texto
            placeholder="Buscar"
          />
          {/* Ícono dentro del input */}
          <Search
            style={{ width: "20px", height: "20px" }}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
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
