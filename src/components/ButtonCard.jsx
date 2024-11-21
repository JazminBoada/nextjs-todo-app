import React from "react";
import { Button } from "@/components/ui/button";

const ButtonCard = ({ icon, title }) => {
  return (
    <button className="flex flex-row items-center gap-2 ">
      <Button className=" rounded-xl px-3 w-8 h-8">{icon}</Button>
      <span className="cursor-pointer text-md hover:bg-gray-200 rounded-md px-2 py-2">
        {title}
      </span>
    </button>
  );
};

export default ButtonCard;
