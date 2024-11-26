"use client";
import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "@/Hooks/useLocalStorage";

export const TaskContext = createContext();
//Hook useTaks para usar el provider sin tener que llamar al usecontext y taskcontext constantemente
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must used within a provider"); //Si no existe el contexto, me dara error
  return context;
};

export const TaskProvider = ({ children }) => {
  //Gaurdado en LocalStorage
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  //Funcion para CREAR tareas
  //Copiando el arreglo de tareas que esten generadas, sumando nuevas
  const createTask = (title, description) =>
    setTasks([
      ...tasks,
      {
        title,
        description,
        //Podria usar el task.length pero uso la biblioteca uuid, otorgara un string unico
        id: uuid(),
        color: "bg-white",
      },
    ]);

  //Funcion para ELIMINAR tareas
  //Antes de copiar las tareas, lo filtro haciendo que si una tarea es diferente del ID, que no lo añada al arreglo
  const deleteTask = (id) =>
    setTasks([...tasks.filter((tasks) => tasks.id !== id)]);

  //Funcion para ACTUALIZAR tareas
  //Copiamos las tareas, las recorremos y le decimos si el task.id es igual al ID, que se actualicee, sino no.
  //Creo un objeto nuevo con el titulo y la descripcion actualizados
  const updateTask = (id, newData) =>
    setTasks([
      ...tasks.map((task) => (task.id === id ? { ...task, ...newData } : task)),
    ]);

  // Actualizar el COLOR de la tarea
  const updateTaskColor = (id, newColor) =>
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, color: newColor } // Actualiza el color si el ID coincide
          : task
      )
    );

  //Para utilizar mis funciones/valores debo exportarlo aqui, coloco la funcion dentro del valor/value
  return (
    <TaskContext.Provider
      value={{ tasks, createTask, deleteTask, updateTask, updateTaskColor }}
    >
      {children}
    </TaskContext.Provider>
  );
};
