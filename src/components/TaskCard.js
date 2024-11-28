import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TasksContext";
import { toast } from "react-hot-toast";
import { EllipsisVertical, Pencil, Star, Palette, Trash } from "lucide-react";
import { BsFillStarFill } from "react-icons/bs";
import { Button } from "./ui/button";
import ButtonCard from "@/components/ButtonCard";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  const { deleteTask, updateTaskColor, markAsFavorite } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Menu se cierra al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsColorMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const colors = [
    { name: "Blanco", class: "bg-white" },
    { name: "Rojo", class: "bg-red-100" },
    { name: "Naranja", class: "bg-orange-100" },
    { name: "Violeta", class: "bg-violet-100" },
    { name: "Azul", class: "bg-blue-100" },
    { name: "Verde", class: "bg-green-100" },
  ];

  return (
    <div
      className={`mt-5 ${task.color} rounded-md w-80 h-52 space-y-5 p-5 relative shadow-md`}
    >
      <div className="flex flex-row items-center justify-between pb-2 border-b border-b-slate-300">
        <h1 className="text-gray-600 font-bold text-xl">{task.title}</h1>

        <div className="flex flex-row items-center gap-4">
          <button
            onClick={() => markAsFavorite(task.id)}
            title={
              task.isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
            }
            className="text-yellow-400"
          >
            <BsFillStarFill
              style={{
                width: "20px",
                height: "20px",
                display: task.isFavorite ? "block" : "none", // Cambia la visibilidad según el estado
              }}
            />
          </button>

          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative text-black bg-white rounded-2xl px-3 shadow-md"
          >
            <EllipsisVertical />
          </Button>
        </div>

        {/* Menú desplegable principal */}
        <div
          ref={menuRef} // Referencia al menú
          className={`absolute top-0 right-2 mt-1 w-auto bg-white rounded-2xl shadow-xl  transition-all duration-300 transform z-50 ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col items-start pr-4 pl-2 py-2">
            <div
              onClick={() => {
                markAsFavorite(task.id), setIsOpen(false);
              }}
            >
              <li>
                <ButtonCard
                  icon={<Star />}
                  title={
                    task.isFavorite
                      ? "Quitar de favoritos"
                      : "Agregar a favoritos"
                  }
                />
              </li>
            </div>

            {/* Submenú de colores */}
            <li>
              <div onClick={() => setIsColorMenuOpen((prev) => !prev)}>
                <ButtonCard icon={<Palette />} title="Color" />
              </div>
              <div
                className={`absolute right-[-3px] top-[-60px] mt-1 w-auto bg-white rounded-t-2xl shadow-xl transition-all duration-300 transform z-50 ${
                  isColorMenuOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                }`}
              >
                <ul className="flex flex-row items-start pr-4 pl-2 py-2">
                  {colors.map((color, index) => (
                    <li
                      key={index}
                      className={`w-8 h-8 flex items-center cursor-pointer ${color.class}`}
                      onClick={() => {
                        updateTaskColor(task.id, color.class); // Cambia el color de la tarjeta
                        setIsColorMenuOpen(false);
                        setIsOpen(false);
                      }}
                    ></li>
                  ))}
                </ul>
              </div>
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

      <div className="text-end">
        <Button
          onClick={() => router.push(`/edit/${task.id}`)}
          className="rounded-2xl px-3 shadow-md"
        >
          <Pencil />
        </Button>
      </div>
    </div>
  );
};
