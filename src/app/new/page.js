"use client";
import { useState } from "react";
import { useTasks } from "@/context/TasksContext";
import { useRouter } from "next/navigation";

function Page() {
  const [task, setTask] = useState(); //Para capturar los valores, vamos a usar un estado, guardo todo en la tarea y cuando se actualice, en el setTask
  const { createTask } = useTasks();
  const router = useRouter();

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value }); //Se gaurdan los datos en el setTask, se copian los tasks, el nombre y el valor

  const handleSubmit = (e) => {
    //No se reinicia la pagina del form cuando le doy submit
    e.preventDefault();
    //Creacion de tarea y con el router me envia a la pagina principal con la nueva tarea añadida
    createTask(task.title, task.description);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Titulo"
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Tarea"
        onChange={handleChange}
      ></textarea>
      <button>Guardar</button>
    </form>
  );
}

export default Page;
