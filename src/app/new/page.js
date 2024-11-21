"use client";
import { useEffect } from "react";
import { useTasks } from "@/context/TasksContext";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function Page() {
  const { register, handleSubmit, setValue } = useForm();
  const { tasks, createTask, updateTask } = useTasks();
  const router = useRouter();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
      toast.success("Tarea actualizada correctamente");
    } else {
      createTask(data.title, data.description);
      toast.success("Tarea creada correctamente");
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
    <div className=" min-h-screen">
      <section className="p-5">
        <Link href={"/"}>
          <Button className="rounded-full w-10 h-10 shadow-sm ">
            <ArrowLeft style={{ width: "20px", height: "20px" }} />
          </Button>
        </Link>
      </section>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center space-y-4 pt-10"
      >
        <div className="flex flex-row items-center gap-4 w-72 md:w-[70vh] xl:w-[50vw]">
          <input
            placeholder="Título de la tarea"
            {...register("title")}
            className="text-2xl xl:text-3xl flex-1 bg-transparent outline-none"
          />
        </div>

        {/* Textarea centrado */}
        <textarea
          placeholder="Escribe tu tarea..."
          {...register("description")}
          className="w-72 md:w-[70vh] xl:w-[50vw] h-[50vh] max-w-5xl max-h-screen p-4 border border-slate-300 rounded-md resize-none outline-gray-400 "
        ></textarea>

        {/* Botón de guardar centrado */}
        <Button className="self-center p-4 xl:p-6 xl:text-xl">Guardar</Button>
      </form>
    </div>
  );
}

export default Page;
