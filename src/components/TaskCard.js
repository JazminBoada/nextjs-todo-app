import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TasksContext";
import { toast } from "react-hot-toast";
import { EllipsisVertical, Pencil, Star, Palette, Trash } from "lucide-react";
import { Button } from "./ui/button";
import ButtonCard from "@/components/ButtonCard";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  const { deleteTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);

  // Cambiar el estado del menú (abrir o cerrar)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-10 bg-white rounded-md max-w-md h-52 space-y-5 p-5 border border-slate-300 shadow-sm relative">
      <div className="flex flex-row items-center justify-between pb-2 ">
        <h1 className="text-gray-600 font-bold text-xl">{task.title}</h1>

        {/* Botón para abrir el menú */}
        <Button
          onClick={toggleMenu}
          className="relative  text-white bg-slate-300 rounded-2xl px-3"
        >
          <EllipsisVertical />
        </Button>

        {/* Menú desplegable */}
        <div
          className={`absolute top-16 right-[-125px] mt-1 w-auto bg-white border border-gray-200 rounded-md shadow-md transition-all duration-300 transform z-50 ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <ul className="pr-4 pl-2 py-2 space-y-2">
            <li className="">
              <ButtonCard icon={<Star />} title="Marcar favorito" />
            </li>
            <li>
              <ButtonCard icon={<Palette />} title="Color" />
            </li>
            <li>
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que se propague el evento
                  deleteTask(task.id);
                  toast.success("Tarea eliminada correctamente");
                }}
              >
                <ButtonCard icon={<Trash />} title="Eliminar" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-gray-500">{task.description}</p>

      <div className="pt-5 text-end">
        <Button
          onClick={() => router.push(`/edit/${task.id}`)}
          className="rounded-2xl px-3 "
        >
          <Pencil />
        </Button>
      </div>
    </div>
  );
};
