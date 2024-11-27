"use client";
import React, { useState } from "react";
import { useTasks } from "@/context/TasksContext";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

function Page() {
  const { tasks } = useTasks();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.description.toLowerCase().includes(searchTerm) ||
      task.title.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="flex flex-col px-4 py-8 md:bg-fuchsia-50 md:rounded-b-xl overflow-hidden lg:shadow-xl">
      <div className="hidden md:flex md:flex-row md:items-center md:justify-between lg:gap-4 pb-10">
        <Button
          onClick={() => router.push("/new")}
          className="flex items-center gap-2 text-white shadow-md p-4 md:p-6 rounded-full"
        >
          <h1 className="md:text-md">Crear tarea</h1>
          <Plus
            style={{ width: "19px", height: "19px" }}
            className="text-white"
          />
        </Button>
        <div className="relative flex items-center flex-row gap-2">
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 ">
            <Search style={{ width: "16px", height: "16x" }} />
          </button>
          <input
            className="border-b border-b-black outline-none bg-transparent pl-6 pr-4 placeholder:pl-0 transform transition-all duration-300"
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Contenedor de tareas */}
      <div className="flex flex-col md:flex-row flex-wrap items-center md:justify-center lg:justify-start md:gap-8">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard task={task} key={task.id} />)
        ) : (
          <p className="text-gray-800 md:text-gray-400 text-2xl font-semibold py-20 flex-grow flex justify-center items-center">
            No se encontraron tareas
          </p>
        )}
      </div>

      <div className="md:hidden fixed bottom-4 right-4 z-50 ">
        <Button
          onClick={() => router.push("/new")}
          className="rounded-full w-10 h-10 shadow-sm bg-black"
        >
          <Plus style={{ width: "19px", height: "19px" }} />
        </Button>
      </div>
    </section>
  );
}

export default Page;
