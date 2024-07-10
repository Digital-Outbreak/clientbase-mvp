// App.tsx
import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  rectIntersection,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Card {
  title: string;
}

const KanbanCard = ({
  title,
  index,
  parent,
}: {
  title: string;
  index: number;
  parent: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
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
      className="p-3 bg-white m-2 rounded-md border border-gray-500 shadow"
      style={{ transform: style.transform }}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      {title}
    </div>
  );
};

const KanbanLane = ({ title, items }: { title: string; items: Card[] }) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <div className="flex flex-col flex-1 p-5 min-h-[10rem]">
      <div className="font-bold">{title}</div>
      <div
        ref={setNodeRef}
        className="bg-gray-200 rounded-md flex-1 p-2 flex flex-col"
      >
        {items.map(({ title: cardTitle }, index) => (
          <KanbanCard
            title={cardTitle}
            key={index}
            index={index}
            parent={title}
          />
        ))}
      </div>
    </div>
  );
};

const AddCard = ({ addCard }: { addCard: (title: string) => void }) => {
  const [title, setTitle] = useState("");
  return (
    <div className="flex p-5">
      <input
        className="flex-1 p-2 border border-gray-500 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new card"
      />
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        onClick={() => {
          addCard(title);
          setTitle("");
        }}
      >
        Add Card
      </button>
    </div>
  );
};

const KanbanBoard = () => {
  const [todoItems, setTodoItems] = useState<Card[]>([]);
  const [doneItems, setDoneItems] = useState<Card[]>([]);
  const [inProgressItems, setInProgressItems] = useState<Card[]>([]);
  const [unassignedItems, setUnassignedItems] = useState<Card[]>([]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const addNewCard = (title: string) => {
    setUnassignedItems([...unassignedItems, { title }]);
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        const container = e.over?.id;
        const title = e.active.data.current?.title ?? "";
        const index = e.active.data.current?.index ?? 0;
        const parent = e.active.data.current?.parent ?? "ToDo";
        if (container === "ToDo") {
          setTodoItems([...todoItems, { title }]);
        } else if (container === "Done") {
          setDoneItems([...doneItems, { title }]);
        } else if (container === "Unassigned") {
          setUnassignedItems([...unassignedItems, { title }]);
        } else {
          setInProgressItems([...inProgressItems, { title }]);
        }
        if (parent === "ToDo") {
          setTodoItems([
            ...todoItems.slice(0, index),
            ...todoItems.slice(index + 1),
          ]);
        } else if (parent === "Done") {
          setDoneItems([
            ...doneItems.slice(0, index),
            ...doneItems.slice(index + 1),
          ]);
        } else if (parent === "Unassigned") {
          setUnassignedItems([
            ...unassignedItems.slice(0, index),
            ...unassignedItems.slice(index + 1),
          ]);
        } else {
          setInProgressItems([
            ...inProgressItems.slice(0, index),
            ...inProgressItems.slice(index + 1),
          ]);
        }
      }}
      sensors={sensors}
    >
      <div className="flex flex-col">
        <AddCard addCard={addNewCard} />
        <div className="flex flex-3">
          <KanbanLane title="ToDo" items={todoItems} />
          <KanbanLane title="In Progress" items={inProgressItems} />
          <KanbanLane title="Done" items={doneItems} />
          <KanbanLane title="Unassigned" items={unassignedItems} />
        </div>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
