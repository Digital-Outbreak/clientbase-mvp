import React, { useEffect, useState } from "react";
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
import {
  getKanbanCardsByLane,
  updateKanbanCardLane,
} from "@/lib/db/client-queries";
import { showToast } from "@/lib/utils";

const KanbanBoard = ({ client }: { client: Client }) => {
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [todoItems, setTodoItems] = useState<KanbanCard[]>([]);
  const [doneItems, setDoneItems] = useState<KanbanCard[]>([]);
  const [inProgressItems, setInProgressItems] = useState<KanbanCard[]>([]);
  const [backlogItems, setBacklogItems] = useState<KanbanCard[]>([]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const addNewCard = (
    title: string,
    lane: "Backlog" | "Todo" | "InProgress" | "Done",
    date?: Date
  ) => {
    const newCard: KanbanCard = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      dueDate: date || new Date(),
      lane,
      clientId: client.id,
    };

    switch (lane) {
      case "Backlog":
        setBacklogItems((prevItems) => [...prevItems, newCard]);
        break;
      case "Todo":
        setTodoItems((prevItems) => [...prevItems, newCard]);
        break;
      case "InProgress":
        setInProgressItems((prevItems) => [...prevItems, newCard]);
        break;
      case "Done":
        setDoneItems((prevItems) => [...prevItems, newCard]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts

        const [backlogCards, todoCards, inProgressCards, doneCards] =
          await Promise.all([
            getKanbanCardsByLane(client.id, "Backlog"),
            getKanbanCardsByLane(client.id, "Todo"),
            getKanbanCardsByLane(client.id, "InProgress"),
            getKanbanCardsByLane(client.id, "Done"),
          ]);

        console.log(backlogCards, todoCards, inProgressCards, doneCards);

        setBacklogItems(backlogCards || []);
        setTodoItems(todoCards || []);
        setInProgressItems(inProgressCards || []);
        setDoneItems(doneCards || []);
      } catch (error) {
        console.error("Error fetching cards:", error);
        showToast("Error fetching cards");
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    };

    fetchCards();
  }, [client.id]);

  const handleDragEnd = async (event: any) => {
    const { over, active } = event;
    if (!over) return;

    const fromContainer = active.data.current.parent;
    const toContainer = over.id;
    const draggedItemId = active.data.current.id;

    const removeCard = (items: KanbanCard[], id: string) =>
      items.filter((item) => item.id !== id);

    const findCard = (items: KanbanCard[], id: string) =>
      items.find((item) => item.id === id);

    let movedCard;

    switch (fromContainer) {
      case "ToDo":
        movedCard = findCard(todoItems, draggedItemId);
        setTodoItems((prevItems) => removeCard(prevItems, draggedItemId));
        break;
      case "InProgress":
        movedCard = findCard(inProgressItems, draggedItemId);
        setInProgressItems((prevItems) => removeCard(prevItems, draggedItemId));
        break;
      case "Done":
        movedCard = findCard(doneItems, draggedItemId);
        setDoneItems((prevItems) => removeCard(prevItems, draggedItemId));
        break;
      case "Backlog":
        movedCard = findCard(backlogItems, draggedItemId);
        setBacklogItems((prevItems) => removeCard(prevItems, draggedItemId));
        break;
      default:
        break;
    }

    if (!movedCard) return;

    // Explicitly define type of toContainer as keyof typeof containerItems
    const containerItems: { [key: string]: KanbanCard[] } = {
      ToDo: todoItems,
      InProgress: inProgressItems,
      Done: doneItems,
      Backlog: backlogItems,
    };

    const targetContainer = containerItems[toContainer]; // Access using bracket notation

    if (!targetContainer) return;

    const oldIndex = active.data.current.index;
    const newIndex = targetContainer.findIndex((item) => item.id === over.id);

    const newItems = [...targetContainer];
    newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, movedCard);

    switch (toContainer) {
      case "ToDo":
        setTodoItems(newItems);
        break;
      case "InProgress":
        setInProgressItems(newItems);
        break;
      case "Done":
        setDoneItems(newItems);
        break;
      case "Backlog":
        setBacklogItems(newItems);
        break;
      default:
        break;
    }

    try {
      await updateKanbanCardLane(
        client.id,
        toContainer as "Backlog" | "Todo" | "InProgress" | "Done"
      );
    } catch (error) {
      console.error("Error updating card lane:", error);
      showToast("Error updating card lane");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="flex flex-col">
        <AddCard client={client} addCard={addNewCard} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KanbanLane title="Backlog" items={backlogItems} />
          <KanbanLane title="ToDo" items={todoItems} />
          <KanbanLane title="InProgress" items={inProgressItems} />
          <KanbanLane title="Done" items={doneItems} />
        </div>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
