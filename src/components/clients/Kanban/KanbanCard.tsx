import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const KanbanCard = ({
  id,
  title,
  index,
  parent,
}: {
  id: string;
  title: string;
  index: number;
  parent: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      id,
      title,
      index,
      parent,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      className="p-3 bg-background m-2 rounded-md border cursor-move border-purple-700 shadow"
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      {title}
    </div>
  );
};

export default KanbanCard;
