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
    <div className="lg:bg-white rounded-b-xl overflow-hidden lg:shadow-xl">
      <section className="p-5">
        <Link href={"/"}>
          <Button className="rounded-full w-10 h-10 shadow-sm ">
            <ArrowLeft style={{ width: "20px", height: "20px" }} />
          </Button>
        </Link>
      </section>

      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center space-y-4 pt-10 md:pt-5 xl:pb-10"
      >
        <div className="flex flex-row items-center gap-4 w-3/4 md:w-[70vh] xl:w-[50vw]">
          <input
            placeholder="Título"
            {...register("title")}
            className="text-md xl:text-3xl flex-1 bg-white rounded-md outline-none p-4 md:p-0 shadow-md lg:shadow-none"
          />
        </div>

        <textarea
          placeholder="Descripción"
          {...register("description")}
          className=" w-3/4 h-96 md:w-[70vh] xl:w-[50vw] max-w-5xl p-4 shadow-md lg:shadow-none lg:border lg:border-slate-300 rounded-md resize-none outline-none"
        ></textarea>

        <Button className="p-4 xl:p-6 xl:text-md rounded-full shadow-xl">
          Guardar
        </Button>
      </form>
    </div>
  );
}

export default Page;
