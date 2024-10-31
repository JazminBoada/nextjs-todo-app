"use client";
import { useState, useEffect } from "react";
import { useTasks } from "@/context/TasksContext";
import { useRouter, useParams } from "next/navigation";

function Page() {
  //Para capturar los valores, vamos a usar un estado, guardo todo en la tarea y cuando se actualice, en el setTask
  const [task, setTask] = useState({ title: "", description: "" });
  const { tasks, createTask } = useTasks();
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value }); //Se gaurdan los datos en el setTask, se copian los tasks, el nombre y el valor

  const handleSubmit = (e) => {
    //No se reinicia la pagina del form cuando le doy submit
    e.preventDefault();
    //Creacion de tarea y con el router me envia a la pagina principal con la nueva tarea añadida
    createTask(task.title, task.description);
    router.push("/");
  };

  //Funcion para EDITAR tarea
  // Si existe params y params.ID, trae todas las tareas
  // De todas las tareas buscamos un elemento "taskFound" y la comparamos
  useEffect(() => {
    if (params && params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound)
        setTask({
          title: taskFound.title,
          description: taskFound.description,
        }); //Si encuentra las tareas, setTask actualiza su estado y coloca los nuevos datos en task
    }
  }, [params, tasks]); //Se ejecutara dicha funcion cuando params o tasks se editen

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Titulo"
        onChange={handleChange}
        value={task.title}
      />
      <textarea
        name="description"
        placeholder="Tarea"
        onChange={handleChange}
        value={task.description}
      ></textarea>
      <button>Guardar</button>
    </form>
  );
}

export default Page;
