"use client";
import { useEffect } from "react";
import { useTasks } from "@/context/TasksContext";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";

function Page() {
  const { register, handleSubmit, setValue } = useForm();
  const { tasks, createTask, updateTask } = useTasks();
  const router = useRouter();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data.title, data.description);
    }
    router.push("/");
  });

  //Funcion para EDITAR tarea
  // Si existe params y params.ID, trae todas las tareas
  // De todas las tareas buscamos un elemento "taskFound" y la comparamos
  useEffect(() => {
    if (params && params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound) {
        setValue("title", taskFound.title);
        setValue("description", taskFound.description); //Asigno los valores
      }
    }
  }, [params, tasks, setValue]); //Añado dependencias y se ejecutara dicha funcion cuando params/tasks o setValue se actualicen

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="Titulo" {...register("title")} />
      <textarea placeholder="Tarea" {...register("description")}></textarea>
      <button>Guardar</button>
    </form>
  );
}

export default Page;
