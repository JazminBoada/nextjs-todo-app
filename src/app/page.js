"use client";
import React from "react";
import { useTasks } from "@/context/TasksContext";
import { TaskCard } from "@/components/TaskCard";

function page() {
  const { tasks } = useTasks();
  return (
    <div>
      {tasks.map((task, i) => (
        <TaskCard task={task} key={i} /> //Le coloco como propiedad la tarea que se espera recibir
      ))}
    </div>
  );
}

export default page;
