import React from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TasksContext";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  const { deleteTask } = useTasks();

  return (
    <div
      className="bg-slate-600 py-10 px-10 text-center m-10 rounded-md"
      onClick={() => router.push(`/edit/${task.id}`)}
    >
      <h1 className="text-white font-bold text-lg">{task.title}</h1>
      <p className="text-white ">{task.description}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); //Tocar Eliminar y que termine ahi el evento y no genere errores
          deleteTask(task.id); //Colco task.id porque ademas de eliminar la tarea, se colocara el ID de la tarea actual que se esta recorriendo
        }}
        className="text-white bg-slate-800 rounded-md p-2 mt-2"
      >
        Eliminar
      </button>
    </div>
  );
};
