import React from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TasksContext";
import { toast } from "react-hot-toast";
import { EllipsisVertical, Pencil } from "lucide-react";
import { Button } from "./ui/button";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  const { deleteTask } = useTasks();

  return (
    <div className="mt-10 bg-white rounded-md max-w-md h-52 space-y-5 p-5 border border-gray-300">
      <div className="flex flex-row items-center justify-between pb-2 border-b-2 border-b-gray-200">
        {" "}
        <h1 className="text-black font-bold text-lg">{task.title}</h1>
        <Button
          onClick={(e) => {
            e.stopPropagation(); //Tocar Eliminar y que termine ahi el evento y no genere errores
            if (deleteTask) {
            }
            deleteTask(task.id); //Colco task.id porque ademas de eliminar la tarea, se colocara el ID de la tarea actual que se esta recorriendo
            toast.success("Tarea eliminada correctamente");
          }}
          className="text-white bg-slate-300 rounded-2xl px-3"
        >
          <EllipsisVertical />
        </Button>
      </div>
      <p className="text-black ">{task.description}</p>

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
