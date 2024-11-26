import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TasksContext";
import { toast } from "react-hot-toast";
import { EllipsisVertical, Pencil, Star, Palette, Trash } from "lucide-react";
import { Button } from "./ui/button";
import ButtonCard from "@/components/ButtonCard";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  const { deleteTask, updateTaskColor } = useTasks();
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

  // Lista de colores disponibles
  const colors = [
    { name: "Blanco", class: "bg-white" },
    { name: "Rojo", class: "bg-red-200" },
    { name: "Verde", class: "bg-green-200" },
    { name: "Azul", class: "bg-blue-200" },
  ];

  return (
    <div
      className={`mt-5 bg-white ${task.color} rounded-md w-80 h-52 space-y-5 p-5 md:border md:border-slate-300 relative shadow-md md:shadow-none`}
    >
      <div className="flex flex-row items-center justify-between pb-2 border-b border-b-slate-300">
        <h1 className="text-gray-600 font-bold text-xl">{task.title}</h1>

        {/* Botón para abrir el menú */}
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative text-white bg-slate-300 rounded-2xl px-3"
        >
          <EllipsisVertical />
        </Button>

        {/* Menú desplegable principal */}
        <div
          ref={menuRef} // Referencia al menú
          className={`absolute top-0 right-2 mt-1 w-auto bg-white rounded-2xl shadow-even-shadow lg:border lg:border-slate-300 lg:shadow-none transition-all duration-300 transform z-50 ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col items-start pr-4 pl-2 py-2">
            <li>
              <ButtonCard icon={<Star />} title="Favorito" />
            </li>

            {/* Submenú de colores */}
            <li>
              <div onClick={() => setIsColorMenuOpen((prev) => !prev)}>
                <ButtonCard icon={<Palette />} title="Color" />
              </div>
              {/* Submenú visible encima */}
              {isColorMenuOpen && (
                <div className="absolute right-0 top-0 mt-1 w-auto bg-white rounded-l-2xl shadow-even-shadow lg:border lg:border-slate-300 lg:shadow-none transition-all duration-300 transform z-50">
                  <ul className="flex flex-col items-start pr-4 pl-2 py-2">
                    {colors.map((color, index) => (
                      <li
                        key={index}
                        className={`w-8 h-8 flex items-center cursor-pointer ${
                          color.class
                        } p-2 text-${color.class.replace("bg-", "")}`}
                        onClick={() => {
                          updateTaskColor(task.id, color.class); // Cambia el color de la tarjeta
                          setIsColorMenuOpen(false); // Cierra el submenú de colores
                        }}
                      ></li>
                    ))}
                  </ul>
                </div>
              )}
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
          className="rounded-2xl px-3"
        >
          <Pencil />
        </Button>
      </div>
    </div>
  );
};
