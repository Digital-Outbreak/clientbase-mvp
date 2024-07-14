import React from "react";
import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";

export interface Card {
  id: string;
  title: string;
  date?: Date;
}

const KanbanLane = ({ title, items }: { title: string; items: Card[] }) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div className="flex flex-col flex-1 p-5 min-h-[10rem]">
      <div className="font-bold">{title}</div>
      <div
        ref={setNodeRef}
        className="bg-purple-950/25 rounded-md flex-1 mt-2 p-2 flex flex-col"
      >
        {items.length === 0 ? (
          <div
            className="
            flex
            justify-center
            items-center
            h-full
            text-gray-500
            text-sm
          "
          >
            No items to display
          </div>
        ) : (
          items.map((card, index) => (
            <KanbanCard
              id={card.id}
              title={card.title}
              key={card.id}
              index={index}
              parent={title}
              date={card.date}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanLane;
