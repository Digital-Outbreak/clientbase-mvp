import React from "react";
import { Button } from "../ui/button";
import { PenIcon, PlusSquareIcon } from "lucide-react";

const ClientImportantLinks = ({ client }: { client: Client }) => {
  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4">
        <Button className="flex gap-2 items-center">
          <PlusSquareIcon size={24} />
          Add Another Link
        </Button>
      </div>

      {/* Vertical grid with cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {client.links.map((link, index) => (
          <div
            key={index}
            className="bg-primary/10 shadow-md rounded-lg p-6 flex flex-col justify-between items-start gap-4 
            border border-primary/20 hover:shadow-lg transition duration-300 ease-in-out
            fade-out"
          >
            <div className="w-full">
              <h3 className="text-lg font-semibold">Website Design</h3>
              <p className="truncate">link: {link}</p>
              <p className="text-sm text-gray-400 fade-text">
                important to note: important to note Figma ipsum component
                variant main layer. Rectangle figjam scrolling ipsum comment
                figma auto project list. bfuebfiuweabfuwigbigibweoew segiowbegi.
              </p>
            </div>
            <div className="flex justify-end gap-2 w-full">
              <Button className="flex gap-2 w-full">
                <PenIcon size={16} />
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientImportantLinks;
