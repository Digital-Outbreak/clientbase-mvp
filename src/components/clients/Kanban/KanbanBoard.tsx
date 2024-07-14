import React, { useState } from "react";
import {
  DndContext,
  rectIntersection,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import AddCard from "./AddCard";
import KanbanLane from "./KanbanLane";

export interface Card {
  id: string;
  title: string;
  date?: Date;
}

const KanbanBoard = ({ client }: { client: Client }) => {
  const [todoItems, setTodoItems] = useState<Card[]>([]);
  const [doneItems, setDoneItems] = useState<Card[]>([]);
  const [inProgressItems, setInProgressItems] = useState<Card[]>([]);
  const [backlogItems, setBacklogItems] = useState<Card[]>([]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const addNewCard = (title: string, lane: string, date?: Date) => {
    const newCard = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      date,
    };
    if (lane === "Backlog") {
      setBacklogItems((prevItems) => [...prevItems, newCard]);
    } else if (lane === "ToDo") {
      setTodoItems((prevItems) => [...prevItems, newCard]);
    } else if (lane === "In Progress") {
      setInProgressItems((prevItems) => [...prevItems, newCard]);
    } else if (lane === "Done") {
      setDoneItems((prevItems) => [...prevItems, newCard]);
    }
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

    if (toContainer === fromContainer) {
      const containerItems =
        toContainer === "ToDo"
          ? todoItems
          : toContainer === "In Progress"
          ? inProgressItems
          : toContainer === "Done"
          ? doneItems
          : backlogItems;

      const oldIndex = active.data.current.index;
      const newIndex = containerItems.findIndex((item) => item.id === over.id);

      const newItems = [...containerItems];
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedCard);

      if (toContainer === "ToDo") {
        setTodoItems(newItems);
      } else if (toContainer === "In Progress") {
        setInProgressItems(newItems);
      } else if (toContainer === "Done") {
        setDoneItems(newItems);
      } else if (toContainer === "Backlog") {
        setBacklogItems(newItems);
      }
    } else {
      if (toContainer === "ToDo") {
        setTodoItems((prevItems) => [...prevItems, movedCard!]);
      } else if (toContainer === "In Progress") {
        setInProgressItems((prevItems) => [...prevItems, movedCard!]);
      } else if (toContainer === "Done") {
        setDoneItems((prevItems) => [...prevItems, movedCard!]);
      } else if (toContainer === "Backlog") {
        setBacklogItems((prevItems) => [...prevItems, movedCard!]);
      }
    }
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="flex flex-col">
        <AddCard addCard={addNewCard} client={client} />
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
