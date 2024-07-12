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
  id: string;
  title: string;
}

const predefinedValues = ["Task 1", "Task 2", "Task 3"];

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
        {items.map((card, index) => (
          <KanbanCard
            id={card.id}
            title={card.title}
            key={card.id}
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
  const [selectedValue, setSelectedValue] = useState(predefinedValues[0]);

  const handleAddCard = () => {
    const finalTitle = title || selectedValue;
    addCard(finalTitle);
    setTitle("");
  };

  return (
    <div className="flex p-5">
      <input
        className="flex-1 p-2 border border-gray-500 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new card"
      />
      <select
        className="ml-2 p-2 border border-gray-500 rounded-md"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {predefinedValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        onClick={handleAddCard}
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
  const [backlogItems, setBacklogItems] = useState<Card[]>([]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const addNewCard = (title: string) => {
    const newCard = {
      id: Math.random().toString(36).substr(2, 9),
      title,
    };
    setBacklogItems((prevItems) => [...prevItems, newCard]);
  };

  const handleDragEnd = (e: any) => {
    const { over, active } = e;
    if (!over) return;

    const fromContainer = active.data.current.parent;
    const toContainer = over.id;
    const draggedItemId = active.data.current.id;

    const removeCard = (items: Card[], id: string) =>
      items.filter((item) => item.id !== id);

    const findCard = (items: Card[], id: string) =>
      items.find((item) => item.id === id);

    let movedCard;

    if (fromContainer === "ToDo") {
      movedCard = findCard(todoItems, draggedItemId);
      setTodoItems((prevItems) => removeCard(prevItems, draggedItemId));
    } else if (fromContainer === "In Progress") {
      movedCard = findCard(inProgressItems, draggedItemId);
      setInProgressItems((prevItems) => removeCard(prevItems, draggedItemId));
    } else if (fromContainer === "Done") {
      movedCard = findCard(doneItems, draggedItemId);
      setDoneItems((prevItems) => removeCard(prevItems, draggedItemId));
    } else if (fromContainer === "Backlog") {
      movedCard = findCard(backlogItems, draggedItemId);
      setBacklogItems((prevItems) => removeCard(prevItems, draggedItemId));
    }

    if (!movedCard) return;

    if (toContainer === "ToDo") {
      setTodoItems((prevItems) => [...prevItems, movedCard!]);
    } else if (toContainer === "In Progress") {
      setInProgressItems((prevItems) => [...prevItems, movedCard!]);
    } else if (toContainer === "Done") {
      setDoneItems((prevItems) => [...prevItems, movedCard!]);
    } else if (toContainer === "Backlog") {
      setBacklogItems((prevItems) => [...prevItems, movedCard!]);
    }
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="flex flex-col">
        <AddCard addCard={addNewCard} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KanbanLane title="Backlog" items={backlogItems} />
          <KanbanLane title="ToDo" items={todoItems} />
          <KanbanLane title="In Progress" items={inProgressItems} />
          <KanbanLane title="Done" items={doneItems} />
        </div>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
