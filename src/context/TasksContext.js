"use client";
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();
//Hook useTaks para usar el provider sin tener que llamar al usecontext y taskcontext constantemente
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must used within a provider"); //Si no existe el contexto, me dara error
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    //Agrego un estado para colocar el array de tareas, y asi se va actualizando en el setTasks
    {
      id: 1,
      title: "Primer tarea",
      description: "Esta es mi primer tarea",
    },
    {
      id: 2,
      title: "Segunda tarea",
      description: "Debo aprender Nextjs",
    },
    {
      id: 3,
      title: "Tercer tarea",
      description: "Debo aprender zustand",
    },
  ]);

  //Funcion para crear tareas, copiando el arreglo de tareas que esten generadas, sumando nuevas
  const createTask = (title, description) =>
    setTasks([
      ...tasks,
      {
        title,
        description,
        //Podria usar el task.length pero uso la biblioteca uuid, otorgara un string unico
        id: uuid(),
      },
    ]);

  //Para utilizar mis funciones debo exportarlo aqui, coloco la funcion dentro del valor/value
  return (
    <TaskContext.Provider value={{ tasks, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};
