import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";

const KanbanCard = ({
  id,
  title,
  index,
  parent,
  date,
}: {
  id: string;
  title: string;
  index: number;
  parent: string;
  date?: Date;
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

  const currentDate = new Date();
  const daysLeft = date
    ? Math.ceil((date.getTime() - currentDate.getTime()) / (1000 * 3600 * 24))
    : null;
  const daysLeftText =
    daysLeft !== null
      ? daysLeft >= 0
        ? `${daysLeft} days left`
        : "0 days"
      : null;

  return (
    <div
      className="p-3 bg-background m-2 rounded-md border cursor-move border-purple-700 shadow"
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      {date && (
        <Badge
          variant={daysLeft && daysLeft <= 0 ? "destructive" : "default"}
          className="mb-2"
        >
          {daysLeftText}
        </Badge>
      )}
      <div>{title}</div>
    </div>
  );
};

export default KanbanCard;
