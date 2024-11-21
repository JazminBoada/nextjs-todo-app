"use client";
import React, { useState } from "react";
import { useTasks } from "@/context/TasksContext";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

function Page() {
  const { tasks } = useTasks(); // Estado global de tareas
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtrar tareas dinámicamente
  const filteredTasks = tasks.filter(
    (task) =>
      task.description.toLowerCase().includes(searchTerm) ||
      task.title.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="flex flex-col p-10 min-h-screen">
      <div className="flex flex-row items-center justify-between gap-4">
        <Button
          onClick={() => router.push("/new")}
          className="flex items-center gap-2 text-white rounded-md shadow-md p-4 md:p-6"
        >
          <h1 className="md:text-xl">Crear tarea</h1>
          <Plus
            style={{ width: "19px", height: "19px" }}
            className="text-white"
          />
        </Button>
        <div className="relative">
          <Input
            className="pl-10 md:placeholder:text-lg border border-slate-300 placeholder:text-gray-400"
            placeholder="Buscar"
            value={searchTerm} // Asocia el valor del input al estado de búsqueda
            onChange={handleSearch} // Actualiza el estado al escribir
          />
          <Search
            style={{ width: "20px", height: "20px" }}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {/* Renderizado de las tareas filtradas */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard task={task} key={task.id} />)
        ) : (
          <p className="text-gray-600 text-2xl font-semibold px-15 py-20 ">
            No se encontraron tareas.
          </p>
        )}
      </div>
    </section>
  );
}

export default Page;
